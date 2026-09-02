"use client"

import { PerformanceMonitor, PerspectiveCamera } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import { ArrowDownRight, Code2, Github, Linkedin } from "lucide-react"
import { Suspense, useState } from "react"
import { InteractiveScene } from "./interactive-scene"

export default function Hero() {
  const [dpr, setDpr] = useState(1.25)

  return (
    <section id="home" className="hero-shell" aria-labelledby="hero-title">
      <div className="hero-orbit" aria-hidden="true" />
      <div className="hero-copy">
        <div className="eyebrow liquid-glass reveal-up"><span className="status-dot" />Jishnu Duhan</div>
        <h1 id="hero-title" className="hero-title reveal-up reveal-delay-1">Systems, stories<span>& strange little</span><strong>machines.</strong></h1>
        <p className="hero-lede reveal-up reveal-delay-2">I work across applied AI, product engineering, and interactive web making complicated technology useful, legible, and occasionally a little unexpected.</p>
        <div className="hero-actions reveal-up reveal-delay-3">
          <a className="primary-cta liquid-glass-bright" href="#projects">See what I make <ArrowDownRight size={18} /></a>
          <div className="flex gap-8">
            <div className="social-links" aria-label="Social profiles"><a href="https://github.com/DuhanJishnu" target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={19} /></a></div>
            <div className="social-links" aria-label="Social profiles"><a href="https://www.linkedin.com/in/jishnu-duhan-b23ee006/" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={19} /></a></div>
            <div className="social-links" aria-label="Social profiles"><a href="https://leetcode.com/u/jishnuduhan/" target="_blank" rel="noreferrer" aria-label="LeetCode"><Code2 size={19} /></a></div>
          </div>
        </div>
      </div>
      <div className="hero-canvas" aria-label="Interactive rotating globe">
        <Canvas dpr={dpr} gl={{ antialias:true, alpha:true, powerPreference:"high-performance" }}>
          <PerspectiveCamera makeDefault position={[0,0,9]} fov={45} />
          <Suspense fallback={null}><InteractiveScene /></Suspense>
          <PerformanceMonitor onDecline={() => setDpr(1)} onIncline={() => setDpr(1.5)} />
        </Canvas>
        <div className="canvas-label canvas-label-top">Ex-Intern @Oracle | Knight @LeetCode</div>
        <div className="canvas-label canvas-label-bottom">NITM CSE'27 | SWE + AI</div>
      </div>
      <a className="scroll-cue" href="#projects"><span>Keep going</span><i /></a>
    </section>
  )
}
