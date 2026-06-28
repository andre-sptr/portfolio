import { useRef } from "react";
import { motion } from "framer-motion";
import {
  Activity,
  ArrowRight,
  Cpu,
  Download,
  Mail,
  RadioTower,
  Server,
  ShieldCheck,
  Terminal,
} from "lucide-react";
import { Github, Instagram, Linkedin } from "@/components/icons/BrandIcons";
import { Button } from "@/components/ui/button";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/motion/gsap";
import portraitImage from "/andre-saputra.png";
import { projects, type ProjectItem } from "@/data/projects";
import ThreeScene, { scrollProgressRef } from "./ThreeScene";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useIsMobile } from "@/hooks/use-mobile";

const COMMAND_PROJECT_IDS = ["sitiket", "reka-ai", "iot-system"] as const;

const COMMAND_PROJECTS = COMMAND_PROJECT_IDS.map((id) =>
  projects.find((project) => project.id === id)
).filter((project): project is ProjectItem => Boolean(project));

const SIGNALS = [
  { label: "Network operations", value: "Telecom infra", icon: RadioTower },
  { label: "AI tools", value: "Gemini + web apps", icon: Cpu },
  { label: "IoT systems", value: "ESP32 + MQTT", icon: Activity },
];

const CAPABILITIES = ["React", "Node.js", "IoT", "AI Integration", "Network Automation"];

const STATUS_ROWS = [
  { label: "Current post", value: "PT Telkom Infrastruktur Indonesia" },
  { label: "Primary focus", value: "Production systems" },
  { label: "Operating mode", value: "Build, automate, monitor" },
];

const SOCIALS = [
  { href: "https://github.com/andre-sptr", icon: Github, label: "GitHub" },
  { href: "https://www.linkedin.com/in/andre-sptr", icon: Linkedin, label: "LinkedIn" },
  { href: "https://www.instagram.com/andree.sptrr/", icon: Instagram, label: "Instagram" },
  { href: "mailto:andresaputra07012019@gmail.com", icon: Mail, label: "Email" },
];

