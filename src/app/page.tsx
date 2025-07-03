import Background from "@/components/background"
import { Suspense } from "react"

import Hero from "@/components/hero"
import Projects from "@/components/projects"
import About from "@/components/about"
import { Loader } from "@/components/Loader"
import SkillsSphere from "@/components/3d-skills-sphere"

export default function Home() {
  return (
    <main className="h-screen bg-background text-foreground w-screen overflow-x-hidden">
      <Background />
      <div className="container pt-2">
        <header className="fixed top-0 right-0 z-20 p-4 bg-transparent">
          
        </header>

        <Suspense fallback={<Loader />}>
          <Hero />
        </Suspense>

        <div className="my-16 w-screen h-[500px]"> {/* Added fixed height */}
          <h2 className="text-4xl font-bold mb-8 text-center">My Skills</h2>
          <Suspense fallback={<Loader />}>
            <SkillsSphere />
          </Suspense>
        </div>

        <div className="project-container flex flex-col items-center justify-center mb-16 w-screen"> 
          <Projects />
        </div>
        
        <div className="about-container flex flex-col items-center justify-center mb-16 w-screen">
          <About />
        </div>
      </div>
    </main>
  )
}