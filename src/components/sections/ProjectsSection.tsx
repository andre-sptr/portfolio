"use client";

import Link from "next/link";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import { projects, type ProjectItem } from "@/data/projects";

function GitHubIcon() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

function ExternalArrowIcon({ size = 12 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
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
  );
}

function ChevronIcon({
  direction,
  size = 13,
}: {
  direction: "left" | "right";
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d={direction === "left" ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"}
      />
    </svg>
  );
}

export function ProjectGalleryMedia({
  project,
  isActive,
  onUserInteract,
  compact = false,
  href,
  linkClassName,
  linkAriaLabel,
  overlayClassName,
}: {
  project: ProjectItem;
  isActive: boolean;
  onUserInteract?: () => void;
  compact?: boolean;
  href?: string;
  linkClassName?: string;
  linkAriaLabel?: string;
  overlayClassName?: string;
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
    <div
      className={`project-media-gallery${compact ? " is-compact" : ""}${
        showControls ? " has-controls" : ""
      }`}
    >
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

      {overlayClassName && <div className={overlayClassName} aria-hidden="true" />}

      {showControls && (
        <>
          <div className="project-gallery-topbar">
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
                <span className="project-gallery-arrow-face" aria-hidden="true">
                  <ChevronIcon direction="left" size={12} />
                </span>
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
                <span className="project-gallery-arrow-face" aria-hidden="true">
                  <ChevronIcon direction="right" size={12} />
                </span>
              </button>
            </div>
          </div>

          <div
            className="project-gallery-dots"
            role="group"
            aria-label={`${project.name} screenshot navigation`}
          >
            {images.map((src, idx) => (
              <button
                key={src}
                type="button"
                aria-current={idx === safeIndex ? "true" : undefined}
                aria-label={`Show ${project.name} screenshot ${idx + 1} of ${images.length}`}
                className={`project-gallery-dot${
                  idx === safeIndex ? " is-active" : ""
                }`}
                onClick={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                  goToSlide(idx);
                }}
              >
                <span className="project-gallery-dot-pill" aria-hidden="true" />
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export function ProjectsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPausedByUser, setIsPausedByUser] = useState(false);
  const [isHoverPaused, setIsHoverPaused] = useState(false);
  const [isFocusPaused, setIsFocusPaused] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isDesktopViewport, setIsDesktopViewport] = useState(true);
  const [liveAnnouncement, setLiveAnnouncement] = useState("");

  const sectionRef = useRef<HTMLElement | null>(null);
  const mobileTrackRef = useRef<HTMLDivElement | null>(null);
  const scrollSettleTimerRef = useRef<number | null>(null);
  const programmaticScrollTimerRef = useRef<number | null>(null);
  const programmaticScrollRef = useRef(false);
  const activeIndexRef = useRef(activeIndex);

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  const scrollMobileTrackToIndex = useCallback(
    (index: number, instant = false) => {
      const track = mobileTrackRef.current;
      if (!track || track.offsetWidth === 0) {
        return;
      }

      const targetSlide = track.children[index] as HTMLElement | undefined;
      if (!targetSlide) {
        return;
      }

      programmaticScrollRef.current = true;
      if (programmaticScrollTimerRef.current !== null) {
        window.clearTimeout(programmaticScrollTimerRef.current);
      }

      track.scrollTo({
        left: targetSlide.offsetLeft,
        behavior: instant || prefersReducedMotion ? "auto" : "smooth",
      });
      programmaticScrollTimerRef.current = window.setTimeout(() => {
        programmaticScrollRef.current = false;
      }, 420);
    },
    [prefersReducedMotion],
  );

  const selectProject = useCallback(
    (
      nextIndex: number,
      options?: {
        userInitiated?: boolean;
        announce?: boolean;
        pauseAutoplay?: boolean;
      },
    ) => {
      if (projects.length === 0) {
        return;
      }

      const wrappedIndex = (nextIndex + projects.length) % projects.length;
      setActiveIndex(wrappedIndex);

      if (options?.pauseAutoplay) {
        setIsPausedByUser(true);
      }

      if (options?.userInitiated || window.innerWidth < 1024) {
        scrollMobileTrackToIndex(wrappedIndex);
      }

      if (options?.announce) {
        const chosen = projects[wrappedIndex];
        setLiveAnnouncement(
          `Project ${wrappedIndex + 1} of ${projects.length}: ${chosen.name}`,
        );
      }
    },
    [scrollMobileTrackToIndex],
  );

  useEffect(() => {
    const reducedQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const desktopQuery = window.matchMedia("(min-width: 1024px)");

    const syncMedia = () => {
      setPrefersReducedMotion(reducedQuery.matches);
      setIsDesktopViewport(desktopQuery.matches);
    };

    syncMedia();
    reducedQuery.addEventListener("change", syncMedia);
    desktopQuery.addEventListener("change", syncMedia);

    return () => {
      reducedQuery.removeEventListener("change", syncMedia);
      desktopQuery.removeEventListener("change", syncMedia);
    };
  }, []);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node || typeof IntersectionObserver === "undefined") {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.some(
          (entry) => entry.isIntersecting && entry.intersectionRatio > 0.15,
        );
        setIsInView(visible);
      },
      { threshold: [0, 0.15, 0.4] },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (
      projects.length <= 1 ||
      !isInView ||
      prefersReducedMotion ||
      isPausedByUser ||
      isHoverPaused ||
      isFocusPaused
    ) {
      return;
    }

    const intervalMs = isDesktopViewport ? 3800 : 3200;
    const timer = window.setInterval(() => {
      const next = (activeIndexRef.current + 1) % projects.length;
      setActiveIndex(next);
      if (window.innerWidth < 1024) {
        scrollMobileTrackToIndex(next);
      }
    }, intervalMs);

    return () => window.clearInterval(timer);
  }, [
    isDesktopViewport,
    isFocusPaused,
    isHoverPaused,
    isInView,
    isPausedByUser,
    prefersReducedMotion,
    scrollMobileTrackToIndex,
  ]);

  useEffect(() => {
    if (!isDesktopViewport) {
      scrollMobileTrackToIndex(activeIndexRef.current, true);
    }
  }, [isDesktopViewport, scrollMobileTrackToIndex]);

  useEffect(() => {
    return () => {
      if (scrollSettleTimerRef.current !== null) {
        window.clearTimeout(scrollSettleTimerRef.current);
      }
      if (programmaticScrollTimerRef.current !== null) {
        window.clearTimeout(programmaticScrollTimerRef.current);
      }
    };
  }, []);

  function handleMobileTrackScroll() {
    if (programmaticScrollRef.current) {
      return;
    }

    if (scrollSettleTimerRef.current !== null) {
      window.clearTimeout(scrollSettleTimerRef.current);
    }

    scrollSettleTimerRef.current = window.setTimeout(() => {
      const track = mobileTrackRef.current;
      if (!track || track.children.length === 0) {
        return;
      }

      const currentLeft = track.scrollLeft;
      let nearestIndex = 0;
      let smallestDelta = Number.POSITIVE_INFINITY;

      Array.from(track.children).forEach((child, index) => {
        const slideEl = child as HTMLElement;
        const delta = Math.abs(slideEl.offsetLeft - currentLeft);
        if (delta < smallestDelta) {
          smallestDelta = delta;
          nearestIndex = index;
        }
      });

      setActiveIndex((prev) => {
        if (prev !== nearestIndex) {
          setIsPausedByUser(true);
          const chosen = projects[nearestIndex];
          if (chosen) {
            setLiveAnnouncement(
              `Project ${nearestIndex + 1} of ${projects.length}: ${chosen.name}`,
            );
          }
        }
        return nearestIndex;
      });
    }, 140);
  }

  function handleDesktopSlatKeyDown(
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      selectProject(index + 1, { announce: true, pauseAutoplay: true });
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      selectProject(index - 1, { announce: true, pauseAutoplay: true });
    }
  }

  function handleMobileTrackKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      selectProject(activeIndex + 1, {
        userInitiated: true,
        announce: true,
        pauseAutoplay: true,
      });
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      selectProject(activeIndex - 1, {
        userInitiated: true,
        announce: true,
        pauseAutoplay: true,
      });
    }
  }

  const showAutoplayToggle = projects.length > 1 && !prefersReducedMotion;

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="projects-ref-section"
      aria-label="Selected projects"
    >
      <div className="projects-ref-container">
        <div className="projects-ref-header">
          <h2 className="projects-ref-heading">
            Selected
            <br />
            <span className="projects-ref-heading-muted">Projects.</span>
          </h2>

          {showAutoplayToggle && (
            <button
              type="button"
              className="projects-autoplay-btn"
              aria-pressed={isPausedByUser}
              aria-label={
                isPausedByUser
                  ? "Resume project showcase autoplay"
                  : "Pause project showcase autoplay"
              }
              onClick={() => setIsPausedByUser((prev) => !prev)}
            >
              {isPausedByUser ? (
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              ) : (
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M6 5h4v14H6zm8 0h4v14h-4z" />
                </svg>
              )}
              <span>{isPausedByUser ? "Paused" : "Pause"}</span>
            </button>
          )}
        </div>

        {/* Desktop Interactive Feral Blinds "Peek" Showcase */}
        <div
          id="showcase-box"
          className="projects-ref-showcase-box"
          role="region"
          aria-label="Selected projects showcase"
          onMouseEnter={() => setIsHoverPaused(true)}
          onMouseLeave={() => setIsHoverPaused(false)}
          onFocusCapture={() => setIsFocusPaused(true)}
          onBlurCapture={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
              setIsFocusPaused(false);
            }
          }}
        >
          {projects.map((project, index) => {
            const isActive = index === activeIndex;

            return (
              <article
                key={project.id}
                className={`blinds-slat${isActive ? " is-active" : ""}`}
                onMouseEnter={() => setActiveIndex(index)}
              >
                {!isActive && (
                  <button
                    type="button"
                    className="blinds-slat-trigger"
                    aria-pressed={false}
                    aria-label={`Expand ${project.name}: ${project.subtitle}`}
                    onClick={() =>
                      selectProject(index, {
                        announce: true,
                        pauseAutoplay: true,
                      })
                    }
                    onKeyDown={(event) => handleDesktopSlatKeyDown(event, index)}
                  >
                    <span className="blinds-peek-label" aria-hidden="true">
                      <span className="blinds-peek-title">{project.name}</span>
                      <span className="blinds-peek-index">{project.index}</span>
                    </span>
                  </button>
                )}

                <div className="blinds-media">
                  <ProjectGalleryMedia
                    project={project}
                    isActive={isActive}
                    href={isActive ? project.href : undefined}
                    linkAriaLabel={`Visit ${project.name} live site`}
                    overlayClassName="blinds-scrim"
                    onUserInteract={() => setIsPausedByUser(true)}
                  />
                </div>

                <div className="blinds-caption" aria-hidden={!isActive}>
                  <div className="blinds-caption-copy">
                    <h3 className="blinds-title">{project.name}</h3>
                    <p className="blinds-subtitle">{project.subtitle}</p>
                  </div>

                  <div className="blinds-actions">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      tabIndex={isActive ? undefined : -1}
                      className="blinds-github-btn"
                      aria-label={`${project.name} source code on GitHub`}
                    >
                      <GitHubIcon />
                      <span>Code</span>
                    </a>
                    <a
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      tabIndex={isActive ? undefined : -1}
                      className="blinds-pill-btn"
                      aria-label={`View details for ${project.name}`}
                    >
                      <span>View Details</span>
                      <ExternalArrowIcon size={12} />
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Mobile & Tablet Horizontal Swipeable Project Carousel */}
        <div
          className="mobile-project-carousel"
          role="region"
          aria-roledescription="carousel"
          aria-label="Selected projects carousel"
          onMouseEnter={() => setIsHoverPaused(true)}
          onMouseLeave={() => setIsHoverPaused(false)}
          onFocusCapture={() => setIsFocusPaused(true)}
          onBlurCapture={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
              setIsFocusPaused(false);
            }
          }}
        >
          {projects.length > 1 && (
            <div className="mobile-carousel-toolbar">
              <span className="mobile-carousel-counter" aria-hidden="true">
                {String(activeIndex + 1).padStart(2, "0")} /{" "}
                {String(projects.length).padStart(2, "0")}
              </span>

              <div className="mobile-carousel-arrows">
                <button
                  type="button"
                  className="mobile-carousel-arrow"
                  aria-label="Previous project"
                  onClick={() =>
                    selectProject(activeIndex - 1, {
                      userInitiated: true,
                      announce: true,
                      pauseAutoplay: true,
                    })
                  }
                >
                  <ChevronIcon direction="left" size={14} />
                </button>
                <button
                  type="button"
                  className="mobile-carousel-arrow"
                  aria-label="Next project"
                  onClick={() =>
                    selectProject(activeIndex + 1, {
                      userInitiated: true,
                      announce: true,
                      pauseAutoplay: true,
                    })
                  }
                >
                  <ChevronIcon direction="right" size={14} />
                </button>
              </div>
            </div>
          )}

          <div
            ref={mobileTrackRef}
            className="mobile-carousel-track"
            tabIndex={0}
            aria-label="Project slides"
            onScroll={handleMobileTrackScroll}
            onKeyDown={handleMobileTrackKeyDown}
          >
            {projects.map((project, index) => (
              <article
                key={project.id}
                className="mobile-carousel-slide mobile-project-card"
                role="group"
                aria-roledescription="slide"
                aria-label={`${index + 1} of ${projects.length}: ${project.name}`}
              >
                <div className="mobile-card-media-wrap">
                  <ProjectGalleryMedia
                    project={project}
                    isActive={index === activeIndex}
                    compact
                    href={project.href}
                    linkClassName="mobile-card-img-link"
                    linkAriaLabel={`Visit ${project.name} live site`}
                    onUserInteract={() => setIsPausedByUser(true)}
                  />
                </div>

                <div className="mobile-card-content">
                  <h3 className="mobile-card-title">
                    <a
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mobile-card-title-link"
                    >
                      {project.name}
                    </a>
                  </h3>
                  <p className="mobile-card-desc">{project.description}</p>

                  <div className="mobile-card-action-row">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mobile-card-github-btn"
                      aria-label={`${project.name} source code on GitHub`}
                    >
                      <GitHubIcon />
                      <span>Code</span>
                    </a>
                    <a
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mobile-card-pill-btn"
                      aria-label={`View details for ${project.name}`}
                    >
                      <span>View Details</span>
                      <ExternalArrowIcon size={11} />
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {projects.length > 1 && (
            <div className="mobile-carousel-nav">
              <div
                className="bld-dots"
                role="group"
                aria-label="Choose a project slide"
              >
                {projects.map((project, index) => (
                  <button
                    key={project.id}
                    type="button"
                    aria-current={index === activeIndex ? "true" : undefined}
                    aria-label={`Go to ${project.name} (${index + 1} of ${projects.length})`}
                    className={`bld-dot${index === activeIndex ? " is-on" : ""}`}
                    onClick={() =>
                      selectProject(index, {
                        userInitiated: true,
                        announce: true,
                        pauseAutoplay: true,
                      })
                    }
                  >
                    <span className="bld-dot-pill" aria-hidden="true" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="projects-sr-only" role="status" aria-live="polite" aria-atomic="true">
          {liveAnnouncement}
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
