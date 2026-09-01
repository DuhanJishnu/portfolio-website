import { Suspense } from "react"
import Hero from "@/components/hero"
import Projects from "@/components/projects"
import About from "@/components/about"
import { Loader } from "@/components/Loader"
import InterfaceEffects from "@/components/interface-effects"

const capabilities = ["GENERATIVE AI", "LANGUAGE MODELS", "RAG SYSTEMS", "CREATIVE CODE", "THREE.JS", "PRODUCT ENGINEERING"]

export default function Home() {
  return (
    <main>
      <InterfaceEffects />
      <nav className="site-nav liquid-glass" aria-label="Primary navigation">
        <a href="#home" className="wordmark" aria-label="Jishnu Duhan, home">JD<span>®</span></a>
        <div className="nav-links"><a href="#projects">Work</a><a href="#about">About</a><a href="#contact">Let&apos;s talk <span>↘</span></a></div>
      </nav>

      <Suspense fallback={<Loader />}><Hero /></Suspense>

      <div className="marquee" aria-label="Core capabilities"><div>{[...capabilities, ...capabilities].map((item, i) => <span key={`${item}-${i}`}>{item}<b>✦</b></span>)}</div></div>

      <Projects />

      <section className="capability-section" aria-labelledby="capability-heading">
        <div className="capability-intro"><span>Capabilities / 04</span><h2 id="capability-heading">From raw idea<br />to <em>living system.</em></h2></div>
        <div className="capability-stack">
          <article><span>01</span><h3>AI Engineering</h3><p>LLMs, RAG pipelines, recommendation engines, and useful interfaces for intelligent systems.</p></article>
          <article><span>02</span><h3>Creative Development</h3><p>Immersive browser experiences shaped with Three.js, React, motion, and generative visuals.</p></article>
          <article><span>03</span><h3>Product Craft</h3><p>From the first interaction model to production code—fast, accessible, and built with intent.</p></article>
        </div>
      </section>

      <About />

      <footer className="contact-section" id="contact">
        <div className="contact-kicker"><span className="status-dot" /> Have a strange, ambitious idea?</div>
        <h2>Let&apos;s make it<br /><em>impossible to ignore.</em></h2>
        <a className="contact-link" href="https://github.com/DuhanJishnu" target="_blank" rel="noreferrer">Start a conversation <span>↗</span></a>
        <div className="footer-row"><span>Jishnu Duhan © 2026</span><div><a href="https://github.com/DuhanJishnu" target="_blank" rel="noreferrer">GitHub</a><a href="#home">Back to top ↑</a></div></div>
      </footer>
    </main>
  )
}
