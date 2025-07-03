"use client"
import { Canvas } from "@react-three/fiber"
import { Environment, Stars, OrbitControls } from "@react-three/drei"
import { Suspense } from "react"

export default function Background() {
    return (
        <div className="fixed inset-0 z-0">
            <Canvas>
                <Suspense fallback={null}>
                    <Stars radius={100} depth={50} count={7000} factor={6} saturation={0} fade speed={0.5} />
                    <Environment preset="night" />
                </Suspense>
                <OrbitControls
                    enableZoom={false}
                    enablePan={false}
                    autoRotate
                    autoRotateSpeed={0.5}
                    maxPolarAngle={Math.PI / 2}
                    minPolarAngle={Math.PI / 2}
                />
            </Canvas>
        </div>
    )
}
