export const profile = {
  name: "Andre Saputra",
  headline: "RF Engineer | Radio Trunking & Communication Infrastructure",
  location: "Jakarta Selatan, Indonesia",
  email: "andresaputra07012019@gmail.com",
  linkedin: "https://www.linkedin.com/in/andre-sptr",
  github: "https://github.com/andre-sptr",
  cv: { href: "/documents/CV_Andre_Saputra.pdf", filename: "CV_Andre_Saputra.pdf", details: "PDF · 2 pages · 128 KB" },
  hero: {
    role: "RF & NETWORK ENGINEER",
    descriptor: "",
  },
  about: {
    title: "Technology, Connected.",
    introduction: "I am a Bachelor of Applied Science in Electronics and Telecommunication Engineering graduate from Politeknik Caltex Riau, with a professional focus on radio communication systems and networking.",
    description: "Currently, I work as an Engineer at PT Nexcom Indonesia, supporting the operations, installation, maintenance, and troubleshooting of radio communication infrastructure. Additionally, I have a strong interest in network infrastructure, AI implementation, and workflow automation.",
    note: "From the network to the application.",
  },
  contact: {
    title: "Let's talk about radio systems.",
    description: "For conversations about radio communication, infrastructure operations, and practical engineering work.",
  },
  navigation: [
    { id: "top", label: "Home" },
    { id: "about", label: "About" },
    { id: "projects", label: "Projects" },
    { id: "education", label: "Credentials" },
    { id: "contact", label: "Contact" },
  ],
  detailNavigation: [
    { id: "experience", label: "Experience" },
    { id: "toolkit", label: "Technical Toolkit" },
  ],
  footer: "RF engineering · Radio communication · Network infrastructure.",
} as const;

export const interfaceCopy = {
  projects: { title: "Selected Projects.", description: "A selection of operational tools, automation workflows, and digital applications developed across professional and academic contexts.", detail: "View Details", illustration: "Conceptual interface", count: "05 PROJECTS / 2025–2026" },
  expertise: { title: "Conned systems, from radio to software.", description: "A practical mix of radio communication, network operations, automation, and application development." },
  experience: { title: "Experience in Practice.", description: "Roles across radio communication, network infrastructure, operational support, and technical education." },
  education: { title: "Education & Credentials." },
  toolkit: { title: "The technical toolkit.", description: "Tools, technologies, and working methods used across my engineering and digital projects." },
} as const;
