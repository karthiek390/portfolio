# Graph Report - .  (2026-05-26)

## Corpus Check
- Corpus is ~21,881 words - fits in a single context window. You may not need a graph.

## Summary
- 233 nodes · 257 edges · 35 communities (27 shown, 8 thin omitted)
- Extraction: 95% EXTRACTED · 5% INFERRED · 0% AMBIGUOUS · INFERRED: 12 edges (avg confidence: 0.82)
- Token cost: 0 input · 0 output

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

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 16 edges
2. `str` - 16 edges
3. `DesignSystemGenerator` - 11 edges
4. `_search_csv()` - 9 edges
5. `generate_design_system()` - 9 edges
6. `skills` - 8 edges
7. `BM25` - 7 edges
8. `search()` - 7 edges
9. `persist_design_system()` - 6 edges
10. `_generate_intelligent_overrides()` - 6 edges

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

## Communities (35 total, 8 thin omitted)

### Community 0 - "Agent Skills Metadata"
Cohesion: 0.06
Nodes (32): computedHash, skillPath, source, sourceType, computedHash, skillPath, source, sourceType (+24 more)

### Community 1 - "Core Layout & Context"
Cohesion: 0.12
Nodes (15): inter, jetbrainsMono, metadata, readInitialMode(), RootLayout(), LandingPage(), PillButtonProps, PillContext (+7 more)

### Community 2 - "Design System Script"
Cohesion: 0.15
Nodes (20): bool, _detect_page_type(), format_ascii_box(), format_markdown(), format_master_md(), format_page_override_md(), generate_design_system(), _generate_intelligent_overrides() (+12 more)

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
Cohesion: 0.16
Nodes (9): DesignSystemGenerator, Select best matching result based on priority keywords., Extract results list from search result dict., Generate complete design system recommendation., Generates design system recommendations from aggregated searches., Load reasoning rules from CSV., Execute searches across multiple domains., Find matching reasoning rule for a category. (+1 more)

### Community 8 - "NPM Dependencies"
Cohesion: 0.25
Nodes (8): dependencies, framer-motion, gsap, @gsap/react, next, @prisma/client, react, react-dom

### Community 9 - "Contact API & DB"
Cohesion: 0.40
Nodes (3): POST(), sendSlackAlert(), globalForPrisma

### Community 10 - "Routing & Pill State"
Cohesion: 0.40
Nodes (5): pill_mode Cookie, Landing Page, Middleware, Portfolio Page, Root Layout

### Community 11 - "Stats Skill Metadata"
Cohesion: 0.40
Nodes (5): computedHash, skillPath, source, sourceType, caveman-stats

### Community 12 - "Portfolio Certifications"
Cohesion: 0.50
Nodes (3): AWS Certified Solutions Architect, Karthiek Duggirala, NVIDIA Certified Associate GenerativeAI LLMs

### Community 13 - "Middleware Logic"
Cohesion: 0.67
Nodes (3): config, hasPillChoice(), middleware()

### Community 14 - "Portfolio Projects"
Cohesion: 0.50
Nodes (3): Cicd-stats-watcher, Dicom-local-viewer, Tic-tac-toe

## Knowledge Gaps
- **88 isolated node(s):** `config`, `nextConfig`, `name`, `version`, `private` (+83 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **8 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `str` connect `Design System Script` to `BM25 Search Core`, `Design System Generator`?**
  _High betweenness centrality (0.032) - this node is a cross-community bridge._
- **Why does `skills` connect `Agent Skills Metadata` to `Stats Skill Metadata`?**
  _High betweenness centrality (0.022) - this node is a cross-community bridge._
- **Why does `_search_csv()` connect `BM25 Search Core` to `Design System Script`?**
  _High betweenness centrality (0.016) - this node is a cross-community bridge._
- **Are the 3 inferred relationships involving `str` (e.g. with `.tokenize()` and `_search_csv()`) actually correct?**
  _`str` has 3 INFERRED edges - model-reasoned connections that need verification._
- **What connects `config`, `nextConfig`, `name` to the rest of the system?**
  _119 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Agent Skills Metadata` be split into smaller, more focused modules?**
  _Cohesion score 0.06060606060606061 - nodes in this community are weakly interconnected._
- **Should `Core Layout & Context` be split into smaller, more focused modules?**
  _Cohesion score 0.11666666666666667 - nodes in this community are weakly interconnected._