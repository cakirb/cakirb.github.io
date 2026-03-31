"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function NotFound() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setMounted(true);
        }, 0);
        return () => clearTimeout(timer);
    }, []);

    // Simulating "Fallen" physics for the name
    const fallenLetters = [
        { char: "B", rotate: "-72deg", x: "10%", y: "-5px", fontSize: "3rem" },
        { char: "a", rotate: "15deg", x: "16%", y: "0px", fontSize: "2.5rem" },
        { char: "t", rotate: "-110deg", x: "24%", y: "-3px", fontSize: "2.5rem" },
        { char: "u", rotate: "65deg", x: "30%", y: "2px", fontSize: "2.5rem" },
        { char: "h", rotate: "-22deg", x: "39%", y: "-10px", fontSize: "2.5rem" },
        { char: "a", rotate: "85deg", x: "46%", y: "4px", fontSize: "2.5rem" },
        { char: "n", rotate: "-45deg", x: "53%", y: "0px", fontSize: "2.5rem" },
        
        { char: "_", rotate: "12deg", x: "61%", y: "-15px", fontSize: "3rem", color: "var(--accent-cyan)" },
        
        { char: "C", rotate: "-80deg", x: "70%", y: "-2px", fontSize: "3rem" },
        { char: "a", rotate: "25deg", x: "78%", y: "5px", fontSize: "2.5rem" },
        { char: "k", rotate: "-15deg", x: "85%", y: "-6px", fontSize: "2.5rem" },
        { char: "i", rotate: "95deg", x: "92%", y: "0px", fontSize: "2.5rem" },
        { char: "r", rotate: "-130deg", x: "96%", y: "-4px", fontSize: "2.5rem" },
        { char: "[", rotate: "45deg", x: "5%", y: "-20px", fontSize: "2.8rem", color: "var(--accent-magenta)" },
        { char: "]", rotate: "-25deg", x: "90%", y: "-35px", fontSize: "2.8rem", color: "var(--accent-magenta)" }
    ];

    return (
        <div style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "2rem",
            color: "var(--foreground)",
            fontFamily: "var(--font-space-grotesk)",
            position: "relative",
            overflow: "hidden" // Removed opaque backgroundColor
        }}>

            {/* Subtle Background Elements */}
            <div style={{
                position: "absolute",
                top: "20%",
                left: "10%",
                width: "300px",
                height: "300px",
                borderRadius: "50%",
                background: "radial-gradient(circle, var(--accent-cyan) 0%, transparent 60%)",
                opacity: "0.05",
                filter: "blur(40px)",
                zIndex: 0
            }} />
            <div style={{
                position: "absolute",
                bottom: "10%",
                right: "15%",
                width: "400px",
                height: "400px",
                borderRadius: "50%",
                background: "radial-gradient(circle, var(--accent-magenta) 0%, transparent 60%)",
                opacity: "0.05",
                filter: "blur(60px)",
                zIndex: 0
            }} />

            {/* Fallen Letters Container (The "Floor") */}
            <div style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                width: "100%",
                height: "100px",
                zIndex: 5,
                pointerEvents: "none"
            }}>
                {fallenLetters.map((l, i) => (
                    <span key={i} style={{
                        position: "absolute",
                        left: l.x,
                        bottom: l.y,
                        fontSize: l.fontSize,
                        fontWeight: "700",
                        color: l.color || "var(--foreground)",
                        opacity: mounted ? 0.4 : 0, // Fade in
                        transform: mounted ? `rotate(${l.rotate})` : `rotate(0deg) translateY(-100vh)`, // Fall down animation
                        transition: `all 1.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) ${i * 0.05}s`,
                        textShadow: "0px 10px 15px rgba(0,0,0,0.5)"
                    }}>
                        {l.char}
                    </span>
                ))}
            </div>

            {/* Main Glass Panel - Now "Displaced" */}
            <div className={`glass-panel reveal ${mounted ? 'active' : ''}`} style={{
                maxWidth: "600px",
                width: "100%",
                textAlign: "center",
                padding: "4rem 2rem",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                border: "1px solid rgba(150, 150, 150, 0.15)",
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                zIndex: 10,
                transform: mounted ? "rotate(-2deg) translateY(20px)" : "translateY(40px)", // The "Crash" tilt
                transition: "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)"
            }}>

                {/* Glowing 404 */}
                <h1 style={{
                    fontSize: "max(8vw, 6rem)",
                    fontWeight: "700",
                    backgroundImage: "linear-gradient(135deg, var(--accent-magenta), var(--accent-cyan))",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    color: "transparent",
                    lineHeight: "1",
                    marginBottom: "1rem",
                    letterSpacing: "-0.05em",
                    filter: "drop-shadow(0px 8px 16px rgba(0,0,0,0.2))"
                }}>
                    404
                </h1>

                <span style={{
                    display: "inline-block",
                    padding: "0.25rem 1rem",
                    borderRadius: "9999px",
                    backgroundColor: "rgba(220, 20, 60, 0.1)",
                    color: "var(--accent-magenta)",
                    fontSize: "0.85rem",
                    fontWeight: "600",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    marginBottom: "2rem",
                    border: "1px solid rgba(220, 20, 60, 0.2)"
                }}>
                    System Error
                </span>

                <h2 style={{
                    fontSize: "2rem",
                    fontWeight: "600",
                    marginBottom: "1.5rem",
                    color: "var(--foreground)",
                    letterSpacing: "-0.02em"
                }}>
                    Sequence Not Found
                </h2>

                <p style={{
                    fontSize: "1.1rem",
                    lineHeight: "1.7",
                    opacity: 0.75,
                    marginBottom: "3rem",
                    maxWidth: "400px",
                    fontWeight: "500"
                }}>
                    The <span className="keyword-highlight">RNA transcript</span> you are looking for has been degraded, or never existed in the current genome assembly.
                </p>

                <Link
                    href="/"
                    className="glass-panel"
                    style={{
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "0.5rem",
                        padding: "1rem 2rem",
                        color: "var(--foreground)",
                        textDecoration: "none",
                        fontWeight: "600",
                        fontSize: "1rem",
                        borderRadius: "1rem",
                        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                        border: "1px solid rgba(150, 150, 150, 0.3)",
                        cursor: "pointer",
                        position: "relative",
                        overflow: "hidden"
                    }}
                    onMouseOver={(e) => {
                        e.currentTarget.style.transform = "translateY(-2px)";
                        e.currentTarget.style.backgroundColor = "rgba(150, 150, 150, 0.1)";
                        e.currentTarget.style.boxShadow = "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)";
                    }}
                    onMouseOut={(e) => {
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.03)";
                        e.currentTarget.style.boxShadow = "none";
                    }}
                >
                    <svg style={{ position: "relative", zIndex: 1 }} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m15 18-6-6 6-6" />
                    </svg>
                    <span style={{ position: "relative", zIndex: 1 }}>Return to Reference Genome</span>
                </Link>

            </div>

        </div>
    );
}
