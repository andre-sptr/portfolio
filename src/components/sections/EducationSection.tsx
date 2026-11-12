import { ArrowUpRight, GraduationCap } from "lucide-react";
import { certifications, education } from "@/data/education";
import { interfaceCopy } from "@/data/profile";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function EducationSection() {
  return (
    <section className="credentials-section section" id="education" tabIndex={-1} aria-labelledby="credentials-title">
      <div className="container">
        <SectionHeading
          index="05"
          label="EDUCATION & CREDENTIALS"
          title={interfaceCopy.education.title}
          headingId="credentials-title"
          description="Academic foundations, professional training, and continued learning."
        />

        <div className="credentials-layout">
          <div className="credentials-primary">
            <article className="education-entry" data-reveal>
              <div className="credentials-entry-top">
                <span className="credentials-icon"><GraduationCap size={22} strokeWidth={1.5} aria-hidden="true" /></span>
                <span className="credentials-period mono">{education.period}</span>
              </div>
              <span className="credentials-overline">ACADEMIC BACKGROUND</span>
              <h3>{education.degree}</h3>
              <p className="credentials-institution">{education.institution}</p>
              <div className="credentials-gpa">
                <span>GRADE POINT AVERAGE</span>
                <strong>{education.gpa}</strong>
              </div>
              <div className="credentials-coursework">
                <span>RELEVANT COURSEWORK</span>
                <p>{education.coursework.join(" · ")}</p>
              </div>
            </article>

            <article className="mentor-entry" data-reveal>
              <span className="mentor-entry-mark"><ArrowUpRight size={17} aria-hidden="true" /></span>
              <div>
                <span className="credentials-overline">BEYOND THE CLASSROOM</span>
                <h3>{education.activity.role} · {education.activity.name}</h3>
                <p>{education.activity.description}</p>
                <span className="mentor-entry-meta">{education.activity.institution} · {education.activity.period}</span>
              </div>
            </article>
          </div>

          <div className="credentials-list-wrap" data-reveal>
            <div className="credentials-list-heading">
              <div>
                <span className="credentials-overline">PROFESSIONAL DEVELOPMENT</span>
                <h3>Certifications</h3>
              </div>
              <span className="credentials-count mono">{String(certifications.length).padStart(2, "0")}</span>
            </div>
            <ol className="credentials-list">
              {certifications.map((cert, index) => (
                <li className="credential-row" key={cert.title}>
                  <span className="credential-index mono">{String(index + 1).padStart(2, "0")}</span>
                  <div className="credential-copy">
                    <h4>{cert.title}</h4>
                    <p>{cert.issuer}</p>
                  </div>
                  <span className="credential-year mono">{cert.year}</span>
                </li>
              ))}
            </ol>
            <p className="credentials-note">Credential titles and issuers are shown as provided in the portfolio source material.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
