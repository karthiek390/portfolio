# Graph Report - portfolio  (2026-05-26)

## Corpus Check
- 40 files · ~23,268 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 402 nodes · 422 edges · 46 communities (38 shown, 8 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 12 edges (avg confidence: 0.82)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `fbeb5ae5`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- [[_COMMUNITY_Agent Skills Metadata|Agent Skills Metadata]]
- [[_COMMUNITY_Core Layout & Context|Core Layout & Context]]
- [[_COMMUNITY_Design System Script|Design System Script]]
- [[_COMMUNITY_TypeScript Configuration|TypeScript Configuration]]
- [[_COMMUNITY_BM25 Search Core|BM25 Search Core]]
- [[_COMMUNITY_NPM Config & Scripts|NPM Config & Scripts]]
- [[_COMMUNITY_Design System Generator|Design System Generator]]
- [[_COMMUNITY_Matrix Theme Concepts|Matrix Theme Concepts]]
- [[_COMMUNITY_NPM Dependencies|NPM Dependencies]]
- [[_COMMUNITY_Contact API & DB|Contact API & DB]]
- [[_COMMUNITY_Routing & Pill State|Routing & Pill State]]
- [[_COMMUNITY_Stats Skill Metadata|Stats Skill Metadata]]
- [[_COMMUNITY_Portfolio Certifications|Portfolio Certifications]]
- [[_COMMUNITY_Middleware Logic|Middleware Logic]]
- [[_COMMUNITY_Portfolio Projects|Portfolio Projects]]
- [[_COMMUNITY_Glitch Effect|Glitch Effect]]
- [[_COMMUNITY_Github API Route|Github API Route]]
- [[_COMMUNITY_Pill Choice API|Pill Choice API]]
- [[_COMMUNITY_Construct Transition|Construct Transition]]
- [[_COMMUNITY_Slack Integration|Slack Integration]]
- [[_COMMUNITY_Next.js Configuration|Next.js Configuration]]
- [[_COMMUNITY_UI UX Pro Max Skill|UI UX Pro Max Skill]]
- [[_COMMUNITY_Community 35|Community 35]]
- [[_COMMUNITY_Community 36|Community 36]]
- [[_COMMUNITY_Community 37|Community 37]]
- [[_COMMUNITY_Community 38|Community 38]]
- [[_COMMUNITY_Community 39|Community 39]]

## God Nodes (most connected - your core abstractions)
1. `Priority Order` - 18 edges
2. `compilerOptions` - 16 edges
3. `str` - 16 edges
4. `APP UI Vibe Manifest` - 15 edges
5. `DesignSystemGenerator` - 11 edges
6. `_search_csv()` - 9 edges
7. `generate_design_system()` - 9 edges
8. `ui-ux-pro-max` - 9 edges
9. `skills` - 8 edges
10. `Red mode interactions` - 8 edges

## Surprising Connections (you probably didn't know these)
- `Karthiek Duggirala` --conceptually_related_to--> `AWS Certified Solutions Architect`  [EXTRACTED]
  skills.md → Certifications/AWS Certified Solutions Architect.pdf
- `Karthiek Duggirala` --conceptually_related_to--> `NVIDIA Certified Associate GenerativeAI LLMs`  [EXTRACTED]
  skills.md → Certifications/NVIDIA Certified Associate GenerativeAI LLMs.pdf
- `LandingPage()` --calls--> `usePill()`  [EXTRACTED]
  app/page.tsx → context/PillContext.tsx
- `Middleware` --conceptually_related_to--> `Landing Page`  [INFERRED]
  middleware.ts → app/page.tsx
- `_search_csv()` --calls--> `str`  [INFERRED]
  .agent/skills/ui-ux-pro-max/scripts/core.py → .agent/skills/ui-ux-pro-max/scripts/design_system.py

## Hyperedges (group relationships)
- **Pill Mode Flow** — middleware, root_layout, landing_page, portfolio_page [INFERRED 0.90]
- **Pill Mode Architecture** — pill_context_tsx, concept_blue_pill, concept_red_pill [EXTRACTED 0.95]
- **Karthiek Portfolio Projects** — karthiek_duggirala, dicom_local_viewer, cicd_stats_watcher, tic_tac_toe [EXTRACTED 1.00]

## Communities (46 total, 8 thin omitted)

### Community 0 - "Agent Skills Metadata"
Cohesion: 0.05
Nodes (37): computedHash, skillPath, source, sourceType, computedHash, skillPath, source, sourceType (+29 more)

### Community 1 - "Core Layout & Context"
Cohesion: 0.10
Nodes (19): geist, inter, jetbrainsMono, metadata, readInitialMode(), RootLayout(), LandingPage(), PillButtonProps (+11 more)

### Community 2 - "Design System Script"
Cohesion: 0.09
Nodes (29): bool, DesignSystemGenerator, _detect_page_type(), format_ascii_box(), format_markdown(), format_master_md(), format_page_override_md(), generate_design_system() (+21 more)

### Community 3 - "TypeScript Configuration"
Cohesion: 0.10
Nodes (19): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+11 more)

### Community 4 - "BM25 Search Core"
Cohesion: 0.15
Nodes (15): BM25, detect_domain(), _load_csv(), Lowercase, split, remove punctuation, filter short words, Build BM25 index from documents, Score all documents against query, Load CSV and return list of dicts, Core search function using BM25 (+7 more)

