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
    subtitle: "Radio Communication & Telemetry Monitoring Dashboard",
    description:
      "Placeholder project untuk sistem pemantauan infrastruktur radio trunking, telemetri base station, dan visualisasi status kanal secara real-time.",
    category: "Radio Systems",
    period: "2026",
    tags: ["Radio Trunking", "Telemetry", "Monitoring"],
    github: "https://github.com/andre-sptr",
    href: "#projects",
    accent: "#38bdf8",
  },
  {
    id: "project-placeholder-02",
    index: "02",
    name: "Project Placeholder 02",
    subtitle: "Network Infrastructure & Provisioning Automation",
    description:
      "Placeholder project untuk otomasi konfigurasi perangkat jaringan, manajemen inventaris radio, dan workflow provisioning terpusat.",
    category: "Network Automation",
    period: "2026",
    tags: ["Networking", "Automation", "Provisioning"],
    github: "https://github.com/andre-sptr",
    href: "#projects",
    accent: "#a855f7",
  },
  {
    id: "project-placeholder-03",
    index: "03",
    name: "Project Placeholder 03",
    subtitle: "AI-Assisted Field Operations & Maintenance Assistant",
    description:
      "Placeholder project untuk integrasi AI dan workflow automation dalam mendukung pencatatan preventive/corrective maintenance infrastruktur.",
    category: "AI & Workflow",
    period: "2026",
    tags: ["AI Implementation", "Workflow", "Maintenance"],
    github: "https://github.com/andre-sptr",
    href: "#projects",
    accent: "#10b981",
  },
];
