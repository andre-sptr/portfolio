import { useRef } from "react";
import { motion } from "framer-motion";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/motion/gsap";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { useIsMobile } from "@/hooks/use-mobile";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

gsap.registerPlugin(DrawSVGPlugin);

const timeline = [
  {
    year: "Jan – Jun 2026",
    role: "Admin Operation",
    org: "PT Telkom Infrastruktur Indonesia (Outsourced)",
    type: "work",
    accent: "#818cf8",
    bullets: [
      "Managed Note-B incident ticket resolution end-to-end",
      "Ensured technician compliance with SLA targets",
      "Installed & maintained fiber optic cabling in the data center",
    ],
  },
  {
    year: "Jan – Dec 2025",
    role: "Informatics Teacher & Robotics Coach",
    org: "MAN Insan Cendekia Siak",
    type: "work",
    accent: "#22d3ee",
    bullets: [
      "Taught Informatics and developed teaching materials",
      "Mentored Coding & Robotics extracurricular programs",
      "Coached the student robotics team for tech competitions",
    ],
  },
  {
    year: "Mar – Jul 2024",
    role: "Intern – Network Support",
    org: "PT PLN Icon Plus, Batam",
    type: "work",
    accent: "#34d399",
    bullets: [
      "Installed, configured & troubleshot network infrastructure",
      "Deployed & maintained network solutions for clients",
      "Managed operational data records and field documentation",
    ],
  },
  {
    year: "Oct 2021 – Oct 2025",
    role: "Electronics & Telecommunication Engineering",
    org: "Politeknik Caltex Riau",
    type: "edu",
    accent: "#f59e0b",
    bullets: [
      "GPA 3.67/4.00 — Cum Laude",
      "Focus: Networking, IoT, Embedded Systems",
      "Certifications: Cisco CCNA & BNSP Computer Networking",
    ],
  },
];

// SVG spine that GSAP draws as you scroll
const TimelineSpine = () => (
  <svg
    className="timeline-svg absolute left-1/2 -translate-x-1/2 top-0 h-full pointer-events-none"
    width="2"
    style={{ overflow: "visible" }}
    preserveAspectRatio="none"
  >
    {/* Static dim track */}
    <line
      x1="1" y1="0" x2="1" y2="100%"
      stroke="rgba(255,255,255,0.06)"
      strokeWidth="2"
    />
    {/* Animated draw line */}
    <line
      className="timeline-draw"
      x1="1" y1="0" x2="1" y2="100%"
      stroke="url(#spineGrad)"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <defs>
      <linearGradient id="spineGrad" x1="0" y1="0" x2="0" y2="1" gradientUnits="objectBoundingBox">
        <stop offset="0%" stopColor="#818cf8" />
        <stop offset="50%" stopColor="#22d3ee" />
        <stop offset="100%" stopColor="#ec4899" />
      </linearGradient>
    </defs>
  </svg>
);

type TimelineEntry = (typeof timeline)[0];