const Hero = () => {
  const prefersReduced = usePrefersReducedMotion();
  const isMobile = useIsMobile();

  const sectionRef = useRef<HTMLElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const signalsRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const commandPanelRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const introEls = [
      copyRef.current,
      signalsRef.current,
      profileRef.current,
      commandPanelRef.current,
      scrollIndicatorRef.current,
    ].filter((el): el is HTMLElement => Boolean(el));

    if (!prefersReduced) {
      gsap.set(introEls, { y: 28, opacity: 0 });

      gsap
        .timeline({ delay: 0.16 })
        .to(copyRef.current, { y: 0, opacity: 1, duration: 0.72, ease: "power3.out" })
        .to(signalsRef.current, { y: 0, opacity: 1, duration: 0.52, ease: "power2.out" }, "-=0.32")
        .to(profileRef.current, { y: 0, opacity: 1, duration: 0.58, ease: "power2.out" }, "-=0.34")
        .to(commandPanelRef.current, { y: 0, opacity: 1, duration: 0.68, ease: "power3.out" }, "-=0.42")
        .to(scrollIndicatorRef.current, { y: 0, opacity: 1, duration: 0.4, ease: "power2.out" }, "-=0.2");
    } else {
      gsap.set(introEls, { y: 0, opacity: 1 });
    }

    if (!prefersReduced && !isMobile) {
      gsap.to(commandPanelRef.current, {
        y: -24,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.2,
          onUpdate: (self) => {
            scrollProgressRef.current = self.progress;
          },
        },
      });

      gsap.to(profileRef.current, {
        y: -12,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
        },
      });
    }
  }, { scope: sectionRef, dependencies: [isMobile, prefersReduced] });

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden pt-24 lg:pt-28"
      id="hero"
      aria-label="Andre Saputra command center"
    >
      {!isMobile ? (
        <div className="absolute inset-0 -z-10 overflow-hidden opacity-55">
          <ThreeScene scrollEnabled={!prefersReduced} isMobile={false} />
        </div>
      ) : (
        <div className="absolute inset-0 -z-10 mobile-bg-gradient" />
      )}

      <div className="command-center-grid pointer-events-none absolute inset-0 z-0" />
      <div className="grain pointer-events-none" />
      <div className="pointer-events-none absolute inset-0 z-0 bg-[linear-gradient(180deg,rgba(10,10,15,0.62)_0%,rgba(10,10,15,0.18)_45%,rgba(10,10,15,0.92)_100%)]" />

      <div className="container relative z-10 mx-auto flex min-h-[calc(100vh-6rem)] items-center px-4 pb-16">
        <div className="grid w-full items-center gap-10 lg:grid-cols-[minmax(0,0.96fr)_minmax(420px,0.74fr)] xl:gap-14">
          <div ref={copyRef} className="max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--electric)]/25 bg-[var(--electric)]/10 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--electric)]">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--electric)] opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--electric)]" />
              </span>
              Signal online
            </div>

            <p className="mb-4 flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              <Terminal className="h-4 w-4 text-[var(--electric)]" />
              Network operations / AI tools / IoT systems
            </p>

            <h1 className="max-w-4xl text-[clamp(3.4rem,11vw,8.5rem)] font-bold leading-[0.86] tracking-normal text-[var(--warm-white)]">
              Andre
              <span className="block text-gradient">Saputra</span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
              Production web apps, AI tools, and IoT systems for telecom infrastructure.
              Currently building operational systems at{" "}
              <span className="font-semibold text-[var(--warm-white)]">
                PT Telkom Infrastruktur Indonesia
              </span>
              .
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="h-12 rounded-full border-0 bg-[var(--electric)] px-7 text-sm font-semibold text-white shadow-[0_0_32px_hsl(246_70%_68%/0.36)] transition-all duration-300 hover:bg-[var(--electric)]/90 hover:shadow-[0_0_44px_hsl(246_70%_68%/0.5)]"
              >
                <a href="#projects">
                  View Projects
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>

              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-12 rounded-full border-white/12 bg-white/[0.04] px-7 text-sm font-semibold text-[var(--warm-white)] backdrop-blur-sm transition-all duration-300 hover:bg-white/[0.08]"
              >
                <a href="/cv-andre-saputra.pdf">
                  <Download className="mr-2 h-4 w-4" />
                  Download CV
                </a>
              </Button>
            </div>

            <div ref={signalsRef} className="mt-8 grid gap-3 sm:grid-cols-3">
              {SIGNALS.map((signal) => (
                <div
                  key={signal.label}
                  className="rounded-[8px] border border-white/10 bg-white/[0.035] p-3 backdrop-blur-md"
                >
                  <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-[8px] border border-[var(--electric)]/20 bg-[var(--electric)]/10 text-[var(--electric)]">
                    <signal.icon className="h-4 w-4" />
                  </div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                    {signal.label}
                  </p>
                  <p className="mt-1 text-sm font-medium text-[var(--warm-white)]">{signal.value}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {CAPABILITIES.map((capability) => (
                <span
                  key={capability}
                  className="rounded-full border border-white/10 bg-white/[0.035] px-3 py-1.5 text-xs font-medium text-muted-foreground"
                >
                  {capability}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-4 lg:justify-self-end">
            <motion.div
              ref={profileRef}
              className="rounded-[8px] border border-white/10 bg-[rgba(13,13,20,0.78)] p-3 shadow-[0_18px_60px_rgba(0,0,0,0.26)] backdrop-blur-2xl sm:p-4 lg:p-3"
              whileHover={prefersReduced ? undefined : { y: -3 }}
              transition={{ type: "spring", stiffness: 260, damping: 24 }}
            >
              <div className="grid gap-3 sm:grid-cols-[auto_1fr]">
                <div className="relative h-20 w-20 overflow-hidden rounded-[8px] border border-white/15 bg-[var(--surface-1)] xl:h-24 xl:w-24">
                  <img
                    src={portraitImage}
                    alt="Andre Saputra"
                    className="h-full w-full object-cover"
                    decoding="async"
                  />
                </div>

                <div>
                  <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--electric)]">
                    <ShieldCheck className="h-4 w-4" />
                    Verified builder profile
                  </div>
                  <div className="space-y-1.5">
                    {STATUS_ROWS.map((row) => (
                      <div key={row.label} className="grid grid-cols-[96px_1fr] gap-2 text-xs xl:grid-cols-[112px_1fr] xl:text-sm">
                        <span className="text-muted-foreground">{row.label}</span>
                        <span className="font-medium text-[var(--warm-white)]">{row.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between border-t border-white/10 pt-3">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />
                  Available for collaboration
                </div>

                <div className="flex items-center gap-1">
                  {SOCIALS.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target={social.href.startsWith("mailto") ? undefined : "_blank"}
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-[var(--electric)]/10 hover:text-[var(--electric)]"
                    >
                      <social.icon className="h-4 w-4" />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>

            <div ref={commandPanelRef} className="command-center-shell p-3 sm:p-4">
              <div className="relative z-10 mb-3 flex items-start justify-between gap-4">
                <div>
                  <p className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--electric)]">
                    <Server className="h-4 w-4" />
                    Featured systems
                  </p>
                  <h2 className="text-xl font-semibold tracking-normal text-[var(--warm-white)] xl:text-2xl">
                    Operational builds in the field
                  </h2>
                </div>
                <div className="hidden rounded-[8px] border border-emerald-400/20 bg-emerald-400/10 px-3 py-1.5 text-right text-xs text-emerald-200 sm:block">
                  <span className="block font-semibold">Live stack</span>
                  <span className="text-emerald-200/70">monitored</span>
                </div>
              </div>

              <div className="relative z-10 space-y-3">
                {COMMAND_PROJECTS.map((project, index) => {
                  const href = project.viewUrl || project.codeUrl || "#projects";

                  return (
                    <a
                      key={project.id}
                      href={href}
                      target={href.startsWith("http") ? "_blank" : undefined}
                      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="command-system-row group grid gap-3 border border-white/10 bg-white/[0.035] p-2.5 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.065] sm:grid-cols-[116px_1fr_auto] xl:grid-cols-[132px_1fr_auto]"
                      style={{ borderLeftColor: project.accent }}
                    >
                      <div className="aspect-[16/10] overflow-hidden rounded-[6px] border border-white/10 bg-[var(--surface-1)]">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="h-full w-full object-cover opacity-[0.82] transition duration-300 group-hover:scale-[1.03] group-hover:opacity-100"
                          loading={index === 0 ? "eager" : "lazy"}
                          decoding="async"
                        />
                      </div>

                      <div className="min-w-0">
                        <div className="mb-2 flex items-center gap-2">
                          <span className="font-mono-tight text-[11px] text-muted-foreground">
                            SYS-{String(index + 1).padStart(2, "0")}
                          </span>
                          <span className="rounded-full border border-white/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                            {project.category}
                          </span>
                        </div>
                        <h3 className="text-base font-semibold tracking-normal text-[var(--warm-white)] xl:text-lg">
                          {project.title}
                        </h3>
                        <p className="mt-1 text-xs leading-5 text-muted-foreground xl:text-sm xl:leading-6">
                          {project.subtitle}
                        </p>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {project.tech.slice(0, 3).map((tech) => (
                            <span
                              key={tech}
                              className="rounded-full bg-white/[0.055] px-2 py-0.5 text-[11px] font-medium text-muted-foreground xl:px-2.5 xl:py-1"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center text-[var(--electric)] sm:justify-end">
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-7 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 lg:flex"
      >
        <span className="text-[9px] uppercase tracking-[0.35em] text-muted-foreground">Scroll</span>
        <div className="h-8 w-px bg-gradient-to-b from-[var(--electric)]/50 to-transparent" />
      </div>
    </section>
  );
};

export default Hero;
