"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

export function ContactActions({ email }: { email: string }) {
  const [status, setStatus] = useState<"idle" | "copied" | "error">("idle");

  const copyEmail = async () => {
    try {
      if (!navigator.clipboard?.writeText) throw new Error("Clipboard API unavailable");
      await navigator.clipboard.writeText(email);
      setStatus("copied");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="terminal-actions">
      <button className="terminal-copy-button" type="button" onClick={copyEmail}>
        {status === "copied" ? <Check size={15} aria-hidden="true" /> : <Copy size={15} aria-hidden="true" />}
        {status === "copied" ? "Email copied" : "Copy email address"}
      </button>
      <span className={`terminal-copy-status${status === "error" ? " is-error" : ""}`} role="status" aria-live="polite">
        {status === "error" ? "Clipboard unavailable. Select the email address above." : status === "copied" ? "Ready to paste." : ""}
      </span>
    </div>
  );
}
