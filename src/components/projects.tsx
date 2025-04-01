"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github } from "lucide-react"
import Image from "next/image"

type Project = {
  id: number
  title: string
  description: string
  image: string
  tags: string[]
  demoUrl?: string
  githubUrl?: string
}

const projectsData: Project[] = [
  {
    id: 1,
    title: "Music Recommender",
    description: "A personalized music recommendation system utilizing NLP, vectorization, and Streamlit.",
    image: "/project-1.png",
    tags: ["NLP", "Vectorization", "Streamlit", "HTML5", "CSS"],
    demoUrl: "https://jishnuduhan-musicrecommender.streamlit.app/",
    githubUrl: "https://github.com/DuhanJishnu/Music_Recommender.git",
  },
  {
    id: 2,
    title: "Stock Sentiment Prediction",
    description: "A real-time stock prediction dashboard using ML and sentiment analysis.",
    image: "/project-2.png",
    tags: ["ML", "Streamlit", "RandomForest", "News API"],
    demoUrl: "https://stock-sentiment-prediction.streamlit.app/",
    githubUrl: "https://github.com/DuhanJishnu/Real-Time-Stock-Sentiment-Prediction-Dashboard.git",
  },
  {
    id: 3,
    title: "DocuMind - Multi-PDF RAG",
    description: "An AI-powered system for querying multiple PDFs using RAG with Mistral and Grok AI.",
    image: "/project-3.png",
    tags: ["RAG", "Mistral AI", "Grok AI", "PDF Processing"],
    demoUrl: "#",
    githubUrl: "https://github.com/DuhanJishnu/DocuMind.git",
  },
  {
    id: 4,
    title: "CAML (Collect, Arrange, Modify, Learn)",
    description: "A gamified learning platform integrating quizzes, flashcards, and AI-powered content.",
    image: "/project-4.png",
    tags: ["React.js", "Tailwind CSS", "Hono", "Gemini API"],
    demoUrl: "https://caml.ceew.xyz/",
    githubUrl: "https://github.com/charityrymbai/caml.git",
  },
];


export default function Projects() {
  const [activeFilter, setActiveFilter] = useState<string | null>(null)

  const allTags = Array.from(new Set(projectsData.flatMap((project) => project.tags)))

  const filteredProjects = activeFilter
    ? projectsData.filter((project) => project.tags.includes(activeFilter))
    : projectsData

  return (
    <section id="projects" className="p-16">
      <h2 className="text-3xl font-bold mb-8 text-center">My Projects</h2>

      <div className="flex flex-wrap gap-2 justify-center mb-8">
        <Badge
          variant={activeFilter === null ? "default" : "outline"}
          className="cursor-pointer"
          onClick={() => setActiveFilter(null)}
        >
          All
        </Badge>
        {allTags.map((tag) => (
          <Badge
            key={tag}
            variant={activeFilter === tag ? "default" : "outline"}
            className="cursor-pointer"
            onClick={() => setActiveFilter(tag)}
          >
            {tag}
          </Badge>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <Card key={project.id} className="overflow-hidden transition-all duration-300 hover:shadow-lg p-0 pb-6">
            <div className="">
              <Image
                src={project.image || "/placeholder.svg"}
                alt={project.title}
                width={400}
                height={400}
                className="w-full h-full object-cover transition-transform hover:scale-105"
              />
            </div>
            <CardHeader>
              <CardTitle>{project.title}</CardTitle>
              <div className="flex flex-wrap gap-1 mt-2">
                {project.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription>{project.description}</CardDescription>
            </CardContent>
            <CardFooter className="flex justify-between">
              {project.demoUrl && (
                <Button variant="outline" size="sm" asChild>
                  <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Demo
                  </a>
                </Button>
              )}
              {project.githubUrl && (
                <Button variant="outline" size="sm" asChild>
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-4 w-4" />
                    Code
                  </a>
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  )
}

