"use client";
import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, Center } from '@react-three/drei';
import * as THREE from 'three';

// --- Holographic Shader Material ---
const HologramMaterial = {
  uniforms: {
    time: { value: 0 },
    color: { value: new THREE.Color('#0fc09d') }, // The accent cyan color
    fresnelAmount: { value: 1.5 },
    fresnelOpacity: { value: 0.8 },
    scanlineSize: { value: 150.0 },
    scanlineIntensity: { value: 0.25 },
    modelHeight: { value: 5.0 } // Arbitrary default, updated in component
  },
  vertexShader: `
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vViewPosition;
    varying vec3 vWorldPosition;

    void main() {
      vUv = uv;
      // Calculate normal in view space for Fresnel
      vNormal = normalize(normalMatrix * normal);
      
      vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
      vViewPosition = -mvPosition.xyz;
      
      // Calculate world position for scanlines
      vec4 worldPosition = modelMatrix * vec4(position, 1.0);
      vWorldPosition = worldPosition.xyz;

      // Add a tiny bit of vertex noise/glitch (optional, keeping it subtle)
      vec3 pos = position;
      /* Optional Glitch:
      float glitchAmount = sin(time * 10.0 + pos.y * 10.0) * 0.02;
      pos.x += glitchAmount;
      */

      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,
  fragmentShader: `
    uniform float time;
    uniform vec3 color;
    uniform float fresnelAmount;
    uniform float fresnelOpacity;
    uniform float scanlineSize;
    uniform float scanlineIntensity;
    uniform float modelHeight;

    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vViewPosition;
    varying vec3 vWorldPosition;

    void main() {
      // 1. Fresnel Effect (glow on edges)
      vec3 normal = normalize(vNormal);
      vec3 viewDir = normalize(vViewPosition);
      // Dot product to find angle between view and normal. 
      // 1 is facing us, 0 is perpendicular (edge).
      float fresnelTerm = dot(viewDir, normal);
      // Invert it so edges are bright (1) and center is dark (0)
      fresnelTerm = clamp(1.0 - fresnelTerm, 0.0, 1.0);
      // Power shapes the falloff
      fresnelTerm = pow(fresnelTerm, fresnelAmount);

      // 2. Scanlines
      // Use world Y position moving upwards over time
      float scanline = sin((vWorldPosition.y - time * 2.0) * scanlineSize);
      // Smooth it out to look more like distinct lines
      scanline = smoothstep(0.5, 1.0, scanline) * scanlineIntensity;

      // 3. Combine
      // Base color is modulated by the fresnel term and added to scanlines
      vec3 finalColor = color * fresnelTerm + (color * scanline);

      // Overall opacity is based on fresnel (so it's transparent in middle)
      float alpha = fresnelTerm * fresnelOpacity + (scanline * 0.5);
      
      // Optional: Add a very faint base fill so it's not completely invisible in the middle
      alpha = max(alpha, 0.1); 

      gl_FragColor = vec4(finalColor, alpha);
    }
  `,
  transparent: true,
  side: THREE.DoubleSide,
  blending: THREE.AdditiveBlending,
  depthWrite: false, // Important for additive blending
};

// --- Face Model Component ---
// Props: url - Path to the user's .glb/.gltf file
export function HologramFace({ url = "/face_scan.glb", scale = 1, position = [0, 0, 0] }) {
  const meshRef = useRef();
  
  // Create a material instance from our custom shader definition
  const material = useMemo(() => new THREE.ShaderMaterial({
    ...HologramMaterial,
    uniforms: {
      ...HologramMaterial.uniforms,
      time: { value: 0 }
    }
  }), []);

  // Update time uniform every frame for animation (scanlines)
  useFrame((state) => {
    if (material) {
      material.uniforms.time.value = state.clock.getElapsedTime();
    }
    // Slowly rotate the model
    if (meshRef.current) {
        meshRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.5; // Gentle oscillation
    }
  });

  // Attempt to load the model. 
  // We use useGLTF, but handle cases where it might not exist yet gracefully if possible.
  // In a real scenario, you'd want a suspense fallback in the parent.
  let scene;
  try {
    const gltf = useGLTF(url);
    scene = gltf.scene;

    // Apply the custom holographic material to all meshes in the loaded model
    scene.traverse((child) => {
      if (child.isMesh) {
        child.material = material;
        // Optionally update modelHeight uniform based on bounding box here if needed
      }
    });
  } catch (error) {
    console.warn("Could not load face model at", url, error);
    // Return a dummy cube if not found for testing layout
    return (
       <mesh ref={meshRef} position={position} scale={scale}>
        <boxGeometry args={[1, 1.5, 1]} />
        <meshBasicMaterial color="red" wireframe />
      </mesh>
    );
  }

  return (
    <group ref={meshRef} position={position} scale={scale}>
      <Center>
        <primitive object={scene} />
      </Center>
    </group>
  );
}

// Preload if the file is known to exist
// useGLTF.preload('/face_scan.glb');
