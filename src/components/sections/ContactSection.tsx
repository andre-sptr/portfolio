"use client";

import { useEffect, useRef, useState } from "react";
import { profile } from "@/data/profile";

type ContactStatus = {
  message: string;
  tone: "error" | "success";
};

export function ContactSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<ContactStatus | null>(null);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const clearTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (clearTimerRef.current !== null) {
        window.clearTimeout(clearTimerRef.current);
      }
    };
  }, []);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (clearTimerRef.current !== null) {
      window.clearTimeout(clearTimerRef.current);
      clearTimerRef.current = null;
    }

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedMessage = message.trim();

    if (!trimmedName || !trimmedEmail || !trimmedMessage) {
      setStatus({
        message: "Please fill in all fields before sending.",
        tone: "error",
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      setStatus({
        message: "Please enter a valid email address.",
        tone: "error",
      });
      return;
    }

    setStatus({
      message: "Opening your email client...",
      tone: "success",
    });

    const subject = encodeURIComponent(`Portfolio Contact from ${trimmedName}`);
    const body = encodeURIComponent(
      `Name: ${trimmedName}\nEmail: ${trimmedEmail}\n\nMessage:\n${trimmedMessage}`
    );

    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;

    clearTimerRef.current = window.setTimeout(() => {
      setStatus(null);
      clearTimerRef.current = null;
    }, 3000);
  }

  return (
    <>
      <div className="section-divider" role="separator" />
      <section
        id="contact"
        className="contact-ref-section"
        aria-label="Contact information"
      >
        <div className="contact-ref-container">
          <h2 className="contact-ref-heading">
            Contact<span className="contact-ref-heading-dot">.</span>
          </h2>

          <div className="contact-ref-card">
            <div className="contact-ref-topbar">
              <div className="contact-ref-dots" aria-hidden="true">
                <span className="contact-ref-dot contact-ref-dot-red" />
                <span className="contact-ref-dot contact-ref-dot-yellow" />
                <span className="contact-ref-dot contact-ref-dot-green" />
              </div>
              <div className="contact-ref-title">contact.exe</div>
              <div className="contact-ref-topbar-spacer" aria-hidden="true" />
            </div>

            <div className="contact-ref-grid">
              <div className="contact-ref-cli">
                <div className="contact-ref-command-row">
                  <span className="contact-ref-host">andre@server</span>
                  <span className="contact-ref-sep">:</span>
                  <span className="contact-ref-tilde">~</span>
                  <span className="contact-ref-sep">$ </span>
                  <span className="contact-ref-cmd">./check-availability</span>
                </div>

                <div className="contact-ref-ok">
                  [OK] Available for freelance and collaborations.
                </div>

                <div className="contact-ref-command-row contact-ref-command-spaced">
                  <span className="contact-ref-host">andre@server</span>
                  <span className="contact-ref-sep">:</span>
                  <span className="contact-ref-tilde">~</span>
                  <span className="contact-ref-sep">$ </span>
                  <span className="contact-ref-cmd">
                    initiate-contact -method all
                  </span>
                </div>

                <div className="contact-ref-links">
                  <a
                    href={`mailto:${profile.email}`}
                    className="contact-ref-link-row"
                  >
                    <span className="contact-ref-link-label">Email -&gt;</span>
                    <span className="contact-ref-link-value">
                      {profile.email}
                    </span>
                  </a>

                  <a
                    href={profile.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-ref-link-row"
                  >
                    <span className="contact-ref-link-label">LinkedIn-&gt;</span>
                    <span className="contact-ref-link-value">
                      in/andre-sptr
                    </span>
                  </a>

                  <a
                    href={profile.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-ref-link-row"
                  >
                    <span className="contact-ref-link-label">GitHub -&gt;</span>
                    <span className="contact-ref-link-value">
                      andre-sptr
                    </span>
                  </a>
                </div>

                <div className="contact-ref-cursor-row">
                  <span className="contact-ref-host">andre@server</span>
                  <span className="contact-ref-sep">:</span>
                  <span className="contact-ref-tilde">~</span>
                  <span className="contact-ref-sep">$ </span>
                  <span className="contact-ref-cursor" aria-hidden="true" />
                </div>

                <div className="mobile-contact-toggle-wrap">
                  <button
                    type="button"
                    id="mobile-contact-toggle"
                    className="btn-creative btn-creative-white btn-creative-submit"
                    aria-expanded={isMobileDrawerOpen}
                    aria-controls="mobile-contact-drawer"
                    onClick={() => setIsMobileDrawerOpen((prev) => !prev)}
                  >
                    <span className="btn-creative-text-initial">
                      {isMobileDrawerOpen ? "Hide Message Form" : "Send Message"}
                    </span>
                    <span className="btn-creative-text-hover">
                      <span>
                        {isMobileDrawerOpen
                          ? "Hide Message Form"
                          : "Send Message"}
                      </span>
                      <svg
                        className={`btn-creative-arrow${
                          isMobileDrawerOpen ? " is-rotated" : ""
                        }`}
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <line x1="12" y1="5" x2="12" y2="19" />
                        <polyline points="19 12 12 19 5 12" />
                      </svg>
                    </span>
                    <span className="btn-creative-bubble" aria-hidden="true" />
                  </button>
                </div>
              </div>

              <div
                id="mobile-contact-drawer"
                className={`contact-ref-form-col mobile-contact-drawer${
                  isMobileDrawerOpen ? " expanded" : ""
                }`}
              >
                <form
                  id="contact-form"
                  className="contact-ref-form"
                  onSubmit={handleSubmit}
                  noValidate
                >
                  <div className="contact-ref-form-row">
                    <div className="contact-ref-field">
                      <label htmlFor="contact-name" className="contact-ref-label">
                        Name
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        placeholder="Your Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="contact-ref-input"
                      />
                    </div>

                    <div className="contact-ref-field">
                      <label
                        htmlFor="contact-email"
                        className="contact-ref-label"
                      >
                        Email
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        placeholder="email@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="contact-ref-input"
                      />
                    </div>
                  </div>

                  <div className="contact-ref-field">
                    <label
                      htmlFor="contact-message"
                      className="contact-ref-label"
                    >
                      Message
                    </label>
                    <textarea
                      id="contact-message"
                      rows={4}
                      required
                      placeholder="Drop your message here..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="contact-ref-input contact-ref-textarea"
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn-creative btn-creative-white btn-creative-submit"
                  >
                    <span className="btn-creative-text-initial">
                      Send Message
                    </span>
                    <span className="btn-creative-text-hover">
                      <span>Send Message</span>
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </span>
                    <span className="btn-creative-bubble" aria-hidden="true" />
                  </button>

                  <p
                    id="contact-status"
                    className={`contact-ref-status${
                      status?.tone === "success" ? " is-success" : ""
                    }`}
                    role="status"
                    aria-live="polite"
                  >
                    {status?.message ?? ""}
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
