# 🗄️ PHASE 8 — Database (Supabase + Prisma)

> **Read `MASTER.md` before this file.**
> This phase sets up the Supabase PostgreSQL database and Prisma ORM.
> This phase should be done BEFORE Phase 7 (API routes need the schema to exist).
> Phase 8 and Phase 6 UI can run in parallel.

---

## 📋 Phase Metadata

| Field          | Value                                              |
|----------------|----------------------------------------------------|
| Phase          | 8                                                  |
| Department     | DB                                                 |
| Depends On     | Phase 0 complete (Prisma installed in Task 0.1)    |
| Blocks         | Phase 7 (API routes write to these tables)         |
| Estimated Work | ~1.5 hours                                         |
| Phase Status   | ⏳ Not Started                                      |

---

## 🧠 Context for the AI/Developer

### Stack
- **Database:** Supabase (managed PostgreSQL — free tier)
- **ORM:** Prisma (installed in Phase 0 via `npm install prisma @prisma/client`)
- **Schema file:** `/prisma/schema.prisma`
- **Client singleton:** `/lib/prisma.ts`

### Tables in v1
| Table       | Purpose                              |
|-------------|--------------------------------------|
| `contacts`  | Stores terminal contact form submissions |
| `pageviews` | Reserved for future analytics (created now, unused in v1) |

### How Prisma connects to Supabase
Prisma reads `DATABASE_URL` from `.env.local` and connects directly to
the Supabase PostgreSQL instance. No Supabase JS client is needed —
Prisma handles all queries.

---

## ✅ Tasks

---

### TASK 8.1 — Create Supabase Project

```
task_id: 8.1
task_completed: false
department: DB
depends_on: Nothing
```

**Steps:**

1. Go to `https://supabase.com` and sign in (or create a free account)
2. Click **"New Project"**
3. Fill in:
   - **Name:** `matrix-portfolio`
   - **Database Password:** Generate a strong password — **save it somewhere safe**
   - **Region:** Choose closest to your location
4. Click **"Create new project"** — wait ~2 minutes for provisioning
5. Once ready, go to: **Project Settings → Database → Connection string → URI**
6. Copy the connection string — it looks like:
   ```
   postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres
   ```
7. Paste it into `.env.local` as `DATABASE_URL`:
   ```env
   DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres"
   ```

> ⚠️ Replace `[YOUR-PASSWORD]` with the actual password you set.
> The `[PROJECT-REF]` is a unique string (e.g. `abcdefghijklmn`).

---

### TASK 8.2 — Write Prisma Schema

```
task_id: 8.2
task_completed: false
department: DB
depends_on: 8.1
file: /prisma/schema.prisma
```

**Replace the contents of `/prisma/schema.prisma` with:**

```prisma
// This is your Prisma schema file for the Matrix Portfolio v1.
// Learn more about it in the docs: https://pris.ly/d/prisma-schema

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// ── contacts ─────────────────────────────────────────────────
// Stores all submissions from the Terminal Contact Form.
// Written by: POST /api/contact
// Read by: Supabase dashboard (manual review — no admin UI in v1)

model Contact {
  id        Int      @id @default(autoincrement())
  company   String
  email     String
  message   String
  createdAt DateTime @default(now())

  @@map("contacts")
}

// ── pageviews ─────────────────────────────────────────────────
// Reserved for future analytics (v2 feature).
// Created now so the table exists when analytics is added.
// NOT written to in v1.

model Pageview {
  id        Int      @id @default(autoincrement())
  page      String                        // e.g. "/portfolio", "/"
  device    String?                       // e.g. "Mobile", "Desktop"
  country   String?                       // Anonymized location
  createdAt DateTime @default(now())

  @@map("pageviews")
}
```

---

### TASK 8.3 — Run Prisma Migration

```
task_id: 8.3
task_completed: false
department: DB
depends_on: 8.1, 8.2
```

**Run these commands in order from the project root:**

