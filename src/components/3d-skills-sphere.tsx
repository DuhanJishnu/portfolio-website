"use client"

import { useRef, useMemo, useEffect, useState, Suspense } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Text, Html, OrbitControls, useProgress } from "@react-three/drei"
import { Vector3 } from "three"
import type { Group } from "three"
import { useTheme } from "next-themes"

const skills = [
  "React",
  "Three.js",
  "TypeScript",
  "Next.js",
  "Tailwind CSS",
  "Node.js",
  "GraphQL",
  "WebGL",
  "GLSL",
  "JavaScript",
  "CSS",
  "HTML",
  "Git",
  "Figma",
  "UI/UX",
  "MongoDB",
  "PostgreSQL",
  "AWS",
  "Docker",
  "CI/CD",
]

function Loader() {
  const { progress } = useProgress()
  return (
    <Html center>
      <div className="text-center text-foreground">
        Loading skills... {Math.round(progress)}%
      </div>
    </Html>
  )
}

export default function SkillsSphere() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    setMounted(true)
    setIsDarkMode(theme === "dark")
  }, [theme])

  if (!mounted) return null

  return (
    <div className="h-[500px] w-full relative">
      <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 30], fov: 55, near: 0.1, far: 1000 }}>
        <Suspense fallback={<Loader />}>
          <color attach="background" args={[isDarkMode ? "#1e1e2e" : "#f8fafc"]} />
          <fog attach="fog" args={[isDarkMode ? "#1e1e2e" : "#f8fafc", 10, 40]} />
          <ambientLight intensity={1} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <SkillsCloud isDarkMode={isDarkMode} />
          <OrbitControls enableZoom={false} enablePan={false} rotateSpeed={0.5} />
        </Suspense>
      </Canvas>
    </div>
  )
}

function SkillsCloud({ isDarkMode }: { isDarkMode: boolean }) {
  const groupRef = useRef<Group>(null)
  const fontUrl = "https://drei.pmnd.rs/fonts/helvetiker_regular.typeface.json"

  const points = useMemo(() => {
    const temp: Vector3[] = []
    const sphereRadius = 10 // Reduced from 12 to make sure it's visible
    const samples = skills.length
    const phi = Math.PI * (3 - Math.sqrt(5))

    for (let i = 0; i < samples; i++) {
      const y = 1 - (i / (samples - 1)) * 2
      const radius = Math.sqrt(1 - y * y)
      const theta = phi * i

      temp.push(
        new Vector3(
          Math.cos(theta) * radius * sphereRadius,
          y * sphereRadius,
          Math.sin(theta) * radius * sphereRadius
        )
      )
    }

    return temp
  }, [])

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.1
    }
  })

  return (
    <group ref={groupRef}>
      {points.map((point, i) => (
        <Text
          key={i}
          position={point}
          fontSize={1.2} // Slightly smaller to avoid overlap
          color={isDarkMode ? "#ffffff" : "#000000"}
          anchorX="center"
          anchorY="middle"
          font={fontUrl}
        >
          {skills[i]}
        </Text>
      ))}
      
      {/* Sphere with better visibility settings */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[8, 32, 32]} /> {/* Reduced size */}
        <meshStandardMaterial color={isDarkMode ? "white" : "black"} wireframe />
      </mesh>
    </group>
  )
}
