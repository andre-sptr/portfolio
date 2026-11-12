import { projects } from "@/data/projects";
import { interfaceCopy } from "@/data/profile";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectCard } from "@/components/ui/ProjectCard";

export function ProjectsSection() {
  return (
    <section id="projects" className="projects-section section" tabIndex={-1} aria-labelledby="projects-title">
      <div className="container">
        <SectionHeading
          index="03"
          label="SELECTED WORK"
          title={interfaceCopy.projects.title}
          description={interfaceCopy.projects.description}
          headingId="projects-title"
        >
          <span className="project-count mono">{interfaceCopy.projects.count}</span>
        </SectionHeading>

        <div className="projects-context" data-reveal>
          <span className="projects-context-label">PROJECT CONTEXT</span>
          <p>These selected digital projects complement my infrastructure and radio communication experience. They are presented as software and automation work, not as radio system deployments.</p>
        </div>

        <div className="projects-grid">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        <p className="projects-note">
          <span className="note-cross" aria-hidden="true">+</span>
          Interface illustrations are conceptual representations, not screenshots of production systems.
        </p>
      </div>
    </section>
  );
}
