import { ArrowLeft, Orbit, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

export function LabHero() {
  return (
    <section className="relative min-h-[72vh] overflow-hidden px-5 pt-32 pb-16 md:px-10">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/2 top-1/2 h-[42rem] w-[42rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.04]" />
        <div className="absolute left-1/2 top-1/2 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[var(--electric)]/10" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[var(--electric)]/20 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-10">
        <Link
          to="/"
          className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-muted-foreground transition-colors hover:text-[var(--warm-white)]"
        >
          <ArrowLeft className="h-4 w-4" />
          Portfolio
        </Link>

        <div className="max-w-4xl">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[var(--electric)]/20 bg-[var(--electric)]/10 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.2em] text-[var(--electric)]">
            <Sparkles className="h-3.5 w-3.5" />
            Open Lab
          </div>
          <h1 className="text-[clamp(3.25rem,11vw,8rem)] font-bold leading-[0.86] text-[var(--warm-white)]">
            Drag things.
            <br />
            Break motion.
            <br />
            Study systems.
          </h1>
          <p className="mt-7 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            A playground for physics, gravity, GSAP, AI interfaces, networking diagrams, and IoT signals. The portfolio stays focused; the lab is where experiments can breathe.
          </p>
        </div>

        <div className="grid gap-3 text-sm text-muted-foreground sm:grid-cols-3">
          <div className="rounded-lg border border-white/10 bg-white/[0.03] p-4">
            <Orbit className="mb-3 h-5 w-5 text-[var(--electric)]" />
            Physics-first interactions
          </div>
          <div className="rounded-lg border border-white/10 bg-white/[0.03] p-4">
            Resettable simulations
          </div>
          <div className="rounded-lg border border-white/10 bg-white/[0.03] p-4">
            Reduced-motion fallbacks
          </div>
        </div>
      </div>
    </section>
  );
}
