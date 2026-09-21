# sanjit-portfolio

Personal portfolio for Sanjit Dash — backend engineer working with Python, FastAPI, systems, and AI agents.

**Live:** [sanjit-dash.vercel.app](https://sanjit-dash.vercel.app)

---

## What's in here

A single-page site plus a small writing section:

- **Hero** — name, thesis, socials, and an animated pipeline that visualizes how a request becomes an action.
- **System Flow** — clickable breakdown of each layer: Request → FastAPI → Database → Agent → Tools → Automation.
- **Projects** — three shipped projects with live links, source links, and status badges.
- **Writing** — long-form posts on systems and agent architecture, rendered from MDX.
- **Contact** — email, GitHub, LinkedIn, X.

---

## Stack

| Layer      | Choice                                  |
| ---------- | --------------------------------------- |
| Framework  | Next.js 16 (App Router) · Turbopack     |
| Language   | TypeScript                              |
| Styling    | Tailwind CSS v4                         |
| Animation  | Framer Motion                           |
| Icons      | Lucide · custom SVG brand icons         |
| Content    | MDX (`next-mdx-remote` · `gray-matter`) |
| Theme      | `@teispace/next-themes`                 |
| Deployment | Vercel                                  |

---

## Project structure

```
sanjit-portfolio/
├── app/
│   ├── layout.tsx              Root layout, fonts, theme provider
│   ├── page.tsx                Home — assembles all sections
│   ├── globals.css             Tailwind + theme tokens
│   ├── icon.svg                Favicon
│   └── writing/
│       ├── page.tsx            /writing — index of all posts
│       └── [slug]/page.tsx     /writing/[slug] — individual post
├── components/
│   ├── Navbar.tsx              Sticky nav with active-section tracking
│   ├── ThemeToggle.tsx         Dark/light toggle
│   ├── Hero.tsx                Intro + socials
│   ├── HeroFlow.tsx            Animated pipeline (right of hero)
│   ├── SystemFlow.tsx          Clickable system-flow section
│   ├── Projects.tsx            Featured + secondary project cards
│   ├── Blogs.tsx               Writing section on home
│   ├── Contact.tsx             Contact panel + footer
│   └── BrandIcons.tsx          Custom GitHub / LinkedIn / X SVGs
├── content/
│   └── writing/
│       └── *.mdx               Blog posts — filename becomes the URL
├── lib/
│   ├── content.ts              Profile, projects, system-flow data
│   ├── writing.ts              MDX loader (getAllPostsMeta, getPost)
│   └── flowBus.ts              Cross-component event bus for hero → flow
├── public/
├── tailwind.config.ts
└── next.config.ts
```

---

## Running locally

```bash
npm install
npm run dev
```

Opens at `http://localhost:3000`.

To build for production:

```bash
npm run build
npm start
```

---

## Adding a writing post

1. Create a new `.mdx` file in `content/writing/`. The filename becomes the URL slug.

   ```
   content/writing/my-new-post.mdx  →  /writing/my-new-post
   ```

2. Start with frontmatter:

   ```mdx
   ---
   title: "Your Post Title"
   date: "2026-09-22"
   source: "Substack"
   sourceUrl: "https://..."
   tags: ["AI", "Systems"]
   summary: "One sentence that describes the post."
   ---

   Your content in Markdown goes here.
   ```

3. The home page's Writing section and the `/writing` index update automatically on the next build.

---

## How the hero animation works

`HeroFlow.tsx` renders six nodes vertically with a traveling "packet" that moves down a spine every 9 seconds. Each node pulses in sequence using Framer Motion's `delay` offset (`i * STEP`).

Hovering the panel pauses every animation. Clicking a node:

1. Fires `openFlowNode(id)` from `lib/flowBus.ts`.
2. Scrolls to `#flow`.
3. `SystemFlow.tsx` listens for the event and opens that node's detail panel.

No global state library — just a tiny pub/sub using `Set<Handler>`.

---

## Theme

Dark by default, with a light variant. The theme is stored as a class on `<html>` (`light` or nothing). Tokens live in `app/globals.css` inside `@theme { ... }`.

The initial theme is injected server-side via `@teispace/next-themes` to avoid a flash of the wrong theme on load.

---

## Deployment

Deployed to **Vercel**. Every push to `main` triggers a production deploy. Pull requests get their own preview URL.

No environment variables are required for the site itself. The email subscription form (once wired) will need one — see `components/Thinking.tsx`.

---

## Notes

- The System Flow diagram is not an image — it's live DOM, so it responds to theming, motion, and interaction.
- All brand icons (GitHub, LinkedIn, X) are inline SVG in `components/BrandIcons.tsx`, not from `lucide-react`, because Lucide v1 removed brand marks for trademark reasons.
- Fonts: JetBrains Mono (body) and Inter (headings), loaded via `next/font/google` — self-hosted at build time, no external requests at runtime.
