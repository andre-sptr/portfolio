import { ExternalLink, ArrowRight, BookOpen } from "lucide-react";
import { Github } from "@/components/icons/BrandIcons";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { featuredProjects } from "@/data/projects";
import type { ProjectItem } from "@/data/projects";
import BrowserFrame from "@/components/BrowserFrame";

const ProjectCard = ({ project }: { project: ProjectItem }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    className="relative rounded-2xl overflow-hidden border border-white/10 flex flex-col"
    style={{ background: "var(--surface-1)" }}
  >
    <BrowserFrame url={project.viewUrl} className="rounded-none border-0 border-b border-white/[0.05]">
      <div className="relative h-44 sm:h-56 overflow-hidden">
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
          className="absolute top-3 right-3 text-[10px] font-medium tracking-[0.16em] uppercase px-2.5 py-1 rounded-full border backdrop-blur-sm font-mono-tight"
          style={{ color: project.accent, borderColor: `${project.accent}40`, background: `${project.accent}15` }}
        >
          {project.category}
        </span>
      </div>
    </BrowserFrame>

    <div className="p-5 flex flex-col gap-3 flex-1">
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

      {project.metrics && project.metrics.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {project.metrics.map((m) => (
            <div
              key={m.label}
              className="flex items-baseline gap-1.5 px-2.5 py-1 rounded-lg bg-white/[0.03] border border-white/10"
            >
              <span
                className="text-xs font-semibold font-mono-tight tabular-nums"
                style={{ color: project.accent }}
              >
                {m.value}
              </span>
              <span className="text-[9px] uppercase tracking-[0.16em] text-muted-foreground font-mono-tight">
                {m.label}
              </span>
            </div>
          ))}
        </div>
      )}

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

      <div className="flex gap-2 pt-1 mt-auto flex-wrap">
        <Link
          to={`/project/${project.id}`}
          className="flex items-center gap-2 px-5 py-3 rounded-full text-xs font-medium border border-white/20 text-muted-foreground hover:text-foreground hover:border-white/40 transition-all min-h-[44px]"
        >
          <BookOpen className="w-3.5 h-3.5" /> Case Study
        </Link>
        {project.viewUrl && (
          <a
            href={project.viewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-3 rounded-full text-xs font-medium min-h-[44px] hover:gap-3 transition-all"
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
            className="flex items-center gap-2 px-5 py-3 rounded-full text-xs font-medium border border-white/20 text-muted-foreground hover:text-foreground hover:border-white/40 transition-all min-h-[44px]"
          >
            <Github className="w-3.5 h-3.5" /> Code
          </a>
        )}
      </div>
    </div>
  </motion.div>
);

const Projects = () => (
  <section
    id="projects"
    className="py-24 md:py-32 px-4"
    style={{ background: "var(--surface-0)" }}
  >
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className="mb-12 md:mb-16 max-w-2xl"
      >
        <span className="section-label mb-3 block">Selected Work</span>
        <h2
          className="text-3xl md:text-4xl font-bold leading-tight"
          style={{ fontFamily: "'Clash Display', sans-serif", color: "var(--warm-white)" }}
        >
          Projects
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        {featuredProjects.map((p) => (
          <ProjectCard key={p.num} project={p} />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="mt-12 text-center"
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

export default Projects;
