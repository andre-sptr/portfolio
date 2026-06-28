import React, { Suspense } from 'react';
import SEO from "@/components/SEO";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import NowBlock from "@/components/NowBlock";
import { useDocumentReadyRefresh } from "@/lib/motion/useDocumentReadyRefresh";

// Lazy load heavy components only — small ones (TrustBar, NowBlock) are eager
// to reduce Suspense boundary churn that conflicts with GSAP pin spacers in React 19.
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
  useDocumentReadyRefresh();

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": "https://andresptr.site/#person",
        "name": "Andre Saputra",
        "url": "https://andresptr.site",
        "image": "https://andresptr.site/andre-saputra.png",
        "jobTitle": ["Full Stack Developer"],
        "description": "Andre Saputra's portfolio — Full Stack Developer and Informatics Teacher focused on modern web, AI, and digital solutions.",
        "sameAs": [
          "https://github.com/andre-sptr",
          "https://www.linkedin.com/in/andre-sptr",
          "https://www.instagram.com/andree.sptrr/"
        ],
        "worksFor": {
          "@type": "Organization",
          "name": "PT Telkom Infrastruktur Indonesia"
        },
        "knowsAbout": ["React", "TypeScript", "Node.js", "AI Integration", "IoT", "Networking", "Web Development"]
      },
      {
        "@type": "WebSite",
        "@id": "https://andresptr.site/#website",
        "url": "https://andresptr.site",
        "name": "Andre Saputra Portfolio",
        "description": "Andre Saputra's portfolio: innovative projects across web development, AI, networking, and IoT.",
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
            "description": "AI platform as a coding assistant",
            "url": "https://ai.andresptr.site/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Fiscal AI Finance",
            "description": "AI-powered finance management app",
            "url": "https://fiscal.andresptr.site/"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "SiTiket Telkom Infra",
            "description": "Incident ticket management system for PT Telkom Infrastruktur Indonesia",
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
        description="Explore Andre Saputra's portfolio: innovative projects across web development, AI, networking, and IoT. Professional digital solutions for modern needs."
        keywords={["Andre Saputra", "Portfolio", "Web Developer", "React Developer", "AI Engineer", "IoT Specialist", "Network Engineer", "Informatics Teacher"]}
        schema={schema}
      />

      <Navigation />
      <Hero />

      <TrustBar />

      <Suspense fallback={<LoadingFallback />}>
        <About />
      </Suspense>

      <hr className="section-sep" />

      <Suspense fallback={<LoadingFallback />}>
        <Projects />
      </Suspense>

      <hr className="section-sep" />

      <NowBlock />

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
