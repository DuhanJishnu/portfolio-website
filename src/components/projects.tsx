"use client"

import Image from "next/image"
import { ArrowUpRight, Github } from "lucide-react"
import { useEffect, useRef, useState } from "react"

type Project = {
  number: string
  title: string
  kicker: string
  description: string
  tags: string[]
  code: string
  art: string
  image?: string
  live?: string
}

const projects: Project[] = [
  {
    number: "01",
    title: "AssistFlow",
    kicker: "Evidence-first agentic support",
    description: "A multi-agent customer-support platform with specialist routing, MCP billing and telemetry tools, deterministic policy guardrails, and a live SSE observability console.",
    tags: ["LangGraph", "FastMCP", "FastAPI", "PostgreSQL"],
    code: "https://github.com/DuhanJishnu/support-ai.git",
    art: "assistflow",
    image: "/project-assistflow.png",
  },
  {
    number: "02",
    title: "NeuraNexus",
    kicker: "Multimodal retrieval at scale",
    description: "A fault-tolerant multimodal RAG system for text, images, and audio, combining BM25 and dense vectors with distributed storage, tracing, audit logs, and streaming responses.",
    tags: ["Hybrid Search", "Vector DB", "Multimodal RAG", "SSE"],
    code: "https://github.com/DuhanJishnu/NeuraNexus.git",
    art: "neuranexus",
    image: "/project-neuranexus.png",
  },
  {
    number: "03",
    title: "Land Cover Mapping",
    kicker: "Labels discovered, not supplied",
    description: "An unsupervised remote-sensing pipeline that compresses hyperspectral patches with a spatial-spectral CNN autoencoder, then compares K-Means, DBSCAN, and HDBSCAN clusters through UMAP.",
    tags: ["PyTorch", "CNN Autoencoder", "UMAP", "HDBSCAN"],
    code: "https://github.com/DuhanJishnu/unsupervised-land-cover-mapping.git",
    art: "landcover",
    image: "/project-land-cover.png",
  },
  {
    number: "04",
    title: "DocuMind",
    kicker: "Knowledge, made conversational",
    description: "A multi-document RAG system that turns dense PDFs into a responsive knowledge layer using Mistral, Groq, and retrieval-augmented generation.",
    tags: ["RAG", "Mistral AI", "Vector Search"],
    code: "https://github.com/DuhanJishnu/DocuMind.git",
    art: "docs",
  },
  {
    number: "05",
    title: "CAML",
    kicker: "Learning that plays back",
    description: "A gamified learning platform combining adaptive quizzes, flashcards, and AI-generated content into one energetic study loop.",
    tags: ["Next.js", "Gemini", "Product Design"],
    live: "https://caml.ceew.xyz/",
    code: "https://github.com/charityrymbai/caml.git",
    art: "caml",
  },
  {
    number: "06",
    title: "Shakespeare GPT",
    kicker: "A language model, from first principles",
    description: "A character-level GPT built from scratch in PyTorch—an exploration of attention, embeddings, and the machinery behind generative language.",
    tags: ["Transformers", "PyTorch", "Research"],
    code: "https://github.com/DuhanJishnu/ShakespeareGPT.git",
    art: "tokens",
  },
  {
    number: "07",
    title: "Stock Signal",
    kicker: "Market mood, decoded",
    description: "A real-time decision dashboard that fuses news sentiment with machine-learning signals to make market movement easier to interpret.",
    tags: ["Machine Learning", "Sentiment", "Data UI"],
    live: "https://stock-sentiment-prediction.streamlit.app/",
    code: "https://github.com/DuhanJishnu/Real-Time-Stock-Sentiment-Prediction-Dashboard.git",
    art: "market",
  },
]

