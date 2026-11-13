import type { Metadata } from "next";
import Link from "next/link";
import { profile } from "@/data/profile";
import { ogImages, siteUrl } from "@/lib/metadata";

export const metadata: Metadata = {
  ...(siteUrl ? { alternates: { canonical: "/about/" } } : {}),
  title: `About Me | ${profile.name}`,
  description:
    "Andre Saputra is a Bachelor of Applied Science in Electronics and Telecommunication Engineering graduate from Politeknik Caltex Riau and an Engineer at PT Nexcom Indonesia focusing on radio trunking communication systems, network infrastructure, AI implementation, and workflow automation.",
  openGraph: {
    type: "profile",
    title: `About ${profile.name} | RF & Network Engineer`,
    description: profile.about.introduction,
    images: ogImages,
    ...(siteUrl ? { url: `${siteUrl.origin}/about/` } : {}),
  },
  twitter: {
    card: "summary_large_image",
    title: `About ${profile.name} | RF & Network Engineer`,
    description: profile.about.introduction,
    images: ["/og-cover.png"],
  },
};

const snapshotItems = [
  { label: "Location", value: "Jakarta Selatan, ID" },
  { label: "Education", value: "D4 Electronics & Telecom" },
  { label: "Focus", value: "RF & Network Systems" },
] as const;

const milestonePath = [
  {
    period: "2021 – 2025",
    description:
      "Completed Bachelor of Applied Science in Electronics and Telecommunication Engineering at Politeknik Caltex Riau, interned at PLN Icon Plus (2024), and earned BNSP & Cisco CCNAv7 credentials.",
  },
  {
    period: "2025 – 2026",
    description:
      "Taught Informatics & coached Robotics at MAN Insan Cendekia Siak, then served as Operations Administrator at Telkominfra handling Note-B network trouble tickets.",
  },
  {
    period: "2026 – Present",
    description:
      "Engineer at PT Nexcom Indonesia supporting radio trunking infrastructure, Radio Base Station maintenance, provisioning, and NOC monitoring while exploring AI & workflow automation.",
  },
] as const;

const coreCapabilities = [
  {
    title: "Radio Trunking Operations",
    description:
      "IP Site Connect, Capacity Plus, Capacity Plus Multi-Site, and Motorola Capacity Max.",
  },
  {
    title: "Configuration & Provisioning",
    description:
      "Radio configuration, license registration, activation workflows, and Network Operations Center monitoring.",
  },
  {
    title: "Infrastructure & Automation",
    description:
      "Preventive and corrective Radio Base Station maintenance, routing/switching troubleshooting, and AI workflow automation.",
  },
] as const;

function BackLink() {
  return (
    <Link href="/" className="btn-back" aria-label="Back to home">
      <svg
        className="btn-back-icon"
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M10 13L5 8L10 3" />
      </svg>
      <span>Back</span>
    </Link>
  );
}

