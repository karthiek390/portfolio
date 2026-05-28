import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const clientId = req.nextUrl.searchParams.get("clientId");
    if (!clientId) {
      return NextResponse.json({ ok: false, error: "missing clientId" }, { status: 400 });
    }

    const rows = await prisma.$queryRaw<Array<{
      clientId: string;
      audioEnabled: boolean;
    }>>`
      SELECT "clientId", "audioEnabled"
      FROM user_preferences
      WHERE "clientId" = ${clientId}
      LIMIT 1
    `;

    const row = rows[0];
    return NextResponse.json({
      ok: true,
      clientId,
      audioEnabled: row?.audioEnabled ?? false,
    });
  } catch {
    return NextResponse.json({ ok: false, error: "preference read failed" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      clientId,
      audioEnabled,
    } = body as {
      clientId?: string;
      audioEnabled?: boolean;
    };

    if (!clientId || typeof audioEnabled !== "boolean") {
      return NextResponse.json({ ok: false, error: "invalid payload" }, { status: 400 });
    }

    await prisma.$executeRaw`
      INSERT INTO user_preferences ("clientId", "audioEnabled", "updatedAt")
      VALUES (${clientId}, ${audioEnabled}, NOW())
      ON CONFLICT ("clientId")
      DO UPDATE SET
        "audioEnabled" = EXCLUDED."audioEnabled",
        "updatedAt" = NOW()
    `;

    return NextResponse.json({ ok: true, clientId, audioEnabled });
  } catch {
    return NextResponse.json({ ok: false, error: "preference write failed" }, { status: 500 });
  }
}
