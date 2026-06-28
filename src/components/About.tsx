import { useRef } from "react";
import { motion } from "framer-motion";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/motion/gsap";
import { GraduationCap, Building2, School, CheckCircle2 } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

// ── Data ──────────────────────────────────────────────────────────

const STATS = [
  { value: "22", label: "Projects" },
  { value: "15", label: "Live Apps" },
  { value: "2", label: "Certs" },
];

const EXPERIENCES = [
  {
    period: "Jan – Jun 2026",
    role: "Admin Operation",
    company: "PT Telkom Infrastruktur Indonesia",
    icon: Building2,
    details: ["Network ticket management", "SLA compliance monitoring", "Fiber optic support"],
  },
  {
    period: "Jan – Dec 2025",
    role: "Informatics Teacher & Robotics Coach",
    company: "MAN Insan Cendekia Siak",
    icon: School,
    details: ["Taught informatics curriculum", "Led robotics extracurricular", "Coding competition mentor"],
  },
  {
    period: "Mar – Jul 2024",
    role: "Network Support Intern",
    company: "PT PLN Icon Plus, Batam",
    icon: Building2,
    details: ["On-site installation & troubleshooting", "Enterprise network deployment", "Field documentation"],
  },
  {
    period: "Oct 2021 – Oct 2025",
    role: "Bachelor of Applied Engineering",
    company: "Politeknik Caltex Riau",
    icon: GraduationCap,
    details: ["GPA 3.67 / Cum Laude", "Electronics & Telecommunication", "Focus: Networking, IoT, Embedded Systems"],
  },
];

// Three orbit rings worth of tech
// Abbreviations: consistent 2–3 letter uppercase (single style across rings)
const ORBIT_RINGS = [
  {
    radius: 80,
    durationSec: 18,
    direction: 1 as const,
    items: [
      { abbr: "RCT", label: "React" },
      { abbr: "NXT", label: "Next.js" },
      { abbr: "TS", label: "TypeScript" },
      { abbr: "ND", label: "Node.js" },
    ],
  },
  {
    radius: 150,
    durationSec: 32,
    direction: -1 as const,
    items: [
      { abbr: "PY", label: "Python" },
      { abbr: "TW", label: "Tailwind" },
      { abbr: "PG", label: "PostgreSQL" },
      { abbr: "GS", label: "GSAP" },
      { abbr: "3JS", label: "Three.js" },
    ],
  },
  {
    radius: 220,
    durationSec: 52,
    direction: 1 as const,
    items: [
      { abbr: "ARD", label: "Arduino" },
      { abbr: "ESP", label: "ESP32" },
      { abbr: "N8N", label: "n8n" },
      { abbr: "MQT", label: "MQTT" },
      { abbr: "CSC", label: "Cisco" },
      { abbr: "DCK", label: "Docker" },
    ],
  },
];

// ── Orbit Ring Component ──────────────────────────────────────────

function OrbitRing({
  radius,
  durationSec,
  items,
  direction,
}: {
  radius: number;
  durationSec: number;
  items: { abbr: string; label: string }[];
  direction: 1 | -1;
}) {
  const size = radius * 2;
  return (
    <motion.div
      className="absolute rounded-full border border-white/[0.05]"
      style={{ width: size, height: size, top: "50%", left: "50%", marginTop: -radius, marginLeft: -radius }}
      animate={{ rotate: direction * 360 }}
      transition={{ duration: durationSec, ease: "linear", repeat: Infinity }}
    >
      {items.map((item, idx) => {
        const angle = (idx / items.length) * 2 * Math.PI;
        const x = radius + Math.cos(angle) * radius - 22;
        const y = radius + Math.sin(angle) * radius - 22;
        return (
          <motion.div
            key={item.label}
            className="group absolute w-11 h-11 flex items-center justify-center rounded-xl bg-[var(--surface-1)] border border-white/[0.07] text-[10px] font-bold text-muted-foreground hover:text-[var(--electric)] hover:border-[var(--electric)]/30 transition-colors cursor-default select-none"
            style={{ left: x, top: y }}
            animate={{ rotate: direction * -360 }}
            transition={{ duration: durationSec, ease: "linear", repeat: Infinity }}
          >
            {item.abbr}
            <span
              className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 rounded-md bg-[var(--surface-1)] border border-white/[0.07] text-[10px] font-medium text-[var(--warm-white)] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-20"
            >
              {item.label}
            </span>
          </motion.div>
        );
      })}
    </motion.div>
  );
}

