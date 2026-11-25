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
  github?: string;
  href: string;
  image: string;
  images: string[];
  accent: string;
}

export const projects: ProjectItem[] = [
  {
    id: "neurostack",
    index: "01",
    name: "NeuroStack",
    subtitle: "Digital Studio for Production Websites, Custom Software & Automation",
    description:
      "Bilingual light-first landing page for NeuroStack studio, presenting four core engineering services, nine live production demos, transparent pricing tabs, interactive logo anatomy, and a structured consultation brief.",
    category: "Website",
    metaBadge: "Digital Studio • Live Platform",
    period: "2026",
    tags: ["Website", "Digital Studio", "Next.js", "Bilingual"],
    href: "https://neurostack.andresptr.site/",
    image: "/projects/NeuroStack.png",
    images: [
      "/projects/NeuroStack.png",
      "/projects/NeuroStack(2).png",
      "/projects/NeuroStack(3).png",
      "/projects/NeuroStack(4).png",
    ],
    accent: "#1d4ed8",
  },
  {
    id: "antennalab-3d",
    index: "02",
    name: "AntennaLab 3D",
    subtitle: "Interactive 3D Far-Field Antenna Radiation & Propagation Lab",
    description:
      "WebGL RF engineering laboratory modeling six analytical antenna topologies with synchronized 2D E/H-plane polar cuts, ground dBm heatmaps, and four propagation environments including urban blockage and ridge diffraction.",
    category: "Useful Tools",
    metaBadge: "3D RF Lab • Live Platform",
    period: "2026",
    tags: ["Website", "Useful Tools", "RF Engineering", "WebGL"],
    github: "https://github.com/andre-sptr/3d-antenna",
    href: "https://antenna.andresptr.site/",
    image: "/projects/AntennaLab-3D.png",
    images: [
      "/projects/AntennaLab-3D.png",
      "/projects/AntennaLab-3D(2).png",
      "/projects/AntennaLab-3D(3).png",
      "/projects/AntennaLab-3D(4).png",
    ],
    accent: "#0d9488",
  },
  {
    id: "over-the-air",
    index: "03",
    name: "Over the Air",
    subtitle: "Interactive 3D Scrollytelling Guide to Two-Way Radio Signals",
    description:
      "Six-chapter 3D web walkthrough tracing a push-to-talk transmission from modulation and whip radiation to ITU-R P.526 Fresnel terrain propagation, hilltop repeater relay, and receiver demodulation.",
    category: "Website",
    metaBadge: "3D RF Story • Live Platform",
    period: "2026",
    tags: ["Website", "Useful Tools", "RF Engineering", "3D Scrollytelling"],
    href: "https://radio.andresptr.site/",
    image: "/projects/Over-the-Air.png",
    images: [
      "/projects/Over-the-Air.png",
      "/projects/Over-the-Air(2).png",
      "/projects/Over-the-Air(3).png",
      "/projects/Over-the-Air(4).png",
    ],
    accent: "#1d4ed8",
  },
  {
    id: "bubu-ai",
    index: "04",
    name: "Bubu AI",
    subtitle: "Multimodal WhatsApp AI Agent & 3D Pipeline Observatory",
    description:
      "Self-hosted WhatsApp AI assistant built with Fastify, SQLite WAL, and WAHA, pairing local Whisper, Piper TTS, and Tesseract OCR processing with a live 3D SSE pipeline observatory.",
    category: "AI Agent Tools",
    metaBadge: "WhatsApp AI • 3D Observatory",
    period: "2026",
    tags: ["Website", "AI Agent Tools", "WhatsApp Agent", "Three.js"],
    github: "https://github.com/andre-sptr/bubu-ai",
    href: "https://waha.andresptr.site/",
    image: "/projects/Bubu-AI.png",
    images: [
      "/projects/Bubu-AI.png",
      "/projects/Bubu-AI(2).png",
      "/projects/Bubu-AI(3).png",
      "/projects/Bubu-AI(4).png",
    ],
    accent: "#15803d",
  },
  {
    id: "linksight-rf",
    index: "05",
    name: "LinkSight RF",
    subtitle: "Interactive RF Link Budget, Repeater Relay & Fresnel Zone Planner",
    description:
      "Web-based RF engineering workbench for planning Point-to-Point and Single-Repeater Relay radio links over real SRTM30m terrain profiles—featuring 1st/60% Fresnel zone visualization.",
    category: "Useful Tools",
    metaBadge: "RF Engineering • Live Platform",
    period: "2026",
    tags: ["Website", "Useful Tools", "RF Engineering", "GIS"],
    github: "https://github.com/andre-sptr/rf-link-planner",
    href: "https://rf.andresptr.site/",
    image: "/projects/LinkSight-RF.png",
    images: [
      "/projects/LinkSight-RF.png",
      "/projects/LinkSight-RF(2).png",
      "/projects/LinkSight-RF(3).png",
      "/projects/LinkSight-RF(4).png",
    ],
    accent: "#026498",
  },
  {
    id: "aet-ai-platform",
    index: "06",
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
    index: "07",
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
    index: "08",
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
    index: "09",
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
