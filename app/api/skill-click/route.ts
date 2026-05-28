import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const ORACLE_QUOTE = "You've already made the choice. You're just here to understand why you made it.";

const MUTATIONS: Record<string, { accentColor: string; flavour: string }> = {
  lang:  { accentColor: "#00FF41", flavour: "Every language is a door. You have opened many." },
  fe:    { accentColor: "#38BDF8", flavour: "The illusion rendered. The recruiter convinced." },
  be:    { accentColor: "#A78BFA", flavour: "The real machine runs behind what they can see." },
  ai:    { accentColor: "#F59E0B", flavour: "The Oracle predicted this. The model agreed." },
  cloud: { accentColor: "#34D399", flavour: "Infinite scale. Deployed at the speed of thought." },
  db:    { accentColor: "#FB7185", flavour: "Every truth persisted. Every query answered." },
  infra: { accentColor: "#FBBF24", flavour: "The walls no one sees. The locks that hold the system." },
  tools: { accentColor: "#A3E635", flavour: "The keymaker's collection. A key for every door." },
};

function detectDevice(userAgent: string) {
  return /mobile|android|iphone|ipad/i.test(userAgent) ? "mobile" : "desktop";
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      nodeId,
      skill,
    } = body as {
      nodeId?: string;
      skill?: string;
      timestamp?: string;
    };

    if (!nodeId || !skill) {
      return NextResponse.json({ ok: false, error: "missing nodeId or skill" }, { status: 400 });
    }

    const mutation = MUTATIONS[nodeId];
    if (!mutation) {
      return NextResponse.json({ ok: false, error: "unknown nodeId" }, { status: 400 });
    }

    const device = detectDevice(req.headers.get("user-agent") ?? "unknown");

    await prisma.$executeRaw`
      INSERT INTO skill_clicks ("nodeId", skill, device)
      VALUES (${nodeId}, ${skill}, ${device})
    `;

    return NextResponse.json({
      ok: true,
      quote: ORACLE_QUOTE,
      flavour: mutation.flavour,
      accentColor: mutation.accentColor,
    });
  } catch {
    return NextResponse.json({ ok: false, error: "skill click failed" }, { status: 500 });
  }
}
