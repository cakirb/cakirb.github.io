"use client";
import { useEffect, useState } from "react";
import confetti from "canvas-confetti";
import {
  GithubIcon, LinkedInIcon, OrcidIcon, ScholarIcon, XIcon, EmailIcon,
  BriefcaseIcon, GraduationIcon, InstagramIcon, ThreadsIcon
} from "../components/Icons";

// Bluesky Icon Component
const BlueskyIcon = ({ style, ...props }) => (
  <svg viewBox="0 0 600 530" fill="currentColor" width="28px" height="28px" style={{ transform: "translateY(2px)", ...style }} {...props}>
    <path d="m135.72 44.03c66.496 49.921 138.02 151.14 164.28 205.46 26.262-54.316 97.782-155.54 164.28-205.46 47.98-36.021 125.72-63.892 125.72 24.795 0 17.712-10.155 148.79-16.111 170.07-20.703 73.984-96.144 92.854-163.25 81.433 117.3 19.964 147.14 86.092 82.697 152.22-122.39 125.59-175.91-31.511-189.63-71.766-2.514-7.3797-3.6904-10.832-3.7077-7.8964-0.0174-2.9357-1.1937 0.51669-3.7077 7.8964-13.714 40.255-67.233 197.36-189.63 71.766-64.444-66.128-34.605-132.26 82.697-152.22-67.108 11.421-142.55-7.4491-163.25-81.433-5.9562-21.282-16.111-152.36-16.111-170.07 0-88.687 77.742-60.816 125.72-24.795z" />
  </svg>
);

