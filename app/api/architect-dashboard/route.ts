import { NextResponse } from "next/server";
import { getMainframeDashboardStats } from "@/lib/mainframe-dashboard";

export async function GET() {
  try {
    const stats = await getMainframeDashboardStats();
    return NextResponse.json(stats);
  } catch {
    return NextResponse.json({ ok: false, error: "dashboard read failed" }, { status: 500 });
  }
}
