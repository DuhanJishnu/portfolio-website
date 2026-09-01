"use client"

import { Float, useTexture } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useMemo, useRef } from "react"
import { AdditiveBlending, BackSide, Group, MathUtils, Mesh, Points } from "three"

const atmosphereVertex = `
  varying vec3 vNormal;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const atmosphereFragment = `
  varying vec3 vNormal;
  void main() {
    float rim = pow(0.72 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.8);
    vec3 blue = vec3(0.12, 0.24, 1.0);
    vec3 warm = vec3(1.0, 0.18, 0.05);
    vec3 color = mix(blue, warm, smoothstep(0.15, 0.85, vNormal.y * 0.5 + 0.5));
    gl_FragColor = vec4(color, rim * 0.62);
  }
`

function seeded(index: number) {
  const value = Math.sin(index * 74.231) * 43758.5453
  return value - Math.floor(value)
}

export function InteractiveScene() {
  const assembly = useRef<Group>(null)
  const globe = useRef<Mesh>(null)
  const stars = useRef<Points>(null)
  const signalA = useRef<Group>(null)
  const signalB = useRef<Group>(null)
  const earthTexture = useTexture("/BlackMarble.jpg")

  const starPositions = useMemo(() => {
    const values = new Float32Array(220 * 3)
    for (let i = 0; i < 220; i += 1) {
      const radius = 4.2 + seeded(i) * 3.6
      const theta = seeded(i + 300) * Math.PI * 2
      const phi = Math.acos(2 * seeded(i + 600) - 1)
      values[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
      values[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      values[i * 3 + 2] = radius * Math.cos(phi)
    }
    return values
  }, [])

  useFrame(({ pointer }, delta) => {
    if (globe.current) globe.current.rotation.y += delta * 0.075
    if (stars.current) stars.current.rotation.y -= delta * 0.012
    if (signalA.current) signalA.current.rotation.z += delta * 0.42
    if (signalB.current) signalB.current.rotation.y -= delta * 0.3
    if (!assembly.current) return
    assembly.current.rotation.x = MathUtils.lerp(assembly.current.rotation.x, pointer.y * 0.14 - 0.08, 0.035)
    assembly.current.rotation.z = MathUtils.lerp(assembly.current.rotation.z, -pointer.x * 0.1, 0.035)
  })

  return (
    <>
      <ambientLight intensity={0.7} />
      <directionalLight position={[4, 5, 6]} intensity={3.8} color="#fff4dc" />
      <directionalLight position={[-4, -2, 3]} intensity={2.4} color="#3155ff" />
      <pointLight position={[3, -3, 4]} intensity={16} color="#f04a24" distance={10} />

      <points ref={stars}>
        <bufferGeometry><bufferAttribute attach="attributes-position" args={[starPositions, 3]} /></bufferGeometry>
        <pointsMaterial color="#ebe5d6" size={0.026} sizeAttenuation transparent opacity={0.58} depthWrite={false} />
      </points>

      <Float speed={1.05} rotationIntensity={0.06} floatIntensity={0.22}>
        <group ref={assembly} rotation={[0.04, -0.24, -0.08]}>
          <mesh ref={globe} rotation={[0.08, -0.5, -0.12]}>
            <sphereGeometry args={[2.18, 96, 96]} />
            <meshStandardMaterial map={earthTexture} roughness={0.62} metalness={0.05} />
          </mesh>

          <mesh scale={1.015} rotation={[0.08, -0.5, -0.12]}>
            <sphereGeometry args={[2.18, 32, 32]} />
            <meshBasicMaterial color="#ebe5d6" wireframe transparent opacity={0.085} />
          </mesh>

          <mesh scale={1.13}>
            <sphereGeometry args={[2.18, 64, 64]} />
            <shaderMaterial
              vertexShader={atmosphereVertex}
              fragmentShader={atmosphereFragment}
              transparent
              side={BackSide}
              blending={AdditiveBlending}
              depthWrite={false}
            />
          </mesh>

          <mesh rotation={[Math.PI / 2.7, 0.2, 0.28]}>
            <torusGeometry args={[2.82, 0.035, 12, 180]} />
            <meshStandardMaterial color="#f04a24" roughness={0.3} />
          </mesh>
          <mesh rotation={[Math.PI / 1.9, -0.35, -0.2]}>
            <torusGeometry args={[3.22, 0.018, 10, 180]} />
            <meshBasicMaterial color="#2848ff" transparent opacity={0.8} />
          </mesh>

          <group ref={signalA} rotation={[Math.PI / 2.7, 0.2, 0.28]}>
            <mesh position={[2.82, 0, 0]}>
              <sphereGeometry args={[0.075, 18, 18]} />
              <meshBasicMaterial color="#fff4dc" blending={AdditiveBlending} />
            </mesh>
            <pointLight position={[2.82, 0, 0]} color="#f04a24" intensity={4} distance={1.2} />
          </group>
          <group ref={signalB} rotation={[Math.PI / 1.9, -0.35, -0.2]}>
            <mesh position={[-3.22, 0, 0]}>
              <sphereGeometry args={[0.055, 16, 16]} />
              <meshBasicMaterial color="#ebe5d6" blending={AdditiveBlending} />
            </mesh>
          </group>
        </group>
      </Float>
    </>
  )
}