function ProjectArtwork({ type, image, title }: { type: string; image?: string; title: string }) {
  if (image) return (
    <div className={`artwork generated-art art-${type}`}>
      <Image src={image} alt={`${title} technical project artwork`} fill sizes="(max-width: 900px) 92vw, 65vw" />
      <div className="generated-art-mark"><span>PROJECT STUDY</span><b>{type === "assistflow" ? "ROUTE / RESOLVE" : type === "neuranexus" ? "SEARCH / SYNTHESIZE" : "EMBED / CLUSTER"}</b></div>
    </div>
  )

  if (type === "docs") return (
    <div className="artwork art-docs" aria-label="Abstract document retrieval interface">
      <div className="art-caption">CORPUS / 04 DOCUMENTS</div>
      <div className="paper-stack"><div className="paper paper-back" /><div className="paper paper-mid" /><div className="paper paper-front"><b>RESEARCH NOTES</b><span /><span /><span className="marked" /><span /><small>p. 128</small></div></div>
      <div className="query-slip"><small>QUERY 07</small><strong>What connects<br />these ideas?</strong><i>↳ 93% MATCH</i></div>
      <div className="scan-line" />
    </div>
  )

  if (type === "caml") return (
    <div className="artwork art-caml" aria-label="Abstract interactive learning interface">
      <div className="score"><span>STREAK</span><strong>12</strong><small>DAYS</small></div>
      <div className="learn-card card-one"><small>01 / RECALL</small><b>What makes an idea<br />stick?</b><span>Tap to reveal →</span></div>
      <div className="learn-card card-two"><small>02 / QUIZ</small><b>Choose the<br />strongest signal.</b><div><i /><i /><i /></div></div>
      <div className="learn-card card-three"><small>03 / REVIEW</small><b>8 of 10</b><span>Ready to repeat</span></div>
      <div className="caml-stamp">LEARN<br />BY DOING</div>
    </div>
  )

  if (type === "tokens") return (
    <div className="artwork art-tokens" aria-label="Typographic language-model token study">
      <div className="model-meta"><span>NANO GPT / 10.7M</span><span>LOSS 1.42 ↓</span></div>
      <blockquote><span>To be, or</span><em>not to be</em><span>—that is</span></blockquote>
      <div className="token-river"><i>the</i><i>question</i><i>:</i><i>whether</i><i>&apos;tis</i><i>nobler</i></div>
      <div className="epoch">EPOCH<br /><b>042</b></div>
    </div>
  )

  return (
    <div className="artwork art-market" aria-label="Abstract market sentiment dashboard">
      <div className="ticker"><span>LIVE SIGNAL</span><b>+2.84%</b></div>
      <div className="market-grid">{[38,54,43,68,59,82,71,92,76,88,96,84].map((height, index) => <i key={index} style={{ height: `${height}%` }} />)}</div>
      <div className="sentiment"><small>NEWS SENTIMENT</small><strong>CALM<br />OPTIMISM</strong><span>74 / 100</span></div>
      <div className="market-note">SIGNAL, NOT NOISE ↗</div>
    </div>
  )
}

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null)
  const [activeProject, setActiveProject] = useState(0)
  const [indexVisible, setIndexVisible] = useState(false)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const sectionObserver = new IntersectionObserver(([entry]) => setIndexVisible(entry.isIntersecting), { threshold: 0.04 })
    const projectObserver = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
      if (visible) setActiveProject(Number((visible.target as HTMLElement).dataset.projectIndex || 0))
    }, { rootMargin: "-22% 0px -42% 0px", threshold: [0.08, 0.25, 0.5] })

    sectionObserver.observe(section)
    section.querySelectorAll<HTMLElement>("[data-project-index]").forEach((item) => projectObserver.observe(item))
    return () => { sectionObserver.disconnect(); projectObserver.disconnect() }
  }, [])

  return (
    <section ref={sectionRef} id="projects" className="projects-section" aria-labelledby="projects-heading">
      <nav className={`project-index ${indexVisible ? "is-visible" : ""}`} aria-label="Project index">
        <span className="project-index-count">{String(activeProject + 1).padStart(2, "0")}</span>
        <div>
          {projects.map((project, index) => (
            <a key={project.title} href={`#project-${project.art}`} className={activeProject === index ? "is-active" : ""} aria-label={`Go to ${project.title}`} title={project.title}><i /></a>
          ))}
        </div>
        <span className="project-index-total">/{String(projects.length).padStart(2, "0")}</span>
      </nav>
      <header className="section-heading">
        <h2 id="projects-heading">My <br></br><em>Projects.</em></h2>
      </header>

      <div className="project-list">
        {projects.map((project, index) => (
          <article id={`project-${project.art}`} data-project-index={index} className={`project-row project-${project.art}`} key={project.title}>
            <header className="project-title-row">
              <span>{project.number}</span>
              <p>{project.kicker}</p>
              <h3>{project.title}</h3>
            </header>
            <div className="project-body">
              <ProjectArtwork type={project.art} image={project.image} title={project.title} />
              <div className="project-detail">
                <p>{project.description}</p>
                <ul>{project.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
                <div className="project-links">
                  {project.live && <a href={project.live} target="_blank" rel="noreferrer">Live experience <ArrowUpRight size={15} /></a>}
                  <a href={project.code} target="_blank" rel="noreferrer"><Github size={15} /> Source</a>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
