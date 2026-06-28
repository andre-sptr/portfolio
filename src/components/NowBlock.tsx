import { motion } from "framer-motion";
import NetworkStatus from "@/components/NetworkStatus";

const NOW_ITEMS = [
  {
    label: "Currently at",
    text: "PT Telkom Infrastruktur Indonesia · Admin Operation",
  },
  {
    label: "Building",
    text: "Open-source AI tools and IoT experiments on the side",
  },
  {
    label: "Learning",
    text: "System design & distributed systems fundamentals",
  },
  {
    label: "Based in",
    text: "Pekanbaru, Riau · GMT+7",
  },
];

const LAST_UPDATED_ISO = "2026-06-28";
const LAST_UPDATED_LABEL = "28 Jun 2026";

const NowBlock = () => {
  return (
    <section
      id="now"
      className="py-24 lg:py-32"
      style={{ background: "var(--surface-0)" }}
    >
      <div className="max-w-3xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="flex items-end justify-between mb-12 flex-wrap gap-4"
        >
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-[var(--electric)] mb-3 flex items-center gap-2">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute h-full w-full rounded-full bg-[var(--electric)] opacity-60" />
                <span className="relative flex rounded-full h-1.5 w-1.5 bg-[var(--electric)]" />
              </span>
              Now
            </p>
            <h2
              className="text-3xl md:text-4xl font-bold text-[var(--warm-white)] leading-[0.95]"
              style={{ fontFamily: "'Clash Display', sans-serif" }}
            >
              What I&apos;m <span className="text-gradient">up to</span>
            </h2>
          </div>
          <p className="text-[11px] text-muted-foreground/70 font-mono-tight tracking-wide">
            Last updated <time dateTime={LAST_UPDATED_ISO}>{LAST_UPDATED_LABEL}</time>
          </p>
        </motion.div>

        <ul className="divide-y divide-white/[0.05] border-y border-white/[0.05]">
          {NOW_ITEMS.map((item, i) => (
            <motion.li
              key={item.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="grid grid-cols-1 sm:grid-cols-[180px_1fr] gap-2 sm:gap-8 py-6 items-baseline"
            >
              <span className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground/70 font-medium font-mono-tight">
                {item.label}
              </span>
              <p className="text-base sm:text-lg text-[var(--warm-white)] leading-relaxed">
                {item.text}
              </p>
            </motion.li>
          ))}
        </ul>

        <NetworkStatus />
      </div>
    </section>
  );
};

export default NowBlock;
