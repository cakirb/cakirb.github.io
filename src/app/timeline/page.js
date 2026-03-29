import Navbar from "@/components/Navbar";

// Reusable minimalist SVGs matching the premium design vibe
const BriefcaseIcon = () => (
    <span style={{ display: 'inline-flex', justifyContent: 'center', alignItems: 'center', width: '24px', marginRight: '4px' }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--accent-cyan)' }}>
            <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
        </svg>
    </span>
);

const GradCapIcon = () => (
    <span style={{ display: 'inline-flex', justifyContent: 'center', alignItems: 'center', width: '24px', marginRight: '4px' }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--accent-magenta)' }}>
            <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
            <path d="M6 12v5c3 3 9 3 12 0v-5" />
        </svg>
    </span>
);

const PaperIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline', margin: '0 4px', verticalAlign: '-1px' }}>
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
    </svg>
);

export default function TimelinePrototype() {
    return (
        <>
            <Navbar />

            <main style={{ padding: "8rem 2rem 4rem 2rem", maxWidth: "1400px", margin: "0 auto" }}>

                {/* Prototype Header */}
                <div style={{ marginBottom: "5rem", borderBottom: "1px solid rgba(150,150,150,0.2)", paddingBottom: "2rem" }}>
                    <h1 style={{ fontSize: "3rem", color: "var(--accent-cyan)", letterSpacing: "-0.04em", lineHeight: "1.1" }}>
                        Multi-Track Timeline Prototype
                    </h1>
                    <p style={{ opacity: 0.7, maxWidth: "600px" }}>This page demonstrates the colored dual-track layout for overlapping experience and education timeframes.</p>
                </div>

                {/* TIMELINE CONTAINER */}
                <div style={{
                    position: "relative",
                    maxWidth: "800px",
                    margin: "0 auto",
                    paddingLeft: "4rem" /* Space for the dual tracks */
                }}>

                    {/* Track 1: Career (Cyan) */}
                    <div style={{
                        position: "absolute",
                        left: "15px", /* center at 16px */
                        top: "-4rem", /* Starts fading above the first node */
                        bottom: "-4rem", /* Fades out below the last node */
                        width: "2px",
                        background: "linear-gradient(to bottom, transparent 0, var(--accent-cyan) 4rem, var(--accent-cyan) calc(100% - 4rem), transparent 100%)",
                        zIndex: 0
                    }} />

                    {/* Track 2: Education (Magenta) */}
                    <div style={{
                        position: "absolute",
                        left: "39px", /* center at 40px */
                        top: "13rem", /* Starts fading in just above the first Education node */
                        bottom: "-4rem",
                        width: "2px",
                        background: "linear-gradient(to bottom, transparent 0, var(--accent-magenta) 4rem, var(--accent-magenta) calc(100% - 4rem), transparent 100%)",
                        zIndex: 0
                    }} />

                    {/* ENTRY 1: 2024 - Present (Career) */}
                    <div style={{ position: "relative", paddingBottom: "3rem" }}>
                        <div style={{
                            position: "absolute", left: "calc(-4rem + 10px)", top: "8px", width: "12px", height: "12px", boxSizing: "border-box", borderRadius: "50%",
                            background: "var(--background)", border: "3px solid var(--accent-cyan)", boxShadow: "0 0 10px rgba(18, 69, 89, 0.4)", zIndex: 1
                        }} />
                        <span style={{ display: "block", fontFamily: "var(--font-jetbrains-mono)", fontSize: "0.9rem", color: "var(--accent-cyan)", fontWeight: "600", opacity: 0.8, marginBottom: "0.5rem" }}>
                            2024 &mdash; Present
                        </span>
                        <h3 style={{ fontSize: "1.4rem", color: "var(--accent-cyan)", marginBottom: "0.5rem", display: "flex", alignItems: "center" }}>
                            <BriefcaseIcon /> Senior Bioinformatician
                        </h3>
                        <p style={{ fontSize: "1rem", color: "var(--accent-cyan)", opacity: 0.8, marginBottom: "0.5rem", fontWeight: "600", letterSpacing: "0.02em" }}>
                            Wellcome Sanger Institute
                        </p>
                    </div>

                    {/* ENTRY 2: 2021 - 2024 (Career) - SWAPPED */}
                    <div style={{ position: "relative", paddingBottom: "3rem" }}>
                        <div style={{
                            position: "absolute", left: "calc(-4rem + 10px)", top: "8px", width: "12px", height: "12px", boxSizing: "border-box", borderRadius: "50%",
                            background: "var(--background)", border: "3px solid var(--accent-cyan)", zIndex: 1
                        }} />
                        <span style={{ display: "block", fontFamily: "var(--font-jetbrains-mono)", fontSize: "0.9rem", color: "var(--accent-cyan)", fontWeight: "600", opacity: 0.8, marginBottom: "0.5rem" }}>
                            2021 &mdash; 2024
                        </span>
                        <h3 style={{ fontSize: "1.4rem", color: "var(--accent-cyan)", marginBottom: "0.5rem", display: "flex", alignItems: "center" }}>
                            <BriefcaseIcon /> Bioinformatician
                        </h3>
                        <p style={{ fontSize: "1rem", color: "var(--accent-cyan)", opacity: 0.8, marginBottom: "1rem", fontWeight: "600", letterSpacing: "0.02em" }}>
                            Wellcome Sanger Institute
                        </p>
                        <div style={{ fontSize: "0.95rem", opacity: 0.8, lineHeight: "1.8", color: "var(--foreground)" }}>
                            Contributed to the curation of the <a href="https://www.covid19cellatlas.org/" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "underline", color: "var(--accent-magenta)" }}>COVID-19 Cell Atlas</a> for the <a href="https://cellxgene.cziscience.com/" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "underline", color: "var(--accent-magenta)" }}>CELLxGENE Discover</a> portal.
                        </div>
                    </div>

                    {/* ENTRY 3: 2021 - Present (Education) - SWAPPED */}
                    <div style={{ position: "relative", paddingBottom: "3rem" }}>
                        <div style={{
                            position: "absolute", left: "calc(-4rem + 34px)", top: "8px", width: "12px", height: "12px", boxSizing: "border-box", borderRadius: "50%",
                            background: "var(--background)", border: "3px solid var(--accent-magenta)", boxShadow: "0 0 10px rgba(89, 131, 146, 0.4)", zIndex: 1
                        }} />
                        <span style={{ display: "block", fontFamily: "var(--font-jetbrains-mono)", fontSize: "0.9rem", color: "var(--accent-magenta)", fontWeight: "600", opacity: 0.8, marginBottom: "0.5rem" }}>
                            2021 &mdash; Present
                        </span>
                        <h3 style={{ fontSize: "1.4rem", color: "var(--accent-magenta)", marginBottom: "0.5rem", display: "flex", alignItems: "center" }}>
                            <GradCapIcon /> PhD at Bioinformatics &amp; Systems Biology
                            <span className="pill-badge" style={{ backgroundColor: "var(--accent-magenta)" }}>PhD</span>
                        </h3>
                        <p style={{ fontSize: "1rem", color: "var(--accent-magenta)", opacity: 0.8, marginBottom: "1rem", fontWeight: "600", letterSpacing: "0.02em" }}>
                            Gebze Technical University
                        </p>
                        <div style={{ fontSize: "0.95rem", opacity: 0.8, lineHeight: "1.8", color: "var(--foreground)" }}>
                            Focusing on advanced pipeline construction and deep single-cell trajectory inference. Thesis work ongoing.
                        </div>
                    </div>

                    {/* ENTRY 4: 2019 - 2021 (Career) */}
                    <div style={{ position: "relative", paddingBottom: "3rem" }}>
                        <div style={{
                            position: "absolute", left: "calc(-4rem + 10px)", top: "8px", width: "12px", height: "12px", boxSizing: "border-box", borderRadius: "50%",
                            background: "var(--background)", border: "3px solid var(--accent-cyan)", zIndex: 1
                        }} />
                        <span style={{ display: "block", fontFamily: "var(--font-jetbrains-mono)", fontSize: "0.9rem", color: "var(--accent-cyan)", fontWeight: "600", opacity: 0.8, marginBottom: "0.5rem" }}>
                            2019 &mdash; 2021
                        </span>
                        <h3 style={{ fontSize: "1.4rem", color: "var(--accent-cyan)", marginBottom: "0.5rem", display: "flex", alignItems: "center" }}>
                            <BriefcaseIcon /> Research Assistant
                        </h3>
                        <p style={{ fontSize: "1rem", color: "var(--accent-cyan)", opacity: 0.8, marginBottom: "1rem", fontWeight: "600", letterSpacing: "0.02em" }}>
                            Gebze Technical University
                        </p>
                        <div style={{ fontSize: "0.95rem", opacity: 0.8, lineHeight: "1.8", color: "var(--foreground)" }}>
                            <ul style={{ listStyleType: "square", paddingLeft: "1.2rem", margin: 0 }}>
                                <li>Briefly worked on structural bioinformatics.</li>
                            </ul>
                        </div>
                    </div>

                    {/* ENTRY 5: 2017 - 2021 (Education) */}
                    <div style={{ position: "relative", paddingBottom: "3rem" }}>
                        <div style={{
                            position: "absolute", left: "calc(-4rem + 34px)", top: "8px", width: "12px", height: "12px", boxSizing: "border-box", borderRadius: "50%",
                            background: "var(--background)", border: "3px solid var(--accent-magenta)", zIndex: 1
                        }} />
                        <span style={{ display: "block", fontFamily: "var(--font-jetbrains-mono)", fontSize: "0.9rem", color: "var(--accent-magenta)", fontWeight: "600", opacity: 0.8, marginBottom: "0.5rem" }}>
                            2017 &mdash; 2021
                        </span>
                        <h3 style={{ fontSize: "1.4rem", color: "var(--accent-magenta)", marginBottom: "0.5rem", display: "flex", alignItems: "center" }}>
                            <GradCapIcon /> MSc at Bioinformatics &amp; Systems Biology
                            <span className="pill-badge" style={{ backgroundColor: "var(--accent-magenta)" }}>MSc</span>
                        </h3>
                        <p style={{ fontSize: "1rem", color: "var(--accent-magenta)", opacity: 0.8, marginBottom: "1rem", fontWeight: "600", letterSpacing: "0.02em" }}>
                            Gebze Technical University
                        </p>
                        <div style={{ fontSize: "0.95rem", opacity: 0.8, lineHeight: "1.8", color: "var(--foreground)" }}>
                            <ul style={{ listStyleType: "square", paddingLeft: "1.2rem", margin: 0, display: "flex", flexDirection: "column", gap: "0.8rem" }}>
                                <li>scRNA-seq analysis on stem cell differentiation.</li>
                                <li><strong>MSc Thesis:</strong> MATHEMATICAL MODELLING OF MOLECULAR TRAJECTORIES IN STEM CELL TRANSFORMATION PROCESSES VIA BIOINFORMATIC ANALYSIS OF SINGLE CELL OMICS DATA. <em style={{ opacity: 0.7 }}>(manuscript in review)</em></li>
                                <li>Internship at Cellular Genetics Informatics at Sanger, worked on benchmarking single-cell RNA-seq data visualisation tools. <a href="https://academic.oup.com/nargab/article/2/3/lqaa052/5877814" target="_blank" rel="noopener noreferrer" style={{ color: "var(--accent-cyan)", textDecoration: "underline", fontWeight: "600", position: 'relative', display: 'inline-block' }} className="hover-link"><PaperIcon />Paper Link</a></li>
                            </ul>
                        </div>
                    </div>

                    {/* ENTRY 6: 2012 - 2016 (Education) */}
                    <div style={{ position: "relative", paddingBottom: "1rem" }}>
                        <div style={{
                            position: "absolute", left: "calc(-4rem + 34px)", top: "8px", width: "12px", height: "12px", boxSizing: "border-box", borderRadius: "50%",
                            background: "var(--background)", border: "3px solid var(--accent-magenta)", zIndex: 1
                        }} />
                        <span style={{ display: "block", fontFamily: "var(--font-jetbrains-mono)", fontSize: "0.9rem", color: "var(--accent-magenta)", fontWeight: "600", opacity: 0.8, marginBottom: "0.5rem" }}>
                            2012 &mdash; 2016
                        </span>
                        <h3 style={{ fontSize: "1.4rem", color: "var(--accent-magenta)", marginBottom: "0.5rem", display: "flex", alignItems: "center" }}>
                            <GradCapIcon /> BSc Bioengineering
                            <span className="pill-badge" style={{ backgroundColor: "var(--accent-magenta)" }}>BSc</span>
                        </h3>
                        <p style={{ fontSize: "1rem", color: "var(--accent-magenta)", opacity: 0.8, marginBottom: "1rem", fontWeight: "600", letterSpacing: "0.02em" }}>
                            Yildiz Technical University
                        </p>
                        <div style={{ fontSize: "0.95rem", opacity: 0.8, lineHeight: "1.8", color: "var(--foreground)" }}>
                            <ul style={{ listStyleType: "square", paddingLeft: "1.2rem", margin: 0 }}>
                                <li>Erasmus studentship at Wrocław University of Technology in Poland in 2015.</li>
                            </ul>
                        </div>
                    </div>

                </div>
            </main>
        </>
    );
}
