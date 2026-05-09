import React, { Suspense } from 'react';
import SEO from "@/components/SEO";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";

// Lazy load components for performance
const About = React.lazy(() => import("@/components/About"));
const Projects = React.lazy(() => import("@/components/Projects"));
const Experience = React.lazy(() => import("@/components/Experience"));
const FreeTools = React.lazy(() => import("@/components/FreeTools"));
const Contact = React.lazy(() => import("@/components/Contact"));
const Footer = React.lazy(() => import("@/components/Footer"));

const LoadingFallback = () => (
  <div
    className="w-full h-40 flex items-center justify-center"
    style={{ background: "var(--surface-0)" }}
  >
    <div className="w-8 h-8 rounded-full border-2 border-primary/20 border-t-primary animate-spin" />
  </div>
);

const Index = () => {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": "https://andresptr.site/#person",
        "name": "Andre Saputra",
        "url": "https://andresptr.site",
        "image": "https://andresptr.site/andre.png",
        "jobTitle": ["Full Stack Developer", "Informatics Teacher"],
        "description": "Portofolio Andre Saputra, seorang Full Stack Developer dan Guru Informatika yang berfokus pada pengembangan web modern, AI, dan solusi digital.",
        "sameAs": [
          "https://github.com/andre-sptr",
          "https://www.linkedin.com/in/andre-sptr",
          "https://www.instagram.com/andree.sptrr/"
        ],
        "worksFor": {
          "@type": "Organization",
          "name": "MAN IC Siak"
        },
        "knowsAbout": ["React", "TypeScript", "Node.js", "AI Integration", "IoT", "Web Development"]
      },
      {
        "@type": "WebSite",
        "@id": "https://andresptr.site/#website",
        "url": "https://andresptr.site",
        "name": "Andre Saputra Portfolio",
        "description": "Portofolio Andre Saputra: Proyek inovatif dalam pengembangan web, AI, dan IoT.",
        "publisher": {
          "@id": "https://andresptr.site/#person"
        }
      },
      {
        "@type": "ItemList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Reka AI",
            "description": "Platform kecerdasan buatan (AI) sebagai coding assistant",
            "url": "https://ai.andresptr.site/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Fiscal AI Finance",
            "description": "Aplikasi manajemen keuangan berbasis AI",
            "url": "https://fiscal.andresptr.site/"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "SiTiket Telkom Infra",
            "description": "Sistem manajemen tiket gangguan PT Telkom Infrastruktur Indonesia",
            "url": "https://sitiket.andresptr.site/"
          }
        ]
      }
    ]
  };

  return (
    <div className="min-h-screen bg-background grain">
      <SEO 
        title="Andre Saputra | Full Stack Developer & AI Enthusiast"
        description="Jelajahi portofolio Andre Saputra: Proyek inovatif dalam pengembangan web, AI, dan IoT. Solusi digital profesional untuk kebutuhan modern."
        keywords={["Andre Saputra", "Portofolio", "Web Developer Indonesia", "React Developer", "AI Engineer", "IoT Specialist", "Guru Informatika"]}
        schema={schema}
      />

      <Navigation />
      <Hero />
      
      <Suspense fallback={<LoadingFallback />}>
        <About />
      </Suspense>

      <hr className="section-sep" />

      <Suspense fallback={<LoadingFallback />}>
        <Projects />
      </Suspense>

      <hr className="section-sep" />

      <Suspense fallback={<LoadingFallback />}>
        <Experience />
      </Suspense>

      <hr className="section-sep" />

      <Suspense fallback={<LoadingFallback />}>
        <FreeTools />
      </Suspense>

      <hr className="section-sep" />

      <Suspense fallback={<LoadingFallback />}>
        <Contact />
      </Suspense>

      <Suspense fallback={<LoadingFallback />}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default Index;
