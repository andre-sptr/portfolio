export interface ProjectItem {
  id: string;
  index: string;
  name: string;
  subtitle: string;
  description: string;
  category: string;
  metaBadge: string;
  period: string;
  tags: string[];
  github: string;
  href: string;
  image: string;
  images: string[];
  accent: string;
}

export const projects: ProjectItem[] = [
  {
    id: "aet-ai-platform",
    index: "01",
    name: "AET AI Platform",
    subtitle: "AI-Powered Academic, Coding & Ideation Workspace for AET PCR",
    description:
      "Interactive web platform and multi-mode AI workspace (Smart Companion, Academic Writer, and Coding Expert) built to support students of the AET Student Association at Politeknik Caltex Riau.",
    category: "AI Agent Tools",
    metaBadge: "AI Workspace • Live Platform",
    period: "2026",
    tags: ["Website", "AI Agent Tools", "Next.js"],
    github: "https://github.com/andre-sptr/aet-ai-platform",
    href: "https://www.aetpcr.site/",
    image: "/projects/AET-AI.png",
    images: [
      "/projects/AET-AI.png",
      "/projects/AET-AI(2).png",
      "/projects/AET-AI(3).png",
      "/projects/AET-AI(4).png",
      "/projects/AET-AI(5).png",
    ],
    accent: "#38bdf8",
  },
  {
    id: "pdf-workbench",
    index: "02",
    name: "PDF Workbench",
    subtitle: "All-in-One Browser PDF Toolkit & Document Processing Suite",
    description:
      "Privacy-first digital document workbench offering 18 free PDF utilities—including merge, split, compress, Office conversion, and OCR text extraction—with automatic temporary file cleanup.",
    category: "Useful Tools",
    metaBadge: "18 PDF Tools • Open Source",
    period: "2026",
    tags: ["Website", "Useful Tools", "PDF", "OCR"],
    github: "https://github.com/andre-sptr/pdf-workbench",
    href: "https://pdf.andresptr.site/",
    image: "/projects/PDF-Workbench.png",
    images: [
      "/projects/PDF-Workbench.png",
      "/projects/PDF-Workbench(2).png",
      "/projects/PDF-Workbench(3).png",
      "/projects/PDF-Workbench(4).png",
    ],
    accent: "#2563eb",
  },
  {
    id: "vps-file-hub",
    index: "03",
    name: "VPS File Hub",
    subtitle: "Self-Hosted VPS File Storage & Controlled Sharing Hub",
    description:
      "Self-hosted file storage and workspace hub supporting multi-file batch uploads, server-side MIME and signature verification, folder organization, and per-file private or public share links.",
    category: "Useful Tools",
    metaBadge: "Self-Hosted • Live Platform",
    period: "2026",
    tags: ["Website", "Useful Tools", "Self-Hosted", "File Storage"],
    github: "https://github.com/andre-sptr/cloud-file-manager",
    href: "https://cloud.andresptr.site",
    image: "/projects/VPS-File-Hub.png",
    images: [
      "/projects/VPS-File-Hub.png",
      "/projects/VPS-File-Hub(2).png",
      "/projects/VPS-File-Hub(3).png",
      "/projects/VPS-File-Hub(4).png",
    ],
    accent: "#2563eb",
  },
  {
    id: "rekapal",
    index: "04",
    name: "REKAPAL",
    subtitle: "Oil Palm Plantation Lot & Financial Management Platform",
    description:
      "Private web workspace for managing oil palm plantation lots—tracking harvests, maintenance schedules, operational expenses, sales, per-kg cost analytics, and automated Telegram bot notifications.",
    category: "Website",
    metaBadge: "Plantation Ops • Live Platform",
    period: "2026",
    tags: ["Website", "Dashboard", "Operations", "Telegram Bot"],
    github: "https://github.com/andre-sptr/my-sawit",
    href: "https://rekapal.site",
    image: "/projects/Rekapal.png",
    images: [
      "/projects/Rekapal.png",
      "/projects/Rekapal(2).png",
      "/projects/Rekapal(3).png",
      "/projects/Rekapal(4).png",
    ],
    accent: "#16a34a",
  },
];
