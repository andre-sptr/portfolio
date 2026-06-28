import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import { Github } from "@/components/icons/BrandIcons";
import SEO from "@/components/SEO";
import Footer from "@/components/Footer";
import NotFound from "./NotFound";
import { getCaseStudy, caseStudyProjects } from "@/data/projects";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const ProjectDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const prefersReduced = usePrefersReducedMotion();
  const project = slug ? getCaseStudy(slug) : undefined;

  // Unknown slug or a non-featured project → 404.
  if (!project) return <NotFound />;

  const index = caseStudyProjects.findIndex((p) => p.id === project.id);
  const count = caseStudyProjects.length;
  const prev = caseStudyProjects[(index - 1 + count) % count];
  const next = caseStudyProjects[(index + 1) % count];

  const fade = prefersReduced
    ? {}
    : {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
      };

  const schema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    headline: project.subtitle,
    description: project.description,
    image: `https://andresptr.site${project.image}`,
    url: `https://andresptr.site/project/${project.id}`,
    author: {
      "@type": "Person",
      "@id": "https://andresptr.site/#person",
      name: "Andre Saputra",
    },
  };

  const narrative = [
    { label: "Problem", body: project.problem },
    { label: "Solution", body: project.solution },
    { label: "Impact", body: project.impact },
  ];

  return (
    <main className="min-h-screen bg-[var(--surface-0)] text-foreground grain">
      <SEO
        title={`${project.title} — Case Study`}
        description={project.description}
        image={project.image}
        url={`https://andresptr.site/project/${project.id}`}
        type="article"
        schema={schema}
      />

      {/* Top bar */}
      <div className="sticky top-0 z-30 backdrop-blur-md bg-[var(--surface-0)]/70 border-b border-white/[0.06]">
        <div className="mx-auto max-w-5xl px-6 h-14 flex items-center justify-between">
          {/* Full anchor so the homepage scrolls to the #projects section */}
          <a
            href="/#projects"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-[var(--electric)] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali ke Projects
          </a>
          <Link to="/" className="font-bold tracking-tight text-[var(--warm-white)]">
            Andre<span className="text-[var(--electric)]">.dev</span>
          </Link>
        </div>
      </div>

      <article className="mx-auto max-w-5xl px-6 py-12 md:py-16">
        {/* Header */}
        <motion.header {...fade} className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span
              className="text-5xl font-bold opacity-20 leading-none select-none"
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
          <h1
            className="text-4xl md:text-6xl font-bold leading-tight mb-2"
            style={{ fontFamily: "'Clash Display', sans-serif", color: "var(--warm-white)" }}
          >
            {project.title}
          </h1>
          <p className="text-lg md:text-xl font-medium mb-6" style={{ color: project.accent }}>
            {project.subtitle}
          </p>
          <div className="flex flex-wrap gap-3">
            {project.viewUrl && (
              <a
                href={project.viewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all hover:gap-3"
                style={{ background: project.accent, color: "#0a0a0f" }}
              >
                Live Demo <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
            {project.codeUrl && (
              <a
                href={project.codeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium border border-white/20 text-muted-foreground hover:text-foreground hover:border-white/40 transition-all"
              >
                <Github className="w-3.5 h-3.5" /> Code
              </a>
            )}
          </div>
        </motion.header>

        {/* Hero screenshot */}
        <motion.div {...fade} className="relative mb-12">
          <div
            className="absolute -inset-2 rounded-2xl opacity-20"
            style={{
              background: `linear-gradient(135deg, ${project.accent}40, transparent)`,
              border: `1px solid ${project.accent}30`,
            }}
          />
          <div className="relative rounded-xl overflow-hidden shadow-2xl">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-auto block"
              loading="eager"
              decoding="async"
            />
          </div>
        </motion.div>

        {/* Overview */}
        <section className="mb-12">
          <p className="section-label mb-3">Overview</p>
          <p className="text-base md:text-lg leading-relaxed text-muted-foreground max-w-3xl">
            {project.description}
          </p>
        </section>

        {/* Narrative: Problem / Solution / Impact */}
        <section className="grid md:grid-cols-3 gap-5 mb-12">
          {narrative.map((block) => (
            <div key={block.label} className="glass-card p-6 rounded-2xl border border-white/[0.06]">
              <h2
                className="text-sm font-bold uppercase tracking-[0.15em] mb-3"
                style={{ color: project.accent }}
              >
                {block.label}
              </h2>
              <p className="text-sm leading-relaxed text-muted-foreground">{block.body}</p>
            </div>
          ))}
        </section>

        {/* Meta */}
        <section className="mb-16 grid sm:grid-cols-[160px_1fr] gap-4 border-t border-white/[0.06] pt-8">
          <div>
            <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground/60 mb-1">Role</p>
            <p className="text-sm text-[var(--warm-white)]">{project.role}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground/60 mb-2">Tech Stack</p>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="text-xs px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-muted-foreground"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Prev / Next */}
        <nav className="grid grid-cols-2 gap-4 border-t border-white/[0.06] pt-8">
          <Link to={`/project/${prev.id}`} className="group flex flex-col gap-1 text-left">
            <span className="inline-flex items-center gap-1 text-xs text-muted-foreground/60">
              <ArrowLeft className="w-3 h-3" /> Prev
            </span>
            <span className="text-sm font-medium text-[var(--warm-white)] group-hover:text-[var(--electric)] transition-colors">
              {prev.title}
            </span>
          </Link>
          <Link to={`/project/${next.id}`} className="group flex flex-col gap-1 text-right items-end">
            <span className="inline-flex items-center gap-1 text-xs text-muted-foreground/60">
              Next <ArrowRight className="w-3 h-3" />
            </span>
            <span className="text-sm font-medium text-[var(--warm-white)] group-hover:text-[var(--electric)] transition-colors">
              {next.title}
            </span>
          </Link>
        </nav>
      </article>

      <Footer />
    </main>
  );
};

export default ProjectDetail;
