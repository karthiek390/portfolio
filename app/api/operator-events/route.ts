import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { OPERATOR_EVENT_TYPES } from "@/lib/operator-events";

const VALID_TYPES = new Set<string>(OPERATOR_EVENT_TYPES);

function detectDevice(userAgent: string) {
  return /mobile|android|iphone|ipad/i.test(userAgent) ? "mobile" : "desktop";
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      type,
      detail,
      page,
      metadata,
    } = body as {
      type?: string;
      detail?: string;
      page?: string;
      metadata?: Record<string, string | number | boolean | null>;
    };

    if (!type || !VALID_TYPES.has(type)) {
      return NextResponse.json({ ok: false, error: "invalid event type" }, { status: 400 });
    }

    const device = detectDevice(req.headers.get("user-agent") ?? "unknown");

    await prisma.$executeRaw`
      INSERT INTO operator_events (type, detail, page, device, metadata)
      VALUES (
        ${type},
        ${detail?.trim() || null},
        ${page?.trim() || null},
        ${device},
        CAST(${metadata ? JSON.stringify(metadata) : null} AS jsonb)
      )
    `;

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "event write failed" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const limitParam = Number(req.nextUrl.searchParams.get("limit") ?? "50");
    const limit = Number.isFinite(limitParam) ? Math.min(Math.max(limitParam, 1), 200) : 50;

    const events = await prisma.$queryRaw<Array<{
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
      LIMIT ${limit}
    `;

    return NextResponse.json({ events });
  } catch {
    return NextResponse.json({ ok: false, error: "event read failed" }, { status: 500 });
  }
}
