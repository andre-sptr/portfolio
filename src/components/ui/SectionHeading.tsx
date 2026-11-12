import type { ReactNode } from "react";

type SectionHeadingProps = {
  index: string;
  label: string;
  title: string;
  description?: string;
  headingId?: string;
  children?: ReactNode;
};

export function SectionHeading({ index, label, title, description, headingId, children }: SectionHeadingProps) {
  return (
    <header className="section-heading" data-reveal>
      <div className="eyebrow">
        <span className="section-index">{index}</span>
        <span>{label}</span>
      </div>
      <div className="section-heading-row">
        <div>
          <h2 id={headingId}>{title}</h2>
          {description && <p className="section-description">{description}</p>}
        </div>
        {children}
      </div>
    </header>
  );
}
