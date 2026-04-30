"use client";

export default function About() {
  return (
    <section id="about" style={{ minHeight: "80dvh", paddingTop: "var(--space-2xl)", paddingBottom: "var(--space-xl)", paddingLeft: "var(--space-md)", paddingRight: "var(--space-md)" }}>
      <h2 className="reveal" style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-2xl)", color: "var(--foreground)", marginBottom: "var(--space-lg)", fontWeight: "700" }}>
        About Me
        <span style={{ color: "var(--accent-cyan)" }}>.</span>
      </h2>

      <div className="glass-panel reveal" style={{ maxWidth: "800px" }}>
        <p style={{ fontSize: "var(--text-lg)", color: "var(--foreground)", opacity: 0.95, marginBottom: "var(--space-md)", lineHeight: "1.5", fontWeight: "400" }}>
          I’ve been interested in computers from an early age, and I always knew they would shape my future. My interest in coding began during my undergraduate studies, when a MATLAB course made me realise how much I enjoyed solving problems through programming.
        </p>
        <p style={{ fontSize: "var(--text-lg)", color: "var(--foreground)", opacity: 0.95, marginBottom: "var(--space-md)", lineHeight: "1.5", fontWeight: "400" }}>
          That interest became a clear path when I started my MSc in Bioinformatics and Systems Biology in 2017. During that time, I built my foundations in Python and R and was introduced to bioinformatics in a way that immediately clicked with me. Working on single-cell RNA-seq and trajectory-focused projects showed me that I had found the field I wanted to grow in.
        </p>
        <p style={{ fontSize: "var(--text-lg)", color: "var(--foreground)", opacity: 0.95, marginBottom: "0", lineHeight: "1.5", fontWeight: "400" }}>
          Since then, my work has focused on the space between coding and biology, with particular interests in single-cell genomics, lineage tracing, and reproducible analysis workflows. My path has taken me from academic research in Turkey to the Wellcome Sanger Institute, where I now work as a Senior Bioinformatician while continuing my PhD. Across these roles, what has stayed constant is my enjoyment of building useful computational tools and continuing to grow through the work I do.
        </p>
      </div>
    </section>
  );
}
