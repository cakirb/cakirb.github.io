"use client";

import { useEffect, useRef } from "react";

class PipelineAnimator {
    constructor(startX, startY) {
        this.x = startX;
        this.y = startY;
        this.tick = 0;
        this.lifespan = 400;
        this.age = 0;

        const isBranching = Math.random() < 0.5;
        const splitY = 30;

        if (isBranching) {
            this.components = [
                { type: 'box', text: "[   ]", x: 0, y: 0, delayMin: 0 },
                { type: 'arrow', text: "====>", x: 40, y: 0, delayMin: 20 },
                { type: 'arrow', text: " /===>", x: 80, y: -splitY / 2, delayMin: 60 },
                { type: 'box', text: "[   ]", x: 130, y: -splitY, delayMin: 90 },
                { type: 'arrow', text: " \\===>", x: 80, y: splitY / 2, delayMin: 60 },
                { type: 'box', text: "[   ]", x: 130, y: splitY, delayMin: 90 },
                { type: 'arrow', text: " \\===>", x: 170, y: -splitY / 2, delayMin: 120 },
                { type: 'arrow', text: " /===>", x: 170, y: splitY / 2, delayMin: 120 },
                { type: 'box', text: "[   ]", x: 220, y: 0, delayMin: 150 },
            ];
        } else {
            this.components = [
                { type: 'box', text: "[   ]", x: 0, y: 0, delayMin: 0 },
                { type: 'arrow', text: "=====>", x: 40, y: 0, delayMin: 20 },
                { type: 'box', text: "[   ]", x: 90, y: 0, delayMin: 60 },
                { type: 'arrow', text: "=====>", x: 130, y: 0, delayMin: 90 },
                { type: 'box', text: "[   ]", x: 180, y: 0, delayMin: 120 },
            ];
        }
    }

    draw(ctx, color) {
        this.tick++;
        this.age++;

        const fade = this.age > this.lifespan - 60 ? (this.lifespan - this.age) / 60 :
            (this.age < 30 ? this.age / 30 : 1);

        if (fade <= 0) return false;

        // Ensure the exact brand blue is rendered without blend-mode distortions
        ctx.globalCompositeOperation = "source-over";
        ctx.fillStyle = `rgba(15, 192, 157, ${fade})`; // Nextflow Brand Color (#0fc09d)
        ctx.font = "14px 'JetBrains Mono', monospace";

        this.components.forEach(comp => {
            if (this.tick > comp.delayMin) {
                const charsToDraw = Math.min(comp.text.length, Math.floor((this.tick - comp.delayMin) / 2));
                if (charsToDraw > 0) {
                    ctx.fillText(comp.text.substring(0, charsToDraw), this.x + comp.x, this.y + comp.y);
                }
            }
        });

        // Reset composite operation for the next frame
        ctx.globalCompositeOperation = "source-over";
        return true;
    }
}


