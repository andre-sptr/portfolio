import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ExpertiseSection } from "@/components/sections/ExpertiseSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { EducationSection } from "@/components/sections/EducationSection";
import { ToolkitSection } from "@/components/sections/ToolkitSection";
import { ContactSection } from "@/components/sections/ContactSection";

export default function Home() {
  return <><Navbar/><main id="main" tabIndex={-1}><HeroSection/><AboutSection/><ExpertiseSection/><ProjectsSection/><ExperienceSection/><EducationSection/><ToolkitSection/><ContactSection/></main><Footer/></>;
}
