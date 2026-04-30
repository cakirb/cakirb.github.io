"use client";
import { GithubIcon } from "./Icons";

export default function ProjectsGrid() {
  return (
    <section id="projects" style={{ minHeight: "100dvh", paddingTop: "var(--space-2xl)", paddingBottom: "var(--space-xl)", paddingLeft: "var(--space-md)", paddingRight: "var(--space-md)" }}>
      <h2 className="reveal" style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-2xl)", color: "var(--foreground)", marginBottom: "var(--space-lg)", fontWeight: "700" }}>
        Selected Work
        <span style={{ color: "var(--accent-cyan)" }}>.</span>
      </h2>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))", gap: "var(--space-md)", fontSize: "1rem", justifyContent: "center" }}>

        {/* nf-scautoqc */}
        <div id="nf-scautoqc-card" className="project-card reveal" tabIndex={0} data-category="pipeline">
          <div className="category-label" style={{ display: "flex", alignItems: "center", gap: "10px", fontFamily: "var(--font-mono)", fontSize: "0.85em", marginBottom: "var(--space-sm)", fontWeight: "600" }}>
            <svg role="img" viewBox="0 0 24 24" fill="currentColor" width="16px" height="16px" style={{ transform: "translateY(-1px)" }} xmlns="http://www.w3.org/2000/svg"><title>Nextflow</title><path d="M.005 4.424V0c6.228.259 11.227 5.268 11.477 11.506H7.058C6.828 7.715 3.786 4.673.005 4.424m7.082 8.089h4.424C11.251 18.741 6.242 23.741.005 23.99v-4.423c3.79-.231 6.832-3.273 7.082-7.054m9.826-1.036h-4.424C12.749 5.249 17.758.25 23.995 0v4.424c-3.79.23-6.832 3.263-7.082 7.053m7.082 8.099V24c-6.228-.259-11.227-5.268-11.477-11.506h4.424c.23 3.791 3.272 6.833 7.053 7.082" /></svg>
            PIPELINE / NEXTFLOW
          </div>
          <h3 style={{ fontFamily: "var(--font-body)", fontSize: "1.6em", color: "var(--foreground)", marginBottom: "var(--space-sm)", fontWeight: "700", letterSpacing: "-0.02em" }}>nf-scautoqc</h3>
          <p style={{ opacity: 0.85, lineHeight: "1.6", marginBottom: "1.5rem", flexGrow: 1, color: "var(--foreground)" }}>
            Automated quality control, doublet detection, and optional integration for single-cell RNA-seq data on HPC environments.
          </p>
          <a href="https://github.com/cellgeni/nf-scautoqc" target="_blank" rel="noopener noreferrer" className="project-link focus-visible" style={{ fontWeight: "600", display: "inline-flex", alignItems: "center", gap: "8px" }}>
            <GithubIcon style={{ width: "18px", height: "18px", transform: "translateY(-1px)" }} /> View Repository <span>&rarr;</span>
          </a>
        </div>

        {/* nf-larry */}
        <div id="nf-larry-card" className="project-card reveal" tabIndex={0} data-category="pipeline">
          <div className="category-label" style={{ display: "flex", alignItems: "center", gap: "10px", fontFamily: "var(--font-mono)", fontSize: "0.85em", marginBottom: "var(--space-sm)", fontWeight: "600" }}>
            <svg role="img" viewBox="0 0 24 24" fill="currentColor" width="16px" height="16px" style={{ transform: "translateY(-1px)" }} xmlns="http://www.w3.org/2000/svg"><title>Nextflow</title><path d="M.005 4.424V0c6.228.259 11.227 5.268 11.477 11.506H7.058C6.828 7.715 3.786 4.673.005 4.424m7.082 8.089h4.424C11.251 18.741 6.242 23.741.005 23.99v-4.423c3.79-.231 6.832-3.273 7.082-7.054m9.826-1.036h-4.424C12.749 5.249 17.758.25 23.995 0v4.424c-3.79.23-6.832 3.263-7.082 7.053m7.082 8.099V24c-6.228-.259-11.227-5.268-11.477-11.506h4.424c.23 3.791 3.272 6.833 7.053 7.082" /></svg>
            PIPELINE / NEXTFLOW
          </div>
          <h3 style={{ fontFamily: "var(--font-body)", fontSize: "1.6em", color: "var(--foreground)", marginBottom: "var(--space-sm)", fontWeight: "700", letterSpacing: "-0.02em" }}>nf-larry</h3>
          <p style={{ opacity: 0.85, lineHeight: "1.6", marginBottom: "1.5rem", flexGrow: 1, color: "var(--foreground)" }}>
            Extracts and tracks clonal LARRY barcodes from raw reads, integrating clone lineages directly into gene expression matrices.
          </p>
          <a href="https://github.com/cellgeni/nf-larry" target="_blank" rel="noopener noreferrer" className="project-link focus-visible" style={{ fontWeight: "600", display: "inline-flex", alignItems: "center", gap: "8px" }}>
            <GithubIcon style={{ width: "18px", height: "18px", transform: "translateY(-1px)" }} /> View Repository <span>&rarr;</span>
          </a>
        </div>

        {/* nf-cellsnplite */}
        <div id="nf-cellsnplite-card" className="project-card reveal" tabIndex={0} data-category="pipeline">
          <div className="category-label" style={{ display: "flex", alignItems: "center", gap: "10px", fontFamily: "var(--font-mono)", fontSize: "0.85em", marginBottom: "var(--space-sm)", fontWeight: "600" }}>
            <svg role="img" viewBox="0 0 24 24" fill="currentColor" width="16px" height="16px" style={{ transform: "translateY(-1px)" }} xmlns="http://www.w3.org/2000/svg"><title>Nextflow</title><path d="M.005 4.424V0c6.228.259 11.227 5.268 11.477 11.506H7.058C6.828 7.715 3.786 4.673.005 4.424m7.082 8.089h4.424C11.251 18.741 6.242 23.741.005 23.99v-4.423c3.79-.231 6.832-3.273 7.082-7.054m9.826-1.036h-4.424C12.749 5.249 17.758.25 23.995 0v4.424c-3.79.23-6.832 3.263-7.082 7.053m7.082 8.099V24c-6.228-.259-11.227-5.268-11.477-11.506h4.424c.23 3.791 3.272 6.833 7.053 7.082" /></svg>
            PIPELINE / NEXTFLOW
          </div>
          <h3 style={{ fontFamily: "var(--font-body)", fontSize: "1.6em", color: "var(--foreground)", marginBottom: "var(--space-sm)", fontWeight: "700", letterSpacing: "-0.02em" }}>nf-cellsnplite</h3>
          <p style={{ opacity: 0.85, lineHeight: "1.6", marginBottom: "1.5rem", flexGrow: 1, color: "var(--foreground)" }}>
            A scalable Nextflow pipeline implementing cellsnp-lite for genotyping single cells from aligned sequencing reads.
          </p>
          <a href="https://github.com/cellgeni/nf-cellsnplite/" target="_blank" rel="noopener noreferrer" className="project-link focus-visible" style={{ fontWeight: "600", display: "inline-flex", alignItems: "center", gap: "8px" }}>
            <GithubIcon style={{ width: "18px", height: "18px", transform: "translateY(-1px)" }} /> View Repository <span>&rarr;</span>
          </a>
        </div>

        {/* CELLxGENE Discover Curation */}
        <div id="curation-card" className="project-card reveal" tabIndex={0} data-category="resource">
          <div className="category-label" style={{ display: "flex", alignItems: "center", gap: "10px", fontFamily: "var(--font-mono)", fontSize: "0.85em", marginBottom: "var(--space-sm)", fontWeight: "600" }}>
            <svg role="img" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16px" height="16px" style={{ transform: "translateY(-1px)" }}><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path></svg>
            RESOURCE
          </div>
          <h3 style={{ fontFamily: "var(--font-body)", fontSize: "1.6em", color: "var(--foreground)", marginBottom: "var(--space-sm)", fontWeight: "700", letterSpacing: "-0.02em" }}>CELLxGENE Discover Curation</h3>
          <p style={{ opacity: 0.85, lineHeight: "1.6", marginBottom: "1.5rem", flexGrow: 1, color: "var(--foreground)" }}>
            Contributed to the curation of the <a href="https://www.covid19cellatlas.org/" target="_blank" rel="noopener noreferrer" className="timeline-project-link focus-visible" data-target-category="resource">COVID-19 Cell Atlas</a> for the CELLxGENE Discover portal, enabling broad access to vital single-cell datasets.
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: "1.2rem", flexWrap: "wrap" }}>
            <a href="https://cellxgene.cziscience.com/" target="_blank" rel="noopener noreferrer" className="project-link focus-visible" style={{ fontWeight: "600", display: "inline-flex", alignItems: "center", gap: "8px" }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18px" height="18px" style={{ transform: "translateY(-1px)" }}><path d="M21 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h6"></path><polyline points="16 3 21 3 21 8"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg> View Portal <span>&rarr;</span>
            </a>
            <a href="https://doi.org/10.1093/nar/gkae1142" target="_blank" rel="noopener noreferrer" className="project-link focus-visible" style={{ fontWeight: "600", display: "inline-flex", alignItems: "center", gap: "8px" }}>
              <svg role="img" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18px" height="18px" style={{ transform: "translateY(-1px)" }}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg> View Paper <span>&rarr;</span>
            </a>
          </div>
        </div>

        {/* Benchmarking scRNA-seq */}
        <div id="benchmarking-card" className="project-card reveal" tabIndex={0} data-category="publication">
          <div className="category-label" style={{ display: "flex", alignItems: "center", gap: "10px", fontFamily: "var(--font-mono)", fontSize: "0.85em", marginBottom: "var(--space-sm)", fontWeight: "600" }}>
            <svg role="img" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16px" height="16px" style={{ transform: "translateY(-1px)" }}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
            BENCHMARKING
          </div>
          <h3 style={{ fontFamily: "var(--font-body)", fontSize: "1.6em", color: "var(--foreground)", marginBottom: "var(--space-sm)", fontWeight: "700", letterSpacing: "-0.02em" }}>Benchmarking scRNA-seq Visualisation Tools</h3>
          <p style={{ opacity: 0.85, lineHeight: "1.6", marginBottom: "1.5rem", flexGrow: 1, color: "var(--foreground)" }}>
            Extensive evaluation and benchmarking of single-cell RNA-seq data visualisation tools. Published in NARGAB.
          </p>
          <a href="https://academic.oup.com/nargab/article/2/3/lqaa052/5877814" target="_blank" rel="noopener noreferrer" className="project-link focus-visible" style={{ fontWeight: "600", display: "inline-flex", alignItems: "center", gap: "8px" }}>
              <svg role="img" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18px" height="18px" style={{ transform: "translateY(-1px)" }}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg> Read Paper <span>&rarr;</span>
          </a>
        </div>

      </div>
    </section>
  );
}
