"use client";

import React, { useRef, useMemo, useState, useEffect, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";

/* eslint-disable react-hooks/purity */

// --- Particle Background Shader ---
const ParticleMaterial = {
  uniforms: {
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2(-1000, -1000) },
    uMouseRadius: { value: 3.5 }, // Increased for massive wave effect
    uMouseForce: { value: 0.4 },  // Increased for stronger push
    uPixelRatio: { value: 1.0 },
    uModeContrast: { value: 1.0 }, // Boosting visibility
  },
  vertexShader: `
    uniform float uTime;
    uniform vec2 uMouse;
    uniform float uMouseRadius;
    uniform float uMouseForce;
    uniform float uPixelRatio;
    
    attribute vec3 color;
    attribute float aDelay;
    
    varying vec3 vColor;
    varying float vOpacity;

    void main() {
      vColor = color;
      
      // Calculate age for fade in
      float age = clamp(uTime * 0.5 - aDelay, 0.0, 1.0);
      vOpacity = age;

      vec3 pos = position;
      
      // Natural gentle sway
      pos.x += sin(uTime * 0.2 + aDelay * 10.0) * 0.1;
      pos.y += cos(uTime * 0.25 + aDelay * 5.0) * 0.1;

      // Mouse Replusion Effect
      vec2 pDist = pos.xy - uMouse;
      float dist = length(pDist);
      if (dist < uMouseRadius) {
        float force = (uMouseRadius - dist) / uMouseRadius; // 1 smoothly down to 0
        pos.xy += normalize(pDist) * force * uMouseForce;
        pos.z += force * uMouseForce; // Pop outward slightly
      }

      vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
      
      // Size scaling based on depth and pixel ratio
      gl_PointSize = (1.5 * uPixelRatio) * (20.0 / -mvPosition.z);
      gl_Position = projectionMatrix * mvPosition;
    }
  `,
  fragmentShader: `
    uniform float uModeContrast;
    varying vec3 vColor;
    varying float vOpacity;

    void main() {
      // Circular point rather than square
      vec2 coord = gl_PointCoord - vec2(0.5);
      if (length(coord) > 0.5) discard;
      
      // Boost color intensity for light mode, otherwise just normal colors
      vec3 finalColor = vColor * uModeContrast;
      
      gl_FragColor = vec4(finalColor, vOpacity * 0.8);
    }
  `,
  transparent: true,
  depthWrite: false,
  blending: THREE.AdditiveBlending,
};

// --- Topologies & Colors ---
const CLUSTERS = [
  { x: 0.45, y: 0.15, spreadX: 0.03, spreadY: 0.03, colorType: 3 },
  { x: 0.42, y: 0.17, spreadX: 0.02, spreadY: 0.02, colorType: 3 },
  { x: 0.55, y: 0.14, spreadX: 0.03, spreadY: 0.04, colorType: 2 },
  { x: 0.53, y: 0.18, spreadX: 0.02, spreadY: 0.04, colorType: 2 },
  { x: 0.15, y: 0.3, spreadX: 0.01, spreadY: 0.01, colorType: 5 },
  { x: 0.25, y: 0.29, spreadX: 0.01, spreadY: 0.01, colorType: 4 },
  { x: 0.2, y: 0.38, spreadX: 0.01, spreadY: 0.01, colorType: 6 },
  { x: 0.25, y: 0.85, spreadX: 0.04, spreadY: 0.06, colorType: 1 },
  { x: 0.22, y: 0.75, spreadX: 0.04, spreadY: 0.07, colorType: 1 },
  { x: 0.16, y: 0.6, spreadX: 0.03, spreadY: 0.03, colorType: 6 },
  { x: 0.18, y: 0.65, spreadX: 0.02, spreadY: 0.04, colorType: 6 },
  { x: 0.28, y: 0.6, spreadX: 0.01, spreadY: 0.04, colorType: 5 },
  { x: 0.45, y: 0.45, spreadX: 0.03, spreadY: 0.04, colorType: 4 },
  { x: 0.48, y: 0.52, spreadX: 0.02, spreadY: 0.03, colorType: 4 },
  { x: 0.58, y: 0.55, spreadX: 0.04, spreadY: 0.03, colorType: 0 },
  { x: 0.55, y: 0.58, spreadX: 0.03, spreadY: 0.02, colorType: 0 },
  { x: 0.72, y: 0.65, spreadX: 0.05, spreadY: 0.08, colorType: 2 },
  { x: 0.68, y: 0.75, spreadX: 0.04, spreadY: 0.06, colorType: 2 },
  { x: 0.78, y: 0.8, spreadX: 0.03, spreadY: 0.06, colorType: 2 },
  { x: 0.88, y: 0.75, spreadX: 0.03, spreadY: 0.04, colorType: 1 },
  { x: 0.83, y: 0.6, spreadX: 0.02, spreadY: 0.04, colorType: 5 },
  { x: 0.58, y: 0.68, spreadX: 0.02, spreadY: 0.02, colorType: 4 }
];

