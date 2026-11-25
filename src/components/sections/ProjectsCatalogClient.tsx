"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { projects, type ProjectItem } from "@/data/projects";
import { ProjectGalleryMedia } from "@/components/sections/ProjectsSection";

const filterCategories = [
  { id: "all", label: "All" },
  { id: "Website", label: "Website" },
  { id: "AI Agent Tools", label: "AI Agent Tools" },
  { id: "Useful Tools", label: "Useful Tools" },
] as const;

function CatalogProjectMedia({ project }: { project: ProjectItem }) {
  return (
    <ProjectGalleryMedia
      project={project}
      isActive
      compact
      href={project.href}
      linkClassName="project-media-link"
      linkAriaLabel={`${project.name} preview`}
    />
  );
}

export function ProjectsCatalogClient() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const trackRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const btnRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const updateFilterLine = useCallback((category: string) => {
    const track = trackRef.current;
    const line = lineRef.current;
    const btn = btnRefs.current[category];
    if (!track || !line || !btn) return;
    const trackRect = track.getBoundingClientRect();
    const btnRect = btn.getBoundingClientRect();
    line.style.left = `${btnRect.left - trackRect.left + track.scrollLeft}px`;
    line.style.width = `${btnRect.width}px`;
  }, []);

  useEffect(() => {
    updateFilterLine(activeCategory);
    const onResize = () => updateFilterLine(activeCategory);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [activeCategory, updateFilterLine]);

  const filteredProjects =
    activeCategory === "all"
      ? projects
      : projects.filter(
          (p) => p.category === activeCategory || p.tags.includes(activeCategory)
        );

  return (
    <>
      {/* Filter Bar with Sliding Underline */}
      <div
        className="filter-track"
        ref={trackRef}
        onScroll={() => updateFilterLine(activeCategory)}
      >
        {filterCategories.map(({ id, label }) => (
          <button
            key={id}
            ref={(el) => {
              btnRefs.current[id] = el;
            }}
            type="button"
            className={`filter-btn${activeCategory === id ? " active" : ""}`}
            onClick={() => {
              setActiveCategory(id);
              btnRefs.current[id]?.scrollIntoView({
                behavior: "smooth",
                block: "nearest",
                inline: "center",
              });
            }}
          >
            {label}
          </button>
        ))}
        <div ref={lineRef} className="filter-sliding-line" aria-hidden="true" />
      </div>

      {/* Projects List */}
      <div className="projects-catalog-list">
        {filteredProjects.map((project) => (
          <article key={project.id} className="projects-catalog-card group">
            <div className="projects-catalog-card-inner">
              <div className="projects-catalog-card-body">
                <div className="projects-catalog-meta">
                  <span>{project.category}</span>
                  <span className="projects-catalog-dot">•</span>
                  <span className="projects-catalog-accent">
                    {project.period} • {project.metaBadge}
                  </span>
                </div>

                <h2 className="projects-catalog-title">
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {project.name}
                  </a>
                </h2>

                <p className="projects-catalog-desc">{project.description}</p>

                <div className="projects-catalog-actions">
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-cta-link"
                  >
                    <span className="project-cta-text">View Details</span>
                    <span className="project-arrow-circle" aria-hidden="true">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2.2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </span>
                  </a>

                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-github-source"
                    >
                      <svg
                        width="13"
                        height="13"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                      <span>Source Code</span>
                    </a>
                  )}
                </div>
              </div>

              <div className="projects-catalog-media">
                <CatalogProjectMedia project={project} />
              </div>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
