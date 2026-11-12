import { ArrowUpRight, Linkedin, Mail, MapPin, RadioTower } from "lucide-react";
import { profile } from "@/data/profile";
import { ContactActions } from "@/components/ui/ContactActions";
import { ContactComposer } from "@/components/ui/ContactComposer";

export function ContactSection() {
  return (
    <section id="contact" className="contact-section section" tabIndex={-1} aria-labelledby="contact-title">
      <div className="container contact-layout">
        <div className="contact-content" data-reveal>
          <div className="eyebrow"><span className="contact-dot" />CONTACT / LET&apos;S CONNECT</div>
          <h2 id="contact-title">Let&apos;s talk about<br /><span>radio systems.</span></h2>
          <p>{profile.contact.description}</p>
          <div className="contact-location"><MapPin size={14} aria-hidden="true" />{profile.location}</div>
        </div>

        <div className="contact-terminal" data-reveal aria-label="Contact channels">
          <div className="terminal-topbar">
            <div className="terminal-window-dots" aria-hidden="true"><i /><i /><i /></div>
            <span>CONTACT CHANNELS</span>
            <RadioTower size={16} aria-hidden="true" />
          </div>
          <div className="terminal-body">
            <div className="terminal-prompt"><span>andre@portfolio</span>:<span>~</span>$ contact --methods</div>
            <div className="terminal-channel">
              <span className="terminal-channel-label"><Mail size={15} aria-hidden="true" /> EMAIL</span>
              <a href={`mailto:${profile.email}?subject=${encodeURIComponent("Professional inquiry")}`}>
                {profile.email}<ArrowUpRight size={15} aria-hidden="true" />
              </a>
            </div>
            <div className="terminal-channel">
              <span className="terminal-channel-label"><Linkedin size={15} aria-hidden="true" /> LINKEDIN</span>
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
                Professional profile<ArrowUpRight size={15} aria-hidden="true" />
              </a>
            </div>
            <ContactActions email={profile.email} />
            <ContactComposer recipient={profile.email} />
          </div>
          <div className="terminal-footer"><span>Use the channel that works best for you.</span><span>END OF CONTACT INFO</span></div>
        </div>
      </div>
    </section>
  );
}
