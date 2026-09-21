export const profile = {
  name: "Sanjit Dash",
  role: "Backend Engineer",
  stack: ["Python", "FastAPI", "Systems & Architecture"],
  thesis:
    "I build reliable backend systems and explore how automation and AI agents turn software from systems that respond into systems that reason and act.",
  email: "sanjit.dash758@gmail.com",
  socials: {
    github: "https://github.com/SanjitDash758",
    linkedin: "https://www.linkedin.com/in/dash-sanjit/",
    x: "https://x.com/sanjitdash52458",
  },
};

export type Project = {
  id: string;
  title: string;
  status: "live" | "in-progress" | "designing";
  blurb: string;
  stack: string[];
  tags: string[];
  live?: string;
  repo?: string;
  lastUpdated: string;
};

export const projects: Project[] = [
  {
    id: "zenvy",
    title: "Zenvy Fashion — Baby Saree E-Commerce",
    status: "live",
    blurb:
      "An end-to-end online store for a Bangladeshi fashion brand — product browsing, cart, checkout, order tracking, Telegram-based order alerts, and a custom admin dashboard.",
    stack: ["Next.js", "WooCommerce", "Supabase", "Telegram API"],
    tags: ["E-Commerce", "Full-Stack", "Automation"],
    live: "https://zenvyfashion.com",
    repo: "https://github.com/SanjitDash758/zenvy-fashion",
    lastUpdated: "2026-09-01",
  },
  {
    id: "codesell",
    title: "CodeSell Academy — AI Chatbot & Course Platform",
    status: "live",
    blurb:
      "A full-stack chatbot platform for an online coding academy — React + Vite + TypeScript frontend with a Node.js/Express API delivering instant course info and student support.",
    stack: ["React 19", "Vite", "TypeScript", "Node.js", "Express"],
    tags: ["AI", "Chatbot", "Full-Stack"],
    live: "https://codesell-academy.com",
    repo: "https://github.com/SanjitDash758/codesell-academy",
    lastUpdated: "2026-08-20",
  },
  {
    id: "ariel",
    title: "Ariel Power Ltd — Solar EPC Website",
    status: "live",
    blurb:
      "A responsive corporate site for a Bangladeshi solar energy company — semantic HTML5, custom CSS Grid layouts, mobile-first design, and smooth CSS animations.",
    stack: ["HTML5", "CSS3", "Grid", "Responsive"],
    tags: ["Frontend", "Corporate"],
    live: "https://arielpowerltd.com",
    repo: "https://github.com/SanjitDash758/ariel-power-solutions",
    lastUpdated: "2026-08-10",
  },
];

export const systemFlow = [
  {
    id: "request",
    label: "REQUEST",
    short: "Incoming operation",
    detail:
      "A client sends an HTTP request. Validation, idempotency keys, and rate limits are handled at the edge before anything touches the core.",
  },
  {
    id: "api",
    label: "FASTAPI",
    short: "API layer",
    detail:
      "FastAPI handles routing, dependency injection, and schema validation. Typed contracts keep the surface honest.",
  },
  {
    id: "db",
    label: "DATABASE",
    short: "Persistent state",
    detail:
      "Postgres holds durable state. Migrations are versioned. Reads are cached in Redis where it pays off.",
  },
  {
    id: "agent",
    label: "AGENT",
    short: "Reason + tools",
    detail:
      "When a task needs judgment, an agent reasons over context and decides which tools to call — bounded by explicit policy.",
  },
  {
    id: "tools",
    label: "TOOLS",
    short: "External capabilities",
    detail:
      "Tools are typed functions the agent can invoke: search, write, fetch, compute. Each one is sandboxed and observable.",
  },
  {
    id: "automation",
    label: "AUTOMATION",
    short: "Execute + act",
    detail:
      "Deterministic workflows execute the plan — retried, logged, and reconciled. The system acts, not just responds.",
  },
];

export type Blog = {
  id: string;
  title: string;
  blurb: string;
  source: "Substack" | "Substack Note" | "LinkedIn";
  publishedAt: string; // ISO
  readTime?: string; // e.g. "8 min read"
  url: string;
  tags: string[];
};

export const blogs: Blog[] = [
  {
    id: "memory-7-types",
    title: "The 7 Types of Memory an AI Agent Needs",
    blurb:
      "AI agents don't just need context — they need memory. A systems-engineering taxonomy of working, short-term, episodic, semantic, procedural, long-term, and external memory, and why designing the memory lifecycle is the real engineering problem.",
    source: "Substack",
    publishedAt: "2026-08-29",
    readTime: "8 min read",
    url: "https://dashsanjit.substack.com/p/the-7-types-of-memory-an-ai-agent",
    tags: ["AI Agents", "Systems", "Memory"],
  },
  {
    id: "ai-talent-problem",
    title: "The AI Talent Problem Nobody Sees Until It's Too Late",
    blurb:
      "We keep asking how much work AI can do. A more important question: what happens to the people who were supposed to learn by doing that work? On apprenticeship pipelines, the capability cliff, workslop, and why judgment can't be automated.",
    source: "Substack Note",
    publishedAt: "2026-08-28",
    readTime: "6 min read",
    url: "https://substack.com/@sanjitdash1/note/c-324322322",
    tags: ["AI", "Teams", "Judgment"],
  },
  {
    id: "TODO_LINKEDIN_ID",
    // TODO: replace title and blurb with the actual content of your LinkedIn post
    title: "TODO — LinkedIn post title",
    blurb:
      "TODO — one or two sentence summary of what you wrote about. Once you paste the title and a short blurb here, the card will render fully.",
    source: "LinkedIn",
    publishedAt: "2026-08-15",
    readTime: "3 min read",
    url: "https://www.linkedin.com/feed/update/urn:li:activity:7499134064537399297/",
    tags: ["TODO"],
  },
];
