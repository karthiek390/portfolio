import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type JsonMetadata = Record<string, string | number | boolean | null> | null;

function asMetadata(value: unknown): JsonMetadata {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  return value as JsonMetadata;
}

function buildHourlyActivity(timestamps: Date[]) {
  const buckets = new Array<number>(24).fill(0);
  const now = Date.now();
  const windowStart = now - 24 * 60 * 60 * 1000;

  for (const stamp of timestamps) {
    const time = stamp.getTime();
    if (time < windowStart) continue;
    const diffHours = Math.floor((now - time) / (60 * 60 * 1000));
    const index = 23 - diffHours;
    if (index >= 0 && index < 24) buckets[index] += 1;
  }

  return buckets;
}

export async function GET() {
  try {
    const [pageviews, operatorEvents] = await Promise.all([
      prisma.pageview.findMany({
        orderBy: { createdAt: "desc" },
        select: { id: true, page: true, device: true, createdAt: true },
      }),
      prisma.$queryRaw<Array<{
        id: number;
        type: string;
        detail: string | null;
        page: string | null;
        device: string | null;
        metadata: unknown;
        createdAt: Date;
      }>>`
        SELECT id, type, detail, page, device, metadata, "createdAt"
        FROM operator_events
        ORDER BY "createdAt" DESC
        LIMIT 200
      `,
    ]);

    const totalVisits = pageviews.length;
    const redChosen = pageviews.filter((view) => view.page === "red").length;
    const blueChosen = pageviews.filter((view) => view.page === "blue").length;
    const mobileCount = pageviews.filter((view) => view.device === "mobile").length;
    const mobileShare = totalVisits > 0 ? Math.round((mobileCount / totalVisits) * 100) : 0;

    const hourlyActivity = buildHourlyActivity(pageviews.map((view) => view.createdAt));

    const trafficSourceCounts = new Map<string, number>();
    const projectCounts = new Map<string, number>();

    for (const event of operatorEvents) {
      const metadata = asMetadata(event.metadata);
      const source = typeof metadata?.source === "string" ? metadata.source : null;
      const project = typeof metadata?.project === "string" ? metadata.project : null;

      if (source) {
        trafficSourceCounts.set(source, (trafficSourceCounts.get(source) ?? 0) + 1);
      }
      if (project) {
        projectCounts.set(project, (projectCounts.get(project) ?? 0) + 1);
      }
    }

    const sourceTotal = Array.from(trafficSourceCounts.values()).reduce((sum, value) => sum + value, 0);
    const trafficSources = Array.from(trafficSourceCounts.entries())
      .map(([label, count]) => ({
        label,
        count,
        pct: sourceTotal > 0 ? Math.round((count / sourceTotal) * 100) : 0,
      }))
      .sort((a, b) => b.count - a.count);

    const topProjects = Array.from(projectCounts.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    const recentEvents = operatorEvents.map((event) => ({
      id: event.id,
      type: event.type,
      detail: event.detail,
      page: event.page,
      device: event.device,
      metadata: asMetadata(event.metadata),
      createdAt: event.createdAt.toISOString(),
    }));

    return NextResponse.json({
      totals: {
        totalVisits,
        redChosen,
        blueChosen,
        mobileShare,
        operatorEvents: operatorEvents.length,
        latestSignal: pageviews[0]?.createdAt.toISOString() ?? null,
      },
      pillSplit: {
        red: redChosen,
        blue: blueChosen,
        redPct: totalVisits > 0 ? Math.round((redChosen / totalVisits) * 100) : 0,
        bluePct: totalVisits > 0 ? Math.round((blueChosen / totalVisits) * 100) : 0,
      },
      trafficSources,
      topProjects,
      recentEvents,
      hourlyActivity,
    });
  } catch {
    return NextResponse.json({ ok: false, error: "dashboard read failed" }, { status: 500 });
  }
}
