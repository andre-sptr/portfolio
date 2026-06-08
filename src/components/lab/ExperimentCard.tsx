import { ArrowUpRight, PauseCircle, PlayCircle } from "lucide-react";
import type { ExperimentItem } from "@/data/experiments";

interface ExperimentCardProps {
  experiment: ExperimentItem;
  active: boolean;
  onOpen: (id: string) => void;
}

export function ExperimentCard({ experiment, active, onOpen }: ExperimentCardProps) {
  const isLive = experiment.status === "live";

  return (
    <button
      type="button"
      onClick={() => onOpen(experiment.id)}
      className="group relative min-h-[17rem] overflow-hidden rounded-lg border border-white/10 bg-white/[0.035] p-5 text-left transition-colors hover:border-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--electric)]"
      aria-pressed={active}
    >
      <div
        className="absolute inset-x-0 top-0 h-1 opacity-80"
        style={{ background: experiment.accent }}
      />
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="mb-3 flex items-center gap-2">
            <span className="rounded-full border border-white/10 px-2.5 py-1 text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
              {experiment.category}
            </span>
            <span className="rounded-full border border-white/10 px-2.5 py-1 text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
              {experiment.status}
            </span>
          </div>
          <h3 className="text-2xl font-bold leading-tight text-[var(--warm-white)]">
            {experiment.title}
          </h3>
        </div>
        {isLive ? (
          <PlayCircle className="h-5 w-5 text-[var(--electric)]" />
        ) : (
          <PauseCircle className="h-5 w-5 text-muted-foreground/50" />
        )}
      </div>

      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
        {experiment.description}
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        {experiment.tech.map((tech) => (
          <span
            key={tech}
            className="rounded-full bg-white/[0.05] px-2.5 py-1 text-xs text-muted-foreground"
          >
            {tech}
          </span>
        ))}
      </div>

      <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between gap-4 text-xs text-muted-foreground">
        <span>{experiment.interaction}</span>
        <ArrowUpRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </div>
    </button>
  );
}
