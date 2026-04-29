export const IMGS: Record<string, string> = {
  React:      "https://i.postimg.cc/0b40NRcK/React-icon-svg.png",
  TypeScript: "https://i.postimg.cc/VdhWNQDw/TS.png",
  NodeJS:     "https://i.postimg.cc/Cz54YLC4/Node.webp",
  JavaScript: "https://i.postimg.cc/WtX7QJZn/JS.png",
  MySQL:      "https://i.postimg.cc/ThCcZWb7/mysql.png",
  Git:        "https://i.postimg.cc/Ln5VR6kC/Git-icon-svg.png",
  Tailwind:   "https://i.postimg.cc/pprBxXYT/Tailwind-CSS-Logo-svg.png",
  Supabase:   "https://i.postimg.cc/7fhNDY1R/supabase.webp",
  Vite:       "https://i.postimg.cc/gn7H0FNY/vite.webp",
  Figma:      "https://i.postimg.cc/NLpxWrXD/figma.png",
  Dart:       "https://i.postimg.cc/QV0qRW71/dart.png",
};

export const IC: Record<string, (s: number) => JSX.Element> = Object.fromEntries(
  Object.entries(IMGS).map(([k, src]) => [
    k,
    (s: number) => <img src={src} width={s} height={s} style={{ objectFit: "contain", display: "block" }} alt={k} />,
  ])
);

export const ICONS_3D = [
  { k: "React",      bg: "#eef9ff", gl: "97,218,251",  l: "6%",  t: "10%", sz: 80, td: 9,   fd: 6.5, tan: 1, fan: 1, dl: 0   },
  { k: "TypeScript", bg: "#eef3ff", gl: "49,120,198",  l: "74%", t: "7%",  sz: 72, td: 11,  fd: 7,   tan: 2, fan: 2, dl: .9  },
  { k: "NodeJS",     bg: "#edfaed", gl: "83,158,67",   l: "87%", t: "24%", sz: 82, td: 7.5, fd: 5.5, tan: 3, fan: 3, dl: 1.6 },
  { k: "JavaScript", bg: "#fffde6", gl: "247,220,30",  l: "44%", t: "4%",  sz: 72, td: 12,  fd: 8,   tan: 4, fan: 4, dl: 2.2 },
  { k: "MySQL",      bg: "#eef2fa", gl: "68,121,161",  l: "59%", t: "40%", sz: 80, td: 9,   fd: 6,   tan: 5, fan: 5, dl: .5  },
  { k: "Git",        bg: "#fff1ef", gl: "240,80,50",   l: "18%", t: "47%", sz: 78, td: 11,  fd: 7,   tan: 6, fan: 6, dl: 1.3 },
  { k: "Tailwind",   bg: "#eafafd", gl: "6,182,212",   l: "79%", t: "56%", sz: 74, td: 8,   fd: 5,   tan: 2, fan: 1, dl: 2.4 },
  { k: "Supabase",   bg: "#ecfaf5", gl: "62,207,142",  l: "6%",  t: "66%", sz: 72, td: 10,  fd: 7,   tan: 3, fan: 2, dl: .7  },
  { k: "Vite",       bg: "#f3eeff", gl: "130,80,220",  l: "48%", t: "76%", sz: 74, td: 8,   fd: 6,   tan: 5, fan: 4, dl: 3.1 },
  { k: "Figma",      bg: "#fff2ef", gl: "242,78,30",   l: "33%", t: "12%", sz: 72, td: 9,   fd: 7,   tan: 6, fan: 3, dl: 1.1, is: 0.78 },
  { k: "Dart",       bg: "#eaf6ff", gl: "13,135,200",  l: "22%", t: "28%", sz: 70, td: 11,  fd: 5,   tan: 4, fan: 6, dl: 2.0, is: 0.78 },
];

export const TECH_STRIP = [
  { n: "React",      k: "React"      },
  { n: "TypeScript", k: "TypeScript" },
  { n: "Node.js",    k: "NodeJS"     },
  { n: "JavaScript", k: "JavaScript" },
  { n: "Tailwind",   k: "Tailwind"   },
  { n: "MySQL",      k: "MySQL"      },
  { n: "Supabase",   k: "Supabase"   },
  { n: "Git",        k: "Git"        },
  { n: "Vite",       k: "Vite"       },
  { n: "Figma",      k: "Figma"      },
  { n: "Dart",       k: "Dart"       },
];

// ── Add / remove services here ──────────────────────────────────────────────
export const SVCS = [
  { id: "web", l: "Websites",       d: "Responsive sites from scratch", c: "#ff3500", bg: "#fff5f2" },
  { id: "des", l: "Web Design",     d: "Modern UI/UX that converts",    c: "#7c3aed", bg: "#f5f3ff" },
  { id: "ai",  l: "AI Photoshoots", d: "Hyper-realistic AI fashion",    c: "#f43f5e", bg: "#fff1f4" },
  { id: "app", l: "Mobile Apps",    d: "iOS & Android applications",    c: "#2563eb", bg: "#eff6ff" },
];

// ── Add / remove skill categories here ──────────────────────────────────────
export const SKILL_CATS = [
  { cat: "Frontend", n: "01", c: "#ff3500", items: ["React", "TypeScript", "Vite", "Tailwind CSS", "HTML/CSS", "JavaScript"] },
  { cat: "Backend",  n: "02", c: "#7c3aed", items: ["Node.js", "Express", "MySQL", "Supabase", "JWT Auth", "REST APIs"]     },
  { cat: "Tools",    n: "03", c: "#06b6d4", items: ["Git", "VS Code", "Postman", "Figma", "Vercel", "Claude Code"]          },
];

export const WORDS = ["Frontend Developer", "React Specialist", "UI Engineer", "Full-Stack Builder"];
