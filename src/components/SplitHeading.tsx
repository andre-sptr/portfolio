import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

interface SplitHeadingProps {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3";
  mountAnimate?: boolean;
}

export function SplitHeading({ text, className = "", as: Tag = "h2", mountAnimate = false }: SplitHeadingProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const prefersReduced = usePrefersReducedMotion();
  const words = text.split(" ");

  const shouldAnimate = mountAnimate || inView;

  return (
    <Tag ref={ref} className={className} style={{ display: "flex", flexWrap: "wrap", gap: "0 0.25em" }}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          style={{ display: "inline-block" }}
          initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 16 }}
          animate={
            shouldAnimate
              ? { opacity: 1, y: 0 }
              : prefersReduced
              ? { opacity: 0 }
              : { opacity: 0, y: 16 }
          }
          transition={{
            duration: prefersReduced ? 0.3 : 0.4,
            ease: "easeOut",
            delay: i * 0.04,
          }}
        >
          {word}
        </motion.span>
      ))}
    </Tag>
  );
}