### Community 5 - "NPM Config & Scripts"
Cohesion: 0.11
Nodes (18): devDependencies, eslint, eslint-config-next, prisma, tailwindcss, @tailwindcss/postcss, @types/node, @types/react (+10 more)

### Community 6 - "Design System Generator"
Cohesion: 0.06
Nodes (31): Accessibility, Available Domains, Available Stacks, code:bash (python3 --version || python --version), code:bash (python3 skills/ui-ux-pro-max/scripts/search.py "beauty spa w), code:bash (# Get UX guidelines for animation and accessibility), code:bash (python3 skills/ui-ux-pro-max/scripts/search.py "layout respo), code:bash (# ASCII box (default) - best for terminal display) (+23 more)

### Community 8 - "NPM Dependencies"
Cohesion: 0.12
Nodes (16): dependencies, @base-ui/react, class-variance-authority, clsx, framer-motion, gsap, @gsap/react, lucide-react (+8 more)

### Community 9 - "Contact API & DB"
Cohesion: 0.40
Nodes (3): POST(), sendSlackAlert(), globalForPrisma

### Community 10 - "Routing & Pill State"
Cohesion: 0.40
Nodes (5): pill_mode Cookie, Landing Page, Middleware, Portfolio Page, Root Layout

### Community 11 - "Stats Skill Metadata"
Cohesion: 0.06
Nodes (32): `/`, 1. Pill selection flow, 2. Portfolio mode switch flow, 3. Contact form flow, 4. GitHub status flow, Amendment 2026-05-24: Blue Contact Section Added, Amendment 2026-05-24: Blue Hero Deja Vu A/B Pass, API Surface (+24 more)

### Community 12 - "Portfolio Certifications"
Cohesion: 0.40
Nodes (4): AWS Certified Solutions Architect, Karthiek Duggirala, NVIDIA Certified Associate GenerativeAI LLMs, code:txt (SKILLS:)

### Community 13 - "Middleware Logic"
Cohesion: 0.67
Nodes (3): config, hasPillChoice(), middleware()

### Community 14 - "Portfolio Projects"
Cohesion: 0.50
Nodes (3): Cicd-stats-watcher, Dicom-local-viewer, Tic-tac-toe

### Community 35 - "Community 35"
Cohesion: 0.09
Nodes (22): 10. Liquid mirror transition, 11. Keymaker hidden project unlock, 12. Audio-reactive environmental layer, 13. Public traffic dashboard / Mainframe Traffic Monitor, 14. Interactive live visitor log / Operator console, 15. Architect's Room analytics wall, 16. Matrix webcam filter / cascading-face monitor, 17. Bullet-time 3D freeze section (+14 more)

### Community 36 - "Community 36"
Cohesion: 0.09
Nodes (21): aliases, components, hooks, lib, ui, utils, iconLibrary, menuAccent (+13 more)

### Community 37 - "Community 37"
Cohesion: 0.10
Nodes (20): 404 page, Blue mode interactions, `#blue-pill-btn`, Hero CTA: `#hero-github-btn`, Hero CTA: `#hero-linkedin-btn`, Hero CTAs, Interactive Inventory, Landing page interactions (+12 more)

### Community 38 - "Community 38"
Cohesion: 0.17
Nodes (12): code:bash (python3 skills/ui-ux-pro-max/scripts/search.py "<keyword>" -), code:bash (python3 skills/ui-ux-pro-max/scripts/search.py "<product_typ), code:bash (python3 skills/ui-ux-pro-max/scripts/search.py "beauty spa w), code:bash (python3 skills/ui-ux-pro-max/scripts/search.py "<query>" --d), code:bash (python3 skills/ui-ux-pro-max/scripts/search.py "<query>" --d), code:bash (python3 skills/ui-ux-pro-max/scripts/search.py "<keyword>" -), How to Use This Skill, Step 1: Analyze User Requirements (+4 more)

### Community 39 - "Community 39"
Cohesion: 0.29
Nodes (7): API runtime probes, code:json ({ "error": "Method not allowed." }), Guarded portfolio route `/portfolio`, Local Verification Notes, Pill cookie persistence, Portfolio content probe, Root route `/`

## Knowledge Gaps
- **209 isolated node(s):** `$schema`, `style`, `rsc`, `tsx`, `config` (+204 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **8 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `APP UI Vibe Manifest` connect `Stats Skill Metadata` to `Community 39`, `Community 37`, `Matrix Theme Concepts`?**
  _High betweenness centrality (0.024) - this node is a cross-community bridge._
- **Why does `Interactive Inventory` connect `Community 37` to `Stats Skill Metadata`?**
  _High betweenness centrality (0.013) - this node is a cross-community bridge._
- **Why does `str` connect `Design System Script` to `BM25 Search Core`?**
  _High betweenness centrality (0.011) - this node is a cross-community bridge._
- **Are the 3 inferred relationships involving `str` (e.g. with `.tokenize()` and `_search_csv()`) actually correct?**
  _`str` has 3 INFERRED edges - model-reasoned connections that need verification._
- **What connects `$schema`, `style`, `rsc` to the rest of the system?**
  _240 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Agent Skills Metadata` be split into smaller, more focused modules?**
  _Cohesion score 0.05263157894736842 - nodes in this community are weakly interconnected._
- **Should `Core Layout & Context` be split into smaller, more focused modules?**
  _Cohesion score 0.0989247311827957 - nodes in this community are weakly interconnected._