export default function AsciiBackground() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");

        let animationFrameId;
        let particles = [];
        let pipelines = [];

        // Track mouse position
        let mouse = { x: -1000, y: -1000 };

        const handleMouseMove = (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        };

        const handleMouseLeave = () => {
            mouse.x = -1000;
            mouse.y = -1000;
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseleave', handleMouseLeave);

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initParticles();
        };

        const randomGaussian = (mean = 0, stdev = 1) => {
            const u = 1 - Math.random();
            const v = Math.random();
            const z = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
            return z * stdev + mean;
        };

        const initParticles = () => {
            particles = [];
            // Massive increase in density. Cap at 15000 for standard performance.
            const rawCount = Math.floor((canvas.width * canvas.height) / 250);
            const numParticles = Math.min(rawCount, 15000);

            // UMAP V2 Topology: Modeling the complex, sprawling interconnected islands
            const clusters = [
                // --- Top Middle Island (B-Cells: Coral & Orange) ---
                // Dense, bifurcated distinct mass at the top
                { x: canvas.width * 0.45, y: canvas.height * 0.15, spreadX: 40, spreadY: 30, colorType: 3 }, // Coral (Left lobe)
                { x: canvas.width * 0.42, y: canvas.height * 0.17, spreadX: 25, spreadY: 20, colorType: 3 },
                { x: canvas.width * 0.55, y: canvas.height * 0.14, spreadX: 45, spreadY: 35, colorType: 2 }, // Orange (Right lobe)
                { x: canvas.width * 0.53, y: canvas.height * 0.18, spreadX: 30, spreadY: 40, colorType: 2 },

                // --- Far Left Tiny Archipelago (pDC, Plasmablast) ---
                { x: canvas.width * 0.15, y: canvas.height * 0.3, spreadX: 10, spreadY: 10, colorType: 5 },  // Pink (pDC)
                { x: canvas.width * 0.25, y: canvas.height * 0.29, spreadX: 15, spreadY: 8, colorType: 4 },  // Cyan (Plasmablast)
                { x: canvas.width * 0.2, y: canvas.height * 0.38, spreadX: 8, spreadY: 8, colorType: 6 },   // Grey (HSPC)

                // --- Bottom Left Massive Peninsula (Monocytes: Green, Teal, Pink bridge) ---
                // Huge base stretching upwards
                { x: canvas.width * 0.25, y: canvas.height * 0.85, spreadX: 60, spreadY: 60, colorType: 1 }, // CD14 (Deep Green Base)
                { x: canvas.width * 0.22, y: canvas.height * 0.75, spreadX: 50, spreadY: 70, colorType: 1 }, // CD14 body
                { x: canvas.width * 0.16, y: canvas.height * 0.6, spreadX: 40, spreadY: 30, colorType: 6 },  // CD16 (Teal branch left)
                { x: canvas.width * 0.18, y: canvas.height * 0.65, spreadX: 30, spreadY: 40, colorType: 6 },
                { x: canvas.width * 0.28, y: canvas.height * 0.6, spreadX: 12, spreadY: 35, colorType: 5 },  // cDC2 (Pink bridge vertical)

                // --- Center Bridge & Lower Right Massive Continent (T-Cells/NK: Cyan, Gold, Purple) ---
                // The Cyan (NK) bridge sitting top-left of the main continent
                { x: canvas.width * 0.45, y: canvas.height * 0.45, spreadX: 35, spreadY: 40, colorType: 4 }, // NK core
                { x: canvas.width * 0.48, y: canvas.height * 0.52, spreadX: 20, spreadY: 25, colorType: 4 }, // NK trail

                // The sprawling Gold/Olive landmass stretching horizontally
                { x: canvas.width * 0.58, y: canvas.height * 0.55, spreadX: 55, spreadY: 25, colorType: 0 }, // CD8 Memory (Olive connecting NK)
                { x: canvas.width * 0.55, y: canvas.height * 0.58, spreadX: 40, spreadY: 20, colorType: 0 },
                { x: canvas.width * 0.72, y: canvas.height * 0.65, spreadX: 65, spreadY: 80, colorType: 2 }, // CD4 Memory (Huge Gold Core)
                { x: canvas.width * 0.68, y: canvas.height * 0.75, spreadX: 50, spreadY: 60, colorType: 2 },
                { x: canvas.width * 0.78, y: canvas.height * 0.8, spreadX: 45, spreadY: 55, colorType: 2 },  // CD4 Naive (Bottom right Gold)
                { x: canvas.width * 0.88, y: canvas.height * 0.75, spreadX: 35, spreadY: 40, colorType: 1 }, // CD8 Naive (Far right Green)

                // The distinct Purple (Treg) growth off the top right
                { x: canvas.width * 0.83, y: canvas.height * 0.6, spreadX: 25, spreadY: 35, colorType: 5 },  // Treg (Using Pink/Purple)

                // The isolated Cyan (MAIT) beneath the main bridge
                { x: canvas.width * 0.58, y: canvas.height * 0.68, spreadX: 20, spreadY: 20, colorType: 4 }
            ];

            for (let i = 0; i < numParticles; i++) {
                let x, y, colorType;
                if (Math.random() < 0.99) { // 99% in tight blobs to increase density drastically
                    const cluster = clusters[Math.floor(Math.random() * clusters.length)];
                    x = randomGaussian(cluster.x, cluster.spreadX);
                    y = randomGaussian(cluster.y, cluster.spreadY);
                    colorType = cluster.colorType;
                } else { // 1% ambient noise (e.g. standard Proliferating scatter)
                    x = Math.random() * canvas.width;
                    y = Math.random() * canvas.height;
                    colorType = 6; // Background grey
                }

                particles.push({
                    x,
                    y,
                    baseX: x,
                    baseY: y,
                    colorType,
                    vx: (Math.random() - 0.5) * 0.015, // Move extremely slow for dense cohesion
                    vy: (Math.random() - 0.5) * 0.015,
                    opacity: 0,
                    targetOpacity: Math.random() * 0.9 + 0.1, // Higher average opacity for solidity
                    colorProgress: 0,
                    delay: Math.random() * 50 + 10 // significantly reduced delay so colors appear faster
                });
            }
        };


        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const isDark = document.documentElement.getAttribute("data-theme") === "dark" ||
                (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches && !document.documentElement.getAttribute("data-theme"));

            // Exact hex colors extracted from the provided UMAP image
            // Exact hex colors matching the new UMAP topology reference
            const colors = [
                "rgba(142, 163, 75",   // 0: Olive/Gold (CD8 Memory) 
                "rgba(86, 186, 137",   // 1: Emerald Green (CD14 Monocyte Base & CD8 Naive right)
                "rgba(202, 169, 78",   // 2: Golden/Orange (CD4 Memory huge core)
                "rgba(244, 150, 128",  // 3: Coral/Salmon (B-Naive/Memory top mass)
                "rgba(81, 183, 219",   // 4: Cyan (NK cells & Plasmablast)
                "rgba(224, 156, 246",  // 5: Purple/Pink (Treg right branch & cDC2)
                "rgba(102, 194, 165",  // 6: Teal (CD16 Monocystes left branch)
            ];

            const pipelineColor = "rgba(15, 192, 157, 1)"; // Nextflow Brand Color (#0fc09d)

            ctx.textAlign = "center";
            ctx.textBaseline = "middle";

            ctx.font = "30px 'JetBrains Mono', monospace";

            const repulsionRadius = 150;
            const repulsionForce = 4;

            particles.forEach((p) => {
                // Natural drift
                p.baseX += p.vx;
                p.baseY += p.vy;

                if (p.baseX < -50 || p.baseX > canvas.width + 50) p.vx *= -1;
                if (p.baseY < -50 || p.baseY > canvas.height + 50) p.vy *= -1;

                // Mouse interaction
                let dx = p.x - mouse.x;
                let dy = p.y - mouse.y;
                let dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < repulsionRadius) {
                    let force = (repulsionRadius - dist) / repulsionRadius;
                    p.x += (dx / dist) * force * repulsionForce;
                    p.y += (dy / dist) * force * repulsionForce;
                } else {
                    p.x += (p.baseX - p.x) * 0.05;
                    p.y += (p.baseY - p.y) * 0.05;
                }

                // 1. Fade opacity in
                if (p.opacity < p.targetOpacity) {
                    p.opacity += 0.01;
                }

                // 2. Delayed color fade
                if (p.delay > 0) {
                    p.delay--;
                } else if (p.colorProgress < 1) {
                    p.colorProgress += 0.015; // Faster color transition
                }

                // Interpolate from a neutral gray to the exact UMAP color
                const targetColorStr = colors[p.colorType];
                const [tr, tg, tb] = targetColorStr.replace("rgba(", "").split(",").map(Number);
                const gray = isDark ? 80 : 150; // Deepened Light Mode base noise (from 200 -> 150)

                let r = Math.floor(gray + (tr - gray) * p.colorProgress);
                let g = Math.floor(gray + (tg - gray) * p.colorProgress);
                let b = Math.floor(gray + (tb - gray) * p.colorProgress);
                let renderOpacity = p.opacity;

                // Light Mode Dynamic Contrast Boost
                if (!isDark) {
                    // 1. Saturate the pastel rgb values by 25%
                    r = Math.floor(r * 0.75);
                    g = Math.floor(g * 0.75);
                    b = Math.floor(b * 0.75);
                    // 2. Thick brush stroke: Bump physical paint opacity by +0.35
                    renderOpacity = Math.min(1.0, renderOpacity + 0.35);
                }

                ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${renderOpacity})`;

                // Larger fillRect (2.2px) combined with higher opacity creates physically solid blocks of color
                ctx.fillRect(Math.floor(p.x), Math.floor(p.y), 2.2, 2.2);
            });

            // Increase Pipeline spawn chance significantly (from 0.005 to 0.03) and allow more parallel tracks
            if (Math.random() < 0.03 && pipelines.length < 5) {
                pipelines.push(new PipelineAnimator(
                    Math.random() * (canvas.width - 300) + 50,
                    Math.random() * (canvas.height - 200) + 100
                ));
            }

            ctx.textAlign = "left";
            pipelines = pipelines.filter(pipe => pipe.draw(ctx, pipelineColor));

            animationFrameId = requestAnimationFrame(draw);
        };

        window.addEventListener("resize", resize);
        resize();
        draw();

        return () => {
            window.removeEventListener("resize", resize);
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseleave", handleMouseLeave);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                zIndex: -2,  // Pushed back to allow the frosted overlay at -1
                pointerEvents: "none",
                opacity: 0.8, // Slightly higher opacity for the new dots
            }}
        />
    );
}
