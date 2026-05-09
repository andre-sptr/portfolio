import { useState, useRef } from "react";
import { ExternalLink, Github, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence, useMotionValue, useSpring, useInView } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import projectFireSense from "/pages/iotPage.png";
import projectChatBot from "/pages/n8nPage.png";
import projectBinasiswa from "/pages/binasiswaPage.png";
import projectHarLah from "/pages/harlahPage.png";
import projectPDF from "/pages/pdfPage.png";
import projectAI from "/pages/aiPage.png";
import projectZI from "/pages/ziPage.png";
import projectAetherNet from "/pages/aethernetPage.png";
import projectFile from "/pages/filePage.png";
import projectEduForum from "/pages/eduforumPage.png";
import projectSNMB from "/pages/snmbPage.png";
import projectPerpus from "/pages/perpusPage.png";
import projectAET from "/pages/aetPage.png";
import projectSiTiket from "/pages/sitiketPage.png";
import projectAqiqah from "/pages/aqiqahPage.png";
import projectFiscal from "/pages/fiscalPage.png";
import projectReka from "/pages/rekaPage.png";
import projectTutorin from "/pages/tutorinPage.png";
import projectDebate from "/pages/debatePage.png";

const projects = [
  {
    title: "Arena Debate",
    description: "Lima AI agent dalam Debat Tim 2v2 mendiskusikan topik apa pun, memberikan analisis mendalam dan kesimpulan berdasarkan konsensus.",
    image: projectDebate,
    tech: ["Next", "GeminiAI", "Node.js"],
    category: "AI & Tools",
    viewUrl: "https://debat.andresptr.site/",
    codeUrl: "",
    featured: true,
  },
  {
    title: "Reka AI",
    description: "Website AI-assisted coding untuk membantu developer menulis, debugging, dan optimasi kode.",
    image: projectReka,
    tech: ["React", "GeminiAI", "Node.js"],
    category: "AI & Tools",
    viewUrl: "",
    codeUrl: "https://github.com/andre-sptr/ai",
    featured: true,
  },
  {
    title: "Fiscal AI Finance",
    description: "Web app manajemen keuangan personal berbasis AI untuk kategorisasi pengeluaran dan analisis finansial.",
    image: projectFiscal,
    tech: ["React", "AI", "Node.js"],
    category: "AI & Tools",
    viewUrl: "",
    codeUrl: "https://github.com/andre-sptr/fiscal",
    featured: false,
  },
  {
    title: "AET AI PCR",
    description: "Platform informasi berbasis AI untuk Himpunan Mahasiswa AET Politeknik Caltex Riau.",
    image: projectAET,
    tech: ["React", "AI", "Node.js"],
    category: "AI & Tools",
    viewUrl: "https://aetpcr.site/",
    codeUrl: "https://github.com/andre-sptr/aet-ai2",
    featured: false,
  },
  {
    title: "SiTiket Telkom Infra",
    description: "Sistem manajemen tiket gangguan PT Telkom Infrastruktur Indonesia.",
    image: projectSiTiket,
    tech: ["React", "Node.js", "MySQL"],
    category: "Web Development",
    viewUrl: "",
    codeUrl: "",
    featured: false,
  },
  {
    title: "FireSense: Sistem Peringatan Kebakaran",
    description: "Aplikasi monitoring kebakaran real-time berbasis IoT untuk mendukung early warning system.",
    image: projectFireSense,
    tech: ["ESP32", "Figma", "Firebase"],
    category: "IoT",
    viewUrl: "",
    codeUrl: "",
    featured: false,
  },
  {
    title: "AI Assistant MAN IC Siak",
    description: "Asisten AI yang dirancang untuk mendukung layanan dan administrasi di MAN Insan Cendekia Siak.",
    image: projectAI,
    tech: ["React", "Bootstrap 5", "Node.js"],
    category: "AI & Tools",
    viewUrl: "",
    codeUrl: "https://github.com/andre-sptr/ai-agent",
    featured: false,
  },
  {
    title: "n8n WhatsApp Bot",
    description: "Bot WhatsApp berbasis n8n untuk otomatisasi respon pertanyaan orang tua siswa di MAN IC Siak.",
    image: projectChatBot,
    tech: ["n8n", "WhatsApp", "Automation"],
    category: "AI & Tools",
    viewUrl: "",
    codeUrl: "",
    featured: false,
  },
  {
    title: "SNMB MAN IC Siak",
    description: "Landing page Seleksi Nasional Murid Baru untuk MAN Insan Cendekia Siak.",
    image: projectSNMB,
    tech: ["React", "Bootstrap 5"],
    category: "Web Development",
    viewUrl: "https://snmb.icsiak.sch.id/",
    codeUrl: "https://github.com/andre-sptr/snmb",
    featured: false,
  },
  {
    title: "Binasiswa MAN IC Siak",
    description: "Sistem informasi untuk pencatatan poin pelanggaran dan data kesehatan siswa secara digital.",
    image: projectBinasiswa,
    tech: ["CI4", "Bootstrap 5", "MySQL"],
    category: "Web Development",
    viewUrl: "https://binasiswa.icsiak.sch.id/",
    codeUrl: "",
    featured: false,
  },
  {
    title: "Perpus MAN IC Siak",
    description: "Perpustakaan digital lengkap dengan katalog, peminjaman online, dan riwayat.",
    image: projectPerpus,
    tech: ["React", "Node.js", "MySQL"],
    category: "Web Development",
    viewUrl: "",
    codeUrl: "",
    featured: false,
  },
  {
    title: "PDF Tools",
    description: "Serangkaian alat online untuk mengelola PDF—gabung, pisah, dan kompres dengan cepat.",
    image: projectPDF,
    tech: ["React", "Bootstrap 5", "Node.js"],
    category: "Web Development",
    viewUrl: "https://pdf.andresptr.site/",
    codeUrl: "https://github.com/andre-sptr/pdf-tools",
    featured: false,
  },
  {
    title: "TutorinBang - Platform Tutorial",
    description: "Platform tutorial troubleshooting yang menyediakan panduan langkah demi langkah untuk berbagai masalah teknis.",
    image: projectTutorin,
    tech: ["React", "Bootstrap 5", "Node.js"],
    category: "Web Development",
    viewUrl: "https://tutorinbang.my.id/",
    codeUrl: "https://github.com/andre-sptr/tutorin",
    featured: false,
  },
  {
    title: "HarLah 10 Tahun MAN IC Siak",
    description: "Platform digital yang dirancang untuk mempublikasikan perayaan HarLah ke-10 MAN Insan Cendekia Siak.",
    image: projectHarLah,
    tech: ["React", "Bootstrap 5", "Node.js"],
    category: "Web Development",
    viewUrl: "https://harlah.icsiak.sch.id/",
    codeUrl: "https://github.com/andre-sptr/harlah",
    featured: false,
  },
  {
    title: "CloudShare - File Hosting",
    description: "Platform cloud storage modern dan aman untuk upload, simpan, dan bagikan file.",
    image: projectFile,
    tech: ["React", "Bootstrap 5", "Node.js"],
    category: "Web Development",
    viewUrl: "https://file.andresptr.site/",
    codeUrl: "https://github.com/andre-sptr/file",
    featured: false,
  },
  {
    title: "Zona Integritas MAN IC Siak",
    description: "Portal layanan digital terintegrasi untuk seluruh civitas akademika MAN Insan Cendekia Siak.",
    image: projectZI,
    tech: ["React", "Bootstrap 5", "Node.js"],
    category: "Web Development",
    viewUrl: "",
    codeUrl: "https://github.com/andre-sptr/zi",
    featured: false,
  },
  {
    title: "EduForum - MAN IC Siak",
    description: "Platform sosial edukatif untuk siswa, guru, dan alumni MAN IC Siak.",
    image: projectEduForum,
    tech: ["React", "Bootstrap 5", "Node.js"],
    category: "Web Development",
    viewUrl: "",
    codeUrl: "https://github.com/andre-sptr/eduforum",
    featured: false,
  },
  {
    title: "AetherNet",
    description: "Visualisasi real-time koneksi antar node dalam jaringan AetherNet.",
    image: projectAetherNet,
    tech: ["React", "Bootstrap 5", "Node.js"],
    category: "Web Development",
    viewUrl: "",
    codeUrl: "https://github.com/andre-sptr/aethernet",
    featured: false,
  },
  {
    title: "Aqiqah",
    description: "Undangan digital aqiqah dengan desain modern dan interaktif.",
    image: projectAqiqah,
    tech: ["React", "Tailwind"],
    category: "Web Development",
    viewUrl: "",
    codeUrl: "",
    featured: false,
  },
];

