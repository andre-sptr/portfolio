import { motion } from "framer-motion";

const ORGS = [
  "PT Telkom Infrastruktur Indonesia",
  "MAN Insan Cendekia Siak",
  "PT PLN Icon Plus",
  "Politeknik Caltex Riau",
];

const TrustBar = () => {
  return (
    <section
      aria-label="Organizations Andre has worked with"
      className="py-14 lg:py-20 border-y border-white/[0.04]"
      style={{ background: "var(--surface-0)" }}
    >
      <div className="max-w-6xl mx-auto px-6">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="text-[10px] uppercase tracking-[0.35em] text-muted-foreground/70 text-center mb-8"
        >
          Worked with · Built for
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6 lg:gap-x-14"
        >
          {ORGS.map((org) => (
            <span
              key={org}
              className="text-sm md:text-base font-medium text-muted-foreground/50 hover:text-[var(--warm-white)] transition-colors duration-500 tracking-wide cursor-default"
              style={{ fontFamily: "'Clash Display', sans-serif" }}
            >
              {org}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TrustBar;
