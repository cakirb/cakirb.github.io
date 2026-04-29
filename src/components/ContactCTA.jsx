"use client";

export default function ContactCTA() {
  return (
    <section id="contact" style={{ minHeight: "80vh", paddingTop: "var(--space-2xl)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", paddingLeft: "var(--space-md)", paddingRight: "var(--space-md)" }}>
      <span className="reveal" style={{ display: "block", fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.2em", color: "var(--accent-magenta)", marginBottom: "1.5rem", fontWeight: "600" }}>
        get in touch
      </span>
      <h2 className="reveal" style={{ fontSize: "var(--text-3xl)", color: "var(--accent-cyan)", lineHeight: "1.1", marginBottom: "1.5rem", transitionDelay: "0.1s" }}>
        Say Hello
      </h2>
      <p className="reveal" style={{ maxWidth: "600px", marginBottom: "var(--space-md)", opacity: 0.9, transitionDelay: "0.2s", fontSize: "var(--text-lg)" }}>
        Whether you have a question about computational biology, single-cell analysis, or just want to say hi, my inbox is always open.
      </p>
      <div className="reveal" style={{ position: "relative", display: "inline-block" }}>
        <a
          href="mailto:bc8@sanger.ac.uk"
          className="focus-visible"
          style={{
            display: "inline-block",
            padding: "1rem 2.5rem",
            fontSize: "1rem",
            fontWeight: "600",
            color: "var(--foreground)",
            background: "rgba(15, 20, 25, 0.65)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(255, 255, 255, 0.05)",
            boxShadow: "0 20px 40px -10px rgba(0, 0, 0, 0.5)",
            borderRadius: "var(--radius-full)",
            textDecoration: "none",
            letterSpacing: "0.05em",
            textTransform: "uppercase",
            transition: "all 0.3s ease"
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
            e.currentTarget.style.borderColor = "var(--accent-cyan)";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = "rgba(15, 20, 25, 0.65)";
            e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.05)";
          }}
          onFocus={(e) => {
            e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
            e.currentTarget.style.borderColor = "var(--accent-cyan)";
          }}
          onBlur={(e) => {
            e.currentTarget.style.background = "rgba(15, 20, 25, 0.65)";
            e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.05)";
          }}
        >
          Contact Me
        </a>
      </div>
    </section>
  );
}