const COLORS = [
  new THREE.Color(142/255, 163/255, 75/255),   // 0: Olive/Gold
  new THREE.Color(86/255, 186/255, 137/255),   // 1: Emerald Green
  new THREE.Color(202/255, 169/255, 78/255),   // 2: Golden/Orange
  new THREE.Color(244/255, 150/255, 128/255),  // 3: Coral/Salmon
  new THREE.Color(81/255, 183/255, 219/255),   // 4: Cyan
  new THREE.Color(224/255, 156/255, 246/255),  // 5: Purple/Pink
  new THREE.Color(102/255, 194/255, 165/255),  // 6: Teal
  new THREE.Color(150/255, 150/255, 150/255),  // 7: Grey (Ambient noise)
];

const randomGaussian = (mean = 0, stdev = 1) => {
  const u = 1 - Math.random();
  const v = Math.random();
  const z = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
  return z * stdev + mean;
};

// --- Particles Component ---
const UmapParticles = ({ isDark }) => {
  const shaderRef = useRef();
  const { viewport, size } = useThree();
  const particleCount = 40000; // Drastically increased due to WebGL

  const [positions, colors, delays] = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const col = new Float32Array(particleCount * 3);
    const del = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      let x, y, colorType;
      
      // 99% grouped loosely in defined structural islands
      if (Math.random() < 0.99) {
        const cluster = CLUSTERS[Math.floor(Math.random() * CLUSTERS.length)];
        x = randomGaussian(cluster.x, cluster.spreadX);
        y = randomGaussian(cluster.y, cluster.spreadY);
        colorType = cluster.colorType;
      } else {
        // Ambient noise across the bounding volume
        x = Math.random();
        y = Math.random();
        colorType = 7; 
      }

      // Convert from [0, 1] normalized bounds to viewport space
      const vpX = (x - 0.5) * viewport.width;
      const vpY = -(y - 0.5) * viewport.height;
      const vpZ = (Math.random() - 0.5) * 1.5; // Z depth for parallax

      pos[i * 3] = vpX;
      pos[i * 3 + 1] = vpY;
      pos[i * 3 + 2] = vpZ;

      const c = COLORS[colorType];
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;

      del[i] = Math.random() * 2.0; // Startup delay
    }

    return [pos, col, del];
  }, [viewport.width, viewport.height]);

  const statePointer = useRef(new THREE.Vector2(-10, -10));

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Normalize mouse to [-1, 1] range
      statePointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      statePointer.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    const handleMouseLeave = () => {
      statePointer.current.x = -10;
      statePointer.current.y = -10;
    };
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  useFrame((state) => {
    if (!shaderRef.current) return;
    shaderRef.current.uniforms.uTime.value = state.clock.getElapsedTime();
    // Re-map normalized pointer (-1 to 1) to viewport width
    shaderRef.current.uniforms.uMouse.value.x = statePointer.current.x * (viewport.width / 2);
    shaderRef.current.uniforms.uMouse.value.y = statePointer.current.y * (viewport.height / 2);
    
    shaderRef.current.uniforms.uPixelRatio.value = size.width > 2000 ? 2.0 : 1.5; // Scale dots for ultra wide screens
    
    // Smooth transition between themes
    const targetContrast = isDark ? 1.0 : 0.6; 
    shaderRef.current.uniforms.uModeContrast.value += (targetContrast - shaderRef.current.uniforms.uModeContrast.value) * 0.1;
  });

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={particleCount} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={particleCount} array={colors} itemSize={3} />
        <bufferAttribute attach="attributes-aDelay" count={particleCount} array={delays} itemSize={1} />
      </bufferGeometry>
      <shaderMaterial 
        ref={shaderRef} 
        attach="material" 
        {...ParticleMaterial} 
      />
    </points>
  );
};

const PipelineSubComponent = ({ comp, localTime }) => {
  // 1 tick = ~0.016s in original canvas. Start time = delayMin * 0.016
  const startSec = comp.delayMin * 0.016;
  if (localTime < startSec) return null;

  // Orig canvas rendered 1 char per 2 ticks. 1 tick = 0.016s -> 1 char per 0.032s -> 31 chars/sec
  const charsToShow = Math.floor((localTime - startSec) * 31);
  const visibleText = comp.text.substring(0, charsToShow);

  if (!visibleText) return null;

  // Convert pixel offsets (x, y) to a relative 3D scale. Screen 1400px mapped to viewport ~12 units.
  // Using divisor 65 mathematically maps the old pixel coordinates precisely to the physical
  // width of the 3D text font geometry elements so they connect without gaps or overlaps.
  return (
    <Text
      position={[comp.x / 65, -comp.y / 65, 0]}
      color="#0fc09d"
      fontSize={0.2}
      anchorX="left"
      anchorY="middle"
      fillOpacity={0.9} // Slight opacity for bloom interaction
    >
      {visibleText}
    </Text>
  );
};