export default function Home() {
  const [activeTrack, setActiveTrack] = useState("all");

  // Easter Egg States
  const [showPS5Modal, setShowPS5Modal] = useState(false);
  const [ps3ModalPos, setPs3ModalPos] = useState({ x: 0, y: 0 });
  const [ps3Time, setPs3Time] = useState("");
  const [returnScrollPos, setReturnScrollPos] = useState(null);

  const firePSConfetti = (rect, particleMultiplier = 1) => {
    const origin = {
      x: (rect.left + rect.width / 2) / window.innerWidth,
      y: (rect.top + rect.height / 2) / window.innerHeight
    };

    // Hollow PlayStation Shapes for Canvas Confetti
    const triangle = confetti.shapeFromPath({ path: 'M 10 0 L 20 20 L 0 20 Z M 10 5 L 4.5 16 L 15.5 16 Z' });
    const square = confetti.shapeFromPath({ path: 'M 0 0 L 20 0 L 20 20 L 0 20 Z M 4 4 L 4 16 L 16 16 L 16 4 Z' });
    // Robust Cubic Bezier Circle (Center 10,10. Outer R=10, Inner R=7)
    const circle = confetti.shapeFromPath({ path: 'M 10 0 C 15.5 0 20 4.5 20 10 C 20 15.5 15.5 20 10 20 C 4.5 20 0 15.5 0 10 C 0 4.5 4.5 0 10 0 Z M 10 3 C 6.1 3 3 6.1 3 10 C 3 13.9 6.1 17 10 17 C 13.9 17 17 13.9 17 10 C 17 6.1 13.9 3 10 3 Z' });
    // Symmetrical Hollow Cross (Plus Shape, Confetti random rotation makes it an X)
    const cross = confetti.shapeFromPath({ path: 'M 8 0 L 12 0 L 12 8 L 20 8 L 20 12 L 12 12 L 12 20 L 8 20 L 8 12 L 0 12 L 0 8 L 8 8 Z M 9 2 L 9 9 L 2 9 L 2 11 L 9 11 L 9 18 L 11 18 L 11 11 L 18 11 L 18 9 L 11 9 L 11 2 Z' });

    const sharedOpts = {
      spread: 120,
      origin,
      scalar: 1.5,
      gravity: 1.1,
      ticks: 200
    };

    const count = 30 * particleMultiplier;

    // Fire 4 separate bursts so each shape gets its exact matching PlayStation color
    confetti({ ...sharedOpts, particleCount: count, colors: ['#4ade80'], shapes: [triangle] }); // Green Triangle
    confetti({ ...sharedOpts, particleCount: count, colors: ['#f472b6'], shapes: [square] });   // Pink Square
    confetti({ ...sharedOpts, particleCount: count, colors: ['#ef4444'], shapes: [circle] });   // Red Circle
    confetti({ ...sharedOpts, particleCount: count, colors: ['#3b82f6'], shapes: [cross] });    // Blue Cross
  };

  useEffect(() => {
    // V2 Intersection Observer for Native Vertical Scroll Animations
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
        } else {
          entry.target.classList.remove("active");
        }
      });
    }, { threshold: 0.15 });

    const elements = document.querySelectorAll(".reveal");
    elements.forEach((el) => observer.observe(el));

    return () => elements.forEach((el) => observer.unobserve(el));
  }, []);

  // Global Scroll Lock and ESC listener when Modal is Active
  useEffect(() => {
    let interval;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setShowPS5Modal(false);
      }
    };

    if (showPS5Modal) {
      document.documentElement.classList.add("no-scroll");
      window.addEventListener("keydown", handleKeyDown);

      const updateTime = () => {
        const now = new Date();
        const dateStr = `${now.getDate()}/${now.getMonth() + 1}`;
        const timeStr = `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`;
        setPs3Time(`${dateStr} ${timeStr}`);
      };
      updateTime();
      interval = setInterval(updateTime, 10000);
    } else {
      document.documentElement.classList.remove("no-scroll");
      window.removeEventListener("keydown", handleKeyDown);
    }

    // Cleanup on unmount
    return () => {
      document.documentElement.classList.remove("no-scroll");
      window.removeEventListener("keydown", handleKeyDown);
      if (interval) clearInterval(interval);
    };
  }, [showPS5Modal]);

  return (
    <>
      {/* Frosted overlay now permanently on for readability against dense dots */}
      <div className="frosted-overlay" />

      {/* MAIN VERTICAL SCROLL CONTENT */}
      <main className="section-solid-bg" style={{
        position: "relative",
        zIndex: 1,
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}>
        <div style={{ width: "100%", maxWidth: "1400px", padding: "0 2rem" }}>
          {/* --- HERO SECTION --- */}
          <section
            id="home"
            style={{
              minHeight: "100vh",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              paddingTop: "5rem"
            }}
          >
            <div className="glass-panel" style={{ maxWidth: "1000px" }}>
              <h1 className="hero-stagger-1" style={{ fontSize: "max(3.5rem, 8vw)", fontWeight: "700", letterSpacing: "-0.02em", lineHeight: "1.1", marginBottom: "3rem", color: "var(--accent-cyan)" }}>
                <span className="marker-highlight" style={{ fontFamily: "inherit" }}>Batu</span>han Çakır
              </h1>

              {/* Subdued, highly designed subheaders */}
              <div className="hero-stagger-2">
                <h2 style={{ fontSize: "max(2vw, 1.2rem)", fontWeight: "500", opacity: 0.85, marginBottom: "4rem", letterSpacing: "-0.02em" }}>
                  Senior Bioinformatician and PhD Candidate
                </h2>
              </div>

              <p className="hero-stagger-3" style={{ fontSize: "1.35rem", background: "linear-gradient(90deg, var(--accent-cyan) 0%, #8282ff 50%, var(--accent-magenta) 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", marginBottom: "3rem", maxWidth: "800px", lineHeight: "1.6", fontWeight: "600", letterSpacing: "-0.01em" }}>
                Specialising in single-cell RNA-seq analysis, lineage tracing, and pipeline development. Interested in trajectories, cell-fate transitions, and reproducible workflows.
              </p>

              <div className="hero-stagger-4" style={{ display: "flex", gap: "1.8rem", marginTop: "1rem", flexWrap: "wrap" }}>
                <a href="https://x.com/cakirb_" target="_blank" rel="noopener noreferrer" className="social-icon-hover" title="X (Twitter)">
                  <XIcon />
                </a>
                <a href="https://linkedin.com/in/batuhancakir" target="_blank" rel="noopener noreferrer" className="social-icon-hover" title="LinkedIn">
                  <LinkedInIcon />
                </a>
                <a href="https://bsky.app/profile/cakirb.bsky.social" target="_blank" rel="noopener noreferrer" className="social-icon-hover" title="Bluesky">
                  <BlueskyIcon />
                </a>
                <a href="https://github.com/cakirb" target="_blank" rel="noopener noreferrer" className="social-icon-hover" title="GitHub">
                  <GithubIcon />
                </a>
                <a href="https://scholar.google.com/citations?user=iGaYmB4AAAAJ&hl=en" target="_blank" rel="noopener noreferrer" className="social-icon-hover" title="Google Scholar">
                  <ScholarIcon />
                </a>
                <a href="https://orcid.org/0000-0003-4513-606X" target="_blank" rel="noopener noreferrer" className="social-icon-hover" title="ORCID">
                  <OrcidIcon />
                </a>
                <a href="mailto:bc8@sanger.ac.uk" className="social-icon-hover" title="Email">
                  <EmailIcon />
                </a>
              </div>
            </div>
          </section>

          {/* --- ABOUT ME SECTION --- */}
          <section id="about" style={{ minHeight: "80vh", paddingTop: "8rem", paddingBottom: "4rem", paddingLeft: "2rem", paddingRight: "2rem" }}>
            <h2 className="reveal" style={{ fontFamily: "var(--font-space-grotesk)", fontSize: "2.5rem", color: "var(--foreground)", marginBottom: "3rem", fontWeight: "700", letterSpacing: "-0.02em" }}>
              About Me
            </h2>

            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", paddingBottom: "4rem" }}>
              <div className="glass-panel reveal" style={{ maxWidth: "800px", width: "100%", backgroundColor: "rgba(10, 15, 20, 0.75)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", border: "1px solid rgba(255, 255, 255, 0.03)", padding: "3rem", borderRadius: "16px", boxShadow: "0 10px 40px -10px rgba(0,0,0,0.5)" }}>
                <p style={{ fontSize: "1.1rem", color: "var(--foreground)", opacity: 0.95, marginBottom: "2.5rem", lineHeight: "1.9", fontWeight: "400" }}>
                  I am a bioinformatician working in single-cell genomics, with a particular interest in lineage tracing, trajectories, and cell-fate transitions. My work combines scRNA-seq analysis with pipeline development, and I enjoy building reproducible workflows for processing large-scale datasets.
                </p>
                <p style={{ fontSize: "1.1rem", color: "var(--foreground)", opacity: 0.95, marginBottom: "0", lineHeight: "1.9", fontWeight: "400" }}>
                  I am currently a Senior Bioinformatician in the <a href="https://github.com/cellgeni/" target="_blank" rel="noopener noreferrer" className="hover-link" style={{ color: "inherit", textDecoration: "none", borderBottom: "1px solid var(--accent-cyan)", paddingBottom: "2px", fontWeight: "600", transition: "all 0.2s ease" }} onMouseEnter={(e) => { e.currentTarget.style.color = "var(--accent-cyan)"; e.currentTarget.style.backgroundColor = "rgba(14, 165, 233, 0.1)"; e.currentTarget.style.borderColor = "transparent"; }} onMouseLeave={(e) => { e.currentTarget.style.color = "inherit"; e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.borderColor = "var(--accent-cyan)"; }}>Cellular Genomics Informatics (CellGenIT) team</a> at the Wellcome Sanger Institute and a PhD candidate at Gebze Technical University. My background includes a BSc in Bioengineering and an MSc in Bioinformatics and Systems Biology. Over the years, I have contributed to collaborative single-cell projects through data analysis, workflow development, benchmarking, and publication-supporting resources.
                </p>
              </div>
            </div>
          </section>
          {/* --- EXPERIENCE SECTION --- */}
          <section id="experience" style={{ minHeight: "100vh", paddingTop: "8rem", paddingBottom: "4rem", paddingLeft: "2rem", paddingRight: "2rem" }}>
            <h2 className="reveal" style={{ fontFamily: "var(--font-space-grotesk)", fontSize: "2.5rem", color: "var(--foreground)", marginBottom: "3rem", fontWeight: "700", letterSpacing: "-0.02em" }}>
              Experience
            </h2>

            {/* TIMELINE CONTAINER */}
            <div className="reveal timeline-container" style={{
              position: "relative",
              maxWidth: "800px",
              margin: "0 auto",
              paddingLeft: "var(--timeline-padding, 4rem)" /* Space for the dual tracks */
            }}>
              {/* Track 1: Career (Cyan) */}
              <div
                onClick={() => setActiveTrack(activeTrack === "career" ? "all" : "career")}
                title="Filter Career Experience"
                style={{
                  position: "absolute",
                  left: "11px", /* Shifted left to center 2px line in a 10px box */
                  top: "-4rem", /* Starts fading above the first node */
                  bottom: "-4rem", /* Fades out below the last node */
                  width: "10px", // Increased hit area
                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "center",
                  zIndex: 0
                }}
              >
                <div style={{
                  width: "2px",
                  height: "100%",
                  background: "linear-gradient(to bottom, transparent 0, var(--accent-cyan) 4rem, var(--accent-cyan) calc(100% - 4rem), transparent 100%)",
                  boxShadow: activeTrack === "career" ? "0 0 8px var(--accent-cyan)" : "none",
                  transition: "box-shadow 0.3s ease",
                }} />
              </div>

              {/* Track 2: Education (Magenta) */}
              <div
                onClick={() => setActiveTrack(activeTrack === "education" ? "all" : "education")}
                title="Filter Education Experience"
                style={{
                  position: "absolute",
                  left: "35px", /* Shifted left to center 2px line in a 10px box */
                  top: "-4rem", /* Equalized to match Career track */
                  bottom: "-4rem",
                  width: "10px", // Increased hit area
                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "center",
                  zIndex: 0
                }}
              >
                <div style={{
                  width: "2px",
                  height: "100%",
                  background: "linear-gradient(to bottom, transparent 0, var(--accent-magenta) 4rem, var(--accent-magenta) calc(100% - 4rem), transparent 100%)",
                  boxShadow: activeTrack === "education" ? "0 0 8px var(--accent-magenta)" : "none",
                  transition: "box-shadow 0.3s ease",
                }} />
              </div>

              {/* ENTRY 1: 2024 - Present (Career) */}
              <div style={{ position: "relative", paddingBottom: "3rem", opacity: activeTrack === "all" || activeTrack === "career" ? 1 : 0.2, filter: activeTrack === "all" || activeTrack === "career" ? "none" : "blur(2px)", transition: "all 0.4s ease", zIndex: 20 }}>
                <div style={{
                  position: "absolute", left: "calc(var(--timeline-padding, 4rem) * -1 + 10px)", top: "8px", width: "12px", height: "12px", boxSizing: "border-box", borderRadius: "50%",
                  background: "var(--background)", border: "3px solid var(--accent-cyan)", boxShadow: "0 0 10px rgba(18, 69, 89, 0.4)", zIndex: 1
                }} />
                <span style={{ display: "block", fontFamily: "var(--font-jetbrains-mono)", fontSize: "0.9rem", color: "var(--accent-cyan)", fontWeight: "600", opacity: 0.8, marginBottom: "0.5rem" }}>
                  2024 &mdash; Present
                </span>
                <h3 style={{ fontSize: "1.4rem", color: "var(--accent-cyan)", marginBottom: "0.5rem", display: "flex", alignItems: "center", gap: "12px" }}>
                  <span style={{ display: 'inline-flex', justifyContent: 'center', alignItems: 'center', flexShrink: 0 }}>
                    <BriefcaseIcon style={{ color: 'var(--accent-cyan)', width: '22px', height: '22px' }} />
                  </span>
                  <span>Senior Bioinformatician</span>
                </h3>
                <p style={{ fontSize: "1rem", color: "var(--accent-cyan)", opacity: 0.8, marginBottom: "1rem", fontWeight: "600", letterSpacing: "0.02em" }}>
                  Wellcome Sanger Institute
                </p>
                <div style={{ fontSize: "0.95rem", opacity: 0.8, lineHeight: "1.8", color: "var(--foreground)" }}>
                  <ul style={{ listStyleType: "square", paddingLeft: "1.2rem", margin: 0, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                    <li>Supporting single-cell genomics projects through data processing, workflow development, and computational analysis.</li>
                    <li>Contributing to scalable pipelines including <a href="#nf-scautoqc-card" onClick={(e) => {
                      e.preventDefault();
                      setReturnScrollPos(window.scrollY);
                      const card = document.getElementById('nf-scautoqc-card');
                      if (card) {
                        card.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        card.style.transition = 'all 0.4s ease';
                        card.style.borderColor = '#0fc09d';
                        card.style.boxShadow = '0 0 20px rgba(15, 192, 157, 0.2)';
                        setTimeout(() => {
                          card.style.borderColor = 'rgba(150,150,150,0.1)';
                          card.style.boxShadow = 'none';
                        }, 2000);
                      }
                    }} style={{ color: "inherit", textDecoration: "underline", textDecorationStyle: "dotted", textUnderlineOffset: "4px", fontWeight: "600", cursor: "pointer", transition: "color 0.2s" }} onMouseOver={(e) => e.currentTarget.style.color = "#0fc09d"} onMouseOut={(e) => e.currentTarget.style.color = "inherit"}>nf-scautoqc</a>, with a focus on reproducible analysis and large-scale dataset processing.</li>
                  </ul>
                </div>
              </div>

              {/* ENTRY 2: 2021 - 2024 (Career) */}
              <div style={{ position: "relative", paddingBottom: "3rem", opacity: activeTrack === "all" || activeTrack === "career" ? 1 : 0.2, filter: activeTrack === "all" || activeTrack === "career" ? "none" : "blur(2px)", transition: "all 0.4s ease", zIndex: 20 }}>
                <div style={{
                  position: "absolute", left: "calc(var(--timeline-padding, 4rem) * -1 + 10px)", top: "8px", width: "12px", height: "12px", boxSizing: "border-box", borderRadius: "50%",
                  background: "var(--background)", border: "3px solid var(--accent-cyan)", zIndex: 1
                }} />
                <span style={{ display: "block", fontFamily: "var(--font-jetbrains-mono)", fontSize: "0.9rem", color: "var(--accent-cyan)", fontWeight: "600", opacity: 0.8, marginBottom: "0.5rem" }}>
                  2021 &mdash; 2024
                </span>
                <h3 style={{ fontSize: "1.4rem", color: "var(--accent-cyan)", marginBottom: "0.5rem", display: "flex", alignItems: "center", gap: "12px" }}>
                  <span style={{ display: 'inline-flex', justifyContent: 'center', alignItems: 'center', flexShrink: 0 }}>
                    <BriefcaseIcon style={{ color: 'var(--accent-cyan)', width: '22px', height: '22px' }} />
                  </span>
                  <span>Bioinformatician</span>
                </h3>
                <p style={{ fontSize: "1rem", color: "var(--accent-cyan)", opacity: 0.8, marginBottom: "1rem", fontWeight: "600", letterSpacing: "0.02em" }}>
                  Wellcome Sanger Institute
                </p>
                <div style={{ fontSize: "0.95rem", opacity: 0.8, lineHeight: "1.8", color: "var(--foreground)" }}>
                  <ul style={{ listStyleType: "square", paddingLeft: "1.2rem", margin: 0, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                    <li>Supported the curation of datasets for the <a href="#curation-card" onClick={(e) => {
                      e.preventDefault();
                      setReturnScrollPos(window.scrollY);
                      const card = document.getElementById('curation-card');
                      if (card) {
                        card.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        card.style.transition = 'all 0.4s ease';
                        card.style.borderColor = '#8282ff';
                        card.style.boxShadow = '0 0 20px rgba(130, 130, 255, 0.2)';
                        setTimeout(() => {
                          card.style.borderColor = 'rgba(150,150,150,0.1)';
                          card.style.boxShadow = 'none';
                        }, 2000);
                      }
                    }} style={{ color: "inherit", textDecoration: "underline", textDecorationStyle: "dotted", textUnderlineOffset: "4px", fontWeight: "600", cursor: "pointer", transition: "color 0.2s" }} onMouseOver={(e) => e.currentTarget.style.color = "#8282ff"} onMouseOut={(e) => e.currentTarget.style.color = "inherit"}>CZ CELLxGENE Discover portal</a> and contributed to project-specific resources for data access and visualisation.</li>
                    <li>Contributed to collaborative single-cell projects across data analysis, curation, and workflow support.</li>
                  </ul>
                </div>
              </div>

              {/* ENTRY 3: 2021 - Present (Education) */}
              <div style={{ position: "relative", paddingBottom: "3rem", opacity: activeTrack === "all" || activeTrack === "education" ? 1 : 0.2, filter: activeTrack === "all" || activeTrack === "education" ? "none" : "blur(2px)", transition: "all 0.4s ease", zIndex: 20 }}>
                <div style={{
                  position: "absolute", left: "calc(var(--timeline-padding, 4rem) * -1 + 34px)", top: "8px", width: "12px", height: "12px", boxSizing: "border-box", borderRadius: "50%",
                  background: "var(--background)", border: "3px solid var(--accent-magenta)", boxShadow: "0 0 10px rgba(89, 131, 146, 0.4)", zIndex: 1
                }} />
                <span style={{ display: "block", fontFamily: "var(--font-jetbrains-mono)", fontSize: "0.9rem", color: "var(--accent-magenta)", fontWeight: "600", opacity: 0.8, marginBottom: "0.5rem" }}>
                  2021 &mdash; Present
                </span>
                <h3 style={{ fontSize: "1.4rem", color: "var(--accent-magenta)", marginBottom: "0.5rem", display: "flex", alignItems: "center", gap: "12px" }}>
                  <span style={{ display: 'inline-flex', justifyContent: 'center', alignItems: 'center', flexShrink: 0 }}>
                    <GraduationIcon style={{ color: 'var(--accent-magenta)', width: '22px', height: '22px' }} />
                  </span>
                  <span>PhD at Bioinformatics &amp; Systems Biology</span>
                </h3>
                <p style={{ fontSize: "1rem", color: "var(--accent-magenta)", opacity: 0.8, marginBottom: "1rem", fontWeight: "600", letterSpacing: "0.02em" }}>
                  Gebze Technical University
                </p>
                <div style={{ fontSize: "0.95rem", opacity: 0.8, lineHeight: "1.8", color: "var(--foreground)" }}>
                  <ul style={{ listStyleType: "square", paddingLeft: "1.2rem", margin: 0, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                    <li>Working on lineage-tracing studies, with a focus on computational analysis and pipeline development for LARRY barcoding.</li>
                    <li>Developing workflows including <a href="#nf-larry-card" onClick={(e) => {
                      e.preventDefault();
                      setReturnScrollPos(window.scrollY);
                      const card = document.getElementById('nf-larry-card');
                      if (card) {
                        card.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        card.style.transition = 'all 0.4s ease';
                        card.style.borderColor = '#0fc09d';
                        card.style.boxShadow = '0 0 20px rgba(15, 192, 157, 0.2)';
                        setTimeout(() => {
                          card.style.borderColor = 'rgba(150,150,150,0.1)';
                          card.style.boxShadow = 'none';
                        }, 2000);
                      }
                    }} style={{ color: "inherit", textDecoration: "underline", textDecorationStyle: "dotted", textUnderlineOffset: "4px", fontWeight: "600", cursor: "pointer", transition: "color 0.2s" }} onMouseOver={(e) => e.currentTarget.style.color = "#0fc09d"} onMouseOut={(e) => e.currentTarget.style.color = "inherit"}>nf-larry</a> and <a href="#nf-cellsnplite-card" onClick={(e) => {
                      e.preventDefault();
                      setReturnScrollPos(window.scrollY);
                      const card = document.getElementById('nf-cellsnplite-card');
                      if (card) {
                        card.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        card.style.transition = 'all 0.4s ease';
                        card.style.borderColor = '#0fc09d';
                        card.style.boxShadow = '0 0 20px rgba(15, 192, 157, 0.2)';
                        setTimeout(() => {
                          card.style.borderColor = 'rgba(150,150,150,0.1)';
                          card.style.boxShadow = 'none';
                        }, 2000);
                      }
                    }} style={{ color: "inherit", textDecoration: "underline", textDecorationStyle: "dotted", textUnderlineOffset: "4px", fontWeight: "600", cursor: "pointer", transition: "color 0.2s" }} onMouseOver={(e) => e.currentTarget.style.color = "#0fc09d"} onMouseOut={(e) => e.currentTarget.style.color = "inherit"}>nf-cellsnplite</a> as part of ongoing thesis work.</li>
                  </ul>
                </div>
              </div>

              {/* ENTRY 4: 2019 - 2021 (Career) */}
              <div style={{ position: "relative", paddingBottom: "3rem", opacity: activeTrack === "all" || activeTrack === "career" ? 1 : 0.2, filter: activeTrack === "all" || activeTrack === "career" ? "none" : "blur(2px)", transition: "all 0.4s ease" }}>
                <div style={{
                  position: "absolute", left: "calc(var(--timeline-padding, 4rem) * -1 + 10px)", top: "8px", width: "12px", height: "12px", boxSizing: "border-box", borderRadius: "50%",
                  background: "var(--background)", border: "3px solid var(--accent-cyan)", zIndex: 1
                }} />
                <span style={{ display: "block", fontFamily: "var(--font-jetbrains-mono)", fontSize: "0.9rem", color: "var(--accent-cyan)", fontWeight: "600", opacity: 0.8, marginBottom: "0.5rem" }}>
                  2019 &mdash; 2021
                </span>
                <h3 style={{ fontSize: "1.4rem", color: "var(--accent-cyan)", marginBottom: "0.5rem", display: "flex", alignItems: "center", gap: "12px" }}>
                  <span style={{ display: 'inline-flex', justifyContent: 'center', alignItems: 'center', flexShrink: 0 }}>
                    <BriefcaseIcon style={{ color: 'var(--accent-cyan)', width: '22px', height: '22px' }} />
                  </span>
                  <span>Research Assistant</span>
                </h3>
                <p style={{ fontSize: "1rem", color: "var(--accent-cyan)", opacity: 0.8, marginBottom: "1rem", fontWeight: "600", letterSpacing: "0.02em" }}>
                  Gebze Technical University
                </p>
                <div style={{ fontSize: "0.95rem", opacity: 0.8, lineHeight: "1.8", color: "var(--foreground)" }}>
                  <ul style={{ listStyleType: "square", paddingLeft: "1.2rem", margin: 0, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                    <li>Contributed to research projects in bioinformatics and structural biology.</li>
                    <li>Supported teaching in courses including Biostatistics and Heat and Mass Transfer, helping with coursework assessment, quizzes, and student support.</li>
                  </ul>
                </div>
              </div>

              {/* ENTRY 4.5: 2019 (Career) */}
              <div style={{ position: "relative", paddingBottom: "3rem", opacity: activeTrack === "all" || activeTrack === "career" ? 1 : 0.2, filter: activeTrack === "all" || activeTrack === "career" ? "none" : "blur(2px)", transition: "all 0.4s ease" }}>
                <div style={{
                  position: "absolute", left: "calc(var(--timeline-padding, 4rem) * -1 + 10px)", top: "8px", width: "12px", height: "12px", boxSizing: "border-box", borderRadius: "50%",
                  background: "var(--background)", border: "3px solid var(--accent-cyan)", zIndex: 1
                }} />
                <span style={{ display: "block", fontFamily: "var(--font-jetbrains-mono)", fontSize: "0.9rem", color: "var(--accent-cyan)", fontWeight: "600", opacity: 0.8, marginBottom: "0.5rem" }}>
                  2019
                </span>
                <h3 style={{ fontSize: "1.4rem", color: "var(--accent-cyan)", marginBottom: "0.5rem", display: "flex", alignItems: "center", gap: "12px" }}>
                  <span style={{ display: 'inline-flex', justifyContent: 'center', alignItems: 'center', flexShrink: 0 }}>
                    <BriefcaseIcon style={{ color: 'var(--accent-cyan)', width: '22px', height: '22px' }} />
                  </span>
                  <span>Visiting Scientist</span>
                </h3>
                <p style={{ fontSize: "1rem", color: "var(--accent-cyan)", opacity: 0.8, marginBottom: "1rem", fontWeight: "600", letterSpacing: "0.02em" }}>
                  Wellcome Sanger Institute
                </p>
                <div style={{ fontSize: "0.95rem", opacity: 0.8, lineHeight: "1.8", color: "var(--foreground)" }}>
                  <ul style={{ listStyleType: "square", paddingLeft: "1.2rem", margin: 0, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                    <li><a href="#benchmarking-card" onClick={(e) => {
                      e.preventDefault();
                      setReturnScrollPos(window.scrollY);
                      const card = document.getElementById('benchmarking-card');
                      if (card) {
                        card.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        card.style.transition = 'all 0.4s ease';
                        card.style.borderColor = '#f97316';
                        card.style.boxShadow = '0 0 20px rgba(249, 115, 22, 0.2)';
                        setTimeout(() => {
                          card.style.borderColor = 'rgba(150,150,150,0.1)';
                          card.style.boxShadow = 'none';
                        }, 2000);
                      }
                    }} style={{ color: "inherit", textDecoration: "underline", textDecorationStyle: "dotted", textUnderlineOffset: "4px", fontWeight: "600", cursor: "pointer", transition: "color 0.2s" }} onMouseOver={(e) => e.currentTarget.style.color = "#f97316"} onMouseOut={(e) => e.currentTarget.style.color = "inherit"}>Benchmarked single-cell RNA-seq visualisation tools</a> during an internship with the Cellular Genetics Informatics team.</li>
                  </ul>
                </div>
              </div>

              {/* ENTRY 5: 2017 - 2021 (Education) */}
              <div style={{ position: "relative", paddingBottom: "3rem", opacity: activeTrack === "all" || activeTrack === "education" ? 1 : 0.2, filter: activeTrack === "all" || activeTrack === "education" ? "none" : "blur(2px)", transition: "all 0.4s ease" }}>
                <div style={{
                  position: "absolute", left: "calc(var(--timeline-padding, 4rem) * -1 + 34px)", top: "8px", width: "12px", height: "12px", boxSizing: "border-box", borderRadius: "50%",
                  background: "var(--background)", border: "3px solid var(--accent-magenta)", zIndex: 1
                }} />
                <span style={{ display: "block", fontFamily: "var(--font-jetbrains-mono)", fontSize: "0.9rem", color: "var(--accent-magenta)", fontWeight: "600", opacity: 0.8, marginBottom: "0.5rem" }}>
                  2017 &mdash; 2021
                </span>
                <h3 style={{ fontSize: "1.4rem", color: "var(--accent-magenta)", marginBottom: "0.5rem", display: "flex", alignItems: "center", gap: "12px" }}>
                  <span style={{ display: 'inline-flex', justifyContent: 'center', alignItems: 'center', flexShrink: 0 }}>
                    <GraduationIcon style={{ color: 'var(--accent-magenta)', width: '22px', height: '22px' }} />
                  </span>
                  <span>MSc at Bioinformatics &amp; Systems Biology</span>
                </h3>
                <p style={{ fontSize: "1rem", color: "var(--accent-magenta)", opacity: 0.8, marginBottom: "1rem", fontWeight: "600", letterSpacing: "0.02em" }}>
                  Gebze Technical University
                </p>
                <div style={{ fontSize: "0.95rem", opacity: 0.8, lineHeight: "1.8", color: "var(--foreground)" }}>
                  <ul style={{ listStyleType: "square", paddingLeft: "1.2rem", margin: 0, display: "flex", flexDirection: "column", gap: "0.8rem" }}>
                    <li>Worked on single-cell RNA-seq analysis in stem cell differentiation.
                      <ul style={{ listStyleType: "circle", paddingLeft: "1.2rem", margin: "0.5rem 0 0 0", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                        <li><strong>Thesis:</strong> Mathematical Modelling of Molecular Trajectories in Stem Cell Transformation Processes via Bioinformatic Analysis of Single Cell Omics Data <em style={{ opacity: 0.7 }}>(manuscript in review)</em></li>
                      </ul>
                    </li>
                    <li>Completed an internship during MSc.</li>
                  </ul>
                </div>
              </div>

              {/* ENTRY 6: 2012 - 2016 (Education) */}
              <div style={{ position: "relative", paddingBottom: "1rem", opacity: activeTrack === "all" || activeTrack === "education" ? 1 : 0.2, filter: activeTrack === "all" || activeTrack === "education" ? "none" : "blur(2px)", transition: "all 0.4s ease" }}>
                <div style={{
                  position: "absolute", left: "calc(var(--timeline-padding, 4rem) * -1 + 34px)", top: "8px", width: "12px", height: "12px", boxSizing: "border-box", borderRadius: "50%",
                  background: "var(--background)", border: "3px solid var(--accent-magenta)", zIndex: 1
                }} />
                <span style={{ display: "block", fontFamily: "var(--font-jetbrains-mono)", fontSize: "0.9rem", color: "var(--accent-magenta)", fontWeight: "600", opacity: 0.8, marginBottom: "0.5rem" }}>
                  2012 &mdash; 2016
                </span>
                <h3 style={{ fontSize: "1.4rem", color: "var(--accent-magenta)", marginBottom: "0.5rem", display: "flex", alignItems: "center", gap: "12px" }}>
                  <span style={{ display: 'inline-flex', justifyContent: 'center', alignItems: 'center', flexShrink: 0 }}>
                    <GraduationIcon style={{ color: 'var(--accent-magenta)', width: '22px', height: '22px' }} />
                  </span>
                  <span>BSc at Bioengineering</span>
                </h3>
                <p style={{ fontSize: "1rem", color: "var(--accent-magenta)", opacity: 0.8, marginBottom: "1rem", fontWeight: "600", letterSpacing: "0.02em" }}>
                  Yildiz Technical University
                </p>
              </div>
            </div>
          </section>
          {/* --- PROJECTS / PUBLICATIONS SECTION --- */}
          <section id="projects" style={{ minHeight: "100vh", paddingTop: "8rem", paddingBottom: "4rem", paddingLeft: "2rem", paddingRight: "2rem" }}>
            <h2 className="reveal" style={{ fontFamily: "var(--font-space-grotesk)", fontSize: "2.5rem", color: "var(--foreground)", marginBottom: "3rem", fontWeight: "700", letterSpacing: "-0.02em" }}>
              Selected Work
            </h2>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "2rem", fontSize: "0.87rem" }}>

              {/* nf-scautoqc */}
              <div id="nf-scautoqc-card" className="project-card reveal" style={{ padding: "2rem", display: "flex", flexDirection: "column", borderRadius: "24px", border: "1px solid rgba(150,150,150,0.1)", transition: "border-color 0.3s ease, box-shadow 0.3s ease" }} onMouseOver={(e) => e.currentTarget.style.borderColor = "#0fc09d"} onMouseOut={(e) => { e.currentTarget.style.borderColor = "rgba(150,150,150,0.1)"; e.currentTarget.style.boxShadow = "none"; }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", fontFamily: "var(--font-jetbrains-mono)", color: "#0fc09d", fontSize: "0.85em", marginBottom: "1rem", fontWeight: "600" }}>
                  <svg role="img" viewBox="0 0 24 24" fill="currentColor" width="16px" height="16px" style={{ transform: "translateY(-1px)" }} xmlns="http://www.w3.org/2000/svg"><title>Nextflow</title><path d="M.005 4.424V0c6.228.259 11.227 5.268 11.477 11.506H7.058C6.828 7.715 3.786 4.673.005 4.424m7.082 8.089h4.424C11.251 18.741 6.242 23.741.005 23.99v-4.423c3.79-.231 6.832-3.273 7.082-7.054m9.826-1.036h-4.424C12.749 5.249 17.758.25 23.995 0v4.424c-3.79.23-6.832 3.263-7.082 7.053m7.082 8.099V24c-6.228-.259-11.227-5.268-11.477-11.506h4.424c.23 3.791 3.272 6.833 7.053 7.082" /></svg>
                  PIPELINE / NEXTFLOW
                </div>
                <h4 style={{ fontSize: "1.3em", color: "var(--foreground)", marginBottom: "1rem", fontWeight: "700" }}>nf-scautoqc</h4>
                <p style={{ opacity: 0.85, lineHeight: "1.6", marginBottom: "1.5rem", flexGrow: 1, color: "var(--foreground)" }}>
                  Automated quality control, doublet detection, and optional integration for single-cell RNA-seq data on HPC environments.
                </p>
                <a href="https://github.com/cellgeni/nf-scautoqc" target="_blank" rel="noopener noreferrer" style={{ color: "var(--accent-cyan)", fontWeight: "600", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "8px" }}>
                  <GithubIcon style={{ width: "18px", height: "18px", transform: "translateY(-1px)" }} /> View Repository <span style={{ transition: "transform 0.2s ease" }} onMouseOver={(e) => e.currentTarget.style.transform = "translateX(4px)"} onMouseOut={(e) => e.currentTarget.style.transform = "translateX(0)"}>&rarr;</span>
                </a>
              </div>

              {/* nf-larry */}
              <div id="nf-larry-card" className="project-card reveal" style={{ padding: "2rem", display: "flex", flexDirection: "column", borderRadius: "24px", border: "1px solid rgba(150,150,150,0.1)", transition: "border-color 0.3s ease, box-shadow 0.3s ease", transitionDelay: "0.1s" }} onMouseOver={(e) => e.currentTarget.style.borderColor = "#0fc09d"} onMouseOut={(e) => { e.currentTarget.style.borderColor = "rgba(150,150,150,0.1)"; e.currentTarget.style.boxShadow = "none"; }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", fontFamily: "var(--font-jetbrains-mono)", color: "#0fc09d", fontSize: "0.85em", marginBottom: "1rem", fontWeight: "600" }}>
                  <svg role="img" viewBox="0 0 24 24" fill="currentColor" width="16px" height="16px" style={{ transform: "translateY(-1px)" }} xmlns="http://www.w3.org/2000/svg"><title>Nextflow</title><path d="M.005 4.424V0c6.228.259 11.227 5.268 11.477 11.506H7.058C6.828 7.715 3.786 4.673.005 4.424m7.082 8.089h4.424C11.251 18.741 6.242 23.741.005 23.99v-4.423c3.79-.231 6.832-3.273 7.082-7.054m9.826-1.036h-4.424C12.749 5.249 17.758.25 23.995 0v4.424c-3.79.23-6.832 3.263-7.082 7.053m7.082 8.099V24c-6.228-.259-11.227-5.268-11.477-11.506h4.424c.23 3.791 3.272 6.833 7.053 7.082" /></svg>
                  PIPELINE / NEXTFLOW
                </div>
                <h4 style={{ fontSize: "1.3em", color: "var(--foreground)", marginBottom: "1rem", fontWeight: "700" }}>nf-larry</h4>
                <p style={{ opacity: 0.85, lineHeight: "1.6", marginBottom: "1.5rem", flexGrow: 1, color: "var(--foreground)" }}>
                  Extracts and tracks clonal LARRY barcodes from raw reads, integrating clone lineages directly into gene expression matrices.
                </p>
                <a href="https://github.com/cellgeni/nf-larry" target="_blank" rel="noopener noreferrer" style={{ color: "var(--accent-cyan)", fontWeight: "600", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "8px" }}>
                  <GithubIcon style={{ width: "18px", height: "18px", transform: "translateY(-1px)" }} /> View Repository <span style={{ transition: "transform 0.2s ease" }} onMouseOver={(e) => e.currentTarget.style.transform = "translateX(4px)"} onMouseOut={(e) => e.currentTarget.style.transform = "translateX(0)"}>&rarr;</span>
                </a>
              </div>

              {/* nf-cellsnplite */}
              <div id="nf-cellsnplite-card" className="project-card reveal" style={{ padding: "2rem", display: "flex", flexDirection: "column", borderRadius: "24px", border: "1px solid rgba(150,150,150,0.1)", transition: "border-color 0.3s ease, box-shadow 0.3s ease", transitionDelay: "0.15s" }} onMouseOver={(e) => e.currentTarget.style.borderColor = "#0fc09d"} onMouseOut={(e) => { e.currentTarget.style.borderColor = "rgba(150,150,150,0.1)"; e.currentTarget.style.boxShadow = "none"; }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", fontFamily: "var(--font-jetbrains-mono)", color: "#0fc09d", fontSize: "0.85em", marginBottom: "1rem", fontWeight: "600" }}>
                  <svg role="img" viewBox="0 0 24 24" fill="currentColor" width="16px" height="16px" style={{ transform: "translateY(-1px)" }} xmlns="http://www.w3.org/2000/svg"><title>Nextflow</title><path d="M.005 4.424V0c6.228.259 11.227 5.268 11.477 11.506H7.058C6.828 7.715 3.786 4.673.005 4.424m7.082 8.089h4.424C11.251 18.741 6.242 23.741.005 23.99v-4.423c3.79-.231 6.832-3.273 7.082-7.054m9.826-1.036h-4.424C12.749 5.249 17.758.25 23.995 0v4.424c-3.79.23-6.832 3.263-7.082 7.053m7.082 8.099V24c-6.228-.259-11.227-5.268-11.477-11.506h4.424c.23 3.791 3.272 6.833 7.053 7.082" /></svg>
                  PIPELINE / NEXTFLOW
                </div>
                <h4 style={{ fontSize: "1.3em", color: "var(--foreground)", marginBottom: "1rem", fontWeight: "700" }}>nf-cellsnplite</h4>
                <p style={{ opacity: 0.85, lineHeight: "1.6", marginBottom: "1.5rem", flexGrow: 1, color: "var(--foreground)" }}>
                  A scalable Nextflow pipeline implementing cellsnp-lite for genotyping single cells from aligned sequencing reads.
                </p>
                <a href="https://github.com/cellgeni/nf-cellsnplite/" target="_blank" rel="noopener noreferrer" style={{ color: "var(--accent-cyan)", fontWeight: "600", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "8px" }}>
                  <GithubIcon style={{ width: "18px", height: "18px", transform: "translateY(-1px)" }} /> View Repository <span style={{ transition: "transform 0.2s ease" }} onMouseOver={(e) => e.currentTarget.style.transform = "translateX(4px)"} onMouseOut={(e) => e.currentTarget.style.transform = "translateX(0)"}>&rarr;</span>
                </a>
              </div>

              {/* CELLxGENE Discover Curation */}
              <div id="curation-card" className="project-card reveal" style={{ padding: "2rem", display: "flex", flexDirection: "column", borderRadius: "24px", border: "1px solid rgba(150,150,150,0.1)", transition: "border-color 0.3s ease, box-shadow 0.3s ease", transitionDelay: "0.2s" }} onMouseOver={(e) => e.currentTarget.style.borderColor = "#8282ff"} onMouseOut={(e) => { e.currentTarget.style.borderColor = "rgba(150,150,150,0.1)"; e.currentTarget.style.boxShadow = "none"; }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", fontFamily: "var(--font-jetbrains-mono)", color: "#8282ff", fontSize: "0.85em", marginBottom: "1rem", fontWeight: "600" }}>
                  <svg role="img" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16px" height="16px" style={{ transform: "translateY(-1px)" }}><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path></svg>
                  RESOURCE
                </div>
                <h4 style={{ fontSize: "1.3em", color: "var(--foreground)", marginBottom: "1rem", fontWeight: "700" }}>CELLxGENE Discover Curation</h4>
                <p style={{ opacity: 0.85, lineHeight: "1.6", marginBottom: "1.5rem", flexGrow: 1, color: "var(--foreground)" }}>
                  Contributed to the curation of the <a href="https://www.covid19cellatlas.org/" target="_blank" rel="noopener noreferrer" className="hover-link" style={{ textDecoration: "underline", textDecorationStyle: "dotted", fontWeight: "500", color: "inherit", transition: "color 0.2s" }} onMouseOver={(e) => e.currentTarget.style.color = "#8282ff"} onMouseOut={(e) => e.currentTarget.style.color = "inherit"}>COVID-19 Cell Atlas</a> for the CELLxGENE Discover portal, enabling broad access to vital single-cell datasets.
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: "1.2rem", flexWrap: "wrap" }}>
                  <a href="https://cellxgene.cziscience.com/" target="_blank" rel="noopener noreferrer" style={{ color: "#8282ff", fontWeight: "600", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "8px" }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18px" height="18px" style={{ transform: "translateY(-1px)" }}><path d="M21 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h6"></path><polyline points="16 3 21 3 21 8"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg> View Portal <span style={{ transition: "transform 0.2s ease" }} onMouseOver={(e) => e.currentTarget.style.transform = "translateX(4px)"} onMouseOut={(e) => e.currentTarget.style.transform = "translateX(0)"}>&rarr;</span>
                  </a>
                  <a href="https://doi.org/10.1093/nar/gkae1142" target="_blank" rel="noopener noreferrer" style={{ color: "#8282ff", fontWeight: "600", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "8px" }}>
                    <svg role="img" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18px" height="18px" style={{ transform: "translateY(-1px)" }}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg> View Paper <span style={{ transition: "transform 0.2s ease" }} onMouseOver={(e) => e.currentTarget.style.transform = "translateX(4px)"} onMouseOut={(e) => e.currentTarget.style.transform = "translateX(0)"}>&rarr;</span>
                  </a>
                </div>
              </div>

              {/* Benchmarking scRNA-seq */}
              <div id="benchmarking-card" className="project-card reveal" style={{ padding: "2rem", display: "flex", flexDirection: "column", borderRadius: "24px", border: "1px solid rgba(150,150,150,0.1)", transition: "border-color 0.3s ease, box-shadow 0.3s ease", transitionDelay: "0.3s" }} onMouseOver={(e) => e.currentTarget.style.borderColor = "#f97316"} onMouseOut={(e) => { e.currentTarget.style.borderColor = "rgba(150,150,150,0.1)"; e.currentTarget.style.boxShadow = "none"; }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", fontFamily: "var(--font-jetbrains-mono)", color: "#f97316", fontSize: "0.85em", marginBottom: "1rem", fontWeight: "600" }}>
                  <svg role="img" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16px" height="16px" style={{ transform: "translateY(-1px)" }}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                  BENCHMARKING
                </div>
                <h4 style={{ fontSize: "1.3em", color: "var(--foreground)", marginBottom: "1rem", fontWeight: "700" }}>Benchmarking scRNA-seq Visualisation Tools</h4>
                <p style={{ opacity: 0.85, lineHeight: "1.6", marginBottom: "1.5rem", flexGrow: 1, color: "var(--foreground)" }}>
                  Extensive evaluation and benchmarking of single-cell RNA-seq data visualisation tools. Published in NARGAB.
                </p>
                <a href="https://academic.oup.com/nargab/article/2/3/lqaa052/5877814" target="_blank" rel="noopener noreferrer" style={{ color: "#f97316", fontWeight: "600", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "8px" }}>
                  <svg role="img" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18px" height="18px" style={{ transform: "translateY(-1px)" }}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg> Read Paper <span style={{ transition: "transform 0.2s ease" }} onMouseOver={(e) => e.currentTarget.style.transform = "translateX(4px)"} onMouseOut={(e) => e.currentTarget.style.transform = "translateX(0)"}>&rarr;</span>
                </a>
              </div>

            </div>
          </section>
          {/* --- CONTACT SECTION --- */}
          <section id="contact" style={{ minHeight: "80vh", paddingTop: "8rem", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", paddingLeft: "2rem", paddingRight: "2rem" }}>
            <span className="reveal" style={{ display: "block", fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.2em", color: "var(--accent-magenta)", marginBottom: "1.5rem", fontWeight: "600" }}>
              get in touch
            </span>
            <h2 className="reveal" style={{ fontSize: "3.5rem", color: "var(--accent-cyan)", letterSpacing: "-0.04em", lineHeight: "1.1", marginBottom: "1.5rem", transitionDelay: "0.1s" }}>
              Say <span
                className="glitch-text"
                style={{ cursor: "pointer" }}
                onClick={(e) => {
                  const rect = e.target.getBoundingClientRect();
                  firePSConfetti(rect);

                  // Keep modal in bounds
                  let spawnX = e.clientX + 40;
                  let spawnY = e.clientY;
                  if (spawnX > window.innerWidth - 450) spawnX = window.innerWidth - 450;

                  setPs3ModalPos({ x: spawnX, y: spawnY });
                  setShowPS5Modal(true);
                }}
              >Hello</span>
            </h2>
            <p className="reveal" style={{ maxWidth: "600px", marginBottom: "2rem", opacity: 0.9, transitionDelay: "0.2s" }}>
              Whether you have a question about computational biology, single-cell analysis, or just want to say hi, my inbox is always open.
            </p>
            <div className="reveal" style={{ position: "relative", display: "inline-block" }}>
              <a
                href="mailto:bc8@sanger.ac.uk"
                style={{
                  display: "inline-block",
                  padding: "1.2rem 3rem",
                  fontSize: "1.1rem",
                  fontWeight: "600",
                  color: "#fff",
                  background: "var(--accent-cyan)",
                  borderRadius: "99px",
                  textDecoration: "none",
                  letterSpacing: "0.05em",
                  textTransform: "uppercase"
                }}
              >
                Contact Me
              </a>
            </div>

            {/* Authentic PS3 XMB Inspired UI Modal */}
            {showPS5Modal && (
              <div
                style={{
                  position: "fixed",
                  top: "0",
                  left: "0",
                  width: "100vw",
                  height: "100vh",
                  zIndex: 9998,
                  touchAction: "none",
                  overscrollBehavior: "none",
                }}
                onClick={() => setShowPS5Modal(false)}
              >
                <div
                  className="ps3-xmb-backdrop-small"
                  style={{
                    position: "absolute",
                    top: ps3ModalPos.y,
                    left: ps3ModalPos.x,
                    transform: "translate(0, -50%)",
                    width: "min(90vw, 420px)",
                    minHeight: "260px",
                    background: "#000000",
                    borderRadius: "12px",
                    border: "1px solid rgba(255,255,255,0.1)",
                    boxShadow: "0 10px 40px rgba(0,0,0,0.8), inset 0 0 100px rgba(255,255,255,0.05)",
                    zIndex: 9999,
                    color: "#f0f0f0",
                    animation: "fadeIn 0.4s ease-out forwards",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    fontFamily: "'Istok Web', sans-serif",
                    overflow: "hidden"
                  }}
                  onClick={(e) => e.stopPropagation()}
                  onWheel={(e) => e.stopPropagation()}
                  onTouchMove={(e) => e.stopPropagation()}
                >
                  {/* Authentic Flowing Blue XMB Ribbon Background */}
                  <div style={{ position: "absolute", top: "0", left: "0", width: "100%", height: "100%", zIndex: 0, opacity: 0.9, pointerEvents: "none", overflow: "hidden", borderRadius: "12px" }}>
                    <svg viewBox="0 0 1000 500" preserveAspectRatio="none" style={{ position: "absolute", width: "300%", height: "100%", top: "0", left: "-100%", animation: "xmbFlowRibbon 20s infinite linear alternate" }}>
                      <defs>
                        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="transparent" />
                          <stop offset="30%" stopColor="rgba(30, 80, 200, 0.4)" />
                          <stop offset="70%" stopColor="rgba(80, 150, 255, 0.6)" />
                          <stop offset="100%" stopColor="transparent" />
                        </linearGradient>
                      </defs>
                      <path d="M0,250 C200,100 300,400 500,250 C700,100 800,400 1000,250 L1000,500 L0,500 Z" fill="none" stroke="url(#grad1)" strokeWidth="15" style={{ animation: "xmbWarp 15s infinite ease-in-out alternate", filter: "blur(2px)" }} />
                      <path d="M0,250 C250,50 400,350 500,250 C650,150 750,450 1000,250 L1000,500 L0,500 Z" fill="none" stroke="rgba(100, 150, 255, 0.2)" strokeWidth="8" style={{ animation: "xmbWarp 10s infinite ease-in-out alternate-reverse" }} />
                      <path d="M0,250 C150,350 350,150 500,250 C650,350 850,150 1000,250 L1000,500 L0,500 Z" fill="none" stroke="rgba(50, 100, 220, 0.3)" strokeWidth="25" style={{ animation: "xmbWarp 18s infinite ease-in-out alternate", filter: "blur(4px)" }} />
                    </svg>
                  </div>

                  {/* PS3 Content Overlay - Delayed Fade In */}
                  <div style={{
                    position: "relative",
                    zIndex: 10,
                    width: "100%",
                    padding: "2.5rem",
                    textAlign: "center",
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    animation: "xmbContentFadeIn 1s cubic-bezier(0.2, 0.8, 0.2, 1) 1.5s forwards",
                    opacity: 0,
                    textShadow: "0 2px 4px rgba(0,0,0,0.8)"
                  }}>
                    <h2 style={{
                      fontFamily: "'Istok Web', sans-serif",
                      fontSize: "1.4rem",
                      fontWeight: "400",
                      letterSpacing: "1px",
                      color: "#fff",
                      margin: "0 0 0.5rem 0",
                      lineHeight: "1.3",
                      textShadow: "0 0 10px rgba(255,255,255,0.8), 0 0 20px rgba(255,255,255,0.4)"
                    }}>
                      Surprise, you found an easter egg!
                    </h2>

                    <p style={{
                      fontFamily: "'Istok Web', sans-serif",
                      fontSize: "0.95rem",
                      color: "rgba(255,255,255,0.7)",
                      margin: "0 0 1.5rem 0",
                      letterSpacing: "0.5px",
                      textShadow: "0 0 8px rgba(255,255,255,0.3)"
                    }}>
                      Gaming archives unlocked.
                    </p>

                    {/* PS3 XMB Horizontal List Menu Style */}
                    <div style={{ display: "flex", justifyContent: "center", gap: "40px", marginTop: "1rem" }}>
                      <a href="https://www.instagram.com/batuinngg" target="_blank" rel="noopener noreferrer" style={{
                        display: "flex", flexDirection: "column", alignItems: "center", gap: "10px",
                        textDecoration: "none", color: "#fff", transition: "transform 0.2s, filter 0.2s, text-shadow 0.2s",
                        filter: "drop-shadow(0 0 8px rgba(255,255,255,0.6))",
                        textShadow: "0 0 10px rgba(255,255,255,0.8), 0 0 20px rgba(255,255,255,0.4)"
                      }}
                        onMouseOver={(e) => {
                          e.currentTarget.style.transform = "scale(1.15)";
                          e.currentTarget.style.filter = "drop-shadow(0 0 15px rgba(255,255,255,1))";
                          e.currentTarget.style.textShadow = "0 0 15px rgba(255,255,255,1), 0 0 30px rgba(255,255,255,0.8)";
                        }}
                        onMouseOut={(e) => {
                          e.currentTarget.style.transform = "scale(1)";
                          e.currentTarget.style.filter = "drop-shadow(0 0 8px rgba(255,255,255,0.6))";
                          e.currentTarget.style.textShadow = "0 0 10px rgba(255,255,255,0.8), 0 0 20px rgba(255,255,255,0.4)";
                        }}>
                        <InstagramIcon />
                        <div style={{ fontSize: "0.9rem", fontWeight: "400", letterSpacing: "1px", fontFamily: "'Istok Web', sans-serif" }}>Instagram</div>
                      </a>

                      <a href="https://threads.com/batuinngg" target="_blank" rel="noopener noreferrer" style={{
                        display: "flex", flexDirection: "column", alignItems: "center", gap: "10px",
                        textDecoration: "none", color: "#fff", transition: "transform 0.2s, filter 0.2s, text-shadow 0.2s",
                        filter: "drop-shadow(0 0 8px rgba(255,255,255,0.6))",
                        textShadow: "0 0 10px rgba(255,255,255,0.8), 0 0 20px rgba(255,255,255,0.4)"
                      }}
                        onMouseOver={(e) => {
                          e.currentTarget.style.transform = "scale(1.15)";
                          e.currentTarget.style.filter = "drop-shadow(0 0 15px rgba(255,255,255,1))";
                          e.currentTarget.style.textShadow = "0 0 15px rgba(255,255,255,1), 0 0 30px rgba(255,255,255,0.8)";
                        }}
                        onMouseOut={(e) => {
                          e.currentTarget.style.transform = "scale(1)";
                          e.currentTarget.style.filter = "drop-shadow(0 0 8px rgba(255,255,255,0.6))";
                          e.currentTarget.style.textShadow = "0 0 10px rgba(255,255,255,0.8), 0 0 20px rgba(255,255,255,0.4)";
                        }}>
                        <ThreadsIcon />
                        <div style={{ fontSize: "0.9rem", fontWeight: "400", letterSpacing: "1px", fontFamily: "'Istok Web', sans-serif" }}>Threads</div>
                      </a>
                    </div>
                  </div>

                  {/* PS3 Back Prompt */}
                  <div style={{
                    position: "absolute",
                    bottom: "20px",
                    left: "25px",
                    opacity: 0.8,
                    cursor: "pointer",
                    transition: "opacity 0.2s",
                    zIndex: 20
                  }} onClick={() => setShowPS5Modal(false)} onMouseOver={(e) => e.currentTarget.style.opacity = "1"} onMouseOut={(e) => e.currentTarget.style.opacity = "0.8"}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.95rem", textTransform: "uppercase", letterSpacing: "1px", fontWeight: "400", color: "#a0a0a0" }}>
                      <div style={{ color: "#bd4a4a", display: "flex", alignItems: "center" }}>
                        <svg width="20" height="20" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" fill="none"><circle cx="12" cy="12" r="9" /></svg>
                      </div>
                      <span style={{ fontFamily: "var(--font-dm-sans), sans-serif", paddingTop: "1px" }}>BACK</span>
                    </div>
                  </div>

                  {/* Scoped keyframes */}
                  <style dangerouslySetInnerHTML={{
                    __html: `
                    @keyframes xmbFlowRibbon {
                      0% { transform: translateX(0%); }
                      100% { transform: translateX(33.33%); }
                    }
                    @keyframes xmbWarp {
                      0% { transform: scaleY(1); }
                      50% { transform: scaleY(1.3) translateY(-10px); }
                      100% { transform: scaleY(0.8) translateY(10px); }
                    }
                    @keyframes xmbContentFadeIn {
                      0% { opacity: 0; transform: translateY(20px) scale(0.98); }
                      100% { opacity: 1; transform: translateY(0) scale(1); }
                    }
                    @keyframes fadeIn {
                      0% { opacity: 0; }
                      100% { opacity: 1; }
                    }
                  `}} />
                </div>
              </div>
            )}
          </section>

          {/* Footer pushed to final slide */}
          <footer style={{ padding: "2rem 0", textAlign: "center", opacity: 0.6, fontSize: "0.95rem", marginTop: "4rem" }}>
            <p className="footer-text">
              <span className="footer-author">Designed & Built by Batuhan Cakir</span>
              <span className="footer-separator"> &mdash; </span>
              <span className="footer-vibe" style={{ color: "var(--accent-cyan)", opacity: 0.8 }}>
                <a href="/llms.txt" target="_blank" rel="noopener noreferrer" style={{ color: "inherit", textDecoration: "none" }} title="llms.txt">
                  <span style={{ fontSize: "1.1rem", verticalAlign: "-1px", marginRight: "4px" }}>✦</span>
                </a>
                Vibe-coded with Gemini 3.1 Pro
              </span>
            </p>
          </footer>

          {/* FLOATING RETURN BUTTON */}
          <div
            style={{
              position: "fixed",
              bottom: returnScrollPos !== null ? "40px" : "-100px",
              left: "50%",
              transform: "translateX(-50%)",
              opacity: returnScrollPos !== null ? 1 : 0,
              pointerEvents: returnScrollPos !== null ? "auto" : "none",
              zIndex: 9999,
              width: "56px",
              height: "56px",
              borderRadius: "50%",
              background: "rgba(17, 21, 24, 0.85)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              border: "1px solid var(--accent-cyan)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
              boxShadow: "0 4px 20px rgba(0,0,0,0.5)",
              color: "var(--accent-cyan)",
              transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
            }}
            onClick={() => {
              if (returnScrollPos !== null) {
                window.scrollTo({ top: returnScrollPos, behavior: "smooth" });
                setReturnScrollPos(null);
              }
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "translateX(-50%) scale(1.1) rotate(-10deg)";
              e.currentTarget.style.boxShadow = "0 6px 25px rgba(89, 131, 146, 0.4)";
              e.currentTarget.style.background = "rgba(17, 21, 24, 1)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "translateX(-50%) scale(1) rotate(0deg)";
              e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.5)";
              e.currentTarget.style.background = "rgba(17, 21, 24, 0.85)";
            }}
            title="Return to Experience"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="19" x2="12" y2="5"></line>
              <polyline points="5 12 12 5 19 12"></polyline>
            </svg>
          </div>
        </div>
      </main>
    </>
  );
}
