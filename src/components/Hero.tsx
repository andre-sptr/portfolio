import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowRight, Download, Github, Linkedin, Mail, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import portraitImage from "/andre.png";
import ThreeScene, { scrollProgressRef } from "./ThreeScene";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useIsMobile } from "@/hooks/use-mobile";

gsap.registerPlugin(ScrollTrigger);

const FIRST_NAME = "Andre";
const LAST_NAME = "Saputra";
const ROLE_1 = "Full Stack";
const ROLE_2 = "Developer";

const SOCIALS = [
  { href: "https://github.com/andre-sptr", icon: Github, label: "GitHub" },
  { href: "https://www.linkedin.com/in/andre-sptr", icon: Linkedin, label: "LinkedIn" },
  { href: "https://www.instagram.com/andree.sptrr/", icon: Instagram, label: "Instagram" },
  { href: "mailto:andresaputra07012019@gmail.com", icon: Mail, label: "Email" },
];

function SplitText({ text, className }: { text: string; className?: string }) {
  return (
    <span aria-label={text} className={className}>
      {text.split("").map((char, i) => (
        <span
          key={i}
          className="hero-char inline-block"
          style={{ willChange: "transform, opacity" }}
        >
          {char === " " ? " " : char}
        </span>
      ))}
    </span>
  );
}

