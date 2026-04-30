"use client";
import { useState, useEffect, useRef } from "react";
import SpinningIcosahedron from "./SpinningIcosahedron";
import { trackEvent } from "@/lib/analytics";

export default function Navbar() {
    const [activeSection, setActiveSection] = useState("");
    const [mobileVisible, setMobileVisible] = useState(false);
    const navLinksRef = useRef(null);

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

    // Mobile-only: make navbar appear once scrolled past hero, and then keep it visible.
    useEffect(() => {
        const isMobile = () => window.innerWidth <= 768;

        const heroObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!isMobile()) {
                    setMobileVisible(true);
                    return;
                }
                // When hero is NOT intersecting (scrolled past), show navbar and don't hide it
                if (!entry.isIntersecting) {
                    setMobileVisible(true);
                }
            });
        }, { threshold: 0.05 });

        const heroSection = document.getElementById("home");
        if (heroSection) heroObserver.observe(heroSection);

        // Also handle resize — if user resizes to desktop, always show
        const handleResize = () => {
            if (!isMobile()) setMobileVisible(true);
        };
        window.addEventListener("resize", handleResize);

        return () => {
            if (heroSection) heroObserver.unobserve(heroSection);
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    // Auto-scroll the nav-links container to show the active link fully
    useEffect(() => {
        if (!navLinksRef.current || !activeSection) return;
        const container = navLinksRef.current;
        const activeLink = container.querySelector(`[data-section="${activeSection}"]`);
        if (!activeLink) return;

        // Scroll the active link into view within the horizontal scroll container
        const linkLeft = activeLink.offsetLeft;
        const linkWidth = activeLink.offsetWidth;
        const containerWidth = container.offsetWidth;
        const scrollLeft = container.scrollLeft;

        // Center the active link in the container if possible
        const targetScroll = linkLeft - (containerWidth / 2) + (linkWidth / 2);
        container.scrollTo({ left: Math.max(0, targetScroll), behavior: "smooth" });
    }, [activeSection]);

    const navLinks = [
        { name: "About Me", href: "#about" },
        { name: "Experience", href: "#experience" },
        { name: "Selected Work", href: "#projects" },
        { name: "Contact", href: "#contact" }
    ];

    return (
        <nav
            className="site-nav"
            style={{
                position: "fixed",
                top: "1.5rem",
                left: "50%",
                transform: mobileVisible ? "translateX(-50%) translateY(0)" : "translateX(-50%) translateY(-120%)",
                width: "calc(100% - 2rem)",
                maxWidth: "600px",
                zIndex: 50,
                padding: "0.8rem 2rem",
                transition: "all 0.5s cubic-bezier(0.25, 1, 0.5, 1)",
                background: "var(--glass-bg)",
                backdropFilter: "blur(16px)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                borderRadius: "99px",
                boxShadow: "0 20px 40px -10px rgba(0, 0, 0, 0.5)",
                opacity: mobileVisible ? 1 : 0,
            }}
        >
            <div className="nav-container" style={{ width: "100%", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "1.5rem" }}>
                <a
                    href="#home"
                    aria-label="Home"
                    style={{ textDecoration: "none", color: "inherit", display: "flex", alignItems: "center", gap: "0.6rem" }}
                    className="social-icon-hover"
                    onClick={() => trackEvent("nav_click", { section: "home" })}
                >
                    <SpinningIcosahedron />
                </a>

                <div ref={navLinksRef} className="nav-links" style={{ display: "flex", gap: "2rem", alignItems: "center", fontSize: "0.9rem", fontWeight: "500" }}>
                    {navLinks.map((item) => {
                        const isActive = activeSection === item.href.substring(1);
                        return (
                            <a
                                key={item.name}
                                href={item.href}
                                data-section={item.href.substring(1)}
                                data-active={isActive}
                                className={`nav-link-item ${item.mobileOnly ? 'mobile-only-link' : ''}`}
                                onClick={() => trackEvent("nav_click", { section: item.href.substring(1) })}
                            >
                                {item.name}
                                <span style={{
                                    position: "absolute",
                                    left: 0,
                                    bottom: "0px",
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
