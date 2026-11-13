const currentFocus = [
  {
    title: "Radio Trunking Operations",
    description:
      "IP Site Connect, Capacity Plus, Capacity Plus Multi-Site, and Motorola Capacity Max.",
  },
  {
    title: "Radio Configuration & Provisioning",
    description:
      "Handling radio configuration, license registration, and activation processes.",
  },
  {
    title: "Radio Base Station Maintenance",
    description:
      "Performing preventive and corrective maintenance on Radio Base Station infrastructure.",
  },
];

export function AboutSection() {
  return (
    <>
      <section
        id="about"
        className="about-section"
        tabIndex={-1}
        aria-labelledby="about-title"
      >
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap"
        />
        <div className="about-ref-container">
          <h2 id="about-title" className="about-ref-heading">
            About
            <br />
            <span>Me.</span>
          </h2>

          <div className="about-ref-grid">
            {/* Left - Personal intro */}
            <div className="about-ref-left">
              <div className="desktop-about-text">
                <p>
                  I am a Bachelor of Applied Science in Electronics and
                  Telecommunication Engineering graduate from Politeknik Caltex
                  Riau.
                </p>
                <p>
                  Currently, I work as an Engineer at PT Nexcom Indonesia,
                  supporting the operations, installation, maintenance, and
                  troubleshooting of radio communication infrastructure.
                </p>
              </div>

              <p className="mobile-about-text">
                Bachelor of Applied Science in Electronics and Telecommunication
                Engineering (Politeknik Caltex Riau) &amp; Engineer at PT Nexcom
                Indonesia focused on radio communication systems, networking, AI
                implementation, and workflow automation.
              </p>

              <div className="desktop-about-btn">
                <a
                  href="#experience"
                  className="btn-creative btn-creative-white"
                  aria-label="Read All"
                >
                  <span className="btn-creative-text-initial">Read All</span>
                  <div className="btn-creative-text-hover">
                    <span>Read All</span>
                    <svg
                      width="13"
                      height="13"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </div>
                  <div className="btn-creative-bubble" aria-hidden="true" />
                </a>
              </div>
            </div>

            {/* Right - What I Focus On */}
            <div className="about-ref-focus">
              <h3 className="about-ref-focus-title">Current Focus</h3>
              <div className="about-ref-focus-list">
                {currentFocus.map(({ title, description }) => (
                  <div className="about-ref-focus-item" key={title}>
                    <div className="about-ref-focus-row">
                      <div className="about-ref-focus-dot" aria-hidden="true" />
                      <span className="about-ref-focus-name">{title}</span>
                    </div>
                    <p className="about-ref-focus-desc">{description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile button at bottom of section */}
            <div className="mobile-about-btn">
              <a
                href="#experience"
                className="btn-creative btn-creative-white"
                aria-label="Read All"
              >
                <span className="btn-creative-text-initial">Read All</span>
                <div className="btn-creative-text-hover">
                  <span>Read All</span>
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </div>
                <div className="btn-creative-bubble" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <div className="about-ref-divider-wrap">
        <div className="section-divider" role="separator" />
      </div>
    </>
  );
}
