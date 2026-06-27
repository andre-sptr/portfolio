import { useEffect } from "react";
import { ScrollTrigger } from "@/lib/motion/gsap";

export function useDocumentReadyRefresh(enabled = true) {
  useEffect(() => {
    if (!enabled || typeof window === "undefined") return;

    const frame = window.requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh, { once: true });

    document.fonts?.ready
      .then(refresh)
      .catch(() => undefined);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("load", refresh);
    };
  }, [enabled]);
}
