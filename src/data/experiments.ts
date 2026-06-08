export type ExperimentCategory =
  | "Physics"
  | "Gravity"
  | "GSAP"
  | "WebGL"
  | "AI"
  | "Network"
  | "IoT"
  | "Utility";

export type ExperimentStatus = "live" | "concept";

export interface ExperimentItem {
  id: string;
  title: string;
  category: ExperimentCategory;
  description: string;
  tech: string[];
  interaction: string;
  status: ExperimentStatus;
  route: string;
  accent: string;
  reducedMotionFallback: string;
}

export const experiments: ExperimentItem[] = [
  {
    id: "falling-stack",
    title: "Falling Stack",
    category: "Physics",
    description: "Skill chips drop into a bounded gravity field, collide, drag, and reset.",
    tech: ["Matter.js", "React", "GSAP"],
    interaction: "Drag chips, change gravity, pause, and reset the field.",
    status: "live",
    route: "/lab?experiment=falling-stack",
    accent: "#84cc16",
    reducedMotionFallback: "Categorized skill chips with no physics simulation.",
  },
  {
    id: "project-collision-wall",
    title: "Project Collision Wall",
    category: "Gravity",
    description: "Project screenshots fall into a board and snap back into a readable archive.",
    tech: ["Matter.js", "GSAP Flip"],
    interaction: "Open, toss, and sort project cards.",
    status: "concept",
    route: "/lab?experiment=project-collision-wall",
    accent: "#818cf8",
    reducedMotionFallback: "Static project archive grid.",
  },
  {
    id: "network-topology",
    title: "Network Topology Playground",
    category: "Network",
    description: "Infrastructure nodes connect with tension lines and signal pulses.",
    tech: ["React", "SVG", "GSAP"],
    interaction: "Drag nodes and watch edge tension update.",
    status: "concept",
    route: "/lab?experiment=network-topology",
    accent: "#22d3ee",
    reducedMotionFallback: "Static topology diagram.",
  },
  {
    id: "ai-debate-field",
    title: "AI Debate Particle Field",
    category: "AI",
    description: "Debate agents orbit, exchange argument pulses, and converge on consensus.",
    tech: ["GSAP", "Canvas"],
    interaction: "Select stance and watch agents exchange signals.",
    status: "concept",
    route: "/lab?experiment=ai-debate-field",
    accent: "#a78bfa",
    reducedMotionFallback: "Static agent relationship diagram.",
  },
  {
    id: "iot-signal-field",
    title: "IoT Signal Field",
    category: "IoT",
    description: "Sensor points emit packets across a grid like MQTT traces.",
    tech: ["Canvas", "GSAP"],
    interaction: "Trigger sensors and inspect packet paths.",
    status: "concept",
    route: "/lab?experiment=iot-signal-field",
    accent: "#34d399",
    reducedMotionFallback: "Static sensor grid.",
  },
  {
    id: "fiscal-gravity",
    title: "Fiscal Gravity",
    category: "Utility",
    description: "Budget categories become weighted bodies that cluster by spend size.",
    tech: ["Matter.js", "React"],
    interaction: "Adjust category weights and watch clusters rebalance.",
    status: "concept",
    route: "/lab?experiment=fiscal-gravity",
    accent: "#f59e0b",
    reducedMotionFallback: "Static weighted category chart.",
  },
];
