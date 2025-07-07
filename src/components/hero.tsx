"use client"
import { Canvas } from "@react-three/fiber"
import { PerspectiveCamera, Environment, PerformanceMonitor } from "@react-three/drei"
import { Suspense, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowDown } from "lucide-react"
import { InteractiveScene } from "./interactive-scene"
import { useTheme } from "next-themes"

export default function Hero() {
    const scrollRef = useRef<HTMLDivElement>(null)
    const [dpr, setDpr] = useState(1.5) // Device Pixel Ratio
    const { theme } = useTheme()
    const isDarkMode = theme ===  "dark"

    const scrollToProjects = () => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    return (
        <section className="relative h-screen w-full mb-16">
            <div className="earth absolute inset-0 z-0">
                <Canvas dpr={dpr} shadows>
                    <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={50} />
                    <Suspense fallback= {null}>
                        <InteractiveScene />
                        <Environment preset={isDarkMode ? "night" : "sunset"} />
                    </Suspense>
                    <PerformanceMonitor onDecline={() => setDpr(1)} onIncline={() => setDpr(1.5)} />
                </Canvas>
            </div>
        
            <div className="relative z-10 flex flex-col items-center justify-center h-full text-center">
                <div className="bg-background/30 backdrop-blur-sm p-8 rounded-lg">
                    <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-gray-900 via-gray-500 to-gray-100 bg-clip-text text-transparent drop-shadow-[0_1.5px_1.5px_rgba(1,1,5,0.8)]" >
                        Jishnu Duhan
                    </h1>
                    <p className="text-xl md:text-2xl mb-8 max-w-2xl">AI-ML Enthusiast and Creative Developer</p>
                    <Button onClick={scrollToProjects} className="group cursor-pointer">
                        View My Work
                        <ArrowDown className="ml-2 h-4 w-4 group-hover:animate-bounce" />
                    </Button>
                </div>
            </div>
            <div ref={scrollRef} />
        </section>
    )
}