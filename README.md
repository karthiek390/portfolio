# Matrix Portfolio

A cinematic portfolio experience built as a world, not just a website.

This project starts like a choice-driven narrative and slowly reveals itself as a layered system of interfaces, clues, easter eggs, hidden rooms, and operator-facing telemetry. The goal was never to make a standard portfolio with sections stacked on a page. The goal was to make the visitor feel like they had entered a signal.

## Core Premise

The portfolio is structured around two parallel realities:

- `Blue Pill`: a cleaner, polished presentation layer for a more familiar portfolio journey
- `Red Pill`: an interactive Matrix-inspired route with narrative framing, console energy, hidden prompts, audio texture, and deeper system behavior

That split is not just visual. It changes how the site introduces identity, projects, motion, and discovery.

## What Makes It Different

- The landing page is designed like a decision point, not a homepage.
- The experience uses lore, tension, and hidden hints instead of exposing every destination up front.
- Sections and labels are written to feel like transmissions, prompts, or system messages rather than generic UI copy.
- The portfolio includes spaces that feel like unlocked layers of the same world, including the `Architect Room` and the `Operator Dashboard`
- Interaction data is not an afterthought; it feeds into the fiction of the project by making the system feel observed, reactive, and alive.

## Hidden Cues and Discoverable Spaces

The site intentionally leaves signals for curious visitors. Instead of presenting everything plainly, it suggests deeper routes through phrases and interface moments such as:

- `See through the code`
- `SND`
- `Architect Room`
- `Operator Dashboard`
- operator-style prompts, anomalies, and system language across the experience

These cues are meant to reward attention. The more closely someone reads the interface, the more the portfolio opens up.

## Matrix References Recreated

The portfolio borrows specific ideas, symbols, and interaction patterns from the world of *The Matrix*, then adapts them into portfolio mechanics instead of using them as surface-level decoration.

- `Choice / pill selection`
  The landing page at `/` opens with "This is your last chance" and a literal red-pill / blue-pill decision. That choice sets the tone for the entire experience and controls which reality the visitor enters.

- `Matrix rain`
  The homepage uses full-screen Matrix rain as the first visual signal, and the red-pill experience reuses gutter rain to make the world feel continuously active rather than page-like.

- `Deja vu / black cat`
  The blue-pill hero includes a recurring "Déjà vu?" anomaly frame using cat and Matrix-themed assets. It acts as the polite version of a glitch in the system.

- `Follow the white rabbit`
  On the red-pill route, the `KnockKnockTerminal` section types out "Wake up", "The Matrix has you", and "Follow the white rabbit", then reveals a rabbit prompt that points the visitor deeper into the experience.

- `Zion`
  Zion is used as the fictional source of truth throughout the site: `Zion Mainframe`, `Zion uplink`, contact transmissions to Zion, and analytics framed as signals reaching the resistance.

- `HOVERCRAFT: NEBUCHADNEZZAR`
  The red route includes a dedicated diagnostics section that presents GitHub activity as live hovercraft telemetry, with status rows like `CURRENT_LOCATION`, `ACTIVE_CONSTRUCT`, and `LAST_SYSTEM_UPDATE`.

- `The Oracle`
  The red skills section reframes the tech stack as "Loaded Programs" inside the `ORACLE_KITCHEN`. Clicking nodes reveals Oracle-flavored responses and the line, "You've already made the choice..."

- `The Keymaker`
  In the red projects section, typing `zion` unlocks a hidden project card. That turns the project list into a discovery puzzle rather than a static grid.

- `See Through the Code`
  The red camera section turns the visitor's webcam into Matrix-style character rendering. It feels like entering a simulation rather than opening a camera widget.

- `Phone booth disconnect / hardline exit`
  The red navbar includes a `DISCONNECT` control with phone-ring audio and a stylized exit sequence, echoing the phone-based escape mechanics from the films.

- `The Architect`
  `/architect` becomes a full Architect Room instead of a normal page: a 360-degree cylindrical wall of monitors, a white door at the origin point, simulation controls, and a controlled black-and-green visual field.

