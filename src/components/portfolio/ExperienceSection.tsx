import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Briefcase, Calendar } from "lucide-react";
import CircuitFlowBackground from "./animation/CircuitFlowBackground";

const experiences = [
  {
    title: "Sub-Coordinator",
    company: "CHESSx (Chemical Engineering Students Society), IIT Patna",
    period: "July 2025 - Present",
    description:
      "Designed and implemented a full-stack club website, contributing primarily to backend development while collaborating on frontend features.",
    achievements: [
      "Built and maintained a full-stack web platform using React, Express.js, and MongoDB",
      "Designed RESTful APIs with secure request validation using Joi",
      "Implemented Role-Based Access Control (RBAC) for admin and user management",
    ],
    technologies: [
      "React",
      "Express.js",
      "Node.js",
      "MongoDB",
      "Joi",
      "Axios",
      "Tailwind CSS",
    ],
  },
];


export default function ExperienceSection() {
  return (
    <section id="experience" className="min-h-screen py-20 xl:py-32 bg-muted/30 relative pb-20">
      <CircuitFlowBackground/>
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl xl:text-5xl font-bold mb-4">Work Experience</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              My professional journey and career milestones
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border hidden xl:block" />

            <div className="space-y-8">
              {experiences.map((exp, index) => (
                <div key={index} className="relative opacity-0 animate-fade-in-up" style={{ animationDelay: `${index * 0.2}s` }}>
                  <div className="hidden xl:block absolute left-6 top-6 w-5 h-5 rounded-full bg-primary border-4 border-background animate-pulse-glow" />

                  <Card className="xl:ml-20 border-border hover:border-primary transition-smooth hover:shadow-lg hover:scale-[1.02]">
                    <CardContent className="p-6">
                      <div className="flex flex-col xl:flex-row xl:items-start xl:justify-between gap-4 mb-4">
                        <div>
                          <h3 className="text-xl font-bold mb-1">{exp.title}</h3>
                          <div className="flex items-center gap-2 text-muted-foreground mb-2">
                            <Briefcase className="h-4 w-4" />
                            <span>{exp.company}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground xl:text-right">
                          <Calendar className="h-4 w-4" />
                          <span className="whitespace-nowrap">{exp.period}</span>
                        </div>
                      </div>

                      <p className="text-muted-foreground mb-4">{exp.description}</p>

                      <div className="space-y-2 mb-4">
                        {exp.achievements.map((achievement, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            <div className="mt-2 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                            <p className="text-sm text-muted-foreground">{achievement}</p>
                          </div>
                        ))}
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech) => (
                          <Badge key={tech} variant="secondary" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}