import { Pause, Play, RotateCcw } from "lucide-react";
import type { ReactNode } from "react";
import type { ExperimentItem } from "@/data/experiments";

interface ExperimentShellProps {
  experiment: ExperimentItem;
  paused: boolean;
  onTogglePaused: () => void;
  onReset: () => void;
  children: ReactNode;
}

export function ExperimentShell({
  experiment,
  paused,
  onTogglePaused,
  onReset,
  children,
}: ExperimentShellProps) {
  return (
    <section className="overflow-hidden rounded-lg border border-white/10 bg-white/[0.035]">
      <div className="flex flex-col gap-4 border-b border-white/10 p-5 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="section-label mb-2">{experiment.category} / Live Experiment</p>
          <h2 className="text-3xl font-bold text-[var(--warm-white)]">{experiment.title}</h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            {experiment.interaction}
          </p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={onTogglePaused}
            className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 text-sm text-muted-foreground transition-colors hover:text-[var(--warm-white)]"
          >
            {paused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
            {paused ? "Resume" : "Pause"}
          </button>
          <button
            type="button"
            onClick={onReset}
            className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 text-sm text-muted-foreground transition-colors hover:text-[var(--warm-white)]"
          >
            <RotateCcw className="h-4 w-4" />
            Reset
          </button>
        </div>
      </div>
      {children}
    </section>
  );
}
