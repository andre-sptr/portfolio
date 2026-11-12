import Image from "next/image";
import { ArrowDownRight, ArrowUpRight, Download, FileText, RadioTower, Settings2, Wrench } from "lucide-react";
import { profile } from "@/data/profile";

const currentFocus = [
  {
    number: "01",
    title: "Radio Trunking Operations",
    description: "Supporting day-to-day operations of radio trunking systems, including Motorola Capacity Max.",
    icon: RadioTower,
  },
  {
    number: "02",
    title: "Radio Configuration & Provisioning",
    description: "Working with radio configuration, license registration, and activation processes.",
    icon: Settings2,
  },
  {
    number: "03",
    title: "Radio Base Station Maintenance",
    description: "Supporting maintenance activities for Radio Base Station infrastructure.",
    icon: Wrench,
  },
];

export function AboutSection() {
  return (
    <section id="about" className="about-section section" tabIndex={-1} aria-labelledby="about-title">
      <div className="about-shell container">
        <div className="about-heading" data-reveal>
          <div className="about-kicker"><span className="about-kicker-dot" />PROFILE / 01</div>
          <h2 id="about-title">About <span>Me.</span></h2>
        </div>

        <div className="about-grid">
          <div className="about-story" data-reveal>
            <p className="about-lead">
              I&apos;m Andre, an Electronics and Telecommunication Engineering graduate from Politeknik Caltex Riau, with a professional focus on radio communication systems.
            </p>
            <p className="about-description">
              Currently, I work as an Engineer at PT Nexcom Indonesia, supporting radio trunking operations, radio configuration, license registration and activation, and Radio Base Station maintenance. I also bring an interest in networking, automation, and software to practical engineering work.
            </p>

            <div className="about-current-role">
              <span className="about-role-icon"><RadioTower size={19} aria-hidden="true" /></span>
              <span className="about-role-copy">
                <span className="about-overline">CURRENT ROLE</span>
                <strong>Engineer <span>at PT Nexcom Indonesia</span></strong>
              </span>
              <a href="#experience" className="about-role-link" aria-label="View professional experience">
                <ArrowUpRight size={18} aria-hidden="true" />
              </a>
            </div>

            <div className="about-personal-row">
              <Image
                className="about-avatar"
                src={profile.portrait.src}
                alt="Andre Saputra"
                width={profile.portrait.width}
                height={profile.portrait.height}
                sizes="76px"
              />
              <div className="about-personal-copy">
                <strong>{profile.name}</strong>
                <span>Electronics &amp; Telecommunication</span>
                <span>{profile.location}</span>
              </div>
              <div className="about-cv-actions">
                <a href={profile.cv.href} target="_blank" rel="noopener noreferrer" aria-label="Open curriculum vitae PDF in a new tab">
                  <FileText size={16} aria-hidden="true" /> View CV
                </a>
                <a href={profile.cv.href} download={profile.cv.filename} aria-label="Download Andre Saputra's CV">
                  <Download size={16} aria-hidden="true" /> Download
                </a>
              </div>
            </div>
          </div>

          <aside className="about-focus" aria-labelledby="about-focus-title" data-reveal>
            <div className="about-focus-heading">
              <div>
                <span className="about-overline">WHAT I WORK WITH</span>
                <h3 id="about-focus-title">Current Focus</h3>
              </div>
              <span className="about-focus-mark" aria-hidden="true"><ArrowDownRight size={21} /></span>
            </div>
            <div className="about-focus-list">
              {currentFocus.map(({ number, title, description, icon: Icon }) => (
                <article className="about-focus-item" key={number}>
                  <span className="about-focus-number">{number}</span>
                  <span className="about-focus-icon"><Icon size={19} strokeWidth={1.7} aria-hidden="true" /></span>
                  <div className="about-focus-copy">
                    <h4>{title}</h4>
                    <p>{description}</p>
                  </div>
                </article>
              ))}
            </div>
            <div className="about-focus-foot">
              <span className="about-focus-indicator" />
              <span>RADIO COMMUNICATION / ENGINEERING</span>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
