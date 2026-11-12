"use client";

import { useEffect, useRef } from "react";
import { ArrowUpRight, Check, X } from "lucide-react";
import type { Project } from "@/data/projects";
import { ProjectVisual } from "./ProjectVisual";

function DetailContent({ project }: { project: Project }) {
  return (
    <>
      <dl className="project-facts">
        <div><dt>Period</dt><dd>{project.period}</dd></div>
        <div><dt>Context</dt><dd>{project.organization}</dd></div>
      </dl>
      <h3>The need</h3>
      <p>{project.need}</p>
      <h3>Built to</h3>
      <ul className="function-list">
        {project.functions.map((item) => <li key={item}><Check size={15} aria-hidden="true" />{item}</li>)}
      </ul>
      <h3>Contribution</h3>
      <p>{project.role}</p>
    </>
  );
}

export function ProjectDialog({ project }: { project: Project }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const content = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = dialog.current;
    if (!element) return;
    const restoreFocus = () => {
      document.body.classList.remove("dialog-open");
      trigger.current?.focus({ preventScroll: true });
    };
    element.addEventListener("close", restoreFocus);
    element.addEventListener("cancel", restoreFocus);
    return () => {
      element.removeEventListener("close", restoreFocus);
      element.removeEventListener("cancel", restoreFocus);
      document.body.classList.remove("dialog-open");
    };
  }, []);

  const openDialog = () => {
    const element = dialog.current;
    if (!element || element.open) return;
    if (typeof element.showModal === "function") element.showModal();
    else element.setAttribute("open", "");
    document.body.classList.add("dialog-open");
    content.current?.scrollTo({ top: 0 });
  };

  return (
    <>
      <button ref={trigger} className="project-detail-link" type="button" aria-haspopup="dialog" aria-controls={`details-${project.id}`} onClick={openDialog}>
        View Details <ArrowUpRight size={17} aria-hidden="true" />
      </button>
      <dialog
        ref={dialog}
        className="project-dialog"
        id={`details-${project.id}`}
        aria-labelledby={`title-${project.id}`}
        onClick={(event) => {
          const element = dialog.current;
          if (!element) return;
          const rect = element.getBoundingClientRect();
          const isInside =
            rect.top <= event.clientY &&
            event.clientY <= rect.top + rect.height &&
            rect.left <= event.clientX &&
            event.clientX <= rect.left + rect.width;
          if (!isInside || event.target === event.currentTarget) {
            dialog.current?.close();
          }
        }}
      >
        <div className="dialog-header">
          <span className="eyebrow">PROJECT NOTES</span>
          <button className="icon-button" type="button" onClick={() => dialog.current?.close()} aria-label="Close project details">
            <X size={21} aria-hidden="true" />
          </button>
        </div>
        <div ref={content} className="dialog-content">
          <span className="project-category">{project.category}</span>
          <h2 id={`title-${project.id}`}>{project.name}</h2>
          <p className="dialog-subtitle">{project.subtitle}</p>
          <ProjectVisual kind={project.kind} />
          <p className="dialog-description">{project.description}</p>
          <DetailContent project={project} />
        </div>
        <div className="dialog-footer">
          <button className="text-button" type="button" onClick={() => dialog.current?.close()}>Back to projects <X size={15} aria-hidden="true" /></button>
        </div>
      </dialog>
      <noscript>
        <details id={`details-nojs-${project.id}`} className="nojs-details">
          <summary>{project.name}: project details</summary>
          <DetailContent project={project} />
        </details>
      </noscript>
    </>
  );
}
