import { useRef } from "react";
import { ExternalLink, Github, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useIsMobile } from "@/hooks/use-mobile";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

gsap.registerPlugin(ScrollTrigger);

// 4 featured projects only (D5 decision)
const featured = [
  {
    num: "01",
    title: "Arena Debate",
    subtitle: "Multi-Agent AI Debate System",
    description:
      "Lima AI agent berdebat dalam format Tim 2v2, menganalisis topik apa pun secara mendalam dan mencapai kesimpulan berbasis konsensus.",
    tech: ["Next.js", "Gemini AI", "Node.js"],
    category: "AI & Tools",
    image: "/pages/debatePage.png",
    viewUrl: "https://debat.andresptr.site/",
    codeUrl: "",
    accent: "#818cf8",
  },
  {
    num: "02",
    title: "Reka AI",
    subtitle: "AI-Assisted Coding Platform",
    description:
      "Platform AI untuk membantu developer menulis, debugging, dan optimasi kode secara real-time dengan konteks proyek penuh.",
    tech: ["React", "Gemini AI", "Node.js"],
    category: "AI & Tools",
    image: "/pages/rekaPage.png",
    viewUrl: "",
    codeUrl: "https://github.com/andre-sptr/ai",
    accent: "#22d3ee",
  },
  {
    num: "03",
    title: "Fiscal AI Finance",
    subtitle: "Personal Finance Manager",
    description:
      "Web app manajemen keuangan personal berbasis AI untuk kategorisasi pengeluaran otomatis dan analisis finansial prediktif.",
    tech: ["React", "AI", "Node.js"],
    category: "AI & Tools",
    image: "/pages/fiscalPage.png",
    viewUrl: "",
    codeUrl: "https://github.com/andre-sptr/fiscal",
    accent: "#34d399",
  },
  {
    num: "04",
    title: "AetherNet",
    subtitle: "Real-time Network Monitor",
    description:
      "Dashboard monitoring jaringan real-time dengan visualisasi topologi interaktif dan alerting berbasis threshold.",
    tech: ["React", "WebSocket", "D3.js"],
    category: "Infrastructure",
    image: "/pages/aethernetPage.png",
    viewUrl: "",
    codeUrl: "",
    accent: "#f59e0b",
  },
];

