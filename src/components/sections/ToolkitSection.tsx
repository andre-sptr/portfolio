import { toolkit } from "@/data/skills";
import { interfaceCopy } from "@/data/profile";

export function ToolkitSection() {
  return (
    <section className="toolkit-section section" id="toolkit" tabIndex={-1} aria-labelledby="toolkit-title">
      <div className="container toolkit-layout">
        <div className="toolkit-intro" data-reveal>
          <div className="eyebrow"><span className="section-index">06</span><span>TOOLS OF THE TRADE</span></div>
          <h2 id="toolkit-title">{interfaceCopy.toolkit.title}</h2>
          <p>{interfaceCopy.toolkit.description}</p>
        </div>
        <div className="toolkit-list" data-reveal>
          {toolkit.map((group, index) => (
            <div className="toolkit-row" key={group.category}>
              <span className="toolkit-index mono">{String(index + 1).padStart(2, "0")}</span>
              <h3>{group.category}</h3>
              <ul>{group.items.map((item) => <li key={item}>{item}</li>)}</ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
