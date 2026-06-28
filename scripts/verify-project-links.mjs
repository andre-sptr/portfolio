import { existsSync, readFileSync, readdirSync } from "node:fs";
import { resolve } from "node:path";

const source = readFileSync(resolve("src/data/projects.ts"), "utf8");
const screenshotFiles = readdirSync(resolve("public/pages"))
  .filter((file) => file.endsWith(".png"))
  .sort();

const expectedProjects = [
  {
    id: "arena-debate",
    viewUrl: "https://debat.andresptr.site/",
    image: "/pages/debate-page.png",
    featured: true,
  },
  {
    id: "reka-ai",
    viewUrl: "",
    image: "/pages/reka-page.png",
    featured: true,
  },
  {
    id: "fiscal-ai",
    viewUrl: "",
    image: "/pages/fiscal-page.png",
    featured: true,
  },
  {
    id: "aet-ai",
    viewUrl: "https://aetpcr.site/",
    image: "/pages/aet-page.png",
    featured: true,
  },
  {
    id: "sitiket",
    viewUrl: "",
    image: "/pages/sitiket-page.png",
    featured: true,
  },
  {
    id: "tiket",
    viewUrl: "https://sitiket.online/",
    image: "/pages/tiket-page.png",
    featured: true,
  },
  {
    id: "sumbagteng-projects",
    viewUrl: "https://ed.tifsumbagteng.id/",
    image: "/pages/projects-page.png",
    featured: true,
  },
  {
    id: "hub-site-ridar",
    viewUrl: "https://class.sitiket.online/",
    image: "/pages/site-page.png",
    featured: true,
  },
  {
    id: "sbtconnect",
    viewUrl: "https://sbtconnect.online/",
    image: "/pages/sbtconnect-page.png",
    featured: true,
  },
  {
    id: "sigetah",
    viewUrl: "https://sigetah.pocari.id/",
    image: "/pages/getah-page.png",
    featured: true,
  },
  {
    id: "rekapal",
    viewUrl: "https://rekapal.site/",
    image: "/pages/rekapal-page.png",
    featured: true,
  },
  {
    id: "snmb",
    viewUrl: "https://snmb.icsiak.sch.id/",
    image: "/pages/snmb-page.png",
    featured: true,
  },
  {
    id: "binasiswa",
    viewUrl: "https://binasiswa.icsiak.sch.id/",
    image: "/pages/binasiswa-page.png",
    featured: true,
  },
  {
    id: "englishhub",
    viewUrl: "https://englishhub.andresptr.site/",
    image: "/pages/english-page.png",
    featured: true,
  },
  {
    id: "pdf-tools",
    viewUrl: "https://pdf.andresptr.site/",
    image: "/pages/pdf-page.png",
    featured: true,
  },
  {
    id: "file-hosting",
    viewUrl: "https://file.andresptr.site/",
    image: "/pages/file-page.png",
    featured: true,
  },
  {
    id: "tutorinbang",
    viewUrl: "https://tutorinbang.my.id/",
    image: "/pages/tutorin-page.png",
    featured: true,
  },
  {
    id: "private-reader",
    viewUrl: "https://novel.andresptr.site/",
    image: "/pages/novel-page.png",
    featured: true,
  },
  {
    id: "iot-system",
    viewUrl: "",
    image: "/pages/iot-page.png",
    featured: false,
  },
  {
    id: "n8n-automation",
    viewUrl: "",
    image: "/pages/n8n-page.png",
    featured: false,
  },
  {
    id: "eduforum",
    viewUrl: "",
    image: "/pages/eduforum-page.png",
    featured: false,
  },
  {
    id: "aethernet",
    viewUrl: "",
    image: "/pages/aethernet-page.png",
    featured: false,
  },
];

const errors = [];
const projectBlocks = [
  ...source.matchAll(/\{\s*id:\s*"([^"]+)"[\s\S]*?featured:\s*(true|false),\s*\}/g),
].map((match) => {
  const block = match[0];

  return {
    id: match[1],
    num: block.match(/num:\s*"([^"]+)"/)?.[1] ?? "",
    image: block.match(/image:\s*"([^"]+)"/)?.[1] ?? "",
    viewUrl: block.match(/viewUrl:\s*"([^"]*)"/)?.[1] ?? "",
    featured: match[2] === "true",
  };
});

const expectedIds = expectedProjects.map((project) => project.id);
const actualIds = projectBlocks.map((project) => project.id);
const projectImages = projectBlocks.map((project) => project.image.replace("/pages/", "")).sort();
const duplicateImages = projectImages.filter((image, index) => projectImages.indexOf(image) !== index);

if (projectBlocks.length !== expectedProjects.length) {
  errors.push(`Expected ${expectedProjects.length} projects, found ${projectBlocks.length}`);
}

if (actualIds.join(",") !== expectedIds.join(",")) {
  errors.push(`Project order mismatch. Expected: ${expectedIds.join(", ")}. Actual: ${actualIds.join(", ")}`);
}

if (projectImages.join(",") !== screenshotFiles.join(",")) {
  const missing = screenshotFiles.filter((file) => !projectImages.includes(file));
  const extra = projectImages.filter((file) => !screenshotFiles.includes(file));

  if (missing.length) errors.push(`Screenshots not mapped to projects: ${missing.join(", ")}`);
  if (extra.length) errors.push(`Project images missing from public/pages: ${extra.join(", ")}`);
}

if (duplicateImages.length) {
  errors.push(`Screenshots used by multiple projects: ${[...new Set(duplicateImages)].join(", ")}`);
}

for (const [index, project] of expectedProjects.entries()) {
  const actual = projectBlocks[index];
  const expectedNum = String(index + 1).padStart(2, "0");

  if (!actual || actual.id !== project.id) continue;

  if (actual.num !== expectedNum) {
    errors.push(`Project ${project.id} should use num "${expectedNum}", found "${actual.num}"`);
  }

  if (actual.viewUrl !== project.viewUrl) {
    errors.push(`Project ${project.id} has wrong viewUrl. Expected "${project.viewUrl}", found "${actual.viewUrl}"`);
  }

  if (actual.image !== project.image) {
    errors.push(`Project ${project.id} has wrong image. Expected "${project.image}", found "${actual.image}"`);
  }

  if (actual.featured !== project.featured) {
    errors.push(`Project ${project.id} should have featured: ${project.featured}`);
  }

  const publicImagePath = resolve("public", project.image.replace(/^\//, ""));
  if (!existsSync(publicImagePath)) {
    errors.push(`Missing image file: ${publicImagePath}`);
  }
}

if (errors.length) {
  console.error("Project data verification failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log("Project data, links, and assets verified.");
