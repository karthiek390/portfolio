import { NextRequest, NextResponse } from "next/server";

const VALID_MODES = new Set(["blue", "red"]);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const mode = body?.mode;

    if (typeof mode !== "string" || !VALID_MODES.has(mode)) {
      return NextResponse.json({ ok: false, error: "Invalid pill choice." }, { status: 400 });
    }

    const res = NextResponse.json({ ok: true });
    res.cookies.set("pill_mode", mode, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
    });

    return res;
  } catch (error) {
    console.error("[/api/pill-choice]", error);
    return NextResponse.json({ ok: false, error: "Failed to save pill choice." }, { status: 500 });
  }
}