- `Operator consoles and machine telemetry`
  `/mainframe` turns visitor behavior into operator-visible intelligence. Live event streams, pill-choice ratios, signal origins, and activity charts are presented like a control deck rather than analytics software.

- `Agent Smith`
  The `404` page becomes an Agent Smith takeover screen. Missing routes are treated like anomalies in the system rather than generic not-found pages.

## Where to Find Them

- `/`
  `Choice panel`, `red pill / blue pill`, `This is your last chance`, `Matrix rain`, `See how deep the code goes`

- `/portfolio` red mode
  `Wake up`, `The Matrix has you`, `Follow the white rabbit`, `Zion Mainframe`, `SND`, `DISCONNECT`, `Extracted Projects`, `KEYMAKER_LOCKED`, `ORACLE_KITCHEN`, `Loaded Programs`, `HOVERCRAFT: NEBUCHADNEZZAR`, `See Through the Code`, `MORPHEUS_INTERROGATION_PROTOCOL`, `ANALYTICS_DASHBOARD`

- `/portfolio` blue mode
  the more polished counterpart to the red-pill path, but still seeded with `Déjà vu?` anomalies and black-cat references in the hero

- `/mainframe`
  `Operator Dashboard`, `LIVE_OPERATOR_CONSOLE`, `PILL_CHOICE_MATRIX`, `SIGNAL_ORIGIN`, `Connecting to Zion uplink`, `ARCHITECT'S ROOM`

- `/architect`
  `THE ARCHITECT'S ROOM`, `ENTER_SIMULATION`, 360-degree monitor cylinder, white door origin, simulation camera takeover

- `/404`
  `Agent Smith` anomaly screen with a breach message and a return-to-mainframe action
  
## Design Direction

This project was built to feel crafted, atmospheric, and unusually deliberate.

- The visual language leans into contrast between polished product design and cinematic system fiction
- Motion is used to create reveal, suspense, and pacing rather than just decoration
- Typography, glow, grid treatments, console styling, and color modes all reinforce the red-pill / blue-pill narrative split
- Audio, transitions, and ambient interface elements are used to make the site feel inhabited
- The pages are designed to suggest that significant care went into the details, not just the final screenshots

The intention was to make people pause and think, "this is clearly a portfolio, but it is behaving like a story-driven interface."

## Technical Implementation

The project is built with:

- Next.js 16
- React 19
- TypeScript
- Framer Motion
- Prisma
- PostgreSQL via Supabase
- Deployed on Vercel

Under the surface, the app combines presentation with system behavior:

- API routes power contact capture, interaction tracking, GitHub activity status, preferences, and dashboard stats
- Prisma-backed models store portfolio interactions such as pageviews, operator events, skill clicks, and user preferences
- The mainframe-style dashboard turns portfolio traffic into part of the overall fiction
- GitHub status and live data integrations help the portfolio feel current rather than static
- Live experience: https://matrixportfolio-beta.vercel.app/

## Experience Map

- `/` - the choice point, where the experience begins
- `/portfolio` - the immersive portfolio route
- `/architect` - the Architect Room
- `/mainframe` - the operator-facing dashboard layer

## Project Structure

```text
app/           App routes, layouts, and API endpoints
components/    Blue pill, red pill, mainframe, and shared UI systems
context/       Mode and experience state management
lib/           Prisma access, analytics logic, helpers, and integrations
prisma/        Data models for the interactive portfolio systems
public/        Media, certificates, audio, and visual assets
transitions/   Shared transition and reveal components
```

## Why It Was Built This Way

A lot of portfolios communicate skill by listing technologies. This one tries to communicate skill through execution choices.

It uses narrative framing, multi-mode interaction design, data-backed hidden layers, and cohesive worldbuilding to show not only what was built, but how thoughtfully it was shaped. The result is a portfolio that aims to be remembered as an experience first and a resume second.

## Author

Karthiek Duggirala
