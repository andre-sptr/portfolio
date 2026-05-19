import { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, Float } from '@react-three/drei';
import * as THREE from 'three';

// Shared ref: GSAP ScrollTrigger writes here (see Hero.tsx), Three.js reads here
export const scrollProgressRef = { current: 0 };

const PARTICLE_COLOR = "#818cf8"; // electric violet, dark-only palette

const Particles = ({ count = 120 }: { count?: number }) => {
  const points = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 14;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 14;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 14;
    }
    return arr;
  }, [count]);

  useFrame(({ clock }) => {
    if (!points.current) return;
    const t = clock.getElapsedTime();
    points.current.rotation.y = t * 0.04;
    points.current.rotation.x = t * 0.015;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color={PARTICLE_COLOR}
        sizeAttenuation
        transparent
        opacity={0.45}
      />
    </points>
  );
};

const AnimatedSphere = ({ scrollEnabled }: { scrollEnabled: boolean }) => {
  const sphereRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!sphereRef.current) return;
    const t = clock.getElapsedTime();
    const scroll = scrollEnabled ? scrollProgressRef.current : 0;
    sphereRef.current.rotation.x = t * 0.15 + scroll * Math.PI * 2;
    sphereRef.current.rotation.y = t * 0.2 + scroll * Math.PI * 2;
    // Sphere recedes into background as user scrolls
    sphereRef.current.position.z = scroll * -40;
    // Fade out as user scrolls away
    if (sphereRef.current.material instanceof THREE.Material) {
      (sphereRef.current.material as THREE.Material & { opacity: number }).opacity =
        Math.max(0, 1 - scroll * 2);
    }
  });

  return (
    <Float speed={1.4} rotationIntensity={0.35} floatIntensity={0.35}>
      <Sphere ref={sphereRef} args={[1, 50, 100]} scale={2.2}>
        <MeshDistortMaterial
          color="#818cf8"
          attach="material"
          distort={0.38}
          speed={1.2}
          roughness={0.15}
          metalness={0.85}
          transparent
          opacity={1}
        />
      </Sphere>
    </Float>
  );
};

interface ThreeSceneProps {
  scrollEnabled?: boolean;
  isMobile?: boolean;
}

const ThreeScene = ({ scrollEnabled = true, isMobile = false }: ThreeSceneProps) => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);

  // Pause WebGL render loop when hero scrolls out of view.
  // This is the biggest win for downstream-section perf — a continuously
  // rendering Canvas can eat 30-50% of frame budget on mid-tier hardware.
  useEffect(() => {
    if (isMobile || !wrapRef.current) return;
    const io = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin: "100px" }
    );
    io.observe(wrapRef.current);
    return () => io.disconnect();
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <div ref={wrapRef} className="absolute inset-0 h-full w-full">
      <Canvas
        camera={{ position: [0, 0, 5] }}
        dpr={[1, 1.5]}                  // cap pixel ratio (was unbounded — 2-3× on retina)
        frameloop={visible ? "always" : "never"} // hard-stop render loop offscreen
        performance={{ min: 0.5 }}      // auto-degrade under load
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={0.7} />
        <pointLight position={[-8, -8, -8]} intensity={0.3} color="#22d3ee" />
        <AnimatedSphere scrollEnabled={scrollEnabled} />
        <Particles count={150} />
      </Canvas>
    </div>
  );
};

export default ThreeScene;
