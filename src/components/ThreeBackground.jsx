"use client";

import { useRef, useMemo, useState, useEffect, Suspense, lazy } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const PostEffects = lazy(() =>
  import("@react-three/postprocessing").then((mod) => ({
    default: ({ isDark }) => (
      <mod.EffectComposer disableNormalPass>
        <mod.Bloom
          luminanceThreshold={0.2}
          mipmapBlur
          intensity={isDark ? 0.4 : 0.15}
        />
      </mod.EffectComposer>
    ),
  }))
);

/* eslint-disable react-hooks/purity */
// Justification: useMemo is used here to initialize static particle attributes once.
// Populating these arrays requires Math.random() (impure), but it's safe because it only runs once per dependency change.

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
      
      // Calculate age for fade in — multiplier raised so dots materialize much faster
      float age = clamp(uTime * 1.2 - aDelay, 0.0, 1.0);
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
      
      vec3 finalColor = vColor * uModeContrast;
      
      // Make particles noticeably more transparent to reduce overpowering bloom
      gl_FragColor = vec4(finalColor, vOpacity * 0.25);
    }
  `,
  transparent: true,
  depthWrite: false,
  blending: THREE.AdditiveBlending,
};

// --- Topologies & Colors ---
const CLUSTERS = [
  // Heavy re-mapping to keep the left side (0.0 to 0.5) almost completely clear of tight clusters.
  // This physically opens up the left alignment for foreground HTML text.
  { x: 0.75, y: 0.15, spreadX: 0.03, spreadY: 0.03, colorType: 3 },
  { x: 0.72, y: 0.17, spreadX: 0.02, spreadY: 0.02, colorType: 3 },
  { x: 0.65, y: 0.14, spreadX: 0.03, spreadY: 0.04, colorType: 2 },
  { x: 0.63, y: 0.18, spreadX: 0.02, spreadY: 0.04, colorType: 2 },
  { x: 0.75, y: 0.3, spreadX: 0.01, spreadY: 0.01, colorType: 5 },
  { x: 0.85, y: 0.29, spreadX: 0.01, spreadY: 0.01, colorType: 4 },
  { x: 0.8, y: 0.38, spreadX: 0.01, spreadY: 0.01, colorType: 6 },
  { x: 0.75, y: 0.85, spreadX: 0.04, spreadY: 0.06, colorType: 1 },
  { x: 0.72, y: 0.75, spreadX: 0.04, spreadY: 0.07, colorType: 1 },
  { x: 0.66, y: 0.6, spreadX: 0.03, spreadY: 0.03, colorType: 6 },
  { x: 0.68, y: 0.65, spreadX: 0.02, spreadY: 0.04, colorType: 6 },
  { x: 0.78, y: 0.6, spreadX: 0.01, spreadY: 0.04, colorType: 5 },
  { x: 0.95, y: 0.45, spreadX: 0.03, spreadY: 0.04, colorType: 4 },
  { x: 0.88, y: 0.52, spreadX: 0.02, spreadY: 0.03, colorType: 4 },
  { x: 0.88, y: 0.55, spreadX: 0.04, spreadY: 0.03, colorType: 0 },
  { x: 0.85, y: 0.58, spreadX: 0.03, spreadY: 0.02, colorType: 0 },
  { x: 0.92, y: 0.65, spreadX: 0.05, spreadY: 0.08, colorType: 2 },
  { x: 0.88, y: 0.75, spreadX: 0.04, spreadY: 0.06, colorType: 2 },
  { x: 0.98, y: 0.8, spreadX: 0.03, spreadY: 0.06, colorType: 2 },
  { x: 0.88, y: 0.75, spreadX: 0.03, spreadY: 0.04, colorType: 1 },
  { x: 0.93, y: 0.6, spreadX: 0.02, spreadY: 0.04, colorType: 5 },
  { x: 0.88, y: 0.68, spreadX: 0.02, spreadY: 0.02, colorType: 4 }
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
const UmapParticles = ({ isDark, isMobile }) => {
  const shaderRef = useRef();
  const { viewport, size } = useThree();
  const particleCount = isMobile ? 3000 : 40000; // Drastically decreased on mobile

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
      // If mobile, map x to [0.5, 1.0] and y to [0.5, 1.0] before converting
      if (isMobile) {
         x = 0.4 + (x * 0.6); // Push to right
         y = 0.4 + (y * 0.6); // Push to top
      }

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

      del[i] = Math.random() * 0.8; // Tighter startup delay spread for faster collective appearance
    }

    return [pos, col, del];
  }, [viewport.width, viewport.height, particleCount, isMobile]);

  const statePointer = useRef(new THREE.Vector2(-10, -10));

  useEffect(() => {
    // Only enable mouse repulsion on pointer devices, not mobile touch
    const hasPointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!hasPointer) return;

    const handleMouseMove = (e) => {
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

const pipelineColors = ["#0FC09D", "#67A671", "#57D4BA"];

const CyberNode = ({ pos, delay, timeRef, role, glowColor }) => {
  const groupRef = useRef();

  useFrame(() => {
    if (!groupRef.current || timeRef.current === undefined) return;
    const localTime = timeRef.current;
    
    // Nodes appear fully in 0.2s after delay
    const startSec = delay * 0.016;
    const progress = Math.min(Math.max((localTime - startSec) / 0.2, 0), 1);
    
    // Scale jumps to 1 with an elastic pop
    const easeOutBack = (x) => {
      const c1 = 1.70158;
      const c3 = c1 + 1;
      return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
    };

    const scale = progress > 0 ? easeOutBack(progress) : 0;
    groupRef.current.scale.setScalar(scale);
    groupRef.current.visible = progress > 0;
  });

  return (
    <group ref={groupRef} position={pos} visible={false}>
      {/* Input nodes as circles (3D flat cylinders) */}
      {role === "start" && (
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.2, 0.2, 0.08, 32]} />
          <meshBasicMaterial color={glowColor} wireframe={true} toneMapped={false} transparent={true} />
        </mesh>
      )}
      {/* Processing steps as rounded rectangles (capsules) */}
      {role === "process" && (
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <capsuleGeometry args={[0.15, 0.3, 4, 16]} />
          <meshBasicMaterial color={glowColor} toneMapped={false} opacity={0.65} transparent={true} />
        </mesh>
      )}
      {/* Output nodes as hexagons (6-sided cylinders) */}
      {role === "output" && (
        <mesh rotation={[Math.PI / 2, 0, Math.PI / 6]}>
          <cylinderGeometry args={[0.25, 0.25, 0.08, 6]} />
          <meshBasicMaterial color={glowColor} toneMapped={false} transparent={true} />
        </mesh>
      )}
    </group>
  );
};

const CyberEdge = ({ startPos, endPos, delay, timeRef, glowColor }) => {
  const groupRef = useRef();
  const lineRef = useRef();
  const packetRef = useRef(); // The glowing data packet that pulses down the line
  
  const dx = endPos[0] - startPos[0];
  const dy = endPos[1] - startPos[1];
  const dz = endPos[2] - startPos[2];
  const length = Math.sqrt(dx*dx + dy*dy + dz*dz) || 0.01;
  const angle = Math.atan2(dy, dx); 

  useFrame(() => {
    if (!groupRef.current || timeRef.current === undefined) return;
    const localTime = timeRef.current;
    
    const startSec = delay * 0.016;
    const buildDuration = 0.3;
    const progress = Math.min(Math.max((localTime - startSec) / buildDuration, 0), 1); 
    
    groupRef.current.visible = progress > 0;
    
    if (progress > 0) {
      const activeLength = length * progress;
      
      lineRef.current.scale.x = Math.max(activeLength, 0.0001);
      lineRef.current.position.x = activeLength / 2;

      // Pulse a glowing data packet along the edge continuously
      if (packetRef.current) {
        const flowTime = Math.max(0, localTime - startSec - buildDuration);
        const speed = 0.8; // Control speed of data flow
        const pulseCycle = (flowTime * speed) % 1; 
        
        packetRef.current.position.x = length * pulseCycle;
        packetRef.current.visible = flowTime > 0;
      }
    }
  });

  return (
    <group ref={groupRef} position={startPos} rotation={[0, 0, angle]} visible={false}>
      <mesh ref={lineRef}>
        <boxGeometry args={[1, 0.02, 0.02]} />
        <meshBasicMaterial color={glowColor} toneMapped={false} opacity={0.15} transparent={true} />
      </mesh>
      
      {/* The glowing data packet (dash shaped) */}
      <mesh ref={packetRef} visible={false}>
        <boxGeometry args={[0.2, 0.05, 0.05]} />
        <meshBasicMaterial color={glowColor.clone().multiplyScalar(2.0)} toneMapped={false} transparent={true} />
      </mesh>
    </group>
  );
};

// --- Floating 3D Cyber Pipeline Component ---
const CyberPipeline = ({ startPos, pipelineType, color }) => {
  const groupRef = useRef();
  const timeRef = useRef(0);
  
  // Statically assigned unique color passed to all nodes
  const glowColor = useMemo(() => new THREE.Color(color).multiplyScalar(1.5), [color]);
  
  const [graph] = useState(() => {
    // Physical geometric graph representation (Classic DAGs)
    if (pipelineType === "branching") { // Fork-Join / Diamond
      return {
        nodes: [
          { id: 0, p: [0, 0, 0], delay: 0, role: "start" },
          { id: 1, p: [1.2, 0, 0], delay: 15, role: "process" },
          { id: 2, p: [2.6, 0.8, 0], delay: 35, role: "process" },
          { id: 3, p: [2.6, -0.8, 0], delay: 35, role: "process" },
          { id: 4, p: [4.0, 0, 0], delay: 55, role: "process" },
          { id: 5, p: [5.2, 0, 0], delay: 80, role: "output" },
        ],
        edges: [
          { source: 0, target: 1, delay: 5 },
          { source: 1, target: 2, delay: 20 },
          { source: 1, target: 3, delay: 20 },
          { source: 2, target: 4, delay: 40 },
          { source: 3, target: 4, delay: 40 },
          { source: 4, target: 5, delay: 60 },
        ]
      };
    } else if (pipelineType === "hexagon") { // Scatter-Gather
      return {
        nodes: [
          { id: 0, p: [0, 0, 0], delay: 0, role: "start" },
          { id: 1, p: [1.6, 1.0, 0], delay: 20, role: "process" },
          { id: 2, p: [1.6, 0, 0], delay: 20, role: "process" },
          { id: 3, p: [1.6, -1.0, 0], delay: 20, role: "process" },
          { id: 4, p: [3.2, 0, 0], delay: 45, role: "process" },
          { id: 5, p: [4.4, 0, 0], delay: 70, role: "output" },
        ],
        edges: [
          { source: 0, target: 1, delay: 5 },
          { source: 0, target: 2, delay: 5 },
          { source: 0, target: 3, delay: 5 },
          { source: 1, target: 4, delay: 25 },
          { source: 2, target: 4, delay: 25 },
          { source: 3, target: 4, delay: 25 },
          { source: 4, target: 5, delay: 50 },
        ]
      };
    } else if (pipelineType === "mobile-branching") { // Branching for mobile
      return {
        nodes: [
          { id: 0, p: [0, 0, 0], delay: 0, role: "start" },
          { id: 1, p: [1.2, 0, 0], delay: 15, role: "process" },
          { id: 2, p: [2.6, 0.8, 0], delay: 35, role: "process" },
          { id: 3, p: [2.6, -0.8, 0], delay: 35, role: "process" },
          { id: 4, p: [4.0, 0, 0], delay: 55, role: "process" },
          { id: 5, p: [5.2, 0, 0], delay: 80, role: "output" },
        ],
        edges: [
          { source: 0, target: 1, delay: 5 },
          { source: 1, target: 2, delay: 20 },
          { source: 1, target: 3, delay: 20 },
          { source: 2, target: 4, delay: 40 },
          { source: 3, target: 4, delay: 40 },
          { source: 4, target: 5, delay: 60 },
        ]
      };
    } else { // Linear Chain
      return {
        nodes: [
          { id: 0, p: [0, 0, 0], delay: 0, role: "start" },
          { id: 1, p: [1.5, 0, 0], delay: 20, role: "process" },
          { id: 2, p: [3.0, 0, 0], delay: 40, role: "process" },
          { id: 3, p: [4.5, 0, 0], delay: 60, role: "output" },
        ],
        edges: [
          { source: 0, target: 1, delay: 5 },
          { source: 1, target: 2, delay: 25 },
          { source: 2, target: 3, delay: 45 },
        ]
      };
    }
  });

  const startTime = useRef(0);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    if (startTime.current === 0) startTime.current = state.clock.getElapsedTime();
    
    timeRef.current = state.clock.getElapsedTime() - startTime.current;
    
    // Instead of drifting across the screen, it stays mostly static to let the data pulses flow
    // Just a very subtle floating bobbing for "breath"
    groupRef.current.position.y += Math.sin(state.clock.elapsedTime * 2) * delta * 0.05;

    // Subtly rotate for 3D presence without tumbling
    groupRef.current.rotation.x = Math.sin(timeRef.current * 0.2) * 0.05;
    groupRef.current.rotation.y = Math.sin(timeRef.current * 0.3) * 0.05;
    
    // For the mobile static pipeline, orient it vertically flowing downwards
    if (pipelineType === "mobile-branching") {
      groupRef.current.rotation.z = -Math.PI / 2.1; // Slight angle for dynamism
      groupRef.current.scale.setScalar(0.75); // Shrink slightly so it fits neatly
    }

    // Exit: graceful fade out (unless it's the persistent mobile pipeline)
    const t = timeRef.current;
    if (t > 11.0 && pipelineType !== "mobile-branching") {
      const fadeEnd = 14.5; // Smooth fade until right before GC at 15s
      const progress = Math.max(0, 1.0 - (t - 11.0) / (fadeEnd - 11.0));
      
      groupRef.current.traverse((child) => {
        if (child.isMesh && child.material) {
          child.material.transparent = true;
          if (child.userData.origOpacity === undefined) {
             child.userData.origOpacity = child.material.opacity !== undefined ? child.material.opacity : 1.0;
          }
          child.material.opacity = child.userData.origOpacity * progress;
        }
      });
    }
  });

  return (
    <group ref={groupRef} position={startPos}>
       {graph.edges.map((edge, idx) => {
         const from = graph.nodes.find(n => n.id === edge.source);
         const to = graph.nodes.find(n => n.id === edge.target);
         return <CyberEdge key={`e-${idx}`} startPos={from.p} endPos={to.p} delay={edge.delay} timeRef={timeRef} glowColor={glowColor} />
       })}
       {graph.nodes.map((node, idx) => (
         <CyberNode key={`n-${idx}`} pos={node.p} delay={node.delay} timeRef={timeRef} role={node.role} glowColor={glowColor} />
       ))}
    </group>
  );
};

const PipelineManager = ({ isMobile }) => {
    const { viewport } = useThree();
    const [pipelines, setPipelines] = useState([]);

    // Spawn new pipelines periodically and safely garbage collect old ones based on exact system clock rather than array slicing
    useEffect(() => {
        if (isMobile) {
            // Spawn just one persistent vertical pipeline in the hero background
            const spawnMobile = () => {
                setPipelines([{ 
                    id: 'mobile-pipeline', 
                    spawnTime: Date.now(),
                    pos: [2.0, 3.8, 0], // Positioned safely at the top right, behind less text
                    type: "mobile-branching", // Special type that won't fade out and will be vertical
                    color: pipelineColors[1] // Green fits well
                }]);
            };
            const initialTimer = setTimeout(spawnMobile, 1500); // Quick fade in
            return () => clearTimeout(initialTimer);
        }

        const spawnOne = (curr) => {
            const now = Date.now();
            const active = curr.filter(p => now - p.spawnTime < 15000 && p.type !== "mobile-branching");
            
            // Span pipelines uniformly across the whole screen while verifying 
            // they do not spawn close enough to visually collide with existing active paths.
            let vpX = 0, vpY = 0;
            let isValid = false;
            let attempts = 0;
            
            // Calculate the safe gutter bounds (outside the ~1000px text column)
            const contentHalfWidthVP = (Math.min(1000, window.innerWidth) / window.innerWidth) * (viewport.width / 2);
            
            while (!isValid && attempts < 30) {
                vpX = (Math.random() - 0.5) * (viewport.width - 2);
                vpY = (Math.random() - 0.5) * viewport.height * 0.8;
                
                // Reject if inside the text column
                if (Math.abs(vpX) < contentHalfWidthVP + 0.5) {
                    attempts++;
                    continue;
                }
                
                const collision = active.find(p => {
                    const dx = p.pos[0] - vpX;
                    const dy = p.pos[1] - vpY;
                    return Math.sqrt(dx*dx + dy*dy) < 6.5; // Requires 6.5 WebGL units of safe radius distance
                });
                
                if (!collision) isValid = true;
                attempts++;
            }
            
            const typeRoll = Math.random();
            const type = typeRoll > 0.66 ? "branching" : typeRoll > 0.33 ? "hexagon" : "linear";
            const color = pipelineColors[Math.floor(Math.random() * pipelineColors.length)];

            return [...active, { 
                id: Math.random(), 
                spawnTime: now,
                pos: [vpX, vpY, 0.5], 
                type: type,
                color: color
            }];
        };

        // Wait 4.6 seconds so it spawns ~1.5s after the hero text cascade completes at ~3.1s
        const initialTimer = setTimeout(() => {
            setPipelines(curr => spawnOne(spawnOne([])));
        }, 4600);

        const interval = setInterval(() => {
            setPipelines(spawnOne);
        }, 5000); 

        return () => {
            clearTimeout(initialTimer);
            clearInterval(interval);
        };
    }, [viewport.width, viewport.height, isMobile]);

    return (
        <group>
            {pipelines.map(p => (
                <Suspense fallback={null} key={p.id}>
                    <CyberPipeline startPos={p.pos} pipelineType={p.type} color={p.color} />
                </Suspense>
            ))}
        </group>
    );
};

export default function ThreeBackground() {
  const [isDark, setIsDark] = useState(true);
  const [isMobile, setIsMobile] = useState(() => (
    typeof window !== "undefined" ? window.innerWidth <= 768 : false
  ));
  const [isVisible, setIsVisible] = useState(true);
  const [isHeroVisible, setIsHeroVisible] = useState(true);

  // Detect mobile on resize
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    
    const handleVisibilityChange = () => {
      setIsVisible(document.visibilityState === "visible");
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  // Dim canvas when scrolled past hero
  useEffect(() => {
    const handleScroll = () => {
      // Calculate how far down we've scrolled
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Start dimming after scrolling 10% of the viewport height
      const fadeStart = windowHeight * 0.1;
      // Fully dimmed by the time we scroll 50% of the viewport height
      const fadeEnd = windowHeight * 0.5;
      
      if (scrollY <= fadeStart) {
        setIsHeroVisible(1);
      } else if (scrollY >= fadeEnd) {
        setIsHeroVisible(0.15);
      } else {
        // Interpolate between 1 and 0.15
        const progress = (scrollY - fadeStart) / (fadeEnd - fadeStart);
        setIsHeroVisible(1 - (progress * 0.85));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial check
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="three-bg-container" style={{ 
      position: "fixed", top: 0, left: 0, width: "100%", height: "100%", 
      zIndex: -2, pointerEvents: "none",
      opacity: isHeroVisible,
      // Removed CSS transition because we are now driving opacity directly via scroll position
    }}>
      <Canvas 
        camera={{ position: [0, 0, 10], fov: 75 }}
        dpr={isMobile ? [1, 2] : [1, 2]} // Restored full resolution for mobile to fix blurry dots
        // Only pause the frameloop if the tab is hidden
        frameloop={isVisible ? "always" : "demand"}
      >
      <PipelineManager isMobile={isMobile} />
      <UmapParticles isDark={isDark} isMobile={isMobile} />
        
        {!isMobile && (
          <Suspense fallback={null}>
            <PostEffects isDark={isDark} />
          </Suspense>
        )}
      </Canvas>
    </div>
  );
}

