"use client";
import { useEffect, useRef } from "react";
import { InstagramIcon, ThreadsIcon } from "./Icons";

export default function PS3EasterEgg({ showPS5Modal, setShowPS5Modal, ps3ModalPos }) {
  const modalRef = useRef(null);
  const previousFocusRef = useRef(null);

  useEffect(() => {
    if (showPS5Modal) {
      previousFocusRef.current = document.activeElement;
      if (modalRef.current) {
        modalRef.current.focus();
      }
    } else if (previousFocusRef.current) {
      previousFocusRef.current.focus();
    }
  }, [showPS5Modal]);

  if (!showPS5Modal) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: "0",
        left: "0",
        width: "100vw",
        height: "100vh",
        zIndex: "var(--z-modal-backdrop, 9998)",
        touchAction: "none",
        overscrollBehavior: "none",
      }}
      onClick={() => setShowPS5Modal(false)}
    >
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="ps3-dialog-title"
        tabIndex="-1"
        className="ps3-xmb-backdrop-small"
        style={{
          position: "absolute",
          top: ps3ModalPos.y,
          left: ps3ModalPos.x,
          transform: "translate(0, -50%)",
          width: "min(90vw, 420px)",
          minHeight: "260px",
          background: "#000000",
          borderRadius: "var(--radius-md)",
          border: "1px solid rgba(255,255,255,0.1)",
          boxShadow: "0 10px 40px rgba(0,0,0,0.8), inset 0 0 100px rgba(255,255,255,0.05)",
          zIndex: "var(--z-modal-content, 9999)",
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
          <h2 id="ps3-dialog-title" style={{
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

          <div style={{ display: "flex", justifyContent: "center", gap: "40px", marginTop: "1rem" }}>
            <a href="https://www.instagram.com/batuinngg" target="_blank" rel="noopener noreferrer" className="focus-visible" style={{
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
              }}
              onFocus={(e) => {
                e.currentTarget.style.transform = "scale(1.15)";
                e.currentTarget.style.filter = "drop-shadow(0 0 15px rgba(255,255,255,1))";
                e.currentTarget.style.textShadow = "0 0 15px rgba(255,255,255,1), 0 0 30px rgba(255,255,255,0.8)";
              }}
              onBlur={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.filter = "drop-shadow(0 0 8px rgba(255,255,255,0.6))";
                e.currentTarget.style.textShadow = "0 0 10px rgba(255,255,255,0.8), 0 0 20px rgba(255,255,255,0.4)";
              }}>
              <InstagramIcon />
              <div style={{ fontSize: "0.9rem", fontWeight: "400", letterSpacing: "1px", fontFamily: "'Istok Web', sans-serif" }}>Instagram</div>
            </a>

            <a href="https://threads.com/batuinngg" target="_blank" rel="noopener noreferrer" className="focus-visible" style={{
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
              }}
              onFocus={(e) => {
                e.currentTarget.style.transform = "scale(1.15)";
                e.currentTarget.style.filter = "drop-shadow(0 0 15px rgba(255,255,255,1))";
                e.currentTarget.style.textShadow = "0 0 15px rgba(255,255,255,1), 0 0 30px rgba(255,255,255,0.8)";
              }}
              onBlur={(e) => {
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
            <span style={{ fontFamily: "var(--font-body), sans-serif", paddingTop: "1px" }}>BACK</span>
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
  );
}
