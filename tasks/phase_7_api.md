# 🔌 PHASE 7 — API Layer

> **Read `MASTER.md` before this file.**
> This phase implements the two Next.js API routes.
> Phase 8 (Database) must be complete before this phase can be fully tested.
> Build the routes first, then test end-to-end after Phase 8 migrations run.

---

## 📋 Phase Metadata

| Field          | Value                                              |
|----------------|----------------------------------------------------|
| Phase          | 7                                                  |
| Department     | API                                                |
| Depends On     | Phase 8 complete (Prisma schema + Supabase DB live)|
| Blocks         | Phase 5 (contact form submission), Phase 6 (live GitHub data) |
| Estimated Work | ~2 hours                                           |
| Phase Status   | ⏳ Not Started                                      |

---

## 🧠 Context for the AI/Developer

### API Framework
These are **Next.js 15 App Router Route Handlers** (not Pages Router API routes).
- File convention: `/app/api/[route-name]/route.ts`
- Export named async functions: `GET`, `POST`, etc.
- Use `NextRequest` / `NextResponse` from `next/server`
- No `express`, no separate server — all runs inside Next.js

### Prisma Client
Import from `/lib/prisma.ts` (built in Phase 8, Task 8.4).
```ts
import { prisma } from "@/lib/prisma";
```

### Environment Variables
Create a `.env.local` file at the project root (never commit this file).
```
# .env.local
DATABASE_URL="postgresql://..."      # From Supabase → Settings → Database → Connection string
GITHUB_USERNAME="REPLACE"            # Your GitHub username
GITHUB_TOKEN="ghp_..."              # GitHub Personal Access Token (read:public_repo scope)
```

> ⚠️ `.env.local` is already in `.gitignore` by default with Next.js.
> Double-check before any git push.

---

## ✅ Tasks

---

### TASK 7.1 — POST /api/contact

```
task_id: 7.1
task_completed: false
department: API
depends_on: Phase 8 complete
file: /app/api/contact/route.ts
```

**What it does:**
Receives JSON `{ company, email, message }` from the Terminal Contact Form,
validates the fields, then writes a row to the `contacts` table in Supabase via Prisma.

**Expected request:**
```json
POST /api/contact
Content-Type: application/json

{
  "company": "Acme Corp",
  "email": "agent@acme.com",
  "message": "I want to hire you."
}
```

**Expected responses:**
```json
// Success
{ "ok": true, "message": "Signal received." }

// Validation error
{ "ok": false, "error": "Invalid email address." }

// Server error
{ "ok": false, "error": "Transmission failed. Try again." }
```

```ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Simple email regex
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { company, email, message } = body as {
      company: string;
      email:   string;
      message: string;
    };

    // ── Validation ──────────────────────────────────────
    if (!company?.trim()) {
      return NextResponse.json(
        { ok: false, error: "Organization name is required." },
        { status: 400 }
      );
    }
    if (!email?.trim() || !EMAIL_RE.test(email)) {
      return NextResponse.json(
        { ok: false, error: "Invalid email address." },
        { status: 400 }
      );
    }
    if (!message?.trim()) {
      return NextResponse.json(
        { ok: false, error: "Message body is required." },
        { status: 400 }
      );
    }

    // ── Write to DB ─────────────────────────────────────
    await prisma.contact.create({
      data: {
        company:   company.trim(),
        email:     email.trim().toLowerCase(),
        message:   message.trim(),
        createdAt: new Date(),
      },
    });

    return NextResponse.json({ ok: true, message: "Signal received." });

  } catch (err) {
    console.error("[/api/contact] Error:", err);
    return NextResponse.json(
      { ok: false, error: "Transmission failed. Try again." },
      { status: 500 }
    );
  }
}

// Block non-POST methods
export async function GET() {
  return NextResponse.json({ error: "Method not allowed." }, { status: 405 });
}
```

---

### TASK 7.2 — GET /api/github-status

```
task_id: 7.2
task_completed: false
department: API
depends_on: Phase 0 complete (.env.local with GITHUB_USERNAME + GITHUB_TOKEN)
file: /app/api/github-status/route.ts
```

**What it does:**
Fetches the most recent public commit from your GitHub profile using the
GitHub REST API (server-side — the token never reaches the client).
Returns a clean JSON object consumed by `NebuchadnezzarStatus.tsx`.

**GitHub API used:**
```
GET https://api.github.com/users/{username}/events/public
```
Returns an array of events. Filter for `PushEvent` type and take the first result.

