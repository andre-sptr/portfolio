import React from "react";
import { cn } from "@/lib/utils";

interface BrowserFrameProps {
  url?: string;
  children: React.ReactNode;
  className?: string;
}

function formatUrl(url?: string): string {
  if (!url) return "localhost:3000";
  try {
    const u = new URL(url);
    const path = u.pathname === "/" ? "" : u.pathname;
    return u.hostname + path;
  } catch {
    return url;
  }
}

const LockIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const BrowserFrame: React.FC<BrowserFrameProps> = ({ url, children, className }) => {
  const displayUrl = formatUrl(url);
  const isLive = Boolean(url);

  return (
    <div
      className={cn(
        "rounded-xl overflow-hidden border border-white/[0.06] bg-[var(--surface-1)]",
        className,
      )}
    >
      {/* Chrome bar */}
      <div className="flex items-center gap-3 px-3 py-2 bg-[var(--surface-2)] border-b border-white/[0.05]">
        {/* Traffic lights */}
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="block w-2.5 h-2.5 rounded-full bg-[#ff5f56]/75" />
          <span className="block w-2.5 h-2.5 rounded-full bg-[#ffbd2e]/75" />
          <span className="block w-2.5 h-2.5 rounded-full bg-[#27c93f]/75" />
        </div>

        {/* URL bar */}
        <div className="flex-1 flex items-center justify-center min-w-0">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-[var(--surface-0)]/60 border border-white/[0.04] min-w-0 max-w-full">
            <LockIcon className="w-3 h-3 text-muted-foreground/60 shrink-0" />
            <span className="text-[11px] text-muted-foreground/85 font-mono-tight tracking-tight truncate">
              {displayUrl}
            </span>
          </div>
        </div>

        {/* Spacer to balance traffic lights */}
        <div className="w-[42px] shrink-0 hidden sm:flex items-center justify-end">
          {isLive && (
            <span className="flex items-center gap-1 text-[9px] uppercase tracking-[0.18em] text-[#27c93f]/70 font-mono-tight">
              <span className="block w-1 h-1 rounded-full bg-[#27c93f]/80" />
              Live
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      {children}
    </div>
  );
};

export default BrowserFrame;
