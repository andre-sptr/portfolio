import { MapPin } from "lucide-react";
import { experience } from "@/data/experience";
import { interfaceCopy } from "@/data/profile";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function ExperienceSection() {
  return (
    <section id="experience" className="experience-section section" tabIndex={-1} aria-labelledby="experience-title">
      <div className="container">
        <SectionHeading
          index="04"
          label="PROFESSIONAL EXPERIENCE"
          title={interfaceCopy.experience.title}
          description={interfaceCopy.experience.description}
          headingId="experience-title"
        />
        <div className="timeline">
          <div className="timeline-track" aria-hidden="true"><span className="timeline-progress" /></div>
          {experience.map((job, index) => (
            <article key={`${job.organization}-${job.role}`} className={`experience-row${job.current ? " current-experience" : ""}`}>
              <div className="experience-period mono">
                <span className="timeline-dot" />
                <span>{job.period}</span>
                {job.current && <span className="current-badge">CURRENT ROLE</span>}
              </div>
              <div className="experience-job">
                <span className="experience-index mono">0{index + 1}</span>
                <h3>{job.role}</h3>
                <p>{job.organization}{"context" in job && <small>{job.context}</small>}</p>
                <span className="experience-location"><MapPin size={13} aria-hidden="true" />{job.location}</span>
              </div>
              <ul className="experience-points">{job.points.map((point) => <li key={point}>{point}</li>)}</ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
