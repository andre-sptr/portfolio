export interface ProjectItem {
  id: string;
  index: string;
  name: string;
  subtitle: string;
  description: string;
  category: string;
  period: string;
  tags: string[];
  github: string;
  href: string;
  accent: string;
}

export const projects: ProjectItem[] = [
  {
    id: "project-placeholder-01",
    index: "01",
    name: "Project Placeholder 01",
    subtitle: "Modern Web Application & Interactive Portfolio",
    description:
      "Placeholder project untuk pengembangan website modern dengan antarmuka responsif, performa tinggi, dan arsitektur yang bersih.",
    category: "Website",
    period: "2026",
    tags: ["Website", "Next.js", "UI/UX"],
    github: "https://github.com/andre-sptr",
    href: "#projects",
    accent: "#38bdf8",
  },
  {
    id: "project-placeholder-02",
    index: "02",
    name: "Project Placeholder 02",
    subtitle: "AI Agent Skills, Rules & Developer Workflow Tools",
    description:
      "Placeholder project untuk pengembangan AI agent tools, custom skills, dan workflow automation untuk membantu produktivitas engineering.",
    category: "AI Agent Tools",
    period: "2026",
    tags: ["AI Agent", "Automation", "Skills"],
    github: "https://github.com/andre-sptr",
    href: "#projects",
    accent: "#a855f7",
  },
  {
    id: "project-placeholder-03",
    index: "03",
    name: "Project Placeholder 03",
    subtitle: "All-in-One Document & File Utility Toolkit",
    description:
      "Placeholder project untuk useful tools sehari-hari seperti pengolahan dokumen PDF (merge, split, compress) yang cepat dan praktis.",
    category: "Useful Tools",
    period: "2026",
    tags: ["Useful Tools", "PDF", "Utilities"],
    github: "https://github.com/andre-sptr",
    href: "#projects",
    accent: "#10b981",
  },
];
