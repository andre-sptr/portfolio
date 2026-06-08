import React, { Suspense, useMemo, useState } from "react";
import SEO from "@/components/SEO";
import { LabHero } from "@/components/lab/LabHero";
import { LabGallery } from "@/components/lab/LabGallery";
import { experiments } from "@/data/experiments";

const FallingStackExperiment = React.lazy(() =>
  import("@/components/lab/FallingStackExperiment").then((module) => ({
    default: module.FallingStackExperiment,
  }))
);

function LabLoading() {
  return (
    <div className="flex min-h-[24rem] items-center justify-center rounded-lg border border-white/10 bg-white/[0.03]">
      <div className="h-8 w-8 rounded-full border-2 border-[var(--electric)]/20 border-t-[var(--electric)] animate-spin" />
    </div>
  );
}

export default function Lab() {
  const [activeExperimentId, setActiveExperimentId] = useState("falling-stack");

  const activeExperiment = useMemo(
    () => experiments.find((experiment) => experiment.id === activeExperimentId) ?? experiments[0],
    [activeExperimentId]
  );

  return (
    <main className="min-h-screen bg-[var(--surface-0)] text-foreground grain">
      <SEO
        title="Open Lab | Andre Saputra"
        description="Interactive lab for physics, gravity, GSAP, WebGL, AI, networking, and IoT interface experiments by Andre Saputra."
        keywords={["Andre Saputra", "Open Lab", "GSAP", "Matter.js", "WebGL", "Physics UI", "Creative Developer"]}
        url="https://andresptr.site/lab"
      />
      <LabHero />
      <LabGallery activeExperimentId={activeExperimentId} onOpenExperiment={setActiveExperimentId} />

      <section className="px-5 pb-24 md:px-10">
        <div className="mx-auto max-w-6xl">
          <Suspense fallback={<LabLoading />}>
            {activeExperiment.id === "falling-stack" ? (
              <FallingStackExperiment experiment={activeExperiment} />
            ) : (
              <div className="rounded-lg border border-white/10 bg-white/[0.03] p-8">
                <p className="section-label mb-3">Concept</p>
                <h2 className="text-3xl font-bold text-[var(--warm-white)]">
                  {activeExperiment.title}
                </h2>
                <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                  {activeExperiment.description}
                </p>
                <p className="mt-6 text-sm text-muted-foreground">
                  Static fallback: {activeExperiment.reducedMotionFallback}
                </p>
              </div>
            )}
          </Suspense>
        </div>
      </section>
    </main>
  );
}
