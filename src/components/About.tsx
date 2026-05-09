import { useRef } from "react";
import { motion } from "framer-motion";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GraduationCap, Building2, School, CheckCircle2 } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

gsap.registerPlugin(ScrollTrigger);

// ── Data ──────────────────────────────────────────────────────────

const STATS = [
  { value: "3.67", label: "GPA" },
  { value: "18+", label: "Projects" },
  { value: "5+", label: "Certs" },
];

const EXPERIENCES = [
  {
    period: "Jan 2026 – Now",
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
    details: ["GPA 3.67 / Cum Laude", "Electronics & Telecommunication", "Focus: IoT, Networking, ML"],
  },
];

// Three orbit rings worth of tech
const ORBIT_RINGS = [
  {
    radius: 80,
    durationSec: 18,
    direction: 1 as const,
    items: [
      { abbr: "⚛", label: "React" },
      { abbr: "TS", label: "TypeScript" },
      { abbr: "Nd", label: "Node.js" },
      { abbr: "Nx", label: "Next.js" },
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
      { abbr: "3J", label: "Three.js" },
    ],
  },
  {
    radius: 220,
    durationSec: 52,
    direction: 1 as const,
    items: [
      { abbr: "AVR", label: "Arduino" },
      { abbr: "ESP", label: "ESP32" },
      { abbr: "n8n", label: "n8n" },
      { abbr: "MQ", label: "MQTT" },
      { abbr: "CSC", label: "Cisco" },
      { abbr: "DOK", label: "Docker" },
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
            title={item.label}
            className="absolute w-11 h-11 flex items-center justify-center rounded-xl bg-[var(--surface-1)] border border-white/[0.07] text-[10px] font-bold text-muted-foreground hover:text-[var(--electric)] hover:border-[var(--electric)]/30 transition-colors cursor-default select-none"
            style={{ left: x, top: y }}
            animate={{ rotate: direction * -360 }}
            transition={{ duration: durationSec, ease: "linear", repeat: Infinity }}
          >
            {item.abbr}
          </motion.div>
        );
      })}
    </motion.div>
  );
}

// ── Panel A — WHO I AM ───────────────────────────────────────────

function PanelWhoIAm() {
  return (
    <div className="w-screen h-screen flex-shrink-0 flex items-center justify-center relative overflow-hidden bg-[var(--surface-0)]">
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
          className="text-5xl md:text-6xl font-bold text-[var(--warm-white)] mb-6 leading-[0.95]"
          style={{ fontFamily: "Clash Display, sans-serif" }}
        >
          The person<br />
          <span className="text-gradient">behind the code</span>
        </h2>
        <p className="text-base text-muted-foreground leading-relaxed mb-8 max-w-md">
          Electronics & Telecommunication Engineering graduate from Politeknik
          Caltex Riau. I teach informatics by day and build IoT systems, AI
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
                className="text-2xl font-bold text-[var(--electric)]"
                style={{ fontFamily: "Clash Display, sans-serif" }}
              >
                {s.value}
              </span>
              <span className="text-[10px] text-muted-foreground uppercase tracking-[0.15em] mt-0.5">
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
    <div className="w-screen h-screen flex-shrink-0 flex items-center bg-[var(--surface-0)] relative overflow-hidden">
      {/* Ambient glow right side */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[35vw] h-[55vh] bg-[var(--electric)]/5 blur-[80px] rounded-full pointer-events-none" />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-8 md:px-16 grid md:grid-cols-[220px_1fr] gap-12 items-center">
        <div>
          <p className="section-label mb-3">02 / Journey</p>
          <h2
            className="text-4xl md:text-5xl font-bold text-[var(--warm-white)] leading-[0.95]"
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
    <div className="w-screen h-screen flex-shrink-0 flex items-center bg-[var(--surface-0)] relative overflow-hidden">
      {/* Center glow */}
      <div className="absolute left-2/3 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[28vw] h-[28vw] bg-[var(--electric)]/8 blur-[70px] rounded-full pointer-events-none" />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-8 md:px-16 grid md:grid-cols-[220px_1fr] gap-12 items-center">
        <div>
          <p className="section-label mb-3">03 / Stack</p>
          <h2
            className="text-4xl md:text-5xl font-bold text-[var(--warm-white)] leading-[0.95] mb-4"
            style={{ fontFamily: "Clash Display, sans-serif" }}
          >
            Tools I<br />live with
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            React · Next · Node.js<br />
            Three.js · GSAP · Python<br />
            Arduino · ESP32 · n8n · CCNA
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
    <section id="about" className="py-20 px-6 bg-[var(--surface-0)]">
      <div className="max-w-xl mx-auto space-y-16">
        {/* Who */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <p className="section-label mb-3">01 / About</p>
          <h2 className="text-4xl font-bold text-[var(--warm-white)] mb-4 leading-tight" style={{ fontFamily: "Clash Display, sans-serif" }}>
            The person<br /><span className="text-gradient">behind the code</span>
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Electronics & Telecommunication Engineering graduate. Informatics teacher,
            IoT builder, and full stack developer from Riau, Indonesia.
          </p>
          <div className="flex gap-3 flex-wrap">
            {STATS.map((s) => (
              <div key={s.label} className="px-4 py-2.5 rounded-xl bg-[var(--surface-1)] border border-white/[0.07] flex flex-col items-center min-w-[80px]">
                <span className="text-xl font-bold text-[var(--electric)]" style={{ fontFamily: "Clash Display, sans-serif" }}>{s.value}</span>
                <span className="text-[10px] text-muted-foreground uppercase tracking-wider mt-0.5">{s.label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Journey */}
        <div>
          <p className="section-label mb-3">02 / Journey</p>
          <h3 className="text-3xl font-bold text-[var(--warm-white)] mb-6" style={{ fontFamily: "Clash Display, sans-serif" }}>Where I've been</h3>
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
          <h3 className="text-3xl font-bold text-[var(--warm-white)] mb-4" style={{ fontFamily: "Clash Display, sans-serif" }}>Tools I live with</h3>
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
  const trackRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (isMobile || prefersReduced || !trackRef.current || !sectionRef.current) return;

    const getTrackExtra = () =>
      (trackRef.current?.scrollWidth ?? 0) - window.innerWidth;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        pin: true,
        start: "top top",
        end: () => `+=${getTrackExtra()}`,
        scrub: 1,
        invalidateOnRefresh: true,
        anticipatePin: 1,
      },
    });

    // Slide the track from 0 → -(track width - viewport width)
    tl.to(trackRef.current, {
      x: () => -getTrackExtra(),
      ease: "none",
      duration: 1,
    });

    // Panel B cards: stagger in as panel B comes into view (~35% into scroll)
    const cards = cardsRef.current?.querySelectorAll<HTMLElement>(".exp-card");
    if (cards?.length) {
      tl.from(cards, { x: 48, opacity: 0, stagger: 0.06, duration: 0.16 }, 0.37);
    }
  }, { scope: sectionRef, dependencies: [isMobile, prefersReduced] });

  if (isMobile) return <AboutMobile />;

  return (
    <section ref={sectionRef} id="about" className="relative">
      {/* Horizontal track — 3 panels × 100vw */}
      <div
        ref={trackRef}
        className="flex flex-nowrap"
        style={{ width: "300vw", willChange: "transform" }}
      >
        <PanelWhoIAm />
        <PanelJourney cardsRef={cardsRef} />
        <PanelStack />
      </div>
    </section>
  );
};

export default About;
