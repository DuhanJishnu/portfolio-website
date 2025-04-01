"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Code, Briefcase, GraduationCap } from "lucide-react"
import Image from "next/image"

export default function About() {
  return (
    <section id="about" className="p-16">
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
                  src = "/profile_img.jpg"
                  alt="Profile"
                  width={300}
                  height={300}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="mb-4">
                I'm a passionate developer with expertise in creating interactive web experiences and 3D visualizations.
              </p>
              <div className="flex flex-wrap gap-2">
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
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger value="skills" className="cursor-pointer">
                <Code className=" mr-2 h-4 w-4" />
                Skills
              </TabsTrigger>
              <TabsTrigger value="experience" className="cursor-pointer">
                <Briefcase className="mr-2 h-4 w-4" />
                Experience
              </TabsTrigger>
              <TabsTrigger value="education" className="cursor-pointer">
                <GraduationCap className="mr-2 h-4 w-4" />
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
                    <SkillBar label="Frontend Development" value={90} />
                    <SkillBar label="3D Graphics (Three.js)" value={85} />
                    <SkillBar label="UI/UX Design" value={80} />
                    <SkillBar label="Backend Development" value={75} />
                    <SkillBar label="Mobile Development" value={65} />
                    <SkillBar label="DevOps" value={60} />
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
                      title="Senior Frontend Developer"
                      company="Tech Innovations Inc."
                      period="2021 - Present"
                      description="Leading the frontend team in developing interactive web applications with React and Three.js."
                    />
                    <ExperienceItem
                      title="Web Developer"
                      company="Digital Solutions Ltd."
                      period="2018 - 2021"
                      description="Developed responsive websites and web applications for various clients."
                    />
                    <ExperienceItem
                      title="Junior Developer"
                      company="StartUp Studio"
                      period="2016 - 2018"
                      description="Worked on frontend development and UI design for early-stage startups."
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
                      title="MSc in Computer Science"
                      company="University of Technology"
                      period="2014 - 2016"
                      description="Specialized in Interactive Media and Computer Graphics."
                    />
                    <ExperienceItem
                      title="BSc in Software Engineering"
                      company="State University"
                      period="2010 - 2014"
                      description="Graduated with honors. Focus on web technologies and software architecture."
                    />
                    <ExperienceItem
                      title="Certifications"
                      company="Various"
                      period="2016 - Present"
                      description="AWS Certified Developer, Google Cloud Professional, React Advanced Certification."
                    />
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
      <div className="flex justify-between text-sm text-muted-foreground mb-2">
        <span>{company}</span>
        <span>{period}</span>
      </div>
      <p className="text-sm">{description}</p>
    </div>
  )
}