function SocialLinks({ className }: { className: string }) {
  return (
    <div className={className}>
      <a
        href={profile.github}
        target="_blank"
        rel="noopener noreferrer"
        className="about-page-social-link"
        aria-label="GitHub Profile"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
      </a>
      <a
        href={profile.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="about-page-social-link"
        aria-label="LinkedIn Profile"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      </a>
    </div>
  );
}

export default function AboutPage() {
  return (
    <div className="about-page-shell">
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
      />
      <div className="about-page-bg" aria-hidden="true" />

      {/* Header */}
      <header className="about-page-header">
        <BackLink />
        <SocialLinks className="about-page-header-socials" />
      </header>

      {/* Main Content */}
      <main id="main" tabIndex={-1} className="about-page-main">
        <div className="about-page-heading-wrap">
          <h1 className="about-page-heading">
            About Me<span className="about-page-heading-dot">.</span>
          </h1>
        </div>

        <div className="about-page-grid">
          {/* Left Column: Full Story Essay (8 cols) */}
          <div className="about-page-essay">
            <p>
              {profile.about.introduction}{" "}
              {profile.about.description}
            </p>

            <p>
              During my studies in Electronics and Telecommunication Engineering at
              Politeknik Caltex Riau, I built a strong foundation in communication
              systems, networking architecture, and embedded hardware. Alongside
              my academic coursework, I validated my practical networking skills
              through Cisco{" "}
              <strong>CCNAv7: Introduction to Networks</strong> and{" "}
              <strong>Switching, Routing, and Wireless Essentials</strong>, as
              well as national competency certification as an{" "}
              <strong>Intermediate Computer Network Technician (BNSP)</strong>.
            </p>

            <p>
              My early hands-on industry exposure began in 2024 as a Network
              Engineer Intern at <strong>PLN Icon Plus</strong> in Batam, where I
              worked directly on network infrastructure installation, router and
              switch configuration, troubleshooting, and data center device
              migration. That experience reinforced the discipline required to
              keep live production links reliable under real operational
              constraints.
            </p>

            <p>
              In 2025, I stepped into STEM education as an Informatics Teacher
              and Robotics Coach at <strong>MAN Insan Cendekia Siak</strong>,
              teaching programming and computer networking fundamentals while
              mentoring students in electronics and Arduino-based robotics for
              both the regional MRCPNP and international FIRA competitions.
              Following that role, I joined{" "}
              <strong>
                PT Infrastruktur Telekomunikasi Indonesia (Telkominfra)
              </strong>{" "}
              as an Operations Administrator, managing Note-B network trouble
              tickets end-to-end and coordinating field teams to minimize service
              downtime.
            </p>

            <p>
              Today at <strong>PT Nexcom Indonesia</strong>, I focus on
              supporting professional radio trunking infrastructure—including IP
              Site Connect, Capacity Plus, Capacity Plus Multi-Site, and Motorola
              Capacity Max—alongside radio configuration, license registration
              and activation, preventive and corrective Radio Base Station
              maintenance, and Advisor system monitoring within the Network
              Operations Center (NOC). Alongside field and infrastructure
              engineering, I actively explore AI implementation and workflow
              automation to make daily technical operations cleaner and faster.
            </p>
          </div>

          {/* Right Column: Typographical Notes (4 cols) */}
          <aside className="about-page-sidebar" aria-label="Profile snapshot and capabilities">
            <div className="about-page-sidebar-section">
              <div className="about-page-sidebar-title">Snapshot</div>
              <div className="about-page-snapshot-list">
                {snapshotItems.map(({ label, value }) => (
                  <div key={label} className="about-page-snapshot-row">
                    <span className="about-page-snapshot-label">{label}</span>
                    <span className="about-page-snapshot-value">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="about-page-sidebar-section">
              <div className="about-page-sidebar-title">Milestone Path</div>
              <div className="about-page-side-list">
                {milestonePath.map(({ period, description }) => (
                  <div key={period}>
                    <div className="about-page-side-head">
                      <span className="about-page-cyan-dot" aria-hidden="true" />
                      <span className="about-page-side-label">{period}</span>
                    </div>
                    <p className="about-page-side-desc">{description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="about-page-sidebar-section">
              <div className="about-page-sidebar-title">Core Capabilities</div>
              <div className="about-page-side-list">
                {coreCapabilities.map(({ title, description }) => (
                  <div key={title}>
                    <div className="about-page-side-head">
                      <span className="about-page-cyan-dot" aria-hidden="true" />
                      <span className="about-page-side-label">{title}</span>
                    </div>
                    <p className="about-page-side-desc">{description}</p>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>

        {/* Bottom Navigation: Back Button */}
        <div className="about-page-bottom-nav">
          <BackLink />
        </div>
      </main>

      {/* Footer */}
      <footer className="about-page-footer" role="contentinfo">
        <div>&copy; 2026 {profile.name}</div>
        <SocialLinks className="about-page-footer-socials" />
      </footer>
    </div>
  );
}
