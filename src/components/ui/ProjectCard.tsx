import type { Project } from "@/data/projects";
import { ProjectDialog } from "@/components/ui/ProjectDialog";
import { ProjectVisual } from "@/components/ui/ProjectVisual";

type ProjectCardProps = {
  project: Project;
  index: number;
};

export function ProjectCard({ project, index }: ProjectCardProps) {
  const featured = index < 2;

  return (
    <article className={`project-card project-${project.kind}${featured ? ` project-featured project-featured-${index + 1}` : ""}`}>
      <ProjectVisual kind={project.kind} />
      <div className="project-card-body">
        <div className="project-meta">
          <span className="project-category">{project.category}</span>
          <span className="mono project-period">{project.period}</span>
        </div>
        <div className="project-title-row">
          <div>
            <h3>{project.name}</h3>
            <p className="project-subtitle">{project.subtitle}</p>
          </div>
          <span className="project-index mono" aria-label={`Project ${index + 1}`}>
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>
        <p className="project-description">{project.description}</p>
        <div className="project-card-bottom">
          <span>{project.organization}</span>
          <ProjectDialog project={project} />
        </div>
      </div>
    </article>
  );
}
