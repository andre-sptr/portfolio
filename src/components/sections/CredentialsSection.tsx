"use client";

import { useRef, useState } from "react";
import { certifications, openSourceRepos } from "@/data/education";
import { profile } from "@/data/profile";

type CredentialsTab = "github" | "certs";

export function CredentialsSection() {
  const [activeTab, setActiveTab] = useState<CredentialsTab>("github");
  const githubTabRef = useRef<HTMLLabelElement>(null);
  const certsTabRef = useRef<HTMLLabelElement>(null);

  function handleTabKeyDown(
    event: React.KeyboardEvent<HTMLLabelElement>,
    current: CredentialsTab
  ) {
    if (
      event.key === "ArrowRight" ||
      event.key === "ArrowDown" ||
      event.key === "ArrowLeft" ||
      event.key === "ArrowUp"
    ) {
      event.preventDefault();
      const nextTab: CredentialsTab = current === "github" ? "certs" : "github";
      setActiveTab(nextTab);
      if (nextTab === "github") {
        githubTabRef.current?.focus();
      } else {
        certsTabRef.current?.focus();
      }
      return;
    }

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setActiveTab(current);
    }
  }

  return (
    <>
      <div className="section-divider" role="separator" />
      <section
        id="credentials"
        className="credentials-ref-section"
        aria-label="Credentials and open source"
      >
        <div className="credentials-ref-container">
          <div className="credentials-ref-header">
            <h2 className="credentials-ref-heading">
              Credentials
              <br />
              <span className="credentials-ref-heading-muted">&amp; Code.</span>
            </h2>

            <div
              className="di-radio-wrap"
              id="credentials-tab-track"
              role="tablist"
              aria-label="Credentials tabs"
            >
              <input
                type="radio"
                name="credentials-tab"
                id="tab-radio-github"
                className="di-radio-input"
                checked={activeTab === "github"}
                onChange={() => setActiveTab("github")}
                aria-controls="content-github"
              />
              <input
                type="radio"
                name="credentials-tab"
                id="tab-radio-certs"
                className="di-radio-input"
                checked={activeTab === "certs"}
                onChange={() => setActiveTab("certs")}
                aria-controls="content-certs"
              />
              <div className="di-radio-island">
                <label
                  ref={githubTabRef}
                  htmlFor="tab-radio-github"
                  id="tab-btn-github"
                  className="di-radio-btn"
                  role="tab"
                  aria-selected={activeTab === "github"}
                  tabIndex={0}
                  onKeyDown={(e) => handleTabKeyDown(e, "github")}
                >
                  Open Source
                </label>
                <label
                  ref={certsTabRef}
                  htmlFor="tab-radio-certs"
                  id="tab-btn-certs"
                  className="di-radio-btn"
                  role="tab"
                  aria-selected={activeTab === "certs"}
                  tabIndex={0}
                  onKeyDown={(e) => handleTabKeyDown(e, "certs")}
                >
                  Certifications
                </label>
                <div className="di-radio-indicator" aria-hidden="true" />
              </div>
            </div>
          </div>

          <div
            id="content-github"
            role="tabpanel"
            aria-labelledby="tab-btn-github"
            hidden={activeTab !== "github"}
          >
            <div className="credentials-ref-grid">
              {openSourceRepos.map((repo) => (
                <a
                  key={repo.id}
                  href={repo.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="repo-card glass-card group"
                >
                  <div className="repo-card-top">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      className="repo-card-folder"
                      aria-hidden="true"
                    >
                      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
                    </svg>
                    <div className="repo-arrow-circle" aria-hidden="true">
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <line x1="7" y1="17" x2="17" y2="7" />
                        <polyline points="7 7 17 7 17 17" />
                      </svg>
                    </div>
                  </div>
                  <h4 className="repo-card-title">{repo.name}</h4>
                  <p className="repo-card-desc">{repo.description}</p>
                </a>
              ))}
            </div>

            <div className="credentials-cta-desktop">
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-creative btn-creative-white btn-creative-github group"
                aria-label="View Full GitHub Profile"
              >
                <svg
                  className="btn-github-pin"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                <span className="btn-creative-text-initial">
                  View Full GitHub Profile
                </span>
                <span className="btn-creative-text-hover">
                  <span>View Full GitHub Profile</span>
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </span>
                <span className="btn-creative-bubble" aria-hidden="true" />
              </a>
            </div>

            <div className="credentials-cta-mobile">
              <a
                href={`${profile.github}?tab=repositories`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-creative btn-creative-white btn-creative-credentials group"
                aria-label="View All Repositories"
              >
                <span className="btn-creative-text-initial">
                  View All Repositories
                </span>
                <span className="btn-creative-text-hover">
                  <span>View All Repositories</span>
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </span>
                <span className="btn-creative-bubble" aria-hidden="true" />
              </a>
            </div>
          </div>

          <div
            id="content-certs"
            role="tabpanel"
            aria-labelledby="tab-btn-certs"
            hidden={activeTab !== "certs"}
          >
            <div className="credentials-ref-grid">
              {certifications.map((cert) => (
                <a
                  key={cert.id}
                  href={cert.image}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cert-card group"
                >
                  <div className="cert-card-media">
                    <img
                      src={cert.image}
                      alt={`${cert.title} certificate from ${cert.issuer}`}
                      loading="lazy"
                      decoding="async"
                      width={cert.width}
                      height={cert.height}
                      className={
                        cert.orientation === "portrait"
                          ? "cert-card-img is-portrait"
                          : "cert-card-img"
                      }
                    />
                  </div>
                  <div className="cert-card-body">
                    <h4 className="cert-card-title">{cert.title}</h4>
                    <div className="cert-card-cta">
                      <span>View credentials</span>
                      <span className="cert-arrow-circle" aria-hidden="true">
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <line x1="5" y1="12" x2="19" y2="12" />
                          <polyline points="12 5 19 12 12 19" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
