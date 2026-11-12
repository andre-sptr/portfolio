import { Code2, Cpu, Network, Workflow } from "lucide-react";
import { expertise } from "@/data/skills";
import { interfaceCopy } from "@/data/profile";
import { SectionHeading } from "@/components/ui/SectionHeading";

const icons = { network: Network, workflow: Workflow, cpu: Cpu, code: Code2 };

export function ExpertiseSection() {
  return (
    <section id="expertise" className="expertise-section section" tabIndex={-1} aria-labelledby="expertise-title">
      <div className="container">
        <SectionHeading
          index="02"
          label="CONNECTED CAPABILITIES"
          title={interfaceCopy.expertise.title}
          description={interfaceCopy.expertise.description}
          headingId="expertise-title"
        />
        <div className="expertise-grid">
          {expertise.map((item, index) => {
            const Icon = icons[item.icon];
            return (
              <article className={`expertise-card expertise-card-${item.id}`} key={item.id}>
                <div className="expertise-card-top">
                  <span className="expertise-icon"><Icon size={23} strokeWidth={1.5} aria-hidden="true" /></span>
                  <span className="mono card-number">{String(index + 1).padStart(2, "0")}</span>
                </div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <ul className="skill-list">{item.skills.map((skill) => <li key={skill}>{skill}</li>)}</ul>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
