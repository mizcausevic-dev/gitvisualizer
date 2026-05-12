# GitVisualizer

> Premium GitHub profile intelligence — visualize any developer's portfolio in one stunning, recruiter-grade page.

[![CI](https://github.com/mizcausevic-dev/gitvisualizer/actions/workflows/ci.yml/badge.svg)](https://github.com/mizcausevic-dev/gitvisualizer/actions/workflows/ci.yml)
[![License: AGPL v3](https://img.shields.io/badge/License-AGPL_v3-66FCF1.svg)](https://www.gnu.org/licenses/agpl-3.0)
[![React](https://img.shields.io/badge/React-19-66FCF1.svg)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-66FCF1.svg)](https://www.typescriptlang.org/)

Type any GitHub username — see their entire engineering story laid out as a single visual brief: language radar, activity pulse, domain expertise, project maturity, structured-data SEO snapshot, and a sortable repo grid.

Built for **recruiters**, **hiring managers**, **engineers presenting their work**, and **anyone who wants to read a profile in 30 seconds instead of 30 minutes**.

---

## Features

- **Profile intelligence at a glance** — KPI summary derived from public repo data
- **Capability matrix** — radar chart of language proficiency
- **Activity pulse** — 12-month commit/update timeline
- **Domain expertise cloud** — top topics across the portfolio
- **Innovation index** — modern-stack and AI-related repo signals
- **Lifecycle maturity** — production / beta / R&D classification
- **Health heatmap** — 24-week update density
- **Featured projects** — top 3 by stars, presented as case studies
- **JSON-LD schema** — embedded `<script type="application/ld+json">` for AI crawlers and search engines
- **URL-shareable** — every profile page is a permalink (`/?user=username`)
- **BERT-themed dark mode** — IBM Plex typography, cyan + amber accents
- **Mobile-responsive** — works on phones and tablets
- **Print-friendly** — Cmd/Ctrl+P produces a clean PDF

---

## Live demo

[**gitvisualizer.kineticgain.com**](https://gitvisualizer.kineticgain.com) *(deployment in progress)*

---

## Quick start

```bash
git clone https://github.com/mizcausevic-dev/gitvisualizer.git
cd gitvisualizer
npm install
npm run dev
```

Open http://localhost:3000 — the app loads with the default profile. Type any GitHub username in the search bar to load a different one.

### Build for production

```bash
npm run build      # tsc + vite build → dist/
npm run preview    # serve the dist/ folder locally to test
```

### Lint

```bash
npm run lint       # tsc --noEmit (type-check without emitting)
```

---

## How it works

GitVisualizer is a **client-only React + TypeScript SPA** that:

1. Reads the GitHub username from the URL `?user=` parameter (defaults to `mizcausevic-dev`)
2. Fetches `GET /users/:username` and `GET /users/:username/repos?sort=updated&per_page=100` from the public GitHub API
3. Computes derived metrics in-browser (innovation index, lifecycle maturity, domain expertise, etc.)
4. Renders the visualization with Recharts + Motion + custom SVG

**No backend. No database. No auth.** Phase 1 is intentionally simple.

### Rate limit caveat

The public GitHub API allows **60 requests per hour for unauthenticated callers** (per IP). Each profile load uses 2 requests. Phase 2 introduces a backend proxy with KV caching to lift this to 5,000+ req/hr — see roadmap below.

---

## Stack

| Layer | Tech |
|---|---|
| Framework | React 19 + Vite 6 |
| Language | TypeScript 5.8 |
| Styling | Tailwind 4 (CSS variable theme) |
| Animations | Motion (framer-motion successor) |
| Charts | Recharts |
| Icons | Lucide React |
| Fonts | IBM Plex Sans / Mono / Serif |

---

## Theme

GitVisualizer uses the **BERT theme** — a dark editorial palette designed for technical content:

| Token | Hex | Use |
|---|---|---|
| `--color-bg` | `#0B0C10` | Page background |
| `--color-surface` | `#14161C` | Card backgrounds |
| `--color-accent` | `#66FCF1` | Primary accent (cyan) |
| `--color-accent-2` | `#45A29E` | Secondary accent (teal) |
| `--color-warm` | `#FBBF24` | Highlight / warning (amber) |
| `--color-text` | `#C5C6C7` | Primary text |

Theme tokens live in `src/index.css` under the `@theme` block. Override there to customize the palette.

---

## Roadmap

### Phase 1 — *Shipped*
- [x] BERT theme + IBM Plex typography
- [x] Username search + URL parameter sync
- [x] Rate-limit-aware error handling
- [x] Loading skeletons
- [x] Dynamic JSON-LD schema for any user
- [x] Generic contact panel (works for any profile)
- [x] AGPL-3.0 license

### Phase 2 — *Next*
- [ ] Backend proxy (Cloudflare Workers / Vercel Functions) with authenticated GitHub calls
- [ ] KV caching layer (Upstash Redis or Cloudflare KV)
- [ ] AI-powered profile insights (Gemini integration)
- [ ] Profile comparison mode (two users side-by-side)
- [ ] Embeddable widget mode (`<iframe>` for personal sites)

### Phase 3 — *Product*
- [ ] Pricing tiers (Free / Pro / Team)
- [ ] Stripe integration
- [ ] Account system + saved searches
- [ ] Recruiter portal (multi-profile comparison + notes)

---

## License

**AGPL-3.0-only**. See [LICENSE](LICENSE) for the full text.

The AGPL means: you can fork, modify, and self-host this — but if you run a modified version as a service, you must publish your source. This protects the project's monetization runway while keeping it genuinely open-source for individuals.

For commercial licensing inquiries (closed-source forks, white-label deployments), contact: **miz@kineticgain.com**

---

## Author

**Miz Causevic** — Director of Web Engineering · Platform Architecture
[mizcausevic-dev.github.io](https://mizcausevic-dev.github.io/) · [github.com/mizcausevic-dev](https://github.com/mizcausevic-dev)

---

<sub>Built with React, Recharts, Motion, and entirely too much black coffee. ☕</sub>

---

**Connect:** [LinkedIn](https://www.linkedin.com/in/mirzacausevic/) · [Kinetic Gain](https://kineticgain.com) · [Medium](https://medium.com/@mizcausevic/) · [Skills](https://mizcausevic.com/skills/)
