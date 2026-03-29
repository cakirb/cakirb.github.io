"use client";
import { useState, useEffect } from "react";

export default function Navbar() {
    const [activeSection, setActiveSection] = useState("");

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        }, { rootMargin: "-30% 0px -30% 0px" });

        const sections = document.querySelectorAll("section[id]");
        sections.forEach((section) => observer.observe(section));

        return () => {
            sections.forEach((section) => observer.unobserve(section));
        };
    }, []);

    const navLinks = [
        { name: "About Me", href: "#about" },
        { name: "Experience", href: "#experience" },
        { name: "Selected Work", href: "#projects" },
        { name: "Contact", href: "#contact" }
    ];

    return (
        <nav
            style={{
                position: "fixed",
                top: "1.5rem",
                left: "50%",
                transform: "translateX(-50%)",
                width: "calc(100% - 2rem)",
                maxWidth: "850px",
                zIndex: 50,
                padding: "0.8rem 2rem",
                transition: "all 0.3s ease",
                background: "var(--glass-bg)",
                backdropFilter: "blur(16px)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                borderRadius: "99px",
                boxShadow: "0 20px 40px -10px rgba(0, 0, 0, 0.5)"
            }}
        >
            <div className="nav-container" style={{ width: "100%", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <a href="#home" style={{ textDecoration: "none", color: "inherit" }} className="social-icon-hover">
                    <span className="nav-brand" style={{ fontSize: "1.1rem", fontWeight: "700", letterSpacing: "-0.05em", whiteSpace: "nowrap" }}>
                        Batuhan_Cakir<span style={{ color: "var(--accent-cyan)", opacity: 0.8 }}>_</span>
                    </span>
                </a>

                <div className="nav-links" style={{ display: "flex", gap: "2rem", alignItems: "center", fontSize: "0.9rem", fontWeight: "500" }}>
                    {navLinks.map((item) => {
                        const isActive = activeSection === item.href.substring(1);
                        return (
                            <a
                                key={item.name}
                                href={item.href}
                                className="social-icon-hover"
                                style={{
                                    position: "relative",
                                    color: isActive ? "var(--accent-cyan)" : "inherit",
                                    textDecoration: "none",
                                    fontFamily: "inherit",
                                    fontSize: "inherit",
                                    fontWeight: "600",
                                    opacity: isActive ? 1 : 0.8,
                                    transition: "all 0.2s ease"
                                }}
                                onMouseOver={(e) => { e.currentTarget.style.opacity = 1; e.currentTarget.style.color = "var(--accent-cyan)"; }}
                                onMouseOut={(e) => { 
                                    e.currentTarget.style.opacity = isActive ? 1 : 0.8; 
                                    e.currentTarget.style.color = isActive ? "var(--accent-cyan)" : "inherit"; 
                                }}
                            >
                                {item.name}
                                <span style={{ 
                                    position: "absolute", 
                                    left: 0, 
                                    bottom: "-4px", 
                                    height: "2px", 
                                    width: isActive ? "100%" : "0%", 
                                    backgroundColor: "var(--accent-cyan)", 
                                    transition: "width 0.3s ease-out",
                                    borderRadius: "2px"
                                }} />
                            </a>
                        );
                    })}
                </div>
            </div>
        </nav>
    );
}
