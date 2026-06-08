import { useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Download, Github, Linkedin, Mail, Instagram, FlaskConical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/motion/gsap";
import portraitImage from "/andre.png";
import { heroPreviewProjects } from "@/data/projects";
import ThreeScene, { scrollProgressRef } from "./ThreeScene";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useIsMobile } from "@/hooks/use-mobile";

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

// Floating tilted preview cards (JoyJam-style scattered around hero)
const HERO_CARD_LAYOUT: Record<string, string> = {
  "arena-debate": "hidden md:block absolute left-[4%] top-[18%] w-[180px] xl:w-[220px] rotate-[-14deg]",
  "reka-ai": "hidden md:block absolute right-[5%] top-[14%] w-[180px] xl:w-[220px] rotate-[12deg]",
  "fiscal-ai": "hidden lg:block absolute left-[10%] bottom-[14%] w-[200px] xl:w-[240px] rotate-[10deg]",
  sitiket: "hidden lg:block absolute right-[8%] bottom-[18%] w-[200px] xl:w-[240px] rotate-[-9deg]",
  "iot-system": "hidden xl:block absolute right-[22%] bottom-[4%] w-[150px] rotate-[-7deg]",
};

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
  const badgeRef = useRef<HTMLDivElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const firstChars = firstNameRef.current?.querySelectorAll<HTMLSpanElement>(".hero-char");
    const lastChars = lastNameRef.current?.querySelectorAll<HTMLSpanElement>(".hero-char");
    const r1Chars = role1Ref.current?.querySelectorAll<HTMLSpanElement>(".hero-char");
    const r2Chars = role2Ref.current?.querySelectorAll<HTMLSpanElement>(".hero-char");
    const allChars = [...(firstChars ?? []), ...(lastChars ?? []), ...(r1Chars ?? []), ...(r2Chars ?? [])];
    const fadeEls = [badgeRef.current, subtitleRef.current, ctaRef.current, socialsRef.current].filter(Boolean);
    const cardEls = cardsRef.current?.querySelectorAll<HTMLDivElement>(".float-card");

    if (!prefersReduced) {
      gsap.set(allChars, { y: "110%", opacity: 0, rotateX: -80, transformOrigin: "bottom center" });
      gsap.set(fadeEls, { y: 24, opacity: 0 });
      gsap.set(portraitRef.current, { opacity: 0, scale: 0.85, y: 20 });
      if (cardEls) gsap.set(cardEls, { opacity: 0, scale: 0.6, y: 30 });
      gsap.set(scrollIndicatorRef.current, { opacity: 0 });

      const tl = gsap.timeline({ delay: 0.2 });

      tl.to(portraitRef.current, { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: "power3.out" });
      tl.to([...(firstChars ?? [])], {
        y: "0%", opacity: 1, rotateX: 0,
        stagger: 0.04, duration: 0.65, ease: "power3.out",
      }, "-=0.5");
      tl.to([...(lastChars ?? [])], {
        y: "0%", opacity: 1, rotateX: 0,
        stagger: 0.035, duration: 0.6, ease: "power3.out",
      }, "-=0.45");
      tl.to([...(r1Chars ?? []), ...(r2Chars ?? [])], {
        y: "0%", opacity: 1, rotateX: 0,
        stagger: 0.025, duration: 0.5, ease: "power2.out",
      }, "-=0.4");
      tl.to(fadeEls, {
        y: 0, opacity: 1,
        stagger: 0.1, duration: 0.5, ease: "power2.out",
      }, "-=0.2");
      if (cardEls && cardEls.length) {
        tl.to(cardEls, {
          opacity: 1, scale: 1, y: 0,
          stagger: { each: 0.08, from: "random" },
          duration: 0.7, ease: "back.out(1.4)",
        }, "-=0.8");
      }
      tl.to(scrollIndicatorRef.current, { opacity: 1, duration: 0.4 }, "+=0.2");
    } else {
      gsap.set(allChars, { y: 0, opacity: 1, rotateX: 0 });
      gsap.set(fadeEls, { y: 0, opacity: 1 });
      gsap.set(portraitRef.current, { opacity: 1, scale: 1, y: 0 });
      if (cardEls) gsap.set(cardEls, { opacity: 1, scale: 1, y: 0 });
      gsap.set(scrollIndicatorRef.current, { opacity: 1 });
    }

    // Idle floating loop for cards (subtle drift)
    if (!prefersReduced && cardEls) {
      cardEls.forEach((el, i) => {
        gsap.to(el, {
          y: `+=${10 + (i % 3) * 4}`,
          rotate: `+=${i % 2 === 0 ? 2 : -2}`,
          duration: 4 + (i % 4) * 0.6,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          delay: i * 0.15,
        });
      });
    }

    gsap.to(scrollIndicatorRef.current, {
      y: 8, duration: 1.2, ease: "sine.inOut", yoyo: true, repeat: -1,
    });

    // Scroll-driven parallax + Three.js progress feed
    if (!isMobile) {
      gsap.to([firstNameRef.current, lastNameRef.current], {
        y: -80, ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.2,
          onUpdate: (self) => { scrollProgressRef.current = self.progress; },
        },
      });
      gsap.to([role1Ref.current, role2Ref.current, subtitleRef.current], {
        y: -50, ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
        },
      });
      if (cardEls) {
        cardEls.forEach((el, i) => {
          gsap.to(el, {
            y: `-=${60 + (i % 3) * 20}`,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: "bottom top",
              scrub: 1 + (i % 3) * 0.3,
            },
          });
        });
      }
    }
  }, { scope: sectionRef, dependencies: [isMobile] });

  return (
    <section ref={sectionRef} className="relative min-h-screen lg:min-h-[150vh]" id="hero">
      {/* ── Sticky viewport ───────────────────────────── */}
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
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--surface-0)]/40 via-transparent to-[var(--surface-0)]/95 pointer-events-none z-0" />

        {/* ── Floating tilted preview cards (JoyJam style) ── */}
        <div ref={cardsRef} className="absolute inset-0 z-[5] pointer-events-none">
          {heroPreviewProjects.map((project) => (
            <div
              key={project.id}
              className={`float-card ${HERO_CARD_LAYOUT[project.id]} rounded-2xl overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)] ring-1 ring-white/10`}
              style={{ willChange: "transform" }}
            >
              <img
                src={project.image}
                alt={project.title}
                loading="lazy"
                decoding="async"
                className="w-full h-auto block"
              />
            </div>
          ))}
        </div>

        {/* ── Centered hero content ──────────────────────── */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-center">
          <div className="mx-auto w-full max-w-4xl flex flex-col items-center">

            {/* Status badge */}
            <div
              ref={badgeRef}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--electric)]/20 bg-[var(--electric)]/8 text-[10px] uppercase tracking-[0.2em] text-[var(--electric)] mb-7 font-medium"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute h-full w-full rounded-full bg-[var(--electric)] opacity-60" />
                <span className="relative flex rounded-full h-1.5 w-1.5 bg-[var(--electric)]" />
              </span>
              Open to collaborations
            </div>

            {/* Portrait pill (centered, like the JoyJam middle phone) */}
            <motion.div
              ref={portraitRef}
              className="relative mb-6 z-10"
              whileHover={{ scale: 1.04 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
            >
              <div className="relative w-[110px] h-[110px] sm:w-[130px] sm:h-[130px]">
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[var(--electric)]/40 to-[hsl(192_72%_55%)]/30 blur-2xl scale-125" />
                <div className="relative w-full h-full rounded-full overflow-hidden ring-2 ring-white/20 bg-[var(--surface-1)] shadow-[0_10px_40px_-10px_rgba(124,109,242,0.6)]">
                  <img
                    src={portraitImage}
                    alt="Andre Saputra"
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="absolute -bottom-1 -right-1 flex h-4 w-4">
                  <span className="animate-ping absolute h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-4 w-4 bg-green-500 ring-2 ring-[var(--surface-0)]" />
                </span>
              </div>
            </motion.div>

            {/* First name */}
            <div
              ref={firstNameRef}
              className="overflow-hidden leading-none"
              style={{ perspective: "800px" }}
            >
              <SplitText
                text={FIRST_NAME}
                className="block text-[clamp(3rem,12vw,9rem)] font-bold leading-[0.88] tracking-tight text-[var(--warm-white)]"
              />
            </div>

            {/* Last name */}
            <div
              ref={lastNameRef}
              className="overflow-hidden leading-none mb-3"
              style={{ perspective: "800px" }}
            >
              <SplitText
                text={LAST_NAME}
                className="block text-[clamp(3rem,12vw,9rem)] font-bold leading-[0.88] tracking-tight text-[var(--warm-white)]"
              />
            </div>

            {/* Role gradient */}
            <div className="flex flex-wrap justify-center gap-x-3 mb-5">
              <div ref={role1Ref} className="overflow-hidden" style={{ perspective: "600px" }}>
                <SplitText
                  text={ROLE_1}
                  className="block text-[clamp(1.4rem,3.8vw,2.4rem)] font-bold leading-tight tracking-tight text-gradient"
                />
              </div>
              <div ref={role2Ref} className="overflow-hidden" style={{ perspective: "600px" }}>
                <SplitText
                  text={ROLE_2}
                  className="block text-[clamp(1.4rem,3.8vw,2.4rem)] font-bold leading-tight tracking-tight text-gradient"
                />
              </div>
            </div>

            {/* Subtitle */}
            <p
              ref={subtitleRef}
              className="text-sm sm:text-base text-muted-foreground max-w-xl mb-7 leading-relaxed mx-auto"
            >
              Crafting{" "}
              <span className="text-[var(--warm-white)] font-medium">networking solutions</span>,{" "}
              <span className="text-[var(--warm-white)] font-medium">IoT systems</span>,{" "}
              <span className="text-[var(--warm-white)] font-medium">AI tools</span>, and{" "}
              <span className="text-[var(--warm-white)] font-medium">web platforms</span>{" "}
              from Riau, Indonesia.
            </p>

            {/* CTAs */}
            <div ref={ctaRef} className="flex flex-col sm:flex-row gap-3 mb-6 justify-center">
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
            <div ref={socialsRef} className="flex items-center gap-1 justify-center">
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
        </div>

        {/* Scroll indicator */}
        <div
          ref={scrollIndicatorRef}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
        >
          <span className="text-[9px] text-muted-foreground uppercase tracking-[0.35em]">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-[var(--electric)]/50 to-transparent" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
