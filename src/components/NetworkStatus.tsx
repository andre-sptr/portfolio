import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Endpoint {
  label: string;
  origin: string;
}

const ENDPOINTS: Endpoint[] = [
  { label: "andresptr.site", origin: "https://andresptr.site" },
  { label: "debat.andresptr.site", origin: "https://debat.andresptr.site" },
  { label: "snmb.icsiak.sch.id", origin: "https://snmb.icsiak.sch.id" },
  { label: "aetpcr.site", origin: "https://aetpcr.site" },
];

type Health = "loading" | "ok" | "warn" | "down";

interface Reading {
  label: string;
  origin: string;
  latency: number | null;
  health: Health;
}

function classify(latency: number | null): Health {
  if (latency === null) return "loading";
  if (latency < 0) return "down";
  if (latency < 200) return "ok";
  if (latency < 500) return "warn";
  return "warn";
}

function pingOne(origin: string, timeoutMs = 4000): Promise<number> {
  return new Promise((resolve) => {
    if (typeof window === "undefined") {
      resolve(-1);
      return;
    }
    const img = new Image();
    const start = performance.now();
    let settled = false;

    const done = (failed: boolean) => {
      if (settled) return;
      settled = true;
      resolve(failed ? -1 : performance.now() - start);
    };

    img.onload = () => done(false);
    img.onerror = () => done(false);
    img.src = `${origin}/favicon.ico?_=${Date.now()}`;
    window.setTimeout(() => done(true), timeoutMs);
  });
}

const DOT_CLASS: Record<Health, string> = {
  loading: "bg-muted-foreground/40",
  ok: "bg-[#27c93f]/85",
  warn: "bg-[#ffbd2e]/85",
  down: "bg-[#ff5f56]/85",
};

const STATUS_LABEL: Record<Health, string> = {
  loading: "checking",
  ok: "ok",
  warn: "slow",
  down: "down",
};

const NetworkStatus = () => {
  const [readings, setReadings] = useState<Reading[]>(
    ENDPOINTS.map((e) => ({ ...e, latency: null, health: "loading" })),
  );
  const [checkedAt, setCheckedAt] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      const results = await Promise.all(
        ENDPOINTS.map(async (e) => {
          const latency = await pingOne(e.origin);
          return {
            ...e,
            latency,
            health: classify(latency),
          };
        }),
      );
      if (cancelled) return;
      setReadings(results);
      const now = new Date();
      setCheckedAt(
        `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`,
      );
    };

    // Defer ping start so GSAP ScrollTriggers (incl. Projects' pinned timeline)
    // can settle their initial layout before any async state update reshapes the page.
    const t = window.setTimeout(run, 1200);
    return () => {
      cancelled = true;
      window.clearTimeout(t);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="mt-10 rounded-xl border border-white/[0.05] bg-[var(--surface-1)]/40 overflow-hidden"
    >
      <div className="flex items-center justify-between px-5 py-3 border-b border-white/[0.04]">
        <p className="section-label">Network status</p>
        <p className="text-[10px] text-muted-foreground/60 font-mono-tight tracking-wide">
          {checkedAt ? `Last check ${checkedAt}` : "Checking…"}
        </p>
      </div>
      <ul className="divide-y divide-white/[0.04]">
        {readings.map((r) => (
          <li
            key={r.origin}
            className="flex items-center justify-between gap-4 px-5 py-2.5"
          >
            <div className="flex items-center gap-3 min-w-0">
              <span
                className={`block w-2 h-2 rounded-full shrink-0 ${DOT_CLASS[r.health]} ${
                  r.health === "loading" ? "animate-pulse" : ""
                }`}
              />
              <span className="text-sm text-[var(--warm-white)] font-mono-tight truncate">
                {r.label}
              </span>
            </div>
            <span className="text-xs font-mono-tight tabular-nums text-muted-foreground shrink-0">
              {r.health === "loading"
                ? "—"
                : r.health === "down"
                  ? STATUS_LABEL.down
                  : `${Math.round(r.latency ?? 0)} ms`}
            </span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

export default NetworkStatus;
