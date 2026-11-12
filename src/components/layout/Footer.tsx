import { ArrowUp, ArrowUpRight, Download } from "lucide-react";
import { profile } from "@/data/profile";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand-block">
            <a className="footer-name" href="#top">Andre Saputra<span className="footer-accent-dot" aria-hidden="true" /></a>
            <p>{profile.footer}</p>
          </div>
          <nav className="footer-links" aria-label="Footer navigation">
            <a href={`mailto:${profile.email}`}>Email <ArrowUpRight size={14} aria-hidden="true" /></a>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn <ArrowUpRight size={14} aria-hidden="true" /></a>
            <a href={profile.cv.href} download={profile.cv.filename}>Download CV <Download size={14} aria-hidden="true" /></a>
            <a href="#top">Back to top <ArrowUp size={14} aria-hidden="true" /></a>
          </nav>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Andre Saputra</span>
          <span>RF Engineer · Indonesia</span>
        </div>
      </div>
    </footer>
  );
}
