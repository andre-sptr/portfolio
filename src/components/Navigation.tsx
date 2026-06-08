import { useState, useEffect, useCallback, useRef } from "react";
import { Menu, Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence, useScroll, useSpring, useMotionValue } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/#about" },
  { name: "Projects", href: "/#projects" },
  { name: "Experience", href: "/#experience" },
  { name: "Free Tools", href: "/#tools" },
  { name: "Lab", href: "/lab" },
  { name: "Contact", href: "/#contact" },
];

const MagneticNavLink = ({
  href,
  name,
  isActive,
  prefersReduced,
}: {
  href: string;
  name: string;
  isActive: boolean;
  prefersReduced: boolean;
}) => {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 400, damping: 28 });
  const springY = useSpring(y, { stiffness: 400, damping: 28 });

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (prefersReduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set(((e.clientX - rect.left) / rect.width - 0.5) * 8);
    y.set(((e.clientY - rect.top) / rect.height - 0.5) * 8);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
        isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
      }`}
    >
      {isActive && (
        <motion.span
          layoutId="nav-pill"
          className="absolute inset-0 bg-primary/10 rounded-full border border-primary/20"
          transition={{ type: "spring", stiffness: 350, damping: 30 }}
        />
      )}
      <span className="relative z-10">{name}</span>
    </motion.a>
  );
};

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const prefersReduced = usePrefersReducedMotion();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("/");
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Active section detection via IntersectionObserver
  const observeSections = useCallback(() => {
    const sectionIds = ["about", "projects", "experience", "tools", "contact"];
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(`/#${id}`);
            }
          });
        },
        { threshold: 0.3, rootMargin: "-80px 0px -40% 0px" }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  useEffect(() => {
    if (window.location.pathname === "/lab") {
      setActiveSection("/lab");
      return;
    }
    const cleanup = observeSections();
    return cleanup;
  }, [observeSections]);

  // Reset to Home when at top
  useEffect(() => {
    const handleTop = () => {
      if (window.location.pathname !== "/lab" && window.scrollY < 200) setActiveSection("/");
    };
    window.addEventListener("scroll", handleTop);
    return () => window.removeEventListener("scroll", handleTop);
  }, []);

  return (
    <>
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-primary to-secondary origin-left z-[100]"
        style={{ scaleX }}
      />

      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
          ? "glass border-b py-2 shadow-[var(--shadow-card)]"
          : "bg-transparent py-4"
          }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a href="/" className="flex items-center gap-2.5 group">
              <div className="relative w-9 h-9 rounded-xl bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white font-bold text-lg overflow-hidden group-hover:shadow-[var(--glow-primary)] transition-shadow duration-300">
                <span className="relative z-10">A</span>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </div>
              <span className="font-bold text-lg sm:text-xl tracking-tight">
                Andre<span className="text-primary">.dev</span>
              </span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <MagneticNavLink
                  key={link.name}
                  href={link.href}
                  name={link.name}
                  isActive={activeSection === link.href}
                  prefersReduced={prefersReduced}
                />
              ))}
              <div className="w-px h-6 bg-border mx-2" />
              <a href="/#contact">
                <Button
                  size="sm"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 glow-hover transition-all duration-300 rounded-full"
                >
                  Let's Talk
                </Button>
              </a>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex md:hidden items-center gap-2">
              <button
                className="text-foreground p-2 hover:bg-accent rounded-lg transition-colors"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden overflow-hidden"
              >
                <div className="glass-card mt-3 rounded-2xl p-3 flex flex-col gap-1 max-h-[80vh] overflow-y-auto">
                  {navLinks.map((link) => {
                    const isActive = activeSection === link.href;
                    return (
                      <a
                        key={link.name}
                        href={link.href}
                        className={`block py-3 px-4 text-base rounded-xl transition-all duration-200 ${isActive
                          ? "text-primary bg-primary/10 font-medium"
                          : "text-muted-foreground hover:text-foreground hover:bg-accent"
                          }`}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {link.name}
                      </a>
                    );
                  })}
                  <div className="pt-2 border-t border-border mt-1">
                    <a
                      href="/#contact"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Button className="w-full bg-primary hover:bg-primary/90 rounded-full">
                        <Sparkles className="w-4 h-4 mr-2" />
                        Let's Talk
                      </Button>
                    </a>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>
    </>
  );
};

export default Navigation;
