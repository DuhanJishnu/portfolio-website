"use client"

import { PerformanceMonitor, PerspectiveCamera } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import { ArrowDownRight, Github } from "lucide-react"
import { Suspense, useState } from "react"
import { InteractiveScene } from "./interactive-scene"

export default function Hero() {
  const [dpr, setDpr] = useState(1.25)

  return (
    <section id="home" className="hero-shell" aria-labelledby="hero-title">
      <div className="hero-orbit" aria-hidden="true" />
      <div className="hero-copy">
        <div className="eyebrow liquid-glass reveal-up"><span className="status-dot" />Jishnu Duhan / Independent maker</div>
        <h1 id="hero-title" className="hero-title reveal-up reveal-delay-1">Systems, stories<span>& strange little</span><strong>machines.</strong></h1>
        <p className="hero-lede reveal-up reveal-delay-2">I work across applied AI, product engineering, and interactive web—making complicated technology useful, legible, and occasionally a little unexpected.</p>
        <div className="hero-actions reveal-up reveal-delay-3">
          <a className="primary-cta liquid-glass-bright" href="#projects">See what I make <ArrowDownRight size={18} /></a>
          <div className="social-links" aria-label="Social profiles"><a href="https://github.com/DuhanJishnu" target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={19} /></a></div>
        </div>
      </div>
      <div className="hero-canvas" aria-label="Interactive rotating globe">
        <Canvas dpr={dpr} gl={{ antialias:true, alpha:true, powerPreference:"high-performance" }}>
          <PerspectiveCamera makeDefault position={[0,0,9]} fov={45} />
          <Suspense fallback={null}><InteractiveScene /></Suspense>
          <PerformanceMonitor onDecline={() => setDpr(1)} onIncline={() => setDpr(1.5)} />
        </Canvas>
        <div className="canvas-label canvas-label-top">WORLDWIDE WEB / 2026</div>
        <div className="canvas-label canvas-label-bottom">MOVE THE ORBIT</div>
      </div>
      <div className="hero-index" aria-hidden="true">OBJECT 01 / 04</div>
      <a className="scroll-cue" href="#projects"><span>Keep going</span><i /></a>
    </section>
  )
}
