"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { profile } from "@/data/profile";

export function Navbar() {
  const [active, setActive] = useState("top");
  const [detailOpen, setDetailOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const detailRoot = useRef<HTMLDivElement>(null);
  const detailTrigger = useRef<HTMLButtonElement>(null);
  const detailFirstLink = useRef<HTMLAnchorElement>(null);
  const mobileTrigger = useRef<HTMLButtonElement>(null);
  const mobilePanel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const targets = [...profile.navigation, ...profile.detailNavigation];
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-18% 0px -62% 0px", threshold: [0, 0.15, 0.35] },
    );

    targets.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!detailOpen && !mobileOpen) return;

    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      if (detailOpen && !detailRoot.current?.contains(target)) setDetailOpen(false);
      if (mobileOpen && !mobilePanel.current?.contains(target) && !mobileTrigger.current?.contains(target)) setMobileOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      if (detailOpen) {
        setDetailOpen(false);
        detailTrigger.current?.focus();
      }
      if (mobileOpen) {
        setMobileOpen(false);
        mobileTrigger.current?.focus();
      }
    };
    const desktopQuery = window.matchMedia("(min-width: 761px)");
    const onBreakpoint = () => {
      if (desktopQuery.matches) setMobileOpen(false);
      else setDetailOpen(false);
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    desktopQuery.addEventListener("change", onBreakpoint);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
      desktopQuery.removeEventListener("change", onBreakpoint);
    };
  }, [detailOpen, mobileOpen]);

  const closeMobileMenu = (id: string) => {
    setMobileOpen(false);
    requestAnimationFrame(() => document.getElementById(id)?.focus({ preventScroll: true }));
  };

  return (
    <header className="site-header floating-site-header">
      <nav className="nav-wrap floating-nav-wrap" aria-label="Main navigation">
        <div className="floating-nav" aria-label="Portfolio sections">
          <div className="floating-nav-main">
            {profile.navigation.map(({ id, label }) => (
              <a
                key={id}
                className={`floating-nav-link${active === id ? " is-active" : ""}`}
                href={`#${id}`}
                aria-current={active === id ? "location" : undefined}
              >
                {label}
              </a>
            ))}
          </div>

          <span className="floating-nav-divider" aria-hidden="true" />

          <div
            className="floating-nav-detail"
            ref={detailRoot}
            onBlur={(event) => {
              if (!detailRoot.current?.contains(event.relatedTarget as Node | null)) setDetailOpen(false);
            }}
          >
            <button
              className={`floating-nav-trigger${detailOpen ? " is-open" : ""}`}
              type="button"
              ref={detailTrigger}
              aria-expanded={detailOpen}
              aria-controls="detail-menu"
              aria-haspopup="menu"
              onClick={() => setDetailOpen((value) => !value)}
              onKeyDown={(event) => {
                if (event.key === "ArrowDown") {
                  event.preventDefault();
                  setDetailOpen(true);
                  requestAnimationFrame(() => detailFirstLink.current?.focus());
                }
              }}
            >
              Detail <ChevronDown size={13} aria-hidden="true" />
            </button>
            <div
              className="floating-nav-dropdown"
              id="detail-menu"
              role="menu"
              aria-label="Additional sections"
              hidden={!detailOpen}
              onKeyDown={(event) => {
                if (!["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) return;
                const links = Array.from(detailRoot.current?.querySelectorAll<HTMLAnchorElement>("[role='menuitem']") ?? []);
                if (!links.length) return;
                event.preventDefault();
                const current = links.indexOf(document.activeElement as HTMLAnchorElement);
                const next = event.key === "Home" ? 0 : event.key === "End" ? links.length - 1 : event.key === "ArrowDown" ? (current + 1 + links.length) % links.length : (current - 1 + links.length) % links.length;
                links[next].focus();
              }}
            >
              {profile.detailNavigation.map(({ id, label }, index) => (
                <a
                  key={id}
                  ref={index === 0 ? detailFirstLink : undefined}
                  href={`#${id}`}
                  role="menuitem"
                  onClick={() => setDetailOpen(false)}
                >
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <button
          ref={mobileTrigger}
          className="floating-nav-mobile-trigger"
          type="button"
          aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={mobileOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMobileOpen((value) => !value)}
        >
          {mobileOpen ? <X size={18} aria-hidden="true" /> : <Menu size={18} aria-hidden="true" />}
        </button>

        <div
          className="floating-nav-mobile-panel"
          id="mobile-navigation"
          ref={mobilePanel}
          hidden={!mobileOpen}
          onBlur={(event) => {
            const nextTarget = event.relatedTarget as Node | null;
            if (!mobilePanel.current?.contains(nextTarget) && !mobileTrigger.current?.contains(nextTarget)) setMobileOpen(false);
          }}
        >
          <div className="mobile-nav-group">
              <span className="mobile-nav-label">MAIN</span>
              {profile.navigation.map(({ id, label }) => (
                <a key={id} href={`#${id}`} onClick={() => closeMobileMenu(id)}>
                  {label}
                </a>
              ))}
          </div>
          <div className="mobile-nav-group">
            <span className="mobile-nav-label">DETAIL</span>
              {profile.detailNavigation.map(({ id, label }) => (
                <a key={id} href={`#${id}`} onClick={() => closeMobileMenu(id)}>
                  {label}
                </a>
              ))}
          </div>
        </div>
      </nav>
    </header>
  );
}
