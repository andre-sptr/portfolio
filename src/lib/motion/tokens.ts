export const motionDurations = {
  instant: 0.12,
  fast: 0.24,
  normal: 0.5,
  slow: 0.8,
  orbital: 1.2,
} as const;

export const motionEases = {
  standard: "power3.out",
  soft: "power2.out",
  inOut: "sine.inOut",
  snap: "back.out(1.4)",
  linear: "none",
} as const;

export const motionStaggers = {
  tight: 0.035,
  normal: 0.08,
  relaxed: 0.12,
} as const;
