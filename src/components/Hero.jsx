"use client";
import {
  GithubIcon, LinkedInIcon, OrcidIcon, ScholarIcon, XIcon, EmailIcon
} from "./Icons";

// Bluesky Icon Component
const BlueskyIcon = ({ style, ...props }) => (
  <svg viewBox="0 0 600 530" fill="currentColor" width="28px" height="28px" style={{ transform: "translateY(2px)", ...style }} {...props}>
    <path d="m135.72 44.03c66.496 49.921 138.02 151.14 164.28 205.46 26.262-54.316 97.782-155.54 164.28-205.46 47.98-36.021 125.72-63.892 125.72 24.795 0 17.712-10.155 148.79-16.111 170.07-20.703 73.984-96.144 92.854-163.25 81.433 117.3 19.964 147.14 86.092 82.697 152.22-122.39 125.59-175.91-31.511-189.63-71.766-2.514-7.3797-3.6904-10.832-3.7077-7.8964-0.0174-2.9357-1.1937 0.51669-3.7077 7.8964-13.714 40.255-67.233 197.36-189.63 71.766-64.444-66.128-34.605-132.26 82.697-152.22-67.108 11.421-142.55-7.4491-163.25-81.433-5.9562-21.282-16.111-152.36-16.111-170.07 0-88.687 77.742-60.816 125.72-24.795z" />
  </svg>
);

export default function Hero() {
  return (
    <section
      id="home"
      style={{
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        paddingTop: "var(--space-2xl)"
      }}
    >
      <div style={{ width: "100%" }}>
        <h1 className="hero-stagger-1" style={{ fontSize: "var(--text-display-hero)", fontWeight: "700", lineHeight: "1.2", marginBottom: "var(--space-md)", paddingBottom: "0.2em" }}>
          <span style={{ fontFamily: "inherit", background: "linear-gradient(90deg, #f49680 0%, #caa94e 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", display: "inline-block" }}>Batuhan Çakır</span>
        </h1>
      </div>

      <div style={{ maxWidth: "1000px" }}>
        <div className="hero-stagger-2">
          <h2 style={{ fontSize: "max(2vw, 1.2rem)", fontWeight: "500", opacity: 0.85, color: "var(--accent-cyan)", marginBottom: "var(--space-lg)" }}>
            Senior Bioinformatician and PhD Candidate
          </h2>
        </div>

        <p className="hero-stagger-3" style={{ fontSize: "var(--text-xl)", color: "var(--foreground)", marginBottom: "var(--space-md)", maxWidth: "800px", lineHeight: "1.6", fontWeight: "400", opacity: 0.9 }}>
          Specialising in single-cell RNA-seq analysis, lineage tracing, and pipeline development. Interested in trajectories, cell-fate transitions, and reproducible workflows.
        </p>

        <div className="hero-stagger-4 hero-social-icons" style={{ display: "flex", gap: "1.8rem", marginTop: "var(--space-md)", flexWrap: "wrap" }}>
          <a href="https://x.com/cakirb_" target="_blank" rel="noopener noreferrer" className="social-icon-hover focus-visible" title="X (Twitter)">
            <XIcon />
          </a>
          <a href="https://linkedin.com/in/batuhancakir" target="_blank" rel="noopener noreferrer" className="social-icon-hover focus-visible" title="LinkedIn">
            <LinkedInIcon />
          </a>
          <a href="https://bsky.app/profile/cakirb.bsky.social" target="_blank" rel="noopener noreferrer" className="social-icon-hover focus-visible" title="Bluesky">
            <BlueskyIcon />
          </a>
          <a href="https://github.com/cakirb" target="_blank" rel="noopener noreferrer" className="social-icon-hover focus-visible" title="GitHub">
            <GithubIcon />
          </a>
          <a href="https://scholar.google.com/citations?user=iGaYmB4AAAAJ&hl=en" target="_blank" rel="noopener noreferrer" className="social-icon-hover focus-visible" title="Google Scholar">
            <ScholarIcon />
          </a>
          <a href="https://orcid.org/0000-0003-4513-606X" target="_blank" rel="noopener noreferrer" className="social-icon-hover focus-visible" title="ORCID">
            <OrcidIcon />
          </a>
          <a href="mailto:bc8@sanger.ac.uk" className="social-icon-hover focus-visible" title="Email">
            <EmailIcon />
          </a>
        </div>
      </div>
    </section>
  );
}
