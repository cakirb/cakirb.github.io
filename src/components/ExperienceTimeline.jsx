"use client";
import { useState } from "react";
import { BriefcaseIcon, GraduationIcon } from "./Icons";

export default function ExperienceTimeline() {
  const [activeTrack, setActiveTrack] = useState("all");
  const [returnScrollPos, setReturnScrollPos] = useState(null);

  const handleProjectClick = (e, cardId, glowColor) => {
    e.preventDefault();
    setReturnScrollPos(window.scrollY);
    const card = document.getElementById(cardId);
    if (card) {
      card.scrollIntoView({ behavior: 'smooth', block: 'center' });
      card.style.transition = 'all 0.4s ease';
      card.style.borderColor = glowColor;
      card.style.boxShadow = `0 0 20px ${glowColor}33`;
      setTimeout(() => {
        card.style.borderColor = 'rgba(150,150,150,0.1)';
        card.style.boxShadow = 'none';
      }, 2000);
    }
  };

  return (
    <>
      <section id="experience" style={{ minHeight: "100dvh", paddingTop: "var(--space-xl)", paddingBottom: "var(--space-xl)", paddingLeft: "var(--space-md)", paddingRight: "var(--space-md)" }}>
        <h2 className="reveal" style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-2xl)", color: "var(--foreground)", marginBottom: "var(--space-lg)", fontWeight: "700" }}>
          Experience
          <span style={{ color: "var(--accent-cyan)" }}>.</span>
        </h2>

        <div className="reveal timeline-container" style={{
          position: "relative",
          maxWidth: "800px",
          paddingLeft: "var(--timeline-padding, 4rem)"
        }}>
          {/* Track 1: Career (Cyan) */}
          <div
            tabIndex={0}
            className="focus-visible"
            onClick={() => setActiveTrack(activeTrack === "career" ? "all" : "career")}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setActiveTrack(activeTrack === "career" ? "all" : "career"); } }}
            title="Filter Career Experience"
            style={{
              position: "absolute",
              left: "11px",
              top: "-4rem",
              bottom: "-4rem",
              width: "10px",
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
            tabIndex={0}
            className="focus-visible"
            onClick={() => setActiveTrack(activeTrack === "education" ? "all" : "education")}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setActiveTrack(activeTrack === "education" ? "all" : "education"); } }}
            title="Filter Education Experience"
            style={{
              position: "absolute",
              left: "35px",
              top: "-4rem",
              bottom: "-4rem",
              width: "10px",
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
          <div style={{ position: "relative", paddingBottom: "var(--space-xl)", opacity: activeTrack === "all" || activeTrack === "career" ? 1 : 0.2, filter: activeTrack === "all" || activeTrack === "career" ? "none" : "blur(2px)", transition: "all 0.4s ease", zIndex: 20 }}>
            <div style={{
              position: "absolute", left: "calc(var(--timeline-padding, 4rem) * -1 + 10px)", top: "8px", width: "12px", height: "12px", boxSizing: "border-box", borderRadius: "50%",
              background: "var(--background)", border: "3px solid var(--accent-cyan)", boxShadow: "0 0 10px rgba(18, 69, 89, 0.4)", zIndex: 1
            }} />
            <span style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: "0.9rem", color: "var(--accent-cyan)", fontWeight: "600", opacity: 1, marginBottom: "0.5rem" }}>
              2024 &mdash; Present
            </span>
            <h3 style={{ fontSize: "1.4rem", color: "var(--accent-cyan)", marginBottom: "0.5rem", display: "flex", alignItems: "center", gap: "12px" }}>
              <span style={{ display: 'inline-flex', justifyContent: 'center', alignItems: 'center', flexShrink: 0 }}>
                <BriefcaseIcon style={{ color: 'var(--accent-cyan)', width: '22px', height: '22px' }} />
              </span>
              <span>Senior Bioinformatician</span>
            </h3>
            <p style={{ fontSize: "1rem", color: "var(--accent-cyan)", opacity: 1, marginBottom: "1rem", fontWeight: "600", letterSpacing: "0.02em" }}>
              Wellcome Sanger Institute
            </p>
            <div className="timeline-text-content" style={{ fontSize: "1rem", opacity: 1, lineHeight: "1.8", color: "var(--foreground)" }}>
              <ul style={{ listStyleType: "square", paddingLeft: "1.2rem", margin: 0, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <li>Supporting single-cell genomics projects through data processing, workflow development, and computational analysis.</li>
                <li>Contributing to scalable pipelines including <a href="#nf-scautoqc-card" onClick={(e) => handleProjectClick(e, 'nf-scautoqc-card', 'var(--accent-pipeline)')} className="timeline-project-link focus-visible" data-target-category="pipeline">nf-scautoqc</a>, with a focus on reproducible analysis and large-scale dataset processing.</li>
              </ul>
            </div>
          </div>

          {/* ENTRY 2: 2021 - 2024 (Career) */}
          <div style={{ position: "relative", paddingBottom: "var(--space-xl)", opacity: activeTrack === "all" || activeTrack === "career" ? 1 : 0.2, filter: activeTrack === "all" || activeTrack === "career" ? "none" : "blur(2px)", transition: "all 0.4s ease", zIndex: 20 }}>
            <div style={{
              position: "absolute", left: "calc(var(--timeline-padding, 4rem) * -1 + 10px)", top: "8px", width: "12px", height: "12px", boxSizing: "border-box", borderRadius: "50%",
              background: "var(--background)", border: "3px solid var(--accent-cyan)", zIndex: 1
            }} />
            <span style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: "0.9rem", color: "var(--accent-cyan)", fontWeight: "600", opacity: 1, marginBottom: "0.5rem" }}>
              2021 &mdash; 2024
            </span>
            <h3 style={{ fontSize: "1.4rem", color: "var(--accent-cyan)", marginBottom: "0.5rem", display: "flex", alignItems: "center", gap: "12px" }}>
              <span style={{ display: 'inline-flex', justifyContent: 'center', alignItems: 'center', flexShrink: 0 }}>
                <BriefcaseIcon style={{ color: 'var(--accent-cyan)', width: '22px', height: '22px' }} />
              </span>
              <span>Bioinformatician</span>
            </h3>
            <p style={{ fontSize: "1rem", color: "var(--accent-cyan)", opacity: 1, marginBottom: "1rem", fontWeight: "600", letterSpacing: "0.02em" }}>
              Wellcome Sanger Institute
            </p>
            <div className="timeline-text-content" style={{ fontSize: "1rem", opacity: 1, lineHeight: "1.8", color: "var(--foreground)" }}>
              <ul style={{ listStyleType: "square", paddingLeft: "1.2rem", margin: 0, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <li>Supported the curation of datasets for the <a href="#curation-card" onClick={(e) => handleProjectClick(e, 'curation-card', 'var(--accent-resource)')} className="timeline-project-link focus-visible" data-target-category="resource">CZ CELLxGENE Discover portal</a> and contributed to project-specific resources for data access and visualisation.</li>
                <li>Contributed to collaborative single-cell projects across data analysis, curation, and workflow support.</li>
              </ul>
            </div>
          </div>

          {/* ENTRY 3: 2021 - Present (Education) */}
          <div style={{ position: "relative", paddingBottom: "var(--space-xl)", opacity: activeTrack === "all" || activeTrack === "education" ? 1 : 0.2, filter: activeTrack === "all" || activeTrack === "education" ? "none" : "blur(2px)", transition: "all 0.4s ease", zIndex: 20 }}>
            <div style={{
              position: "absolute", left: "calc(var(--timeline-padding, 4rem) * -1 + 34px)", top: "8px", width: "12px", height: "12px", boxSizing: "border-box", borderRadius: "50%",
              background: "var(--background)", border: "3px solid var(--accent-magenta)", boxShadow: "0 0 10px rgba(89, 131, 146, 0.4)", zIndex: 1
            }} />
            <span style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: "0.9rem", color: "var(--accent-magenta)", fontWeight: "600", opacity: 1, marginBottom: "0.5rem" }}>
              2021 &mdash; Present
            </span>
            <h3 style={{ fontSize: "1.4rem", color: "var(--accent-magenta)", marginBottom: "0.5rem", display: "flex", alignItems: "center", gap: "12px" }}>
              <span style={{ display: 'inline-flex', justifyContent: 'center', alignItems: 'center', flexShrink: 0 }}>
                <GraduationIcon style={{ color: 'var(--accent-magenta)', width: '22px', height: '22px' }} />
              </span>
              <span>PhD at Bioinformatics &amp; Systems Biology</span>
            </h3>
            <p style={{ fontSize: "1rem", color: "var(--accent-magenta)", opacity: 1, marginBottom: "1rem", fontWeight: "600", letterSpacing: "0.02em" }}>
              Gebze Technical University
            </p>
            <div className="timeline-text-content" style={{ fontSize: "1rem", opacity: 1, lineHeight: "1.8", color: "var(--foreground)" }}>
              <ul style={{ listStyleType: "square", paddingLeft: "1.2rem", margin: 0, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <li>Working on lineage-tracing studies, with a focus on computational analysis and pipeline development for LARRY barcoding.</li>
                <li>Developing workflows including <a href="#nf-larry-card" onClick={(e) => handleProjectClick(e, 'nf-larry-card', 'var(--accent-pipeline)')} className="timeline-project-link focus-visible" data-target-category="pipeline">nf-larry</a> and <a href="#nf-cellsnplite-card" onClick={(e) => handleProjectClick(e, 'nf-cellsnplite-card', 'var(--accent-pipeline)')} className="timeline-project-link focus-visible" data-target-category="pipeline">nf-cellsnplite</a> as part of ongoing thesis work.</li>
              </ul>
            </div>
          </div>

          {/* ENTRY 4: 2019 - 2021 (Career) */}
          <div style={{ position: "relative", paddingBottom: "var(--space-xl)", opacity: activeTrack === "all" || activeTrack === "career" ? 1 : 0.2, filter: activeTrack === "all" || activeTrack === "career" ? "none" : "blur(2px)", transition: "all 0.4s ease" }}>
            <div style={{
              position: "absolute", left: "calc(var(--timeline-padding, 4rem) * -1 + 10px)", top: "8px", width: "12px", height: "12px", boxSizing: "border-box", borderRadius: "50%",
              background: "var(--background)", border: "3px solid var(--accent-cyan)", zIndex: 1
            }} />
            <span style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: "0.9rem", color: "var(--accent-cyan)", fontWeight: "600", opacity: 1, marginBottom: "0.5rem" }}>
              2019 &mdash; 2021
            </span>
            <h3 style={{ fontSize: "1.4rem", color: "var(--accent-cyan)", marginBottom: "0.5rem", display: "flex", alignItems: "center", gap: "12px" }}>
              <span style={{ display: 'inline-flex', justifyContent: 'center', alignItems: 'center', flexShrink: 0 }}>
                <BriefcaseIcon style={{ color: 'var(--accent-cyan)', width: '22px', height: '22px' }} />
              </span>
              <span>Research Assistant</span>
            </h3>
            <p style={{ fontSize: "1rem", color: "var(--accent-cyan)", opacity: 1, marginBottom: "1rem", fontWeight: "600", letterSpacing: "0.02em" }}>
              Gebze Technical University
            </p>
            <div className="timeline-text-content" style={{ fontSize: "1rem", opacity: 1, lineHeight: "1.8", color: "var(--foreground)" }}>
              <ul style={{ listStyleType: "square", paddingLeft: "1.2rem", margin: 0, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <li>Contributed to research projects in bioinformatics and structural biology.</li>
                <li>Supported teaching in courses including Biostatistics and Heat and Mass Transfer, helping with coursework assessment, quizzes, and student support.</li>
              </ul>
            </div>
          </div>

          {/* ENTRY 4.5: 2019 (Career) */}
          <div style={{ position: "relative", paddingBottom: "var(--space-xl)", opacity: activeTrack === "all" || activeTrack === "career" ? 1 : 0.2, filter: activeTrack === "all" || activeTrack === "career" ? "none" : "blur(2px)", transition: "all 0.4s ease" }}>
            <div style={{
              position: "absolute", left: "calc(var(--timeline-padding, 4rem) * -1 + 10px)", top: "8px", width: "12px", height: "12px", boxSizing: "border-box", borderRadius: "50%",
              background: "var(--background)", border: "3px solid var(--accent-cyan)", zIndex: 1
            }} />
            <span style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: "0.9rem", color: "var(--accent-cyan)", fontWeight: "600", opacity: 1, marginBottom: "0.5rem" }}>
              2019
            </span>
            <h3 style={{ fontSize: "1.4rem", color: "var(--accent-cyan)", marginBottom: "0.5rem", display: "flex", alignItems: "center", gap: "12px" }}>
              <span style={{ display: 'inline-flex', justifyContent: 'center', alignItems: 'center', flexShrink: 0 }}>
                <BriefcaseIcon style={{ color: 'var(--accent-cyan)', width: '22px', height: '22px' }} />
              </span>
              <span>Visiting Scientist</span>
            </h3>
            <p style={{ fontSize: "1rem", color: "var(--accent-cyan)", opacity: 1, marginBottom: "1rem", fontWeight: "600", letterSpacing: "0.02em" }}>
              Wellcome Sanger Institute
            </p>
            <div className="timeline-text-content" style={{ fontSize: "1rem", opacity: 1, lineHeight: "1.8", color: "var(--foreground)" }}>
              <ul style={{ listStyleType: "square", paddingLeft: "1.2rem", margin: 0, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <li><a href="#benchmarking-card" onClick={(e) => handleProjectClick(e, 'benchmarking-card', 'var(--accent-publication)')} className="timeline-project-link focus-visible" data-target-category="publication">Benchmarked single-cell RNA-seq visualisation tools</a> during an internship with the Cellular Genetics Informatics team.</li>
              </ul>
            </div>
          </div>

          {/* ENTRY 5: 2017 - 2021 (Education) */}
          <div style={{ position: "relative", paddingBottom: "var(--space-xl)", opacity: activeTrack === "all" || activeTrack === "education" ? 1 : 0.2, filter: activeTrack === "all" || activeTrack === "education" ? "none" : "blur(2px)", transition: "all 0.4s ease" }}>
            <div style={{
              position: "absolute", left: "calc(var(--timeline-padding, 4rem) * -1 + 34px)", top: "8px", width: "12px", height: "12px", boxSizing: "border-box", borderRadius: "50%",
              background: "var(--background)", border: "3px solid var(--accent-magenta)", zIndex: 1
            }} />
            <span style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: "0.9rem", color: "var(--accent-magenta)", fontWeight: "600", opacity: 1, marginBottom: "0.5rem" }}>
              2017 &mdash; 2021
            </span>
            <h3 style={{ fontSize: "1.4rem", color: "var(--accent-magenta)", marginBottom: "0.5rem", display: "flex", alignItems: "center", gap: "12px" }}>
              <span style={{ display: 'inline-flex', justifyContent: 'center', alignItems: 'center', flexShrink: 0 }}>
                <GraduationIcon style={{ color: 'var(--accent-magenta)', width: '22px', height: '22px' }} />
              </span>
              <span>MSc at Bioinformatics &amp; Systems Biology</span>
            </h3>
            <p style={{ fontSize: "1rem", color: "var(--accent-magenta)", opacity: 1, marginBottom: "1rem", fontWeight: "600", letterSpacing: "0.02em" }}>
              Gebze Technical University
            </p>
            <div className="timeline-text-content" style={{ fontSize: "1rem", opacity: 1, lineHeight: "1.8", color: "var(--foreground)" }}>
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
            <span style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: "0.9rem", color: "var(--accent-magenta)", fontWeight: "600", opacity: 0.8, marginBottom: "0.5rem" }}>
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

      {/* FLOATING RETURN BUTTON */}
      <div
        className="floating-return-btn focus-visible"
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); if (returnScrollPos !== null) { window.scrollTo({ top: returnScrollPos, behavior: "smooth" }); setReturnScrollPos(null); } } }}
        style={{
          position: "fixed",
          bottom: returnScrollPos !== null ? "40px" : "-100px",
          left: "50%",
          opacity: returnScrollPos !== null ? 1 : 0,
          pointerEvents: returnScrollPos !== null ? "auto" : "none",
          zIndex: 9999,
          width: "56px",
          height: "56px",
          borderRadius: "50%",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          border: "1px solid var(--accent-cyan)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
          color: "var(--accent-cyan)",
        }}
        onClick={() => {
          if (returnScrollPos !== null) {
            window.scrollTo({ top: returnScrollPos, behavior: "smooth" });
            setReturnScrollPos(null);
          }
        }}
        title="Return to Experience"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="19" x2="12" y2="5"></line>
          <polyline points="5 12 12 5 19 12"></polyline>
        </svg>
      </div>
    </>
  );
}
