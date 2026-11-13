import { MapPin } from "lucide-react";
import { experience } from "@/data/experience";

export function ExperienceSection() {
  return (
    <>
      <div className="section-divider" role="separator" />
      <section
        id="experience"
        className="experience-ref-section"
        aria-label="Professional experience"
      >
        <div className="experience-ref-container">
          <div className="experience-ref-header">
            <h2 className="experience-ref-heading">
              Experience
              <br />
              <span className="experience-ref-heading-muted">in Practice.</span>
            </h2>
          </div>

          <div className="experience-ref-grid">
            {experience.map((job, index) => (
              <article
                key={`${job.organization}-${job.role}`}
                className="experience-ref-card glass-card group"
              >
                <div className="experience-ref-top">
                  <div className="experience-ref-role-block">
                    <h3 className="experience-ref-role">{job.role}</h3>
                    <p className="experience-ref-org">
                      {job.organization}
                      {"context" in job && job.context ? (
                        <span className="experience-ref-context">
                          {" "}
                          · {job.context}
                        </span>
                      ) : null}
                    </p>
                  </div>

                  {job.current ? (
                    <span className="experience-ref-current-pill">
                      <span
                        className="experience-ref-current-dot"
                        aria-hidden="true"
                      />
                      <span>CURRENT</span>
                    </span>
                  ) : (
                    <span className="experience-ref-index">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  )}
                </div>

                <p className="experience-ref-summary">{job.summary}</p>

                <ul className="experience-ref-points">
                  {job.points.map((point) => (
                    <li key={point} className="experience-ref-point">
                      <span
                        className={`experience-ref-dot${
                          job.current ? " is-current" : ""
                        }`}
                        aria-hidden="true"
                      />
                      <span className="experience-ref-point-text">{point}</span>
                    </li>
                  ))}
                </ul>

                <div className="experience-ref-footer">
                  <span className="experience-ref-badge">{job.period}</span>
                  <span className="experience-ref-location">
                    <MapPin size={13} aria-hidden="true" />
                    <span>{job.location}</span>
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
