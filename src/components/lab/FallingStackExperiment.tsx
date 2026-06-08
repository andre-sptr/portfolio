import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Matter from "matter-js";
import type { ExperimentItem } from "@/data/experiments";
import { skills } from "@/data/skills";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { ExperimentShell } from "@/components/lab/ExperimentShell";
import { StaticExperimentPreview } from "@/components/lab/StaticExperimentPreview";

interface FallingStackExperimentProps {
  experiment: ExperimentItem;
}

interface BodySkill {
  id: string;
  label: string;
  accent: string;
  body: Matter.Body;
}

export function FallingStackExperiment({ experiment }: FallingStackExperimentProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<Matter.Engine | null>(null);
  const runnerRef = useRef<Matter.Runner | null>(null);
  const mouseConstraintRef = useRef<Matter.MouseConstraint | null>(null);
  const [paused, setPaused] = useState(false);
  const [resetKey, setResetKey] = useState(0);
  const [bodySkills, setBodySkills] = useState<BodySkill[]>([]);

  const visibleSkills = useMemo(() => skills.slice(0, 17), []);

  const reset = useCallback(() => {
    setResetKey((value) => value + 1);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion || !containerRef.current) return;

    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    const width = Math.max(rect.width, 320);
    const height = Math.max(rect.height, 420);

    const engine = Matter.Engine.create({
      gravity: { x: 0, y: 0.9 },
      enableSleeping: true,
    });

    const runner = Matter.Runner.create();
    const wallOptions = {
      isStatic: true,
      render: { visible: false },
    };

    const floor = Matter.Bodies.rectangle(width / 2, height + 28, width + 80, 56, wallOptions);
    const leftWall = Matter.Bodies.rectangle(-28, height / 2, 56, height + 80, wallOptions);
    const rightWall = Matter.Bodies.rectangle(width + 28, height / 2, 56, height + 80, wallOptions);
    const ceiling = Matter.Bodies.rectangle(width / 2, -40, width + 80, 56, wallOptions);

    const bodies = visibleSkills.map((skill, index) => {
      const body = Matter.Bodies.rectangle(
        80 + ((index * 118) % Math.max(width - 160, 180)),
        34 + Math.floor(index / 4) * 44,
        Math.max(72, skill.label.length * 9 + 32),
        38,
        {
          restitution: 0.55,
          friction: 0.08,
          frictionAir: 0.018,
          density: 0.001 * skill.mass,
          chamfer: { radius: 18 },
        }
      );
      Matter.Body.setAngle(body, ((index % 5) - 2) * 0.12);
      return { id: skill.id, label: skill.label, accent: skill.accent, body };
    });

    const mouse = Matter.Mouse.create(container);
    const mouseConstraint = Matter.MouseConstraint.create(engine, {
      mouse,
      constraint: {
        stiffness: 0.15,
        render: { visible: false },
      },
    });

    Matter.Composite.add(engine.world, [
      floor,
      leftWall,
      rightWall,
      ceiling,
      mouseConstraint,
      ...bodies.map((item) => item.body),
    ]);

    engineRef.current = engine;
    runnerRef.current = runner;
    mouseConstraintRef.current = mouseConstraint;
    setBodySkills(bodies);
    Matter.Runner.run(runner, engine);

    return () => {
      Matter.Runner.stop(runner);
      Matter.Composite.clear(engine.world, false);
      Matter.Engine.clear(engine);
      const mouseAny = mouseConstraint.mouse as Matter.Mouse & { mousewheel?: EventListener };
      if (mouseAny.mousewheel) {
        mouseConstraint.mouse.element.removeEventListener("mousewheel", mouseAny.mousewheel);
        mouseConstraint.mouse.element.removeEventListener("DOMMouseScroll", mouseAny.mousewheel);
      }
      engineRef.current = null;
      runnerRef.current = null;
      mouseConstraintRef.current = null;
      setBodySkills([]);
    };
  }, [prefersReducedMotion, resetKey, visibleSkills]);

  useEffect(() => {
    const runner = runnerRef.current;
    const engine = engineRef.current;
    if (!runner || !engine) return;

    if (paused) {
      Matter.Runner.stop(runner);
    } else {
      Matter.Runner.run(runner, engine);
    }
  }, [paused]);

  useEffect(() => {
    if (prefersReducedMotion) return;
    let frame = 0;

    const update = () => {
      frame = window.requestAnimationFrame(update);
      setBodySkills((items) => [...items]);
    };

    frame = window.requestAnimationFrame(update);
    return () => window.cancelAnimationFrame(frame);
  }, [prefersReducedMotion]);

  if (prefersReducedMotion) {
    return (
      <ExperimentShell
        experiment={experiment}
        paused
        onTogglePaused={() => undefined}
        onReset={() => undefined}
      >
        <div className="p-5">
          <StaticExperimentPreview />
        </div>
      </ExperimentShell>
    );
  }

  return (
    <ExperimentShell
      experiment={experiment}
      paused={paused}
      onTogglePaused={() => setPaused((value) => !value)}
      onReset={reset}
    >
      <div
        ref={containerRef}
        className="relative h-[34rem] overflow-hidden bg-[radial-gradient(circle_at_50%_0%,rgba(129,140,248,0.12),transparent_42%),var(--surface-0)]"
      >
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:42px_42px]" />
        {bodySkills.map((item) => (
          <div
            key={item.id}
            className="absolute left-0 top-0 flex h-[38px] items-center justify-center rounded-full border px-4 text-xs font-semibold shadow-[0_20px_50px_rgba(0,0,0,0.3)] backdrop-blur"
            style={{
              width: Math.max(72, item.label.length * 9 + 32),
              transform: `translate3d(${item.body.position.x - Math.max(72, item.label.length * 9 + 32) / 2}px, ${item.body.position.y - 19}px, 0) rotate(${item.body.angle}rad)`,
              borderColor: `${item.accent}66`,
              background: `${item.accent}18`,
              color: item.accent,
            }}
          >
            {item.label}
          </div>
        ))}
      </div>
    </ExperimentShell>
  );
}