// --- Floating Pipeline Component ---
const AsciiPipeline = ({ startPos, direction, pipelineType }) => {
  const groupRef = useRef();
  
  // Create exact replica arrays from the 2D canvas pipeline version
  const [componentsArray] = useState(() => {
    const splitY = 30; // Original spacing
    if (pipelineType === "branching") {
      return [
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
      return [
        { type: 'box', text: "[   ]", x: 0, y: 0, delayMin: 0 },
        { type: 'arrow', text: "=====>", x: 40, y: 0, delayMin: 20 },
        { type: 'box', text: "[   ]", x: 90, y: 0, delayMin: 60 },
        { type: 'arrow', text: "=====>", x: 130, y: 0, delayMin: 90 },
        { type: 'box', text: "[   ]", x: 180, y: 0, delayMin: 120 },
      ];
    }
  });

  const startTime = useRef(0);
  const [localTime, setLocalTime] = useState(0);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    if (startTime.current === 0) startTime.current = state.clock.getElapsedTime();
    
    const currLocalTime = state.clock.getElapsedTime() - startTime.current;
    setLocalTime(currLocalTime);
    
    // Smooth 3D Translation
    groupRef.current.position.x += direction * delta * 0.15;
    // Natural floating Bob
    groupRef.current.position.y += Math.sin(state.clock.elapsedTime) * delta * 0.1;

    // Slight dynamic rotation for 3D presence
    groupRef.current.rotation.x = Math.sin(currLocalTime * 0.5) * 0.05;
    groupRef.current.rotation.y = Math.cos(currLocalTime * 0.5) * 0.05;
  });

  return (
    <group ref={groupRef} position={startPos}>
       {componentsArray.map((comp, idx) => (
         <PipelineSubComponent key={idx} comp={comp} localTime={localTime} />
       ))}
    </group>
  );
};

const PipelineManager = () => {
    const { viewport } = useThree();
    const [pipelines, setPipelines] = useState([]);

    // Spawn new pipelines periodically
    useEffect(() => {
        const interval = setInterval(() => {
            setPipelines((curr) => {
                const active = curr.slice(-3); // Keep only max 4 to prevent memory leaks over time
                
                // Random position on screen bounds, left side mainly
                const vpX = (Math.random() - 0.8) * viewport.width;
                const vpY = (Math.random() - 0.5) * viewport.height * 0.8;
                return [...active, { 
                    id: Math.random(), 
                    pos: [vpX, vpY, 0.5], // Render above particles slightly
                    direction: 1.0, 
                    type: Math.random() > 0.5 ? "branching" : "linear"
                }];
            });
        }, 5000); // Try spawning every 5 sec
        
        return () => clearInterval(interval);
    }, [viewport.width, viewport.height]);

    // Cleanup old ones might require robust life-cycle but for effect they eventually float outside view
    return (
        <group>
            {pipelines.map(p => (
                <Suspense fallback={null} key={p.id}>
                  <AsciiPipeline startPos={p.pos} direction={p.direction} pipelineType={p.type} />
                </Suspense>
            ))}
        </group>
    );
};

export default function ThreeBackground() {
  const [isDark, setIsDark] = useState(true);

  // Read theme on mount and observe changes
  useEffect(() => {
    const checkTheme = () => {
      const themeAttr = document.documentElement.getAttribute("data-theme");
      if (themeAttr) {
        setIsDark(themeAttr === "dark");
      } else {
        setIsDark(window.matchMedia("(prefers-color-scheme: dark)").matches);
      }
    };
    checkTheme();
    // Minimal polling or rely on the user to reload since this relies on standard CSS attributes mostly.
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => observer.disconnect();
  }, []);

  return (
    <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", zIndex: -2, pointerEvents: "none" }}>
      <Canvas 
        camera={{ position: [0, 0, 10], fov: 75 }}
        dpr={[1, 2]} // Support high-res displays beautifully
      >
        <PipelineManager />
        <UmapParticles isDark={isDark} />
        
        {/* Post Processing Glow / Bloom */}
        <EffectComposer disableNormalPass>
            <Bloom 
              luminanceThreshold={0.2} 
              mipmapBlur 
              intensity={isDark ? 0.8 : 0.3} // Subtle bloom in light mode, stronger in dark
            />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
