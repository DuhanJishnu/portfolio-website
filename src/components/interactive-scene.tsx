"use client"
import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import {
  Float,
  MeshDistortMaterial,
  MeshWobbleMaterial,
  Sphere,
  RoundedBox,
  Environment,
  useTexture,
} from "@react-three/drei"
import { type Mesh, type Group, Color, Vector3 } from "three"
import { useMouse } from "@/hooks/use-mouse"
import { useTheme } from "next-themes"

export function InteractiveScene() {
  const groupRef = useRef<Group>(null)
  const mouse = useMouse()
  const { theme } = useTheme()
  const isDarkMode = theme === "dark"

  // Create particles
const particles = useMemo(() => {
  return Array.from({ length: 50 }).map(() => ({
    position: [
      (Math.random() - 0.5) * 10,
      (Math.random() - 0.5) * 10,
      (Math.random() - 0.5) * 10,
    ] as [number, number, number], // Explicitly cast to tuple
    size: 0.2,
    speed: Math.random() * 0.1 + 0.05,
    offset: Math.random() * Math.PI * 2,
  }));
}, []);

  useFrame((state) => {
    if (groupRef.current) {
      // Subtle movement following the mouse
      const targetX = mouse.x * 0.5 - 0.25
      const targetY = mouse.y * 0.5 - 0.25

      groupRef.current.rotation.y += (targetX - groupRef.current.rotation.y) * 0.05
      groupRef.current.rotation.x += (targetY - groupRef.current.rotation.x) * 0.05

      // Gentle floating animation
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.2
    }
  })

  // Sphere texture
  const earthTexture1 = useTexture("/sphere1.jpg");
  const earthTexture2 = useTexture("/sphere2.jpg");
  const earthTexture = isDarkMode ? earthTexture1 : earthTexture2;
  
  return (
    <>
      <Environment preset="sunset" />

      <ambientLight intensity={isDarkMode ? 0.3 : 0.5} />
      <directionalLight position={[5, 5, 5]} intensity={isDarkMode ? 0.7 : 1} castShadow />
      <pointLight position={[-5, -5, -5]} intensity={0.5} color={isDarkMode ? "#9333ea" : "#3b82f6"} />

      <group ref={groupRef}>
        {/* Main floating elements */}
        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
        <RoundedBox args={[0.8, 0.8, 0.8]} radius={0.1} position={[-2.5, -2.5, 2.5]} castShadow>
          <MeshDistortMaterial color={isDarkMode ? "#ffffff" : "#000000"} />
        </RoundedBox>
          <Sphere args={[1.2, 32, 32]} position={[0, 0.5, 0]}>
            <meshStandardMaterial map={earthTexture} />
          </Sphere>
          <RoundedBox args={[0.7, 0.7, 0.7]} position={[2.5, -2.5, 2.5]} castShadow>
          <MeshWobbleMaterial  color={isDarkMode ? "#ffffff" : "#000000"} />
        </RoundedBox>
        </Float>

        {/* Torus ring */}
        {/* <Torus args={[3.5, 0.1, 16, 100]} position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <MeshWobbleMaterial factor={0.2} speed={0.5} color={isDarkMode ? "#3b82f6" : "#8b5cf6"} wireframe={true} />
        </Torus> */}

        {/* Floating particles */}
        {particles.map((particle, i) => (
          <ParticlePoint
            key={i}
            position={particle.position as [number, number, number]}
            size={particle.size}
            speed={particle.speed}
            offset={particle.offset}
            isDarkMode={isDarkMode}
          />
        ))}

        {/* Interactive elements */}
        <RoundedBox args={[0.8, 0.8, 0.8]} radius={0.1} position={[-4, -2, 1]} castShadow>
          <MeshDistortMaterial  color={isDarkMode ? "#ffffff" : "#000000"} />
        </RoundedBox>

        <RoundedBox args={[0.7, 0.7, 0.7]} position={[4, -2, 1]} castShadow>
          <MeshWobbleMaterial  color={isDarkMode ? "#ffffff" : "#000000"} />
        </RoundedBox>
      </group>
    </>
  )
}



interface ParticlePointProps {
  position: [number, number, number]; // Explicitly define as a tuple
  size: number;
  speed: number;
  offset: number;
  isDarkMode: boolean;
}

function ParticlePoint({ position, size, speed, offset, isDarkMode }: ParticlePointProps) {
  const ref = useRef<Mesh>(null);
  const posVector = new Vector3(...position);

  useFrame((state) => {
    if (ref.current) {
      // Oscillating movement (only in the y-axis)
      ref.current.position.y = posVector.y + Math.sin(state.clock.elapsedTime * speed + offset) * 2;

      // Pulsating size
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2 + offset) * 0.2;
      ref.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <mesh ref={ref} position={posVector}>
      <sphereGeometry args={[size, 8, 8]} />
      <meshBasicMaterial
        color={isDarkMode ? new Color("#ffffff").multiplyScalar(0.8) : new Color("#1e293b").multiplyScalar(0.8)}
        transparent
        opacity={0.6}
      />
    </mesh>
  )
}

