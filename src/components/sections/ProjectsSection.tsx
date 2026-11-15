"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { projects, type ProjectItem } from "@/data/projects";

export function ProjectGalleryMedia({
  project,
  isActive,
  onUserInteract,
  compact = false,
  href,
  linkClassName,
  linkAriaLabel,
}: {
  project: ProjectItem;
  isActive: boolean;
  onUserInteract?: () => void;
  compact?: boolean;
  href?: string;
  linkClassName?: string;
  linkAriaLabel?: string;
}) {
  const [slideIndex, setSlideIndex] = useState(0);
  const images = project.images.length > 0 ? project.images : [project.image];
  const safeIndex = slideIndex % images.length;
  const showControls = isActive && images.length > 1;

  function goToSlide(nextIndex: number) {
    onUserInteract?.();
    setSlideIndex((nextIndex + images.length) % images.length);
  }

  const imageEl = (
    <img
      src={images[safeIndex]}
      alt={`${project.name} screenshot ${safeIndex + 1} of ${images.length}`}
      width={1920}
      height={1080}
      loading="lazy"
      decoding="async"
      draggable={false}
      className="project-media-img"
    />
  );

  return (
    <div className={`project-media-gallery${compact ? " is-compact" : ""}`}>
      {href ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={linkClassName ?? "project-media-link"}
          aria-label={linkAriaLabel ?? `Open ${project.name} live site`}
        >
          {imageEl}
        </a>
      ) : (
        imageEl
      )}

      {showControls && (
        <>
          <div
            className="project-gallery-topbar"
            onClick={(event) => event.stopPropagation()}
            onKeyDown={(event) => event.stopPropagation()}
          >
            <span className="project-gallery-counter">
              {safeIndex + 1} / {images.length}
            </span>

            <div className="project-gallery-arrows">
              <button
                type="button"
                className="project-gallery-arrow-btn"
                aria-label={`Previous ${project.name} screenshot`}
                onClick={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                  goToSlide(safeIndex - 1);
                }}
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <button
                type="button"
                className="project-gallery-arrow-btn"
                aria-label={`Next ${project.name} screenshot`}
                onClick={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                  goToSlide(safeIndex + 1);
                }}
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div
            className="project-gallery-dots"
            role="tablist"
            aria-label={`${project.name} screenshots`}
            onClick={(event) => event.stopPropagation()}
            onKeyDown={(event) => event.stopPropagation()}
          >
            {images.map((src, idx) => (
              <button
                key={src}
                type="button"
                role="tab"
                aria-selected={idx === safeIndex}
                aria-label={`Show ${project.name} screenshot ${idx + 1}`}
                className={`project-gallery-dot${idx === safeIndex ? " is-active" : ""}`}
                onClick={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                  goToSlide(idx);
                }}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function GitHubIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

export function ProjectsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused || projects.length <= 1) {
      return;
    }

    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % projects.length);
    }, 3800);

    return () => window.clearInterval(timer);
  }, [isPaused]);

  const activeProject = projects[activeIndex] ?? projects[0];

  function handlePrev() {
    setIsPaused(true);
    setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length);
  }

  function handleNext() {
    setIsPaused(true);
    setActiveIndex((prev) => (prev + 1) % projects.length);
  }

  return (
    <section
      id="projects"
      className="projects-ref-section"
      aria-label="Selected projects"
    >
      <div className="projects-ref-container">
        <h2 className="projects-ref-heading">
          Selected
          <br />
          <span className="projects-ref-heading-muted">Projects.</span>
        </h2>

        {/* Desktop Interactive Feral Blinds "Peek" Showcase */}
        <div
          id="showcase-box"
          className="projects-ref-showcase-box"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocusCapture={() => setIsPaused(true)}
          onBlurCapture={() => setIsPaused(false)}
        >
          {projects.map((project, index) => {
            const isActive = index === activeIndex;
            return (
              <div
                key={project.id}
                role="button"
                tabIndex={0}
                aria-pressed={isActive}
                aria-label={`${project.name} — ${project.subtitle}`}
                className={`blinds-slat${isActive ? " is-active" : ""}`}
                onClick={() => setActiveIndex(index)}
                onMouseEnter={() => setActiveIndex(index)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    setActiveIndex(index);
                  }
                }}
              >
                <div className="blinds-media">
                  <ProjectGalleryMedia
                    project={project}
                    isActive={isActive}
                    onUserInteract={() => setIsPaused(true)}
                  />
                </div>

                <div className="blinds-scrim" aria-hidden="true" />

                <div className="blinds-peek-label" aria-hidden={isActive}>
                  <span className="blinds-peek-title">{project.name}</span>
                  <span className="blinds-peek-index">{project.index}</span>
                </div>

                <div className="blinds-caption" aria-hidden={!isActive}>
                  <div className="blinds-caption-copy">
                    <span className="blinds-title">{project.name}</span>
                    <span className="blinds-subtitle">{project.subtitle}</span>
                  </div>

                  <div
                    className="blinds-actions"
                    onClick={(event) => event.stopPropagation()}
                  >
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="blinds-github-btn"
                      aria-label={`View ${project.name} repository on GitHub`}
                    >
                      <GitHubIcon />
                      <span>Code</span>
                    </a>
                    <a
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="blinds-pill-btn"
                      aria-label={`Visit ${project.name} live site`}
                    >
                      <span>View Details</span>
                      <svg
                        width="11"
                        height="11"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.4"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M7 17L17 7M17 7H7M17 7V17"
                        />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile & Tablet Interactive Card Carousel */}
        <div
          className="mobile-project-carousel"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <article className="mobile-project-card" key={activeProject.id}>
            <div className="mobile-card-media-wrap">
              <ProjectGalleryMedia
                project={activeProject}
                isActive
                compact
                href={activeProject.href}
                linkClassName="mobile-card-img-link"
                linkAriaLabel={activeProject.name}
                onUserInteract={() => setIsPaused(true)}
              />
            </div>

            <div className="mobile-card-content">
              <div className="mobile-card-meta-row">
                <span className="mobile-card-index">{activeProject.index}</span>
                <span className="mobile-card-period">{activeProject.period}</span>
              </div>
              <h3 className="mobile-card-title">{activeProject.name}</h3>
              <p className="mobile-card-desc">{activeProject.description}</p>

              <div className="mobile-card-action-row">
                <a
                  href={activeProject.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mobile-card-github-btn"
                >
                  <GitHubIcon />
                  <span>Code</span>
                </a>
                <a
                  href={activeProject.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mobile-card-pill-btn"
                >
                  <span>View Details</span>
                  <svg
                    width="11"
                    height="11"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M7 17L17 7M17 7H7M17 7V17"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </article>

          <div className="mobile-carousel-nav">
            <button
              type="button"
              className="mobile-carousel-arrow"
              onClick={handlePrev}
              aria-label="Previous project"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <div className="bld-dots" role="tablist" aria-label="Select project">
              {projects.map((project, index) => (
                <button
                  key={project.id}
                  type="button"
                  role="tab"
                  aria-selected={index === activeIndex}
                  aria-label={`Show ${project.name}`}
                  className={`bld-dot${index === activeIndex ? " is-on" : ""}`}
                  onClick={() => {
                    setIsPaused(true);
                    setActiveIndex(index);
                  }}
                />
              ))}
            </div>

            <button
              type="button"
              className="mobile-carousel-arrow"
              onClick={handleNext}
              aria-label="Next project"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Bottom CTA Button */}
        <div className="projects-ref-cta-wrap">
          <Link
            href="/projects"
            className="btn-creative btn-creative-white btn-creative-wide group"
            aria-label="View All Projects"
          >
            <span className="btn-creative-text-initial">View All Projects</span>
            <span className="btn-creative-text-hover">
              <span>View All Projects</span>
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </span>
            <span className="btn-creative-bubble" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
