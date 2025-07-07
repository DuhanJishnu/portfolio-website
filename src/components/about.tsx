"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Code, Briefcase, GraduationCap } from "lucide-react"
import Image from "next/image"

export default function About() {
  return (
    <section id="about">
      <h2 className="text-4xl font-bold mb-8 text-center text-primary">
        About Me
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Jishnu Duhan</CardTitle>
              <CardDescription>Creative Developer & Designer</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="aspect-square rounded-full overflow-hidden mb-6">
                <Image
                  src="/profile_img.jpg"
                  alt="Profile"
                  width={300}
                  height={300}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="mb-4">
                I&apos;m a passionate developer with expertise in creating interactive web experiences and 3D visualizations.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">Python</span>
                <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">Generative AI</span>
                <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">LLM</span>
                <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">LangChain</span>
                <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">React</span>
                <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">Three.js</span>
                <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">Next.js</span>
                <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">TypeScript</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Tabs defaultValue="skills">
            <TabsList className="grid grid-cols-3 mb-6 mx-auto md:mx-0">
              <TabsTrigger value="skills" className="cursor-pointer">
                <Code className="mr-2 h-4 w-4 hidden md:inline" />
                Skills
              </TabsTrigger>
              <TabsTrigger value="experience" className="cursor-pointer">
                <Briefcase className="mr-2 h-4 w-4 hidden md:inline" />
                Experience
              </TabsTrigger>
              <TabsTrigger value="education" className="cursor-pointer">
                <GraduationCap className="mr-2 h-4 w-4 hidden md:inline" />
                Education
              </TabsTrigger>
            </TabsList>

            <TabsContent value="skills">
              <Card>
                <CardHeader>
                  <CardTitle>Technical Skills</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <SkillBar label="Generative AI" value={60} />
                    <SkillBar label="LLM" value={55} />
                    <SkillBar label="LangChain" value={60} />
                    <SkillBar label="Frontend Development" value={70} />
                    <SkillBar label="UI/UX Design" value={50} />
                    <SkillBar label="Backend Development" value={65} />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="experience">
              <Card>
                <CardHeader>
                  <CardTitle>Work Experience</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <ExperienceItem
                      title="Web Development Intern"
                      company="ONLYBEES"
                      period="Feb - Mar, 2025"
                      description="Delivered a Ticketing Platform for the Asian Football Confederation (AFC), enhancing functionality and ensuring seamless user experiences for large-scale event operations. Recognized with a Certificate of Appreciation for technical expertise and commitment, directly supporting the platform’s successful deployment and adoption across AFC’s 2025 events."
                    />
                    <ExperienceItem
                      title="Co-Coordinator"
                      company="Web Development Team, Shishir"
                      period="Jan, 2025 - Present"
                      description="Led the front-end of the official website for Shishir, the cultural fest of NIT Meghalaya, using Next.js and Tailwind CSS for a modern, responsive UI. Designed and integrated reusable UI components, maintaining a scalable and maintainable codebase."
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="education">
              <Card>
                <CardHeader>
                  <CardTitle>Education & Certifications</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <ExperienceItem
                      title="B. Tech Computer Science and Engineering"
                      company="National Institute of Technology Meghalaya"
                      period="2023 – Present"
                      description="CGPA: 9.99"
                    />
                    <div className="italic">Relevant Coursework : Object-Oriented Programming (OOP), Advanced Engineering Maths, Data Structures</div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  )
}

function SkillBar({ label, value }: { label: string; value: number }) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between">
        <span className="text-sm font-medium">{label}</span>
        <span className="text-sm text-muted-foreground">{value}%</span>
      </div>
      <div className="h-2 bg-secondary rounded-full overflow-hidden">
        <div className="h-full bg-primary rounded-full" style={{ width: `${value}%` }} />
      </div>
    </div>
  )
}

function ExperienceItem({
  title,
  company,
  period,
  description,
}: {
  title: string
  company: string
  period: string
  description: string
}) {
  return (
    <div className="border-l-2 border-primary pl-4 py-1">
      <h4 className="text-lg font-semibold">{title}</h4>
      <div className="flex flex-col sm:flex-row sm:justify-between text-sm text-muted-foreground mb-2">
        <span className="mb-1 sm:mb-0">{company}</span>
        <span>{period}</span>
      </div>
      <p className="text-sm">{description}</p>
    </div>
  )
}