const TimelineCard = ({
  entry,
  side,
  index,
}: {
  entry: TimelineEntry;
  side: "left" | "right";
  index: number;
}) => {
  const isLeft = side === "left";

  return (
    <div
      className={`timeline-card relative flex items-start gap-8 ${isLeft ? "flex-row" : "flex-row-reverse"
        }`}
      style={{ marginBottom: "4rem" }}
    >
      {/* Content box */}
      <div
        className={`w-[calc(50%-3rem)] ${isLeft ? "text-right" : "text-left"}`}
      >
        <div
          className="inline-block rounded-2xl p-5 border border-white/8 backdrop-blur-sm transition-all duration-300 hover:border-white/15"
          style={{ background: "var(--surface-1)" }}
        >
          {/* Year + type badge */}
          <div
            className={`flex items-center gap-2 mb-3 ${isLeft ? "justify-end" : "justify-start"
              }`}
          >
            <span
              className="text-xs font-medium tracking-widest uppercase px-2.5 py-0.5 rounded-full border"
              style={{
                color: entry.accent,
                borderColor: `${entry.accent}40`,
                background: `${entry.accent}15`,
              }}
            >
              {entry.type === "edu" ? "Education" : "Work"}
            </span>
            <span className="text-xs text-muted-foreground/60 font-mono">
              {entry.year}
            </span>
          </div>

          <h3
            className="text-lg font-bold leading-tight mb-0.5"
            style={{
              fontFamily: "'Clash Display', sans-serif",
              color: "var(--warm-white)",
            }}
          >
            {entry.role}
          </h3>
          <p className="text-sm font-medium mb-3" style={{ color: entry.accent }}>
            {entry.org}
          </p>

          <ul
            className={`flex flex-col gap-1.5 ${isLeft ? "items-end" : "items-start"
              }`}
          >
            {entry.bullets.map((b, i) => (
              <li
                key={i}
                className="text-xs text-muted-foreground leading-relaxed max-w-xs"
              >
                {b}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Center dot */}
      <div className="relative flex-shrink-0 w-24 flex items-center justify-center mt-5">
        <div
          className="timeline-dot w-3.5 h-3.5 rounded-full border-2 z-10 relative"
          style={{
            borderColor: entry.accent,
            background: "var(--surface-0)",
            boxShadow: `0 0 12px ${entry.accent}60`,
          }}
        />
      </div>

      {/* Empty opposite side */}
      <div className="w-[calc(50%-3rem)]" />
    </div>
  );
};

// Mobile: single-column left-aligned timeline
const ExperienceMobile = () => (
  <section
    id="experience"
    className="py-24 px-4"
    style={{ background: "var(--surface-0)" }}
  >
    <div className="max-w-lg mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-12 text-center"
      >
        <span className="text-xs font-medium tracking-[0.25em] uppercase text-primary mb-3 block">
          Journey
        </span>
        <h2
          className="text-4xl font-bold"
          style={{
            fontFamily: "'Clash Display', sans-serif",
            color: "var(--warm-white)",
          }}
        >
          Experience
        </h2>
      </motion.div>

      <div className="relative pl-6 border-l border-white/10">
        {timeline.map((entry, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
            className="relative mb-8"
          >
            {/* Dot on border */}
            <div
              className="absolute -left-[1.45rem] top-5 w-3 h-3 rounded-full border-2"
              style={{
                borderColor: entry.accent,
                background: "var(--surface-0)",
              }}
            />

            <div
              className="rounded-2xl p-4 border border-white/8"
              style={{ background: "var(--surface-1)" }}
            >
              <div className="flex items-center gap-2 mb-2">
                <span
                  className="text-xs font-medium tracking-widest uppercase px-2 py-0.5 rounded-full border"
                  style={{
                    color: entry.accent,
                    borderColor: `${entry.accent}40`,
                    background: `${entry.accent}15`,
                  }}
                >
                  {entry.type === "edu" ? "Education" : "Work"}
                </span>
                <span className="text-xs text-muted-foreground/60 font-mono">
                  {entry.year}
                </span>
              </div>
              <h3
                className="text-base font-bold mb-0.5"
                style={{
                  fontFamily: "'Clash Display', sans-serif",
                  color: "var(--warm-white)",
                }}
              >
                {entry.role}
              </h3>
              <p className="text-sm font-medium mb-2" style={{ color: entry.accent }}>
                {entry.org}
              </p>
              <ul className="flex flex-col gap-1">
                {entry.bullets.map((b, j) => (
                  <li key={j} className="text-xs text-muted-foreground leading-relaxed">
                    · {b}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const Experience = () => {
  const isMobile = useIsMobile();
  const prefersReduced = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const spineRef = useRef<SVGLineElement>(null);

  useGSAP(
    () => {
      if (isMobile || prefersReduced || !sectionRef.current) return;

      // DrawSVG: animate the spine line as section scrolls into view
      const drawLine = sectionRef.current.querySelector(".timeline-draw");
      if (drawLine) {
        gsap.fromTo(
          drawLine,
          { drawSVG: "0%" },
          {
            drawSVG: "100%",
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              end: "bottom 20%",
              scrub: 1.5,
            },
          }
        );
      }

      // Stagger cards in as spine draws through them
      const cards = gsap.utils.toArray<HTMLElement>(".timeline-card");
      cards.forEach((card, i) => {
        const isLeft = i % 2 === 0;
        gsap.fromTo(
          card,
          { opacity: 0, x: isLeft ? -40 : 40 },
          {
            opacity: 1,
            x: 0,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 75%",
              toggleActions: "play none none reverse",
            },
          }
        );

        // Dot pulse when card enters
        const dot = card.querySelector(".timeline-dot");
        if (dot) {
          gsap.fromTo(
            dot,
            { scale: 0 },
            {
              scale: 1,
              duration: 0.4,
              ease: "back.out(2)",
              scrollTrigger: {
                trigger: card,
                start: "top 75%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }
      });

      // Watermark parallax
      const watermark = sectionRef.current.querySelector(".exp-watermark");
      if (watermark) {
        gsap.to(watermark, {
          yPercent: -30,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      }
    },
    { scope: sectionRef, dependencies: [isMobile, prefersReduced] }
  );

  if (isMobile) return <ExperienceMobile />;

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative py-32 overflow-hidden"
      style={{ background: "var(--surface-0)" }}
    >
      {/* Background watermark */}
      <div
        className="exp-watermark absolute inset-x-0 top-0 flex items-center justify-center pointer-events-none select-none"
        style={{
          fontFamily: "'Clash Display', sans-serif",
          fontSize: "clamp(8rem, 18vw, 18rem)",
          fontWeight: 700,
          color: "transparent",
          WebkitTextStroke: "1px rgba(255,255,255,0.03)",
          lineHeight: 1,
          whiteSpace: "nowrap",
        }}
      >
        JOURNEY
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-8">
        {/* Header */}
        <div className="text-center mb-24">
          <span className="text-xs font-medium tracking-[0.25em] uppercase text-primary mb-3 block">
            Journey
          </span>
          <h2
            className="text-6xl font-bold"
            style={{
              fontFamily: "'Clash Display', sans-serif",
              color: "var(--warm-white)",
            }}
          >
            Experience
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative">
          <TimelineSpine />

          {timeline.map((entry, i) => (
            <TimelineCard
              key={i}
              entry={entry}
              side={i % 2 === 0 ? "left" : "right"}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