**Expected response:**
```json
{
  "repo":       "karthiek/matrix-portfolio",
  "message":    "feat: add terminal contact form",
  "time_ago":   "2 hours ago",
  "url":        "https://github.com/karthiek/matrix-portfolio/commit/abc123",
  "avatar_url": "https://avatars.githubusercontent.com/u/12345"
}
```

```ts
import { NextResponse } from "next/server";

// Converts an ISO timestamp to a human-readable "X time ago" string
function timeAgo(isoString: string): string {
  const diff = Date.now() - new Date(isoString).getTime();
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

  if (!username) {
    return NextResponse.json(
      { error: "GITHUB_USERNAME not configured." },
      { status: 500 }
    );
  }

  try {
    const res = await fetch(
      `https://api.github.com/users/${username}/events/public?per_page=30`,
      {
        headers: {
          Accept: "application/vnd.github+json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        // Revalidate every 5 minutes (Next.js 15 cache control)
        next: { revalidate: 300 },
      }
    );

    if (!res.ok) {
      throw new Error(`GitHub API responded with ${res.status}`);
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const events: any[] = await res.json();

    // Find the first PushEvent
    const push = events.find((e) => e.type === "PushEvent");

    if (!push) {
      return NextResponse.json(
        { error: "No recent push events found." },
        { status: 404 }
      );
    }

    const commit     = push.payload.commits?.at(-1);
    const repoName   = push.repo?.name ?? username;
    const sha        = commit?.sha?.slice(0, 7) ?? "";
    const commitUrl  = `https://github.com/${repoName}/commit/${commit?.sha ?? ""}`;

    return NextResponse.json({
      repo:       repoName,
      message:    commit?.message?.split("\n")[0] ?? "No message",
      time_ago:   timeAgo(push.created_at),
      url:        commitUrl,
      avatar_url: push.actor?.avatar_url ?? "",
    });

  } catch (err) {
    console.error("[/api/github-status] Error:", err);
    return NextResponse.json(
      { error: "Failed to reach Zion Mainframe." },
      { status: 500 }
    );
  }
}
```

---

### TASK 7.3 — Create /lib/github.ts Helper (Optional Extraction)

```
task_id: 7.3
task_completed: false
department: API
depends_on: 7.2
file: /lib/github.ts
```

**What this does:**
If the GitHub fetch logic grows (e.g. fetching pinned repos in a future phase),
extract the fetch call into `/lib/github.ts` to keep route handlers thin.

For v1, this is optional — the logic can stay inline in `route.ts`.
Mark as complete if you decide to keep it inline and don't extract it.

```ts
// /lib/github.ts — future home of GitHub API helpers
// Currently empty — logic lives in /app/api/github-status/route.ts
// Move here if reuse is needed across multiple routes.

export {};
```

---

## 🔑 Environment Variables Setup

Before testing, ensure `.env.local` exists at project root with:

```env
# Supabase connection string (from Supabase dashboard → Settings → Database → URI)
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres"

# GitHub (replace with your actual username and a PAT with read:public_repo)
GITHUB_USERNAME="REPLACE_YOUR_GITHUB_USERNAME"
GITHUB_TOKEN="ghp_REPLACE_YOUR_TOKEN"
```

**How to generate a GitHub Personal Access Token:**
1. Go to `github.com → Settings → Developer Settings → Personal Access Tokens → Tokens (classic)`
2. Click "Generate new token (classic)"
3. Select scope: `public_repo` (read-only is enough)
4. Copy the token → paste into `.env.local`

---

## 🔍 Phase 7 Completion Checklist

- [ ] `.env.local` exists with `DATABASE_URL`, `GITHUB_USERNAME`, `GITHUB_TOKEN`
- [ ] `POST /api/contact` with valid data returns `{ ok: true }`
- [ ] `POST /api/contact` with bad email returns `{ ok: false, error: "..." }` (status 400)
- [ ] A new row appears in the Supabase `contacts` table after a successful POST
- [ ] `GET /api/github-status` returns JSON with `repo`, `message`, `time_ago`, `url`
- [ ] The `time_ago` field reflects the real time since your last push
- [ ] `NebuchadnezzarStatus.tsx` `USE_MOCK` is set to `false` and live data loads
- [ ] Terminal Contact Form successfully submits and shows "✓ SIGNAL RECEIVED" state
- [ ] No secrets (tokens, DB URL) appear in client-side code or console logs

---

## ➡️ Next Phase

Once all tasks above are `task_completed: true` →
All phases are complete. See `MASTER.md` for the v1 completion summary.

> If Phase 8 is not yet done, complete it first — this phase depends on the DB being live.

---

*Phase: 7 | Department: API | Last updated: 2026-05-21*
