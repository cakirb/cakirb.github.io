"use client";
import { useEffect, useState } from "react";
import Hero from "@/components/Hero";
import About from "@/components/About";
import ExperienceTimeline from "@/components/ExperienceTimeline";
import ProjectsGrid from "@/components/ProjectsGrid";
import ContactCTA from "@/components/ContactCTA";
import PS3EasterEgg from "@/components/PS3EasterEgg";

export default function Home() {
  const [showPS5Modal, setShowPS5Modal] = useState(false);
  const [ps3ModalPos, setPs3ModalPos] = useState({ x: 0, y: 0 });

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
      }
    };

    if (showPS5Modal) {
      document.documentElement.classList.add("no-scroll");
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.documentElement.classList.remove("no-scroll");
      window.removeEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.documentElement.classList.remove("no-scroll");
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [showPS5Modal]);

  return (
    <>
      <div className="frosted-overlay" />

      <a href="#main-content" className="skip-link focus-visible">Skip to content</a>

      <main id="main-content" className="section-solid-bg" style={{
        position: "relative",
        zIndex: 1,
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}>
        <div style={{ width: "100%", maxWidth: "1400px", padding: "0 var(--space-md)" }}>
          <Hero />
          <About />
          <ExperienceTimeline />
          <ProjectsGrid />
          <ContactCTA />

          <PS3EasterEgg 
            showPS5Modal={showPS5Modal} 
            setShowPS5Modal={setShowPS5Modal} 
            ps3ModalPos={ps3ModalPos} 
          />

          <footer style={{ padding: "var(--space-md) 0", textAlign: "center", opacity: 0.6, fontSize: "var(--text-sm)", marginTop: "var(--space-xl)" }}>
            <p className="footer-text">
              <span className="footer-author">Designed & Built by Batuhan Cakir</span>
              <span className="footer-separator"> &mdash; </span>
              <span className="footer-vibe" style={{ color: "var(--foreground)", opacity: 0.85 }}>
                <a href="/llms.txt" className="focus-visible" target="_blank" rel="noopener noreferrer" style={{ color: "inherit", textDecoration: "none" }} aria-label="llms.txt" title="llms.txt">
                  <span style={{ fontSize: "var(--text-lg)", verticalAlign: "-1px", marginRight: "4px" }}>✦</span>
                </a>
                <button
                  className="glitch-text focus-visible"
                  style={{ color: "#85c6b9", cursor: "pointer", background: "none", border: "none", padding: 0, font: "inherit", outlineOffset: "4px" }}
                  onClick={(e) => {
                    const rect = e.target.getBoundingClientRect();
                    firePSConfetti(rect);

                    let spawnX = e.clientX + 40;
                    let spawnY = e.clientY;
                    if (spawnX > window.innerWidth - 450) spawnX = window.innerWidth - 450;
                    if (spawnY > window.innerHeight - 300) spawnY = window.innerHeight - 300;

                    setPs3ModalPos({ x: spawnX, y: spawnY });
                    setShowPS5Modal(true);
                  }}
                >Vibe-coded</button> with Gemini 3.1 Pro
              </span>
            </p>
          </footer>
        </div>
      </main>
    </>
  );
}
