import { useMemo, useState } from "react";
import { experiments, type ExperimentCategory } from "@/data/experiments";
import { ExperimentCard } from "@/components/lab/ExperimentCard";

const filters: Array<"All" | ExperimentCategory> = [
  "All",
  "Physics",
  "Gravity",
  "GSAP",
  "WebGL",
  "AI",
  "Network",
  "IoT",
  "Utility",
];

interface LabGalleryProps {
  activeExperimentId: string;
  onOpenExperiment: (id: string) => void;
}

export function LabGallery({ activeExperimentId, onOpenExperiment }: LabGalleryProps) {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");

  const visible = useMemo(() => {
    if (filter === "All") return experiments;
    return experiments.filter((experiment) => experiment.category === filter);
  }, [filter]);

  return (
    <section className="px-5 py-16 md:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="section-label mb-3">Experiment Index</p>
            <h2 className="text-4xl font-bold text-[var(--warm-white)] md:text-5xl">
              Pick a system
            </h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {filters.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setFilter(item)}
                className={`rounded-full border px-3 py-1.5 text-xs transition-colors ${
                  filter === item
                    ? "border-[var(--electric)] bg-[var(--electric)]/10 text-[var(--electric)]"
                    : "border-white/10 bg-white/[0.03] text-muted-foreground hover:text-[var(--warm-white)]"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {visible.map((experiment) => (
            <ExperimentCard
              key={experiment.id}
              experiment={experiment}
              active={experiment.id === activeExperimentId}
              onOpen={onOpenExperiment}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
