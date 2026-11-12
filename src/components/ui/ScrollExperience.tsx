"use client";

import { useEffect } from "react";
import gsap from "gsap";

export function ScrollExperience() {
  useEffect(() => {
    const media = window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
    if (!media.matches) return;

    const cleanups: (() => void)[] = [];
    document.querySelectorAll<HTMLElement>("[data-tilt]").forEach((element) => {
      const move = (event: PointerEvent) => {
        const bounds = element.getBoundingClientRect();
        const rotateX = -((event.clientY - bounds.top - bounds.height / 2) / bounds.height) * 3;
        const rotateY = ((event.clientX - bounds.left - bounds.width / 2) / bounds.width) * 3;
        gsap.to(element, { rotateX, rotateY, transformPerspective: 1200, duration: 0.4, overwrite: "auto" });
      };
      const leave = () => gsap.to(element, { rotateX: 0, rotateY: 0, duration: 0.6, overwrite: "auto" });
      element.addEventListener("pointermove", move);
      element.addEventListener("pointerleave", leave);
      cleanups.push(() => {
        element.removeEventListener("pointermove", move);
        element.removeEventListener("pointerleave", leave);
        gsap.set(element, { clearProps: "transform" });
      });
    });

    return () => cleanups.forEach((cleanup) => cleanup());
  }, []);

  return null;
}
