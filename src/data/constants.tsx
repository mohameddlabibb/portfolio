// ── Marquee bands ────────────────────────────────────────────────────────────
export const MARQUEES = {
  tech: ["React", "TypeScript", "Node.js", "Supabase", "Tailwind", "Vite"],
  available: ["Available for work"],
  work: ["Selected work"],
  talk: ["Let's talk"],
};

// ── Work (pinned horizontal) ─────────────────────────────────────────────────
export interface Project {
  n: string;
  img?: string;
  gradient: string;
  kicker: string;
  title: string;
  desc: string;
  tags: string;
  github: string;
}

export const PROJECTS: Project[] = [
  {
    n: "01",
    img: "/sanad.png",
    gradient: "linear-gradient(135deg,#ff3500,#f43f5e)",
    kicker: "Graduation Project",
    title: "SANAD Web",
    desc: "Full-stack platform connecting people with social support services. React/TS frontend, Node/Express/MySQL backend, JWT auth, admin dashboard & booking flow.",
    tags: "React · TypeScript · Node · MySQL",
    github: "https://github.com/mohameddlabibb/SANAD.web",
  },
  {
    n: "02",
    gradient: "linear-gradient(135deg,#7c3aed,#2563eb)",
    kicker: "Utility",
    title: "FindDocs",
    desc: "Offline financial document management with full CRUD. Local-first workflows — no cloud dependency, fully self-hosted.",
    tags: "React · TypeScript · SQLite · Vite",
    github: "https://github.com/mohameddlabibb/FindDocs",
  },
];

// ── About ────────────────────────────────────────────────────────────────────
export const STATS: { v?: string; count?: number; suffix?: string; label: string }[] = [
  { count: PROJECTS.length, suffix: "+", label: "Projects" },
  { count: 12, suffix: "+", label: "Tech" },
  { v: "SomaBay", label: "Internship" },
  { count: 2026, label: "Graduating" },
];

export const SERVICES = [
  { n: "01", t: "Web Design", d: "Interfaces with attitude, not templates." },
  { n: "02", t: "Platforms", d: "Apps people log in and actually use." },
  { n: "03", t: "Mobile Apps", d: "Native-feel apps for any device." },
  { n: "04", t: "AI Photoshoots", d: "Brand campaigns without a studio." },
];

// ── Skills ───────────────────────────────────────────────────────────────────
export const SKILL_CATS: { n: string; color?: string; cat: string; items: string[] }[] = [
  { n: "01", cat: "Frontend", items: ["React", "TypeScript", "Vite", "Tailwind CSS", "HTML/CSS", "JavaScript"] },
  { n: "02", color: "var(--blue)", cat: "Backend", items: ["Node.js", "Express", "MySQL", "Supabase", "JWT Auth", "REST APIs"] },
  { n: "03", color: "var(--pink)", cat: "Tools", items: ["Git",  "Postman", "Figma", "Vercel"] },
];

export const EMAIL = "mohameddlabibb@gmail.com";
