"use client";

import { trackEvent } from "@/lib/analytics";

export default function ContactCTA({ firePSConfetti, setPs3ModalPos, setShowPS5Modal }) {
  return (
    <section id="contact" style={{ minHeight: "80dvh", paddingTop: "var(--space-2xl)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", paddingLeft: "var(--space-md)", paddingRight: "var(--space-md)" }}>
      <span className="reveal" style={{ display: "block", fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.2em", color: "var(--accent-magenta)", marginBottom: "1.5rem", fontWeight: "600" }}>
        get in touch
      </span>
      <h2 className="reveal" style={{ fontSize: "var(--text-3xl)", color: "var(--accent-cyan)", lineHeight: "1.1", marginBottom: "1.5rem", transitionDelay: "0.1s" }}>
        Say Hello
        <button
          className="glitch-text easter-egg-dot focus-visible"
          style={{ color: "var(--foreground)", background: "none", border: "none", padding: 0, font: "inherit", cursor: "pointer", outlineOffset: "4px" }}
          onClick={(e) => {
            trackEvent("easter_egg_open", { location: "contact" });
            const rect = e.target.getBoundingClientRect();
            if (firePSConfetti) firePSConfetti(rect);

            let spawnX = e.clientX + 40;
            let spawnY = e.clientY;
            if (spawnX > window.innerWidth - 450) spawnX = window.innerWidth - 450;
            if (spawnY > window.innerHeight - 300) spawnY = window.innerHeight - 300;

            if (setPs3ModalPos) setPs3ModalPos({ x: spawnX, y: spawnY });
            if (setShowPS5Modal) setShowPS5Modal(true);
          }}
          title="Vibe-coded easter egg"
          aria-label="Vibe-coded easter egg"
        >
          .
        </button>
      </h2>
      <p className="reveal" style={{ maxWidth: "600px", marginBottom: "var(--space-md)", opacity: 0.9, transitionDelay: "0.2s", fontSize: "var(--text-lg)" }}>
        Whether you have a question about computational biology, single-cell analysis, or just want to say hi, my inbox is always open.
      </p>
      <div className="reveal" style={{ position: "relative", display: "inline-block" }}>
        <a
          href="mailto:bc8@sanger.ac.uk"
          className="contact-btn focus-visible"
          onClick={() => trackEvent("contact_click", { location: "contact" })}
        >
          Contact Me
        </a>
      </div>
    </section>
  );
}
