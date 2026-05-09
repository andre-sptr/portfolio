import { useEffect, useRef } from "react";
import { motion, Variants, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { ArrowRight, Download, Github, Linkedin, Mail, Instagram, Code2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import portraitImage from "/andre.png";
import ThreeScene, { scrollProgressRef } from "./ThreeScene";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useIsMobile } from "@/hooks/use-mobile";

const Hero = () => {
  const prefersReduced = usePrefersReducedMotion();
  const isMobile = useIsMobile();
  const { scrollYProgress } = useScroll();

  // Write scroll progress into the Three.js ref each frame
  useEffect(() => {
    return scrollYProgress.on("change", (v) => {
      scrollProgressRef.current = v;
    });
  }, [scrollYProgress]);

  // Text parallax layers
  const yHeadline = useTransform(scrollYProgress, [0, 0.3], prefersReduced ? [0, 0] : [0, -60]);
  const ySubtitle = useTransform(scrollYProgress, [0, 0.3], prefersReduced ? [0, 0] : [0, -30]);
  const yCTA = useTransform(scrollYProgress, [0, 0.3], prefersReduced ? [0, 0] : [0, -15]);

  // Portrait tilt
  const portraitContainer = useRef<HTMLDivElement>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springRotateX = useSpring(rotateX, { stiffness: 200, damping: 25 });
  const springRotateY = useSpring(rotateY, { stiffness: 200, damping: 25 });

  const handlePortraitMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReduced || !portraitContainer.current) return;
    const rect = portraitContainer.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left - rect.width / 2;
    const offsetY = e.clientY - rect.top - rect.height / 2;
    rotateY.set((offsetX / rect.width) * 20);
    rotateX.set((offsetY / rect.height) * -20);
  };

  const handlePortraitLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 24, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 80, damping: 20 },
    },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 pt-24 md:pt-0">
      {/* 3D Background */}
      <ThreeScene scrollEnabled={!isMobile && !prefersReduced} isMobile={isMobile} />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background/80 backdrop-blur-[2px] -z-10" />

      <div className="container relative z-10 mx-auto mt-12 md:mt-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">

          {/* Text Content */}
          <motion.div
            className="text-center lg:text-left order-2 lg:order-1"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants} className="inline-block mb-4">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/8 border border-primary/20 text-sm font-medium text-primary backdrop-blur-md shimmer">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-60" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                </span>
                Open to Network, IoT, Automation & Web Collaboration
              </span>
            </motion.div>

            <motion.div variants={itemVariants} style={{ y: yHeadline }}>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-5 md:mb-6 leading-tight tracking-tight">
                Building Smart
                <span className="text-gradient-animated block">Solutions</span>
                That Matter.
              </h1>
            </motion.div>

            <motion.div variants={itemVariants} style={{ y: ySubtitle }}>
              <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0 mb-7 md:mb-8 leading-relaxed">
                I'm{" "}
                <span className="font-semibold text-foreground">Andre Saputra</span>
                , an Electronics & Telecommunication Engineering graduate with
                hands-on experience in networking, IoT, automation, and web
                development.
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              style={{ y: yCTA }}
              className="flex flex-wrap gap-3 sm:gap-4 justify-center lg:justify-start mb-10 md:mb-12"
            >
              <Button
                asChild
                size="lg"
                className="rounded-full h-12 px-8 text-sm sm:text-base bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg hover:shadow-xl hover:shadow-primary/20 transition-all duration-300 group"
                whileTap={{ scale: 0.96 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
                <a href="#projects">
                  View Projects
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-full h-12 px-8 text-sm sm:text-base border-border hover:bg-accent hover:text-foreground transition-all duration-300"
                whileTap={{ scale: 0.96 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
                <a href="#contact">Contact Me</a>
              </Button>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex gap-1 sm:gap-2 justify-center lg:justify-start items-center text-muted-foreground"
            >
              {[
                { href: "https://github.com/andre-sptr", icon: Github, label: "GitHub" },
                { href: "https://www.linkedin.com/in/andre-sptr", icon: Linkedin, label: "LinkedIn" },
                { href: "https://www.instagram.com/andree.sptrr/", icon: Instagram, label: "Instagram" },
                { href: "mailto:andresaputra07012019@gmail.com", icon: Mail, label: "Email" },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className="p-2.5 sm:p-3 rounded-full hover:text-primary hover:bg-primary/10 transition-all duration-200"
                  aria-label={social.label}
                  title={social.label}
                >
                  <social.icon className="w-5 h-5 sm:w-[22px] sm:h-[22px]" />
                </a>
              ))}
              <div className="w-px h-7 bg-border mx-1 sm:mx-2" />
              <a
                href="/CV_Andre-Saputra.pdf"
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium hover:text-primary hover:bg-primary/10 rounded-full transition-all duration-200 group"
              >
                <Download className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
                <span className="hidden sm:inline">Download </span>CV
              </a>
            </motion.div>
          </motion.div>

          {/* Portrait */}
          <motion.div
            className="order-1 lg:order-2 flex justify-center lg:justify-end"
            initial={{ opacity: 0, scale: 0.85, rotate: -3 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div
              ref={portraitContainer}
              className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-96 md:h-96"
              style={{ rotateX: springRotateX, rotateY: springRotateY, transformPerspective: 800 }}
              onMouseMove={handlePortraitMove}
              onMouseLeave={handlePortraitLeave}
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-secondary/20 rounded-[2rem] rotate-6 blur-2xl animate-pulse" />
              <div className="absolute inset-0 border-2 border-primary/20 rounded-[2rem] rotate-3 transition-transform hover:rotate-1 duration-500" />
              <div className="relative w-full h-full rounded-[2rem] overflow-hidden glass-card">
                <img
                  src={portraitImage}
                  alt="Andre Saputra"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* Floating Badge: Status */}
              <motion.div
                className="absolute -bottom-5 -left-5 glass-card p-3.5 rounded-xl hidden sm:block"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 120, damping: 14, delay: 1.2 }}
              >
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="flex items-center gap-3"
                >
                  <div className="w-9 h-9 rounded-full bg-green-500/15 flex items-center justify-center">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
                    </span>
                  </div>
                  <div>
                    <p className="text-[11px] text-muted-foreground">Status</p>
                    <p className="text-sm font-bold">Online & Ready</p>
                  </div>
                </motion.div>
              </motion.div>

              {/* Floating Badge: Tech Stack */}
              <motion.div
                className="absolute -top-4 -right-4 glass-card p-3 rounded-xl hidden sm:block"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 120, damping: 14, delay: 1.4 }}
              >
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  className="flex items-center gap-2.5"
                >
                  <div className="w-8 h-8 rounded-full bg-primary/15 flex items-center justify-center">
                    <Code2 className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-[11px] text-muted-foreground">Stack</p>
                    <p className="text-sm font-bold">18+ Projects</p>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 8, 0] }}
          transition={{ delay: 2, duration: 2, repeat: Infinity }}
        >
          <span className="text-xs text-muted-foreground uppercase tracking-widest">Scroll</span>
          <div className="w-[1px] h-10 bg-gradient-to-b from-primary/60 to-transparent" />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
