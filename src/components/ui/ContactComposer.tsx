"use client";

import { useState, type FormEvent } from "react";
import { Send } from "lucide-react";

type ContactComposerProps = {
  recipient: string;
};

export function ContactComposer({ recipient }: ContactComposerProps) {
  const [status, setStatus] = useState<"idle" | "prepared" | "error">("idle");

  const prepareEmail = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") ?? "").trim();
    const replyEmail = String(formData.get("replyEmail") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();

    if (!name || !replyEmail || !message) {
      setStatus("error");
      return;
    }

    const subject = `Portfolio inquiry from ${name}`;
    const body = `Name: ${name}\nReply email: ${replyEmail}\n\n${message}`;
    const mailto = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    try {
      window.location.href = mailto;
      setStatus("prepared");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="terminal-composer">
      <div className="terminal-composer-heading">
        <span>MESSAGE COMPOSER</span>
        <span className="mono">mailto</span>
      </div>
      <form className="contact-form" onSubmit={prepareEmail} onInvalid={() => setStatus("error")}>
        <div className="contact-form-row">
          <label>
            <span>Name</span>
            <input name="name" type="text" autoComplete="name" maxLength={80} placeholder="Your name" required />
          </label>
          <label>
            <span>Reply email</span>
            <input name="replyEmail" type="email" autoComplete="email" maxLength={120} placeholder="you@example.com" required />
          </label>
        </div>
        <label>
          <span>Message</span>
          <textarea name="message" rows={4} minLength={10} maxLength={1500} placeholder="Tell me a little about your inquiry..." required />
        </label>
        <div className="contact-form-bottom">
          <button className="terminal-submit-button" type="submit">
            Prepare email <Send size={14} aria-hidden="true" />
          </button>
          <span className={`contact-form-status${status === "error" ? " is-error" : ""}`} role="status" aria-live="polite">
            {status === "prepared" ? "Your email app should open with a draft. Send it there to complete your message." : status === "error" ? "The draft could not be prepared. Check the fields and use the email address above." : "Opens your default email app. No message is sent by this website."}
          </span>
        </div>
      </form>
    </div>
  );
}
