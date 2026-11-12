import { CornerDownRight } from "lucide-react";
import { profile } from "@/data/profile";

export function HeroSection() {
  return (
    <section className="hero hero-home" id="top" aria-labelledby="hero-title" tabIndex={-1}>
      <div className="hero-shell container">
        <div className="hero-title-wrap">
          <h1 className="hero-name" id="hero-title">{profile.name.toUpperCase()}</h1>
          <div className="hero-role">
            <CornerDownRight className="hero-role-marker" size={34} strokeWidth={1.5} aria-hidden="true" />
            <div className="hero-role-copy">
              <p>{profile.hero.role}</p>
              <span>{profile.hero.descriptor}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
