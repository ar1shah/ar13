export type Project = {
  slug: string;
  name: string;
  year: string;
  blurb: string;
  tech: string[];
  repo: string;
  live?: string;
  status?: "In production" | "In progress";
  /** Shown in the short list on the homepage. */
  featured?: boolean;
};

export const projects: Project[] = [
  {
    slug: "partsync",
    name: "PartSync",
    year: "2026",
    blurb:
      "Inventory and admin dashboard the SKAPS maintenance crew opens every day to track parts stock, usage, and requests.",
    tech: ["Next.js", "TypeScript", "Supabase", "Tailwind"],
    repo: "https://github.com/ar1shah/PartSync",
    status: "In production",
    featured: true,
  },
  {
    slug: "align",
    name: "Align",
    year: "2025",
    blurb:
      "Full-stack platform that matches clients with licensed real estate agents, used to close real deals.",
    tech: ["Next.js", "TypeScript", "Supabase", "Tailwind"],
    repo: "https://github.com/ar1shah/Align",
    featured: true,
  },
  {
    slug: "cageops",
    name: "CageOps",
    year: "2026",
    blurb:
      "A production-style ML platform that predicts UFC fight outcomes. The domain is the fights; the point is the infrastructure underneath.",
    tech: ["Python", "FastAPI", "Postgres", "Redis", "LightGBM", "Docker"],
    repo: "https://github.com/ar1shah/CageOps",
    status: "In progress",
    featured: true,
  },
  {
    slug: "rl-decision-review",
    name: "RL Decision Review",
    year: "2026",
    blurb:
      "Rocket League replay analyzer that finds the decisions that cost your team the most and explains the better play.",
    tech: ["Python", "LLMs"],
    repo: "https://github.com/ar1shah/rl-decision-review",
    status: "In progress",
    featured: true,
  },
  {
    slug: "redirectguard",
    name: "RedirectGuard",
    year: "2026",
    blurb:
      "Chrome extension that kills the popup tabs streaming and ad-heavy sites open behind your back.",
    tech: ["TypeScript", "Chrome Extensions API"],
    repo: "https://github.com/ar1shah/RedirectGuard",
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
