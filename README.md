# Matrix Portfolio

A cinematic developer portfolio built with Next.js, React, TypeScript, and Prisma.

The project presents two parallel experiences:

- `Blue Pill`: a polished, modern portfolio experience
- `Red Pill`: a Matrix-inspired interactive mode with hidden flows, operator prompts, and analytics-driven UI moments

It also includes:

- an `Architect` room experience
- a `Mainframe` operator dashboard
- contact capture with optional Slack alerts
- GitHub activity status
- recruiter/operator interaction analytics

## Routes

- `/` - landing and pill selection
- `/portfolio` - red pill experience
- `/architect` - Architect room
- `/mainframe` - operator dashboard

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Framer Motion
- Prisma
- PostgreSQL

## Key Features

- Dual-mode portfolio storytelling
- Scroll-based section navigation
- Interactive projects, skills, certificates, and contact flows
- Matrix-style operator prompts and local persistence for discovery states
- Mainframe analytics dashboard backed by Prisma
- Slack webhook integration for contact submissions
- GitHub public activity status widget

## Project Structure

```text
app/           Next.js app routes and API endpoints
components/    Blue pill, red pill, mainframe, and shared UI components
lib/           Analytics, preferences, Prisma, and helper utilities
prisma/        Prisma schema
public/        Static media, PDFs, audio, and image assets
transitions/   Shared visual transition components
```

## Environment Variables

Create a `.env.local` file with:

```env
DATABASE_URL=
GITHUB_USERNAME=
GITHUB_TOKEN=
SLACK_WEBHOOK_URL=
```

Notes:

- `DATABASE_URL` is required for Prisma-backed APIs and analytics
- `GITHUB_TOKEN` is optional, but helps avoid GitHub API rate limits
- `SLACK_WEBHOOK_URL` is optional; if omitted, contact submissions still save to the database

## Local Development

Install dependencies:

```bash
npm install
```

Generate the Prisma client:

```bash
npx prisma generate
```

Push the Prisma schema to your database:

```bash
npx prisma db push
```

Start the dev server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Start the production server:

```bash
npm run start
```

## Analytics and Data

The app stores:

- contact form submissions
- page views
- operator events
- skill interactions
- user preferences such as audio toggle state

These models live in `prisma/schema.prisma`.

## API Endpoints

- `POST /api/contact`
- `GET /api/github-status`
- `GET, POST /api/operator-events`
- `POST /api/pageview`
- `POST /api/pill-choice`
- `GET, POST /api/preferences`
- `POST /api/skill-click`
- `GET /api/architect-dashboard`

## Author

Karthiek Duggirala

