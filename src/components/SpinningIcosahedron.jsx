"use client";
import { useEffect, useRef, useState } from 'react';

export default function SpinningIcosahedron() {
  const canvasRef = useRef(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (document.visibilityState === "visible") {
        setIsVisible(entry.isIntersecting);
      }
    });
    
    if (canvasRef.current) {
      observer.observe(canvasRef.current);
    }
    
    const handleVisibilityChange = () => {
      if (document.visibilityState !== "visible") {
        setIsVisible(false);
      } else if (canvasRef.current) {
        // We rely on IntersectionObserver to set it back to true if intersecting,
        // but let's just trigger a check
        setIsVisible(true); 
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    // Get the exact cyan color from CSS variables if possible, fallback to hex
    const rootStyle = getComputedStyle(document.documentElement);
    let colorHex = rootStyle.getPropertyValue('--accent-cyan').trim() || '#0FC09D';

    const phi = (1 + Math.sqrt(5)) / 2;
    // Base vertices of an icosahedron
    const vertices = [
      [-1, phi, 0], [1, phi, 0], [-1, -phi, 0], [1, -phi, 0],
      [0, -1, phi], [0, 1, phi], [0, -1, -phi], [0, 1, -phi],
      [phi, 0, -1], [phi, 0, 1], [-phi, 0, -1], [-phi, 0, 1]
    ];

    const edges = [
      [0, 1], [0, 5], [0, 7], [0, 10], [0, 11],
      [1, 5], [1, 7], [1, 8], [1, 9],
      [2, 3], [2, 4], [2, 6], [2, 10], [2, 11],
      [3, 4], [3, 6], [3, 8], [3, 9],
      [4, 5], [4, 9], [4, 11],
      [5, 9], [5, 11],
      [6, 7], [6, 8], [6, 10],
      [7, 8], [7, 10],
      [8, 9],
      [10, 11]
    ];

    let angleX = 0;
    let angleY = 0;

    const render = () => {
      // Rotation speeds
      angleX += 0.005;
      angleY += 0.01;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const width = canvas.width;
      const height = canvas.height;
      const scale = width / 4.5;

      // Calculate projected 2D points
      const projected = vertices.map(v => {
        // Rotate X
        const y1 = v[1] * Math.cos(angleX) - v[2] * Math.sin(angleX);
        const z1 = v[1] * Math.sin(angleX) + v[2] * Math.cos(angleX);

        // Rotate Y
        const x2 = v[0] * Math.cos(angleY) + z1 * Math.sin(angleY);
        const z2 = -v[0] * Math.sin(angleY) + z1 * Math.cos(angleY);

        // Project with a simple perspective
        const zOff = z2 + 4.5;
        const xProj = (x2 / zOff) * scale * 4.5 + width / 2;
        const yProj = (y1 / zOff) * scale * 4.5 + height / 2;

        return { x: xProj, y: yProj, z: z2 };
      });

      ctx.lineWidth = 6.0;
      ctx.lineJoin = "round";

      // Sort edges by depth so lines in front are drawn last and brighter
      const edgesWithDepth = edges.map(edge => {
        const p1 = projected[edge[0]];
        const p2 = projected[edge[1]];
        return {
          edge,
          p1,
          p2,
          zAvg: (p1.z + p2.z) / 2
        };
      });

      edgesWithDepth.sort((a, b) => a.zAvg - b.zAvg);

      edgesWithDepth.forEach(({ p1, p2, zAvg }) => {
        // Map depth (-2 to 2) to an opacity (0.75 to 1.0) for very solid visibility
        const opacity = Math.max(0.75, Math.min(1, (zAvg + 2) / 4));

        ctx.globalAlpha = opacity;
        ctx.strokeStyle = colorHex;

        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animationFrameId);
  }, [isVisible]);

  // Using a 128x128 internal canvas for retina sharpness, rendered at 36x36 css size
  return (
    <canvas
      ref={canvasRef}
      width={128}
      height={128}
      style={{
        width: '46px',
        height: '46px',
        display: 'block',
        margin: '-5px 0',
        filter: 'drop-shadow(0 0 8px rgba(15, 192, 157, 1))'
      }}
    />
  );
}