// Desktop: full-bleed horizontal panel with parallax layers
const ProjectPanel = ({
  project,
  index,
}: {
  project: (typeof featured)[0];
  index: number;
}) => {
  const isEven = index % 2 === 0;

  return (
    <div
      className="project-panel relative flex-shrink-0 w-screen h-screen flex items-center justify-center overflow-hidden"
      style={{ background: "var(--surface-0)" }}
    >
      {/* Ambient glow behind image */}
      <div
        className="absolute w-[50vw] h-[50vw] rounded-full blur-[120px] opacity-10 pointer-events-none"
        style={{
          background: project.accent,
          right: isEven ? "5%" : "auto",
          left: isEven ? "auto" : "5%",
          top: "50%",
          transform: "translateY(-50%)",
        }}
      />

      <div
        className={`relative z-10 w-full max-w-7xl mx-auto px-8 grid grid-cols-2 gap-16 items-center ${
          isEven ? "" : "direction-rtl"
        }`}
      >
        {/* Text side */}
        <div className={`flex flex-col gap-6 ${isEven ? "order-1" : "order-2"}`}>
          <div className="flex items-center gap-3">
            <span
              className="text-7xl font-bold opacity-10 leading-none select-none"
              style={{ fontFamily: "'Clash Display', sans-serif", color: project.accent }}
            >
              {project.num}
            </span>
            <span
              className="text-xs font-medium tracking-[0.2em] uppercase px-3 py-1 rounded-full border"
              style={{ color: project.accent, borderColor: `${project.accent}40` }}
            >
              {project.category}
            </span>
          </div>

          <div>
            <h2
              className="text-5xl font-bold leading-tight mb-2 project-title"
              style={{ fontFamily: "'Clash Display', sans-serif", color: "var(--warm-white)" }}
            >
              {project.title}
            </h2>
            <p className="text-lg font-medium" style={{ color: project.accent }}>
              {project.subtitle}
            </p>
          </div>

          <p className="text-base leading-relaxed text-muted-foreground max-w-md project-desc">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 project-tech">
            {project.tech.map((t) => (
              <span
                key={t}
                className="text-xs px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-muted-foreground"
              >
                {t}
              </span>
            ))}
          </div>

          <div className="flex gap-3 project-cta">
            {project.viewUrl && (
              <a
                href={project.viewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 hover:gap-3"
                style={{
                  background: project.accent,
                  color: "#0a0a0f",
                }}
              >
                Live Demo <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
            {project.codeUrl && (
              <a
                href={project.codeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium border border-white/20 text-muted-foreground hover:text-foreground hover:border-white/40 transition-all duration-300"
              >
                <Github className="w-3.5 h-3.5" /> Code
              </a>
            )}
            {!project.viewUrl && !project.codeUrl && (
              <span className="text-xs text-muted-foreground/50 italic">In progress</span>
            )}
          </div>
        </div>

        {/* Image side */}
        <div
          className={`relative ${isEven ? "order-2" : "order-1"} project-img-wrap`}
        >
          {/* Frame */}
          <div
            className="absolute -inset-3 rounded-2xl opacity-20"
            style={{
              background: `linear-gradient(135deg, ${project.accent}40, transparent)`,
              border: `1px solid ${project.accent}30`,
            }}
          />
          <div className="relative rounded-xl overflow-hidden shadow-2xl">
            {/* Parallax image layer — GSAP moves this */}
            <div className="project-img-inner">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-[400px] object-cover object-top"
                loading="lazy"
              />
            </div>
            {/* Overlay gradient */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `linear-gradient(to top, ${project.accent}20 0%, transparent 50%)`,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// Mobile: vertical stack with whileInView
const ProjectCardMobile = ({ project }: { project: (typeof featured)[0] }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    className="relative rounded-2xl overflow-hidden border border-white/10"
    style={{ background: "var(--surface-1)" }}
  >
    <div className="relative h-48 overflow-hidden">
      <img
        src={project.image}
        alt={project.title}
        className="w-full h-full object-cover object-top"
        loading="lazy"
      />
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(to top, var(--surface-1) 0%, transparent 60%)`,
        }}
      />
      <span
        className="absolute top-3 right-3 text-xs font-medium tracking-widest uppercase px-2.5 py-1 rounded-full border backdrop-blur-sm"
        style={{ color: project.accent, borderColor: `${project.accent}40`, background: `${project.accent}15` }}
      >
        {project.category}
      </span>
    </div>

    <div className="p-5 flex flex-col gap-3">
      <div>
        <h3
          className="text-xl font-bold leading-tight"
          style={{ fontFamily: "'Clash Display', sans-serif", color: "var(--warm-white)" }}
        >
          {project.title}
        </h3>
        <p className="text-sm font-medium mt-0.5" style={{ color: project.accent }}>
          {project.subtitle}
        </p>
      </div>

      <p className="text-sm text-muted-foreground leading-relaxed">{project.description}</p>

      <div className="flex flex-wrap gap-1.5">
        {project.tech.map((t) => (
          <span
            key={t}
            className="text-xs px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-muted-foreground"
          >
            {t}
          </span>
        ))}
      </div>

      <div className="flex gap-2 pt-1">
        {project.viewUrl && (
          <a
            href={project.viewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-3 rounded-full text-xs font-medium min-h-[44px]"
            style={{ background: project.accent, color: "#0a0a0f" }}
          >
            Live <ExternalLink className="w-3.5 h-3.5" />
          </a>
        )}
        {project.codeUrl && (
          <a
            href={project.codeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-3 rounded-full text-xs font-medium border border-white/20 text-muted-foreground min-h-[44px]"
          >
            <Github className="w-3.5 h-3.5" /> Code
          </a>
        )}
      </div>
    </div>
  </motion.div>
);

const ProjectsMobile = () => (
  <section id="projects" className="py-24 px-4" style={{ background: "var(--surface-0)" }}>
    <div className="max-w-lg mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-12 text-center"
      >
        <span className="text-xs font-medium tracking-[0.25em] uppercase text-primary mb-3 block">
          Selected Work
        </span>
        <h2
          className="text-4xl font-bold"
          style={{ fontFamily: "'Clash Display', sans-serif", color: "var(--warm-white)" }}
        >
          Projects
        </h2>
      </motion.div>

      <div className="flex flex-col gap-6">
        {featured.map((p) => (
          <ProjectCardMobile key={p.num} project={p} />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="mt-10 text-center"
      >
        <a
          href="https://github.com/andre-sptr"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          View all on GitHub <ArrowRight className="w-4 h-4" />
        </a>
      </motion.div>
    </div>
  </section>
);

const Projects = () => {
  const isMobile = useIsMobile();
  const prefersReduced = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (isMobile || prefersReduced || !trackRef.current || !sectionRef.current) return;

      const panels = gsap.utils.toArray<HTMLElement>(".project-panel");
      // Visual travel distance (how far the track slides)
      const trackTravel = (panels.length - 1) * window.innerWidth;
      // Scroll distance the pin holds — 1× viewport HEIGHT per panel transition
      // (much shorter than 1× viewport WIDTH, cuts ~44% of scroll on typical screens)
      const scrollDist = (panels.length - 1) * window.innerHeight;

      // Master horizontal scroll timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          start: "top top",
          end: () => `+=${scrollDist}`,
          scrub: 1.2,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });

      tl.to(trackRef.current, {
        x: () => -trackTravel,
        ease: "none",
        duration: 1,
      });

      // Per-panel entrance animations (stagger in at panel's own progress)
      panels.forEach((panel, i) => {
        const progress = i / panels.length;
        const title = panel.querySelector(".project-title");
        const desc = panel.querySelector(".project-desc");
        const tech = panel.querySelector(".project-tech");
        const cta = panel.querySelector(".project-cta");
        const imgWrap = panel.querySelector(".project-img-wrap");

        if (i > 0) {
          tl.from(
            [title, desc, tech, cta].filter(Boolean),
            { opacity: 0, y: 30, stagger: 0.04, duration: 0.15, ease: "power2.out" },
            progress + 0.02
          );
        }

        // Parallax: image moves slightly opposite scroll direction
        if (imgWrap) {
          tl.fromTo(
            imgWrap.querySelector(".project-img-inner"),
            { xPercent: -6 },
            { xPercent: 6, ease: "none", duration: 1 },
            i / panels.length
          );
        }
      });

      // Section label parallax
      const label = sectionRef.current.querySelector(".projects-label");
      if (label) {
        tl.fromTo(label, { xPercent: 0 }, { xPercent: -60, ease: "none", duration: 1 }, 0);
      }
    },
    { scope: sectionRef, dependencies: [isMobile, prefersReduced] }
  );

  if (isMobile) return <ProjectsMobile />;

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative overflow-hidden"
      style={{ background: "var(--surface-0)" }}
    >
      {/* Giant watermark label — parallaxes opposite scroll */}
      <div
        className="projects-label absolute top-6 left-0 pointer-events-none select-none z-0 whitespace-nowrap"
        style={{
          fontFamily: "'Clash Display', sans-serif",
          fontSize: "clamp(6rem, 15vw, 14rem)",
          fontWeight: 700,
          color: "transparent",
          WebkitTextStroke: "1px rgba(255,255,255,0.04)",
          lineHeight: 1,
        }}
      >
        PROJECTS
      </div>

      {/* Section header — stays fixed at top-left while panels scroll */}
      <div className="absolute top-10 left-10 z-20 pointer-events-none">
        <span className="text-xs font-medium tracking-[0.25em] uppercase text-primary block mb-1">
          Selected Work
        </span>
        <span
          className="text-2xl font-bold"
          style={{ fontFamily: "'Clash Display', sans-serif", color: "var(--warm-white)" }}
        >
          Projects
        </span>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 right-10 z-20 flex items-center gap-2 text-xs text-muted-foreground/50 pointer-events-none">
        <span>scroll</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </div>

      {/* Horizontal track */}
      <div ref={trackRef} className="flex" style={{ width: `${featured.length * 100}vw` }}>
        {featured.map((project, i) => (
          <ProjectPanel key={project.num} project={project} index={i} />
        ))}
      </div>
    </section>
  );
};

export default Projects;
