import { NextResponse } from "next/server";

function timeAgo(iso: string): string {
  const diff  = Date.now() - new Date(iso).getTime();
  const mins  = Math.floor(diff / 60_000);
  const hours = Math.floor(diff / 3_600_000);
  const days  = Math.floor(diff / 86_400_000);
  if (mins  < 1)  return "just now";
  if (mins  < 60) return `${mins} minute${mins === 1 ? "" : "s"} ago`;
  if (hours < 24) return `${hours} hour${hours === 1 ? "" : "s"} ago`;
  return `${days} day${days === 1 ? "" : "s"} ago`;
}

export async function GET() {
  const username = process.env.GITHUB_USERNAME;
  const token    = process.env.GITHUB_TOKEN;

  if (!username)
    return NextResponse.json({ error: "GITHUB_USERNAME not configured." }, { status: 500 });

  try {
    const res = await fetch(
      `https://api.github.com/users/${username}/events/public?per_page=30`,
      {
        headers: {
          Accept: "application/vnd.github+json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        next: { revalidate: 300 },
      }
    );

    if (!res.ok) throw new Error(`GitHub API ${res.status}`);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const events: any[] = await res.json();
    const push = events.find((e) => e.type === "PushEvent");

    if (!push)
      return NextResponse.json({ error: "No recent push events." }, { status: 404 });

    const commit   = push.payload.commits?.at(-1);
    const repoName = push.repo?.name ?? username;
    const sha      = commit?.sha ?? "";

    return NextResponse.json({
      repo:       repoName,
      message:    commit?.message?.split("\n")[0] ?? "No message",
      time_ago:   timeAgo(push.created_at),
      url:        `https://github.com/${repoName}/commit/${sha}`,
      avatar_url: push.actor?.avatar_url ?? "",
    });
  } catch (err) {
    console.error("[/api/github-status]", err);
    return NextResponse.json({ error: "Failed to reach Zion Mainframe." }, { status: 500 });
  }
}