const Hero = () => {
  const prefersReduced = usePrefersReducedMotion();
  const isMobile = useIsMobile();

  const sectionRef = useRef<HTMLElement>(null);
  const firstNameRef = useRef<HTMLDivElement>(null);
  const lastNameRef = useRef<HTMLDivElement>(null);
  const role1Ref = useRef<HTMLDivElement>(null);
  const role2Ref = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const socialsRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  // Portrait tilt — Framer Motion hover only, no scroll dependency
  const portraitRef = useRef<HTMLDivElement>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 200, damping: 25 });
  const springY = useSpring(rotateY, { stiffness: 200, damping: 25 });

  const onPortraitMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReduced || !portraitRef.current) return;
    const r = portraitRef.current.getBoundingClientRect();
    rotateY.set(((e.clientX - r.left - r.width / 2) / r.width) * 18);
    rotateX.set(((e.clientY - r.top - r.height / 2) / r.height) * -18);
  };
  const onPortraitLeave = () => { rotateX.set(0); rotateY.set(0); };

  useGSAP(() => {
    // Collect all char spans from each name block
    const firstChars = firstNameRef.current?.querySelectorAll<HTMLSpanElement>(".hero-char");
    const lastChars = lastNameRef.current?.querySelectorAll<HTMLSpanElement>(".hero-char");
    const r1Chars = role1Ref.current?.querySelectorAll<HTMLSpanElement>(".hero-char");
    const r2Chars = role2Ref.current?.querySelectorAll<HTMLSpanElement>(".hero-char");

    const allChars = [...(firstChars ?? []), ...(lastChars ?? []), ...(r1Chars ?? []), ...(r2Chars ?? [])];
    const fadeEls = [subtitleRef.current, ctaRef.current, socialsRef.current].filter(Boolean);

    if (!prefersReduced) {
      // ── Entrance (time-driven) ────────────────────────────────────
      gsap.set(allChars, { y: "110%", opacity: 0, rotateX: -80, transformOrigin: "bottom center" });
      gsap.set(fadeEls, { y: 24, opacity: 0 });
      gsap.set(scrollIndicatorRef.current, { opacity: 0 });

      const tl = gsap.timeline({ delay: 0.25 });

      // First name chars
      tl.to([...(firstChars ?? [])], {
        y: "0%", opacity: 1, rotateX: 0,
        stagger: 0.04, duration: 0.65, ease: "power3.out",
      });
      // Last name chars (slight overlap)
      tl.to([...(lastChars ?? [])], {
        y: "0%", opacity: 1, rotateX: 0,
        stagger: 0.035, duration: 0.6, ease: "power3.out",
      }, "-=0.5");
      // Role lines
      tl.to([...(r1Chars ?? []), ...(r2Chars ?? [])], {
        y: "0%", opacity: 1, rotateX: 0,
        stagger: 0.025, duration: 0.5, ease: "power2.out",
      }, "-=0.4");
      // Fade-up elements
      tl.to(fadeEls, {
        y: 0, opacity: 1,
        stagger: 0.12, duration: 0.55, ease: "power2.out",
      }, "-=0.2");
      // Scroll indicator
      tl.to(scrollIndicatorRef.current, { opacity: 1, duration: 0.4 }, "+=0.3");
    } else {
      // Reduced motion: show everything immediately
      gsap.set(allChars, { y: 0, opacity: 1, rotateX: 0 });
      gsap.set(fadeEls, { y: 0, opacity: 1 });
      gsap.set(scrollIndicatorRef.current, { opacity: 1 });
    }

    // ── Scroll indicator bounce ───────────────────────────────────
    gsap.to(scrollIndicatorRef.current, {
      y: 8, duration: 1.2, ease: "sine.inOut", yoyo: true, repeat: -1,
    });

    // ── Scroll-driven: Three.js progress + text parallax ─────────
    // Parallax only on desktop — mobile has no extra scroll height
    if (!isMobile) {
      gsap.to(firstNameRef.current, {
        y: -70, ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.2,
          onUpdate: (self) => { scrollProgressRef.current = self.progress; },
        },
      });
      gsap.to([lastNameRef.current, role1Ref.current, role2Ref.current], {
        y: -50, ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
        },
      });
      gsap.to(subtitleRef.current, {
        y: -30, ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 2,
        },
      });
    }
  }, { scope: sectionRef, dependencies: [isMobile] });

  return (
    <section ref={sectionRef} className="relative min-h-screen lg:min-h-[150vh]" id="hero">
      {/* ── Sticky viewport panel ─────────────────────────── */}
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Background */}
        {!isMobile ? (
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <ThreeScene scrollEnabled={!prefersReduced} isMobile={false} />
          </div>
        ) : (
          <div className="absolute inset-0 -z-10 mobile-bg-gradient" />
        )}

        {/* Grain + vignette */}
        <div className="grain pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--surface-0)]/50 via-transparent to-[var(--surface-0)]/90 pointer-events-none z-0" />

        {/* ── Main content grid ──────────────────────────── */}
        <div className="relative z-10 h-full flex flex-col justify-center px-6 md:px-12">
          <div className="mx-auto w-full max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] xl:grid-cols-[1fr_360px] gap-12 items-center">

              {/* ── Left: Text ──────────────────────────────── */}
              <div className="flex flex-col">

                {/* Status badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--electric)]/20 bg-[var(--electric)]/8 text-[10px] uppercase tracking-[0.2em] text-[var(--electric)] mb-6 w-fit font-medium">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute h-full w-full rounded-full bg-[var(--electric)] opacity-60" />
                    <span className="relative flex rounded-full h-1.5 w-1.5 bg-[var(--electric)]" />
                  </span>
                  Open to collaborations
                </div>

                {/* First name */}
                <div
                  ref={firstNameRef}
                  className="overflow-hidden leading-none mb-0"
                  style={{ perspective: "800px" }}
                >
                  <SplitText
                    text={FIRST_NAME}
                    className="block text-[clamp(2.6rem,10vw,7rem)] font-bold leading-[0.9] tracking-tight text-[var(--warm-white)]"
                  />
                </div>

                {/* Last name */}
                <div
                  ref={lastNameRef}
                  className="overflow-hidden leading-none mb-2"
                  style={{ perspective: "800px" }}
                >
                  <SplitText
                    text={LAST_NAME}
                    className="block text-[clamp(2.6rem,10vw,7rem)] font-bold leading-[0.9] tracking-tight text-[var(--warm-white)]"
                  />
                </div>

                {/* Role gradient */}
                <div className="flex flex-wrap gap-x-3 mb-6">
                  <div ref={role1Ref} className="overflow-hidden" style={{ perspective: "600px" }}>
                    <SplitText
                      text={ROLE_1}
                      className="block text-[clamp(1.5rem,4vw,2.8rem)] font-bold leading-tight tracking-tight text-gradient"
                    />
                  </div>
                  <div ref={role2Ref} className="overflow-hidden" style={{ perspective: "600px" }}>
                    <SplitText
                      text={ROLE_2}
                      className="block text-[clamp(1.5rem,4vw,2.8rem)] font-bold leading-tight tracking-tight text-gradient"
                    />
                  </div>
                </div>

                {/* Subtitle */}
                <p ref={subtitleRef} className="text-sm sm:text-base text-muted-foreground max-w-md mb-7 leading-relaxed">
                  Crafting{" "}
                  <span className="text-[var(--warm-white)] font-medium">networking solutions</span>,{" "}
                  <span className="text-[var(--warm-white)] font-medium">IoT systems</span>,{" "}
                  <span className="text-[var(--warm-white)] font-medium">AI tools</span>, and{" "}
                  <span className="text-[var(--warm-white)] font-medium">web platforms</span>{" "}
                  from Riau, Indonesia.
                </p>

                {/* CTAs */}
                <div ref={ctaRef} className="flex flex-col sm:flex-row gap-3 mb-7">
                  <Button
                    asChild size="lg"
                    className="rounded-full h-11 px-7 text-sm font-medium bg-[var(--electric)] hover:bg-[var(--electric)]/90 text-white border-0 shadow-[0_0_28px_hsl(246_70%_68%/0.4)] hover:shadow-[0_0_40px_hsl(246_70%_68%/0.6)] transition-all duration-300 group w-full sm:w-auto justify-center"
                  >
                    <a href="#projects">
                      See My Work
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </Button>
                  <Button
                    asChild size="lg" variant="outline"
                    className="rounded-full h-11 px-7 text-sm font-medium border-white/10 bg-white/5 hover:bg-white/10 text-[var(--warm-white)] transition-all duration-300 backdrop-blur-sm w-full sm:w-auto justify-center"
                  >
                    <a href="#contact">Contact Me</a>
                  </Button>
                </div>

                {/* Socials */}
                <div ref={socialsRef} className="flex items-center gap-1">
                  {SOCIALS.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target={s.href.startsWith("mailto") ? undefined : "_blank"}
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className="p-2.5 rounded-full text-muted-foreground hover:text-[var(--electric)] hover:bg-[var(--electric)]/10 transition-all duration-200"
                    >
                      <s.icon className="w-5 h-5" />
                    </a>
                  ))}
                  <div className="w-px h-5 bg-white/10 mx-2" />
                  <a
                    href="/CV_Andre-Saputra.pdf"
                    className="flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:text-[var(--electric)] hover:bg-[var(--electric)]/10 rounded-full transition-all duration-200 group"
                  >
                    <Download className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
                    <span>CV</span>
                  </a>
                </div>
              </div>

              {/* ── Right: Portrait (desktop only) ──────────── */}
              <motion.div
                ref={portraitRef}
                className="hidden lg:flex justify-end items-center"
                style={{ rotateX: springX, rotateY: springY, transformPerspective: 900 }}
                onMouseMove={onPortraitMove}
                onMouseLeave={onPortraitLeave}
                initial={{ opacity: 0, scale: 0.88, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <div className="relative w-[280px] h-[280px] xl:w-[320px] xl:h-[320px]">
                  {/* Glow blur ring */}
                  <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-tr from-[var(--electric)]/25 to-[hsl(192_72%_55%)]/20 blur-3xl scale-110" />
                  {/* Rotated border accent */}
                  <div className="absolute inset-0 border border-[var(--electric)]/15 rounded-[2.5rem] rotate-3" />
                  {/* Portrait image */}
                  <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden bg-[var(--surface-1)]">
                    <img
                      src={portraitImage}
                      alt="Andre Saputra"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    />
                  </div>

                  {/* Floating badge: Status */}
                  <motion.div
                    className="absolute -bottom-4 -left-6 glass-card px-3 py-2.5 rounded-xl"
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.6, duration: 0.5 }}
                  >
                    <motion.div
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                      className="flex items-center gap-2.5"
                    >
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute h-full w-full rounded-full bg-green-400 opacity-75" />
                        <span className="relative flex rounded-full h-2 w-2 bg-green-500" />
                      </span>
                      <div>
                        <p className="text-[10px] text-muted-foreground leading-none mb-0.5">Status</p>
                        <p className="text-xs font-semibold text-[var(--warm-white)] leading-none">Available</p>
                      </div>
                    </motion.div>
                  </motion.div>

                  {/* Floating badge: Projects */}
                  <motion.div
                    className="absolute -top-4 -right-6 glass-card px-3 py-2.5 rounded-xl"
                    initial={{ opacity: 0, x: 8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.8, duration: 0.5 }}
                  >
                    <motion.div
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
                      className="flex items-center gap-2.5"
                    >
                      <div className="w-7 h-7 rounded-lg bg-[var(--electric)]/15 flex items-center justify-center">
                        <span className="text-[var(--electric)] text-[10px] font-bold">18+</span>
                      </div>
                      <div>
                        <p className="text-[10px] text-muted-foreground leading-none mb-0.5">Projects</p>
                        <p className="text-xs font-semibold text-[var(--warm-white)] leading-none">Shipped</p>
                      </div>
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* ── Scroll indicator ──────────────────────── */}
        <div
          ref={scrollIndicatorRef}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[9px] text-muted-foreground uppercase tracking-[0.35em]">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-[var(--electric)]/50 to-transparent" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
