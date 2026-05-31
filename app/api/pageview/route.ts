import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { page } = await req.json();
    if (!page || typeof page !== "string") {
      return NextResponse.json({ error: "missing page" }, { status: 400 });
    }
    const ua     = req.headers.get("user-agent") ?? "unknown";
    const device = /mobile|android|iphone|ipad/i.test(ua) ? "mobile" : "desktop";
    await prisma.pageview.create({ data: { page, device } });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "db error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const [total, redCount, blueCount, recent] = await Promise.all([
      prisma.pageview.count(),
      prisma.pageview.count({ where: { page: "red" } }),
      prisma.pageview.count({ where: { page: "blue" } }),
      prisma.pageview.findMany({
        orderBy: { createdAt: "desc" },
        take: 20,
        select: { id: true, page: true, device: true, createdAt: true },
      }),
    ]);
    return NextResponse.json({ total, redCount, blueCount, recent });
  } catch {
    return NextResponse.json({ error: "db error" }, { status: 500 });
  }
}