const categories = ["All", "IoT", "AI & Tools", "Web Development"];

const categoryColors: Record<string, string> = {
  IoT: "bg-emerald-500",
  "AI & Tools": "bg-primary",
  "Web Development": "bg-secondary",
};

interface TiltCardProps {
  project: (typeof projects)[number];
  className?: string;
  prefersReduced: boolean;
}

const TiltCard = ({ project, className = "", prefersReduced }: TiltCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const glareX = useMotionValue(50);
  const glareY = useMotionValue(50);

  const springRotateX = useSpring(rotateX, { stiffness: 300, damping: 30 });
  const springRotateY = useSpring(rotateY, { stiffness: 300, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReduced || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;
    rotateY.set((offsetX / rect.width - 0.5) * 24);
    rotateX.set((offsetY / rect.height - 0.5) * -24);
    glareX.set((offsetX / rect.width) * 100);
    glareY.set((offsetY / rect.height) * 100);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    glareX.set(50);
    glareY.set(50);
  };

  return (
    <motion.div
      ref={cardRef}
      className={`group relative rounded-2xl overflow-hidden glass-card hover:border-primary/40 transition-all duration-300 ${className}`}
      style={
        prefersReduced
          ? {}
          : { rotateX: springRotateX, rotateY: springRotateY, transformPerspective: 800 }
      }
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Glare overlay */}
      {!prefersReduced && (
        <motion.div
          className="absolute inset-0 pointer-events-none z-30 rounded-2xl"
          style={{
            background: `radial-gradient(circle at ${glareX.get()}% ${glareY.get()}%, rgba(255,255,255,0.12) 0%, transparent 65%)`,
          }}
        />
      )}

      {/* Featured badge (mobile) */}
      {project.featured && (
        <div className="absolute top-3 left-3 z-20 sm:hidden">
          <span className="px-2 py-0.5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-wider">
            Featured
          </span>
        </div>
      )}

      {/* Image */}
      <div className="relative aspect-video overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 flex gap-2 translate-y-0 md:translate-y-full md:group-hover:translate-y-0 transition-transform duration-300 z-20">
          {project.codeUrl && (
            <a href={project.codeUrl} target="_blank" rel="noopener noreferrer">
              <Button size="icon" variant="secondary" className="rounded-full w-9 h-9 sm:w-10 sm:h-10 hover:scale-110 transition-transform shadow-lg backdrop-blur-md">
                <Github className="w-5 h-5" />
              </Button>
            </a>
          )}
          {project.viewUrl && (
            <a href={project.viewUrl} target="_blank" rel="noopener noreferrer">
              <Button size="icon" className="rounded-full w-9 h-9 sm:w-10 sm:h-10 bg-primary hover:bg-primary/90 hover:scale-110 transition-transform shadow-lg">
                <ExternalLink className="w-5 h-5" />
              </Button>
            </a>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 sm:p-6">
        <div className="flex items-center gap-2 mb-2.5">
          <span className={`w-2 h-2 rounded-full ${categoryColors[project.category] || "bg-muted-foreground"}`} />
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            {project.category}
          </span>
        </div>
        <h3 className="text-lg sm:text-xl font-bold mb-2 group-hover:text-primary transition-colors line-clamp-1">
          {project.title}
        </h3>
        <p className="text-xs sm:text-sm text-muted-foreground mb-4 line-clamp-2">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-1.5 mt-auto">
          {project.tech.map((tech) => (
            <motion.span
              key={tech}
              whileHover={{ scale: 1.05 }}
              className="text-[11px] px-2.5 py-1 rounded-md bg-muted text-muted-foreground border border-border font-medium"
            >
              {tech}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const [filter, setFilter] = useState("All");
  const prefersReduced = usePrefersReducedMotion();
  const gridRef = useRef(null);
  const inView = useInView(gridRef, { once: true, margin: "-80px" });

  const filteredProjects = projects.filter(
    (p) => filter === "All" || p.category === filter
  );

  const isBento = filter === "All";

  return (
    <section id="projects" className="py-16 md:py-24 px-4 section-alt">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            A selection of my latest projects across networking, IoT, AI automation, and web development.
          </p>

          {/* Filter Tabs */}
          <div className="inline-flex flex-wrap justify-center gap-2 p-1.5 bg-muted/60 rounded-full border border-border">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`relative px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${
                  filter === category
                    ? "text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {filter === category && (
                  <motion.span
                    layoutId="filter-pill"
                    className="absolute inset-0 bg-primary rounded-full shadow-md"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{category}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Bento Grid (All filter) */}
        {isBento ? (
          <motion.div
            ref={gridRef}
            className="hidden lg:grid grid-cols-4 gap-5 md:gap-6 grid-flow-dense"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, i) => {
                let colClass = "col-span-1 row-span-1";
                if (project.title === "Arena Debate") colClass = "col-span-2 row-span-1";
                if (project.title === "Reka AI") colClass = "col-span-2 row-span-2";

                const alreadyVisible = i < 4;
                return (
                  <motion.div
                    key={project.title}
                    layout
                    className={colClass}
                    initial={alreadyVisible ? false : prefersReduced ? { opacity: 0 } : { opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.35, ease: "easeOut", delay: inView ? i * 0.07 : 0 }}
                  >
                    <TiltCard
                      project={project}
                      className={project.title === "Reka AI" ? "h-full" : ""}
                      prefersReduced={prefersReduced}
                    />
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        ) : null}

        {/* Tablet bento (md, hidden on lg+) */}
        {isBento ? (
          <motion.div
            className="hidden md:grid lg:hidden grid-cols-2 gap-5 grid-flow-dense"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, i) => {
                let colClass = "col-span-1";
                if (project.title === "Arena Debate") colClass = "col-span-2";
                return (
                  <motion.div
                    key={project.title}
                    layout
                    className={colClass}
                    initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.35, ease: "easeOut", delay: i * 0.05 }}
                  >
                    <TiltCard project={project} prefersReduced={prefersReduced} />
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        ) : null}

        {/* Mobile (sm) — always single column */}
        {isBento ? (
          <motion.div className="grid md:hidden grid-cols-1 gap-5">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, i) => (
                <motion.div
                  key={project.title}
                  layout
                  initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35, ease: "easeOut", delay: i * 0.04 }}
                >
                  <TiltCard project={project} prefersReduced={prefersReduced} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : null}

        {/* Filtered view (non-All) */}
        {!isBento ? (
          <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, i) => (
                <motion.div
                  key={project.title}
                  layout
                  initial={prefersReduced ? { opacity: 0 } : { opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -10 }}
                  transition={{ duration: 0.35, ease: "easeOut", delay: i * 0.05 }}
                >
                  <TiltCard project={project} prefersReduced={prefersReduced} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : null}

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-muted flex items-center justify-center">
              <Layers className="w-8 h-8 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground">No projects found for this category.</p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Projects;
