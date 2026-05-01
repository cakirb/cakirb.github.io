"use client";
import { useEffect, useRef, useState } from "react";
import Hero from "@/components/Hero";
import About from "@/components/About";
import ExperienceTimeline from "@/components/ExperienceTimeline";
import ProjectsGrid from "@/components/ProjectsGrid";
import ContactCTA from "@/components/ContactCTA";
import PS3EasterEgg from "@/components/PS3EasterEgg";
import { trackEvent } from "@/lib/analytics";

export default function Home() {
  const [showPS5Modal, setShowPS5Modal] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [showAiUsageModal, setShowAiUsageModal] = useState(false);
  const [privacyPopoverPos, setPrivacyPopoverPos] = useState({ top: 0, left: 0 });
  const [aiUsagePopoverPos, setAiUsagePopoverPos] = useState({ top: 0, left: 0 });
  const [ps3ModalPos, setPs3ModalPos] = useState({ x: 0, y: 0 });
  const privacyButtonRef = useRef(null);
  const aiUsageButtonRef = useRef(null);

  const firePSConfetti = async (rect, particleMultiplier = 1) => {
    const confettiModule = await import("canvas-confetti");
    const confetti = confettiModule.default;

    const origin = {
      x: (rect.left + rect.width / 2) / window.innerWidth,
      y: (rect.top + rect.height / 2) / window.innerHeight
    };

    const triangle = confetti.shapeFromPath({ path: 'M 10 0 L 20 20 L 0 20 Z M 10 5 L 4.5 16 L 15.5 16 Z' });
    const square = confetti.shapeFromPath({ path: 'M 0 0 L 20 0 L 20 20 L 0 20 Z M 4 4 L 4 16 L 16 16 L 16 4 Z' });
    const circle = confetti.shapeFromPath({ path: 'M 10 0 C 15.5 0 20 4.5 20 10 C 20 15.5 15.5 20 10 20 C 4.5 20 0 15.5 0 10 C 0 4.5 4.5 0 10 0 Z M 10 3 C 6.1 3 3 6.1 3 10 C 3 13.9 6.1 17 10 17 C 13.9 17 17 13.9 17 10 C 17 6.1 13.9 3 10 3 Z' });
    const cross = confetti.shapeFromPath({ path: 'M 8 0 L 12 0 L 12 8 L 20 8 L 20 12 L 12 12 L 12 20 L 8 20 L 8 12 L 0 12 L 0 8 L 8 8 Z M 9 2 L 9 9 L 2 9 L 2 11 L 9 11 L 9 18 L 11 18 L 11 11 L 18 11 L 18 9 L 11 9 L 11 2 Z' });

    const sharedOpts = { spread: 120, origin, scalar: 1.5, gravity: 1.1, ticks: 200 };
    const count = 30 * particleMultiplier;

    confetti({ ...sharedOpts, particleCount: count, colors: ['#4ade80'], shapes: [triangle] });
    confetti({ ...sharedOpts, particleCount: count, colors: ['#f472b6'], shapes: [square] });
    confetti({ ...sharedOpts, particleCount: count, colors: ['#ef4444'], shapes: [circle] });
    confetti({ ...sharedOpts, particleCount: count, colors: ['#3b82f6'], shapes: [cross] });
  };

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          // Optional: unobserve after revealing if you only want it to animate once ever
          // observer.unobserve(entry.target); 
        }
      });
    }, { threshold: 0.15 });

    const elements = document.querySelectorAll(".reveal");
    elements.forEach((el) => observer.observe(el));

    return () => elements.forEach((el) => observer.unobserve(el));
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setShowPS5Modal(false);
        setShowPrivacyModal(false);
        setShowAiUsageModal(false);
      }
    };

    if (showPS5Modal) {
      document.documentElement.classList.add("no-scroll");
    } else {
      document.documentElement.classList.remove("no-scroll");
    }

    if (showPS5Modal || showPrivacyModal || showAiUsageModal) {
      window.addEventListener("keydown", handleKeyDown);
    } else {
      window.removeEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.documentElement.classList.remove("no-scroll");
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [showPS5Modal, showPrivacyModal, showAiUsageModal]);

  useEffect(() => {
    if (!showPrivacyModal && !showAiUsageModal) return;

    const closeFooterPopovers = () => {
      setShowPrivacyModal(false);
      setShowAiUsageModal(false);
    };

    window.addEventListener("scroll", closeFooterPopovers, { passive: true });
    window.addEventListener("resize", closeFooterPopovers);

    return () => {
      window.removeEventListener("scroll", closeFooterPopovers);
      window.removeEventListener("resize", closeFooterPopovers);
    };
  }, [showPrivacyModal, showAiUsageModal]);

  return (
    <>
      <div className="frosted-overlay" />

      <a href="#main-content" className="skip-link focus-visible">Skip to content</a>

      <main id="main-content" style={{
        position: "relative",
        zIndex: 1,
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}>
        <div className="main-container" style={{ width: "100%", maxWidth: "1400px" }}>
          <Hero />
          <About />
          <ExperienceTimeline />
          <ProjectsGrid />
          <ContactCTA 
            firePSConfetti={firePSConfetti} 
            setPs3ModalPos={setPs3ModalPos} 
            setShowPS5Modal={setShowPS5Modal} 
          />

          <PS3EasterEgg 
            showPS5Modal={showPS5Modal} 
            setShowPS5Modal={setShowPS5Modal} 
            ps3ModalPos={ps3ModalPos} 
          />

          <footer style={{ padding: "var(--space-md) 0", textAlign: "center", opacity: 0.6, fontSize: "var(--text-sm)", marginTop: "var(--space-xl)" }}>
            <p className="footer-text">
              <span className="footer-author">Designed & Built by Batuhan Cakir</span>
              <span className="footer-separator"> &mdash; </span>
                <button
                  ref={aiUsageButtonRef}
                  type="button"
                  className="footer-vibe focus-visible"
                  aria-expanded={showAiUsageModal}
                  aria-controls="ai-usage-popover"
                  style={{
                    color: "var(--foreground)",
                    opacity: 0.85,
                    background: "none",
                    border: "none",
                    padding: 0,
                    font: "inherit",
                    cursor: "pointer",
                    textDecoration: "none",
                  }}
                  onClick={() => {
                    const rect = aiUsageButtonRef.current?.getBoundingClientRect();
                    const willOpen = !showAiUsageModal;
                    if (rect) {
                      setAiUsagePopoverPos({
                        top: rect.top - 10,
                        left: Math.min(Math.max(rect.left + rect.width / 2, 180), window.innerWidth - 180),
                      });
                    }
                    if (willOpen) {
                      trackEvent("ai_usage_note_click");
                      setShowPrivacyModal(false);
                    }
                    setShowAiUsageModal((current) => !current);
                  }}
                >
                  <span style={{ fontSize: "var(--text-lg)", verticalAlign: "-1px", marginRight: "4px" }}>✦</span>
                  Vibe-coded under Batu’s direction
                </button>
              <span className="footer-separator"> &mdash; </span>
              <button
                ref={privacyButtonRef}
                type="button"
                className="footer-analytics focus-visible"
                aria-expanded={showPrivacyModal}
                aria-controls="analytics-popover"
                style={{
                  color: "inherit",
                  background: "none",
                  border: "none",
                  padding: 0,
                  font: "inherit",
                  cursor: "pointer",
                  textDecoration: "none",
                }}
                onClick={() => {
                  const rect = privacyButtonRef.current?.getBoundingClientRect();
                  const willOpen = !showPrivacyModal;
                  if (rect) {
                    setPrivacyPopoverPos({
                      top: rect.top - 10,
                      left: Math.min(Math.max(rect.left + rect.width / 2, 150), window.innerWidth - 150),
                    });
                  }
                  if (willOpen) trackEvent("analytics_note_click");
                  if (willOpen) setShowAiUsageModal(false);
                  setShowPrivacyModal((current) => !current);
                }}
              >
                Analytics
              </button>
            </p>
          </footer>
        </div>
      </main>

      {(showPrivacyModal || showAiUsageModal) && (
        <div
          aria-hidden="true"
          onClick={() => {
            setShowPrivacyModal(false);
            setShowAiUsageModal(false);
          }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: "calc(var(--z-modal-content, 9999) - 1)",
            background: "transparent",
          }}
        />
      )}

      {showPrivacyModal && (
        <aside
          id="analytics-popover"
          role="status"
          style={{
            position: "fixed",
            top: privacyPopoverPos.top,
            left: privacyPopoverPos.left,
            transform: "translate(-50%, -100%)",
            zIndex: "var(--z-modal-content, 9999)",
            width: "min(280px, calc(100vw - 2rem))",
            padding: "0.85rem 1rem",
            borderRadius: "var(--radius-md)",
            background: "rgba(17, 21, 24, 0.96)",
            border: "1px solid rgba(255,255,255,0.12)",
            boxShadow: "0 16px 48px rgba(0,0,0,0.45)",
            color: "var(--foreground)",
            fontSize: "var(--text-xs)",
            textAlign: "left",
          }}
        >
          This site uses cookie-free Umami Analytics to understand anonymous usage. It records page
          views and selected interactions, but no personally identifiable information.
        </aside>
      )}

      {showAiUsageModal && (
        <aside
          id="ai-usage-popover"
          role="status"
          style={{
            position: "fixed",
            top: aiUsagePopoverPos.top,
            left: aiUsagePopoverPos.left,
            transform: "translate(-50%, -100%)",
            zIndex: "var(--z-modal-content, 9999)",
            width: "min(360px, calc(100vw - 2rem))",
            padding: "0.95rem 1rem",
            borderRadius: "var(--radius-md)",
            background: "rgba(17, 21, 24, 0.96)",
            border: "1px solid rgba(255,255,255,0.12)",
            boxShadow: "0 16px 48px rgba(0,0,0,0.45)",
            color: "var(--foreground)",
            fontSize: "var(--text-xs)",
            textAlign: "left",
            lineHeight: 1.55,
          }}
        >
          <strong style={{ display: "block", marginBottom: "0.4rem", color: "var(--accent-cyan)" }}>
            AI usage notes
          </strong>
          <p style={{ marginBottom: "0.55rem" }}>
            This website was designed and developed with AI assistance under my direction.
          </p>
          <p style={{ marginBottom: "0.55rem" }}>
            Gemini 3.1 Pro supported most implementation, Claude Opus 4.7 helped refine the frontend, and GPT-5.5 helped with analytics and copy refinement.
          </p>
          <a
            href="/llms.txt"
            target="_blank"
            rel="noopener noreferrer"
            className="focus-visible"
            style={{ color: "var(--accent-cyan)", fontWeight: 600 }}
            onClick={() => trackEvent("llms_txt_click")}
          >
            View llms.txt →
          </a>
        </aside>
      )}
    </>
  );
}
