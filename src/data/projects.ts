export type ProjectCategory =
  | "AI & Tools"
  | "Infrastructure"
  | "Education"
  | "IoT"
  | "Automation"
  | "Utilities"
  | "Web Platform";

export interface ProjectItem {
  id: string;
  num: string;
  title: string;
  subtitle: string;
  category: ProjectCategory;
  description: string;
  problem: string;
  solution: string;
  impact: string;
  role: string;
  tech: string[];
  image: string;
  viewUrl: string;
  codeUrl: string;
  accent: string;
  featured: boolean;
}

export const projects: ProjectItem[] = [
  {
    id: "arena-debate",
    num: "01",
    title: "Arena Debate",
    subtitle: "Multi-Agent AI Debate System",
    category: "AI & Tools",
    description:
      "Lima AI agent berdebat dalam format Tim 2v2, menganalisis topik apa pun secara mendalam dan mencapai kesimpulan berbasis konsensus.",
    problem: "Pengguna butuh cara mengeksplorasi argumen kompleks dari banyak sudut pandang.",
    solution: "Membuat arena debat multi-agent dengan format role-based dan sintesis kesimpulan.",
    impact: "Membantu pengguna membandingkan argumen dan melihat kontra-argumen lebih cepat.",
    role: "Full-stack developer and AI interaction designer",
    tech: ["Next.js", "Gemini AI", "Node.js"],
    image: "/pages/debate-page.png",
    viewUrl: "https://debat.andresptr.site/",
    codeUrl: "",
    accent: "#818cf8",
    featured: true,
  },
  {
    id: "reka-ai",
    num: "02",
    title: "Reka AI",
    subtitle: "AI-Assisted Coding Platform",
    category: "AI & Tools",
    description:
      "Platform AI untuk membantu developer menulis, debugging, dan optimasi kode secara real-time dengan konteks proyek penuh.",
    problem: "Developer membutuhkan bantuan coding yang memahami konteks proyek, bukan hanya prompt satu kali.",
    solution: "Membangun assistant coding dengan pengalaman chat dan konteks kerja yang lebih terarah.",
    impact: "Mempercepat iterasi coding, debugging, dan eksplorasi solusi teknis.",
    role: "Full-stack developer",
    tech: ["React", "Gemini AI", "Node.js"],
    image: "/pages/reka-page.png",
    viewUrl: "",
    codeUrl: "https://github.com/andre-sptr/ai",
    accent: "#22d3ee",
    featured: true,
  },
  {
    id: "fiscal-ai",
    num: "03",
    title: "Fiscal AI Finance",
    subtitle: "Personal Finance Manager",
    category: "AI & Tools",
    description:
      "Web app manajemen keuangan personal berbasis AI untuk kategorisasi pengeluaran otomatis dan analisis finansial prediktif.",
    problem: "Pengguna sulit melihat pola pengeluaran dan kategori finansial secara cepat.",
    solution: "Membangun dashboard finansial dengan kategorisasi dan insight berbasis AI.",
    impact: "Membantu pengguna memahami pengeluaran dan mengambil keputusan finansial lebih jelas.",
    role: "Full-stack developer",
    tech: ["React", "AI", "Node.js"],
    image: "/pages/fiscal-page.png",
    viewUrl: "",
    codeUrl: "https://github.com/andre-sptr/fiscal",
    accent: "#34d399",
    featured: true,
  },
  {
    id: "sitiket",
    num: "04",
    title: "SiTiket",
    subtitle: "Network Fault Ticket Management",
    category: "Infrastructure",
    description:
      "Sistem manajemen tiket gangguan jaringan berbasis web untuk tracking, pengelolaan, dan resolusi gangguan secara efisien di PT Telkom Infrastruktur Indonesia.",
    problem: "Tim operasional membutuhkan tracking gangguan jaringan yang jelas dan berorientasi SLA.",
    solution: "Membangun sistem tiket gangguan dengan status, prioritas, dan alur resolusi.",
    impact: "Membantu monitoring gangguan dan koordinasi penyelesaian tiket operasional.",
    role: "Full-stack developer",
    tech: ["Next.js", "Node.js", "PostgreSQL"],
    image: "/pages/sitiket-page.png",
    viewUrl: "",
    codeUrl: "https://github.com/andre-sptr/sitiket",
    accent: "#f59e0b",
    featured: true,
  },
  {
    id: "snmb",
    num: "05",
    title: "SNMB MAN IC Siak",
    subtitle: "School Admission Portal",
    category: "Education",
    description:
      "Portal resmi Seleksi Nasional Murid Baru MAN Insan Cendekia Siak — alur seleksi, jadwal, countdown pendaftaran, dan integrasi WhatsApp.",
    problem: "Sekolah butuh portal pendaftaran murid baru yang resmi, terpusat, dan mudah diakses calon siswa.",
    solution: "Membangun portal PMB dengan alur seleksi, jadwal, countdown pendaftaran, dan integrasi WhatsApp.",
    impact: "Memusatkan pendaftaran murid baru MAN IC Siak agar prosesnya lebih tertib dan mudah diakses.",
    role: "Full-stack developer",
    tech: ["React", "Vite", "Node.js"],
    image: "/pages/snmb-page.png",
    viewUrl: "https://snmb.icsiak.sch.id/",
    codeUrl: "",
    accent: "#3b82f6",
    featured: true,
  },
  {
    id: "aet-ai",
    num: "06",
    title: "AET AI",
    subtitle: "Student-Org AI Assistant",
    category: "AI & Tools",
    description:
      "Asisten AI untuk Himpunan Mahasiswa AET Politeknik Caltex Riau dengan mode Smart Companion, Academic Writer, dan Coding Expert.",
    problem: "Anggota himpunan mahasiswa butuh asisten untuk tugas akademik, coding, dan produktivitas sehari-hari.",
    solution: "Membangun asisten AI multi-mode (Smart Companion, Academic Writer, Coding Expert) dengan antarmuka chat.",
    impact: "Membantu mahasiswa AET PCR menulis laporan, debugging, dan berdiskusi lebih cepat.",
    role: "Full-stack developer",
    tech: ["Next.js", "Gemini AI"],
    image: "/pages/aet-page.png",
    viewUrl: "https://aetpcr.site/",
    codeUrl: "",
    accent: "#6366f1",
    featured: true,
  },
  {
    id: "iot-system",
    num: "05",
    title: "IoT System",
    subtitle: "Connected Device Dashboard",
    category: "IoT",
    description: "Dashboard dan antarmuka monitoring untuk eksperimen perangkat IoT.",
    problem: "Data perangkat perlu divisualisasikan agar mudah dipantau.",
    solution: "Membuat antarmuka web untuk melihat status dan sinyal perangkat.",
    impact: "Membuat eksperimen IoT lebih mudah didemokan dan dianalisis.",
    role: "IoT and web developer",
    tech: ["ESP32", "MQTT", "React"],
    image: "/pages/iot-page.png",
    viewUrl: "",
    codeUrl: "",
    accent: "#38bdf8",
    featured: false,
  },
  {
    id: "pdf-tools",
    num: "06",
    title: "PDF Tools",
    subtitle: "Document Utility Suite",
    category: "Utilities",
    description: "Kumpulan alat untuk mengelola dokumen PDF secara cepat.",
    problem: "Pengguna membutuhkan utilitas PDF yang langsung bisa dipakai.",
    solution: "Menyediakan tools web untuk kebutuhan dokumen umum.",
    impact: "Mempercepat pekerjaan dokumen tanpa instalasi aplikasi desktop.",
    role: "Full-stack developer",
    tech: ["React", "Node.js"],
    image: "/pages/pdf-page.png",
    viewUrl: "https://pdf.andresptr.site",
    codeUrl: "",
    accent: "#ef4444",
    featured: false,
  },
  {
    id: "file-hosting",
    num: "07",
    title: "File Hosting",
    subtitle: "Storage Utility",
    category: "Utilities",
    description: "Layanan hosting file sederhana untuk upload dan berbagi file.",
    problem: "Pengguna membutuhkan tempat menyimpan file yang cepat diakses.",
    solution: "Membangun utilitas upload dan hosting file berbasis web.",
    impact: "Mempermudah distribusi file untuk kebutuhan personal dan kerja.",
    role: "Full-stack developer",
    tech: ["React", "Node.js"],
    image: "/pages/file-page.png",
    viewUrl: "https://file.andresptr.site",
    codeUrl: "",
    accent: "#22d3ee",
    featured: false,
  },
  {
    id: "n8n-automation",
    num: "08",
    title: "n8n Automation",
    subtitle: "Workflow Automation",
    category: "Automation",
    description: "Eksperimen otomasi workflow menggunakan n8n dan integrasi layanan.",
    problem: "Pekerjaan berulang perlu diotomasi agar tidak menghabiskan waktu manual.",
    solution: "Menyusun workflow integrasi dan automation pipeline.",
    impact: "Mengurangi pekerjaan repetitif dan mempercepat proses operasional.",
    role: "Automation builder",
    tech: ["n8n", "Webhook", "API"],
    image: "/pages/n8n-page.png",
    viewUrl: "",
    codeUrl: "",
    accent: "#ec4899",
    featured: false,
  },
  {
    id: "eduforum",
    num: "09",
    title: "EduForum",
    subtitle: "Education Community Platform",
    category: "Education",
    description: "Platform diskusi pendidikan untuk aktivitas belajar dan komunitas.",
    problem: "Komunitas belajar membutuhkan ruang diskusi yang terstruktur.",
    solution: "Membangun platform forum dengan fokus pada materi dan diskusi.",
    impact: "Mendukung kolaborasi dan pertukaran pengetahuan antar pengguna.",
    role: "Full-stack developer",
    tech: ["React", "Node.js"],
    image: "/pages/eduforum-page.png",
    viewUrl: "",
    codeUrl: "",
    accent: "#a78bfa",
    featured: false,
  },
  {
    id: "binasiswa",
    num: "10",
    title: "Bina Siswa",
    subtitle: "Student Platform",
    category: "Education",
    description: "Platform pendukung aktivitas siswa dan pembelajaran.",
    problem: "Informasi dan aktivitas siswa perlu dikelola dalam satu tempat.",
    solution: "Membangun antarmuka web untuk kebutuhan pendataan dan pembelajaran.",
    impact: "Membantu pengelolaan aktivitas siswa secara lebih terarah.",
    role: "Full-stack developer",
    tech: ["React", "Node.js"],
    image: "/pages/binasiswa-page.png",
    viewUrl: "",
    codeUrl: "",
    accent: "#34d399",
    featured: false,
  },
  {
    id: "aethernet",
    num: "11",
    title: "Aethernet",
    subtitle: "Network Concept Interface",
    category: "Infrastructure",
    description: "Eksperimen antarmuka untuk konsep jaringan dan infrastruktur.",
    problem: "Konsep jaringan sering sulit dipahami tanpa visualisasi.",
    solution: "Membuat visual interface untuk ide jaringan dan konektivitas.",
    impact: "Mempermudah komunikasi konsep teknis jaringan.",
    role: "Frontend developer",
    tech: ["React", "Networking"],
    image: "/pages/aethernet-page.png",
    viewUrl: "",
    codeUrl: "",
    accent: "#06b6d4",
    featured: false,
  },
];

export const featuredProjects = projects.filter((project) => project.featured);
export const archiveProjects = projects.filter((project) => !project.featured);
export const heroPreviewProjects = projects.filter((project) =>
  ["arena-debate", "reka-ai", "fiscal-ai", "sitiket", "iot-system"].includes(project.id)
);

// Projects that have a dedicated case study page (reuses the `featured` flag).
export const caseStudyProjects = featuredProjects;

export function getCaseStudy(slug: string): ProjectItem | undefined {
  return caseStudyProjects.find((project) => project.id === slug);
}
