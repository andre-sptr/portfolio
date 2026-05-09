import { createContext, useContext, useRef, useState, useCallback, useEffect, ReactNode } from "react";

const lightBg = "hsl(0 0% 99%)";
const darkBg = "hsl(228 22% 6%)";

const isSafari =
  typeof navigator !== "undefined" &&
  /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

const isLowEnd =
  typeof navigator !== "undefined" && navigator.hardwareConcurrency <= 4;

interface ThemeTransitionContextValue {
  triggerTransition: (x: number, y: number, targetTheme: "light" | "dark") => void;
}

const ThemeTransitionContext = createContext<ThemeTransitionContextValue>({
  triggerTransition: () => {},
});

export function useThemeTransition() {
  return useContext(ThemeTransitionContext);
}

interface OverlayState {
  x: number;
  y: number;
  color: string;
  fading: boolean;
}

function applyTheme(targetTheme: "light" | "dark") {
  const html = document.documentElement;
  if (targetTheme === "dark") {
    html.classList.add("dark");
  } else {
    html.classList.remove("dark");
  }
  localStorage.setItem("vite-ui-theme", targetTheme);
}

function Overlay({ state, onDone }: { state: OverlayState; onDone: () => void }) {
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = divRef.current;
    if (!el) return;

    // Force reflow then animate
    el.style.clipPath = `circle(0% at ${state.x}px ${state.y}px)`;
    void el.offsetWidth;
    el.style.transition = "clip-path 600ms cubic-bezier(0.76, 0, 0.24, 1)";
    el.style.clipPath = `circle(150% at ${state.x}px ${state.y}px)`;
  }, [state.x, state.y]);

  return (
    <div
      ref={divRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        pointerEvents: "none",
        backgroundColor: state.color,
        opacity: state.fading ? 0 : 1,
        transition: state.fading ? "opacity 120ms ease" : undefined,
      }}
      onTransitionEnd={(e) => {
        if (e.propertyName === "opacity") onDone();
      }}
    />
  );
}

export function ThemeTransitionProvider({ children }: { children: ReactNode }) {
  const [overlay, setOverlay] = useState<OverlayState | null>(null);
  const isAnimating = useRef(false);

  const triggerTransition = useCallback((x: number, y: number, targetTheme: "light" | "dark") => {
    if (isAnimating.current) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (isSafari || isLowEnd || prefersReduced) {
      applyTheme(targetTheme);
      return;
    }

    isAnimating.current = true;
    const color = targetTheme === "dark" ? darkBg : lightBg;
    setOverlay({ x, y, color, fading: false });

    setTimeout(() => applyTheme(targetTheme), 500);

    setTimeout(() => {
      setOverlay((prev) => prev ? { ...prev, fading: true } : null);
    }, 600);

    setTimeout(() => {
      isAnimating.current = false;
    }, 700);
  }, []);

  const handleOverlayDone = useCallback(() => {
    setOverlay(null);
  }, []);

  return (
    <ThemeTransitionContext.Provider value={{ triggerTransition }}>
      {children}
      {overlay && <Overlay state={overlay} onDone={handleOverlayDone} />}
    </ThemeTransitionContext.Provider>
  );
}
