import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { CredentialsSection } from "@/components/sections/CredentialsSection";
import { ToolkitSection } from "@/components/sections/ToolkitSection";
import { ContactSection } from "@/components/sections/ContactSection";

export default function Home() {
  return <><Navbar/><main id="main" tabIndex={-1}><HeroSection/><AboutSection/><ProjectsSection/><ExperienceSection/><CredentialsSection/><ToolkitSection/><ContactSection/></main><Footer/></>;
}
