import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const heroSource = readFileSync(resolve("src/components/Hero.tsx"), "utf8");

const requiredMarkers = [
  "COMMAND_PROJECT_IDS",
  "command-center-shell",
  "Featured systems",
  "Production web apps, AI tools, and IoT systems",
  "Network operations",
  "PT Telkom Infrastruktur Indonesia",
  "Signal online",
  "View Projects",
  "Andre Saputra command center",
];

const removedLegacyMarkers = [
  "HERO_CARD_LAYOUT",
  "JoyJam",
  "float-card",
  "ROLE_1",
  "ROLE_2",
];

const missing = requiredMarkers.filter((marker) => !heroSource.includes(marker));
const legacy = removedLegacyMarkers.filter((marker) => heroSource.includes(marker));

if (missing.length || legacy.length) {
  if (missing.length) {
    console.error("Missing Command Center Hero markers:");
    for (const marker of missing) console.error(`- ${marker}`);
  }

  if (legacy.length) {
    console.error("Legacy scattered hero markers still present:");
    for (const marker of legacy) console.error(`- ${marker}`);
  }

  process.exit(1);
}

console.log("Command Center Hero markers verified.");