// ── Panel A — WHO I AM ───────────────────────────────────────────

function PanelWhoIAm() {
  return (
    <div className="w-full min-h-[80vh] py-24 lg:py-32 flex items-center justify-center relative overflow-hidden bg-[var(--surface-0)]">
      {/* Giant watermark */}
      <div
        className="absolute inset-0 flex items-center justify-center select-none pointer-events-none"
        aria-hidden
      >
        <span
          style={{
            fontSize: "clamp(6rem,18vw,18rem)",
            fontFamily: "Clash Display, sans-serif",
            fontWeight: 700,
            color: "transparent",
            WebkitTextStroke: "1px rgba(99,102,241,0.06)",
            letterSpacing: "-0.04em",
            whiteSpace: "nowrap",
          }}
        >
          WHO I AM
        </span>
      </div>

      {/* Foreground */}
      <div className="relative z-10 max-w-xl px-8 md:px-16">
        <p className="section-label mb-5">01 / About</p>
        <h2
          className="text-4xl md:text-5xl font-bold text-[var(--warm-white)] mb-6 leading-[0.95]"
          style={{ fontFamily: "Clash Display, sans-serif" }}
        >
          The person<br />
          <span className="text-gradient">behind the code</span>
        </h2>
        <p className="text-base text-muted-foreground leading-relaxed mb-8 max-w-md">
          Electronics & Telecommunication Engineering graduate from Politeknik
          Caltex Riau. I work by day and build networking solutions, IoT systems, AI
          tools, and web platforms by night — always shipping from Riau,
          Indonesia.
        </p>
        <div className="flex flex-wrap gap-3">
          {STATS.map((s) => (
            <div
              key={s.label}
              className="px-5 py-3 rounded-xl bg-[var(--surface-1)] border border-white/[0.07] flex flex-col items-center min-w-[88px]"
            >
              <span
                className="text-2xl font-bold text-[var(--electric)] font-mono-tight tabular-nums"
              >
                {s.value}
              </span>
              <span className="section-label mt-0.5">
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Panel B — JOURNEY ────────────────────────────────────────────

function PanelJourney({ cardsRef }: { cardsRef: React.RefObject<HTMLDivElement> }) {
  return (
    <div className="w-full min-h-[80vh] py-24 lg:py-32 flex items-center bg-[var(--surface-0)] relative overflow-hidden">
      <div className="relative z-10 w-full max-w-6xl mx-auto px-8 md:px-16 grid md:grid-cols-[220px_1fr] gap-12 items-center">
        <div>
          <p className="section-label mb-3">02 / Journey</p>
          <h2
            className="text-3xl md:text-4xl font-bold text-[var(--warm-white)] leading-[0.95]"
            style={{ fontFamily: "Clash Display, sans-serif" }}
          >
            Where<br />I've<br />been
          </h2>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {EXPERIENCES.map((exp, i) => (
            <div
              key={i}
              className="exp-card glass-card p-5 rounded-2xl border border-white/[0.06] hover:border-[var(--electric)]/25 transition-all duration-300 group"
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded-lg bg-[var(--electric)]/10 flex items-center justify-center">
                  <exp.icon className="w-3.5 h-3.5 text-[var(--electric)]" />
                </div>
                <span className="text-[10px] text-muted-foreground uppercase tracking-wider">
                  {exp.period}
                </span>
              </div>
              <h4 className="font-bold text-[var(--warm-white)] text-sm mb-1 leading-snug group-hover:text-[var(--electric)] transition-colors">
                {exp.role}
              </h4>
              <p className="text-[11px] text-[var(--electric)]/60 mb-3 font-medium">
                {exp.company}
              </p>
              <ul className="space-y-1.5">
                {exp.details.map((d, j) => (
                  <li key={j} className="flex items-start gap-2 text-[11px] text-muted-foreground leading-snug">
                    <CheckCircle2 className="w-3 h-3 text-[var(--electric)]/40 shrink-0 mt-0.5" />
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Panel C — TECH STACK ORBIT ───────────────────────────────────

function PanelStack() {
  return (
    <div className="w-full min-h-[80vh] py-24 lg:py-32 flex items-center bg-[var(--surface-0)] relative overflow-hidden">
      <div className="relative z-10 w-full max-w-6xl mx-auto px-8 md:px-16 grid md:grid-cols-[220px_1fr] gap-12 items-center">
        <div>
          <p className="section-label mb-3">03 / Stack</p>
          <h2
            className="text-3xl md:text-4xl font-bold text-[var(--warm-white)] leading-[0.95] mb-4"
            style={{ fontFamily: "Clash Display, sans-serif" }}
          >
            Tools I<br />live with
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            React · Next.js · Node.js · TypeScript<br />
            Python · Tailwind · PostgreSQL · GSAP<br />
            Three.js · Arduino · ESP32 · n8n<br />
            MQTT · Cisco · Docker
          </p>
        </div>

        {/* Orbit visualization */}
        <div className="flex items-center justify-center">
          <div className="relative" style={{ width: 480, height: 480 }}>
            {/* Center core */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-[var(--electric)]/15 border border-[var(--electric)]/25 flex items-center justify-center z-10">
              <div className="w-7 h-7 rounded-full bg-[var(--electric)]/50 border border-[var(--electric)]/60 animate-pulse" />
            </div>

            {ORBIT_RINGS.map((ring, i) => (
              <OrbitRing key={i} {...ring} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Mobile fallback — simple vertical ───────────────────────────

function AboutMobile() {
  return (
    <section id="about" className="py-16 px-5 bg-[var(--surface-0)]">
      <div className="max-w-xl mx-auto space-y-14">
        {/* Who */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <p className="section-label mb-3">01 / About</p>
          <h2 className="text-3xl font-bold text-[var(--warm-white)] mb-4 leading-tight" style={{ fontFamily: "Clash Display, sans-serif" }}>
            The person<br /><span className="text-gradient">behind the code</span>
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Electronics & Telecommunication Engineering graduate. Network engineer,
            IoT builder, and full stack developer from Riau, Indonesia.
          </p>
          <div className="flex gap-3 flex-wrap">
            {STATS.map((s) => (
              <div key={s.label} className="px-4 py-2.5 rounded-xl bg-[var(--surface-1)] border border-white/[0.07] flex flex-col items-center min-w-[80px]">
                <span className="text-xl font-bold text-[var(--electric)] font-mono-tight tabular-nums">{s.value}</span>
                <span className="section-label mt-0.5">{s.label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Journey */}
        <div>
          <p className="section-label mb-3">02 / Journey</p>
          <h3 className="text-2xl font-bold text-[var(--warm-white)] mb-6" style={{ fontFamily: "Clash Display, sans-serif" }}>Where I've been</h3>
          <div className="space-y-3">
            {EXPERIENCES.map((exp, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="glass-card p-4 rounded-xl border border-white/[0.06]">
                <div className="flex items-center gap-2 mb-2">
                  <exp.icon className="w-3.5 h-3.5 text-[var(--electric)]" />
                  <span className="text-[10px] text-muted-foreground uppercase tracking-wider">{exp.period}</span>
                </div>
                <p className="font-bold text-[var(--warm-white)] text-sm">{exp.role}</p>
                <p className="text-[11px] text-[var(--electric)]/60 mt-0.5">{exp.company}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Stack */}
        <div>
          <p className="section-label mb-3">03 / Stack</p>
          <h3 className="text-2xl font-bold text-[var(--warm-white)] mb-4" style={{ fontFamily: "Clash Display, sans-serif" }}>Tools I live with</h3>
          <div className="flex flex-wrap gap-2">
            {ORBIT_RINGS.flatMap((r) => r.items).map((item) => (
              <span key={item.label} className="px-3 py-1.5 rounded-lg bg-[var(--surface-1)] border border-white/[0.07] text-xs font-medium text-muted-foreground">
                {item.label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Main Component ────────────────────────────────────────────────

const About = () => {
  const isMobile = useIsMobile();
  const prefersReduced = usePrefersReducedMotion();

  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (isMobile || prefersReduced || !cardsRef.current) return;

    // Journey cards: stagger in when the cards container scrolls into view
    const cards = cardsRef.current.querySelectorAll<HTMLElement>(".exp-card");
    if (cards.length) {
      gsap.from(cards, {
        y: 32,
        opacity: 0,
        stagger: 0.08,
        duration: 0.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: cardsRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });
    }
  }, { scope: sectionRef, dependencies: [isMobile, prefersReduced] });

  if (isMobile) return <AboutMobile />;

  return (
    <section ref={sectionRef} id="about" className="relative">
      <PanelWhoIAm />
      <PanelJourney cardsRef={cardsRef} />
      <PanelStack />
    </section>
  );
};

export default About;