**Step 1 — Initialize Prisma (only if `/prisma/schema.prisma` doesn't exist yet):**
```bash
npx prisma init
```
> Skip this if `/prisma/schema.prisma` already exists from Task 8.2.

**Step 2 — Push the schema to Supabase:**
```bash
npx prisma db push
```
This command:
- Reads `DATABASE_URL` from `.env.local`
- Connects to your Supabase PostgreSQL instance
- Creates the `contacts` and `pageviews` tables directly
- Does NOT create migration files (faster for initial setup)

> ✅ Expected output:
> ```
> Environment variables loaded from .env.local
> Prisma schema loaded from prisma/schema.prisma
> The database is now in sync with your Prisma schema.
> ```

**Step 3 — Generate the Prisma client:**
```bash
npx prisma generate
```
This generates the TypeScript types used by `@/lib/prisma.ts`.
Must be re-run whenever `schema.prisma` changes.

**Step 4 — Verify in Supabase dashboard:**
- Go to your Supabase project → **Table Editor**
- You should see `contacts` and `pageviews` tables listed
- Both should be empty (no rows yet)

---

### TASK 8.4 — Create Prisma Client Singleton

```
task_id: 8.4
task_completed: false
department: DB
depends_on: 8.3
file: /lib/prisma.ts
```

**Why a singleton?**
Next.js in development mode hot-reloads modules frequently.
Without a singleton, a new Prisma client is instantiated on every reload,
eventually exhausting the database connection pool.
This pattern stores the client on the `global` object in development only.

```ts
import { PrismaClient } from "@prisma/client";

// Prevent multiple instances of Prisma Client in development
// due to Next.js hot reloading.
const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development"
      ? ["query", "error", "warn"]
      : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
```

**How API routes import it:**
```ts
import { prisma } from "@/lib/prisma";

// Example usage in a route handler:
await prisma.contact.create({ data: { ... } });
await prisma.pageview.findMany();
```

---

## 🔍 Phase 8 Completion Checklist

- [ ] Supabase project is created and accessible at `supabase.com/dashboard`
- [ ] `DATABASE_URL` is in `.env.local` with the correct connection string
- [ ] `/prisma/schema.prisma` contains `Contact` and `Pageview` models
- [ ] `npx prisma db push` ran successfully with no errors
- [ ] `npx prisma generate` ran successfully
- [ ] `contacts` table visible in Supabase Table Editor
- [ ] `pageviews` table visible in Supabase Table Editor
- [ ] `/lib/prisma.ts` exports the `prisma` singleton
- [ ] No TypeScript errors when importing `prisma` in a test file
- [ ] Supabase project password is saved securely (not in any committed file)

---

## 🔗 Handoff to Phase 7

After this phase is complete, notify the **API AI** (Phase 7) that:
1. The `contacts` table is live and accepts: `{ company: String, email: String, message: String }`
2. The Prisma client is at `@/lib/prisma` — import as `{ prisma }`
3. The model name in Prisma is `Contact` (maps to `contacts` table) — use `prisma.contact.create()`
4. `DATABASE_URL` is configured in `.env.local`

---

## 📋 Complete v1 Phase Summary

Now that all phase files exist, here is the recommended execution order:

```
Phase 0  → Setup (foundation — do first, blocks everything)
    │
    ├── Phase 1  → Landing Page
    ├── Phase 2  → Blue Pill UI
    │       └── Phase 3  → Red Pill UI
    │               └── Phase 4  → Effects & Transitions
    │                       └── Phase 5  → Terminal Form + 404
    │                               └── Phase 6  → Nebuchadnezzar UI
    │
    └── Phase 8  → Database (can start after Phase 0)
            └── Phase 7  → API routes (needs Phase 8 schema)
                    └── Phase 6 wiring: set USE_MOCK = false
```

> UI phases (1–6) and DB/API phases (7–8) can run in parallel
> after Phase 0 is complete. Different AIs can own each track.

---

*Phase: 8 | Department: DB | Last updated: 2026-05-21*
