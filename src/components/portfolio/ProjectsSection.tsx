import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github } from "lucide-react";

const projects = [
  {
    title: "CHESSx Club Website — IIT Patna",
    description:
      "A full-stack web platform developed for the Chemical Engineering Students Society (CHESSx), IIT Patna. Features role-based admin management, a secure hoodie order system, and an event showcase with photo galleries, backed by a robust and validated API architecture.",
    image: "chessx-website",
    tech: [
      "React",
      "Express.js",
      "Node.js",
      "MongoDB",
      "Tailwind CSS",
      "GSAP",
      "Joi",
      "Axios"
    ],
    liveUrl: "https://chessx.iitp.ac.in/",   
    githubUrl: "https://github.com/Shivanshu08Verma/ChESSx1",  
  },
];


export default function ProjectsSection() {
  return (
    <section id="projects" className="py-20 xl:py-32 relative pb-20">
       <img
        src="/project bg.png"
        alt="Project background"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="container mx-auto px-4 opacity-100 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl xl:text-5xl font-bold mb-4 text-white">Featured Projects</h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              A showcase of my recent work and personal projects
            </p>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <Card
                key={index}
                className="glass-card border-primary/20 hover:border-primary/40 transition-smooth hover:shadow-xl group overflow-hidden opacity-0 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className="h-48 bg-gradient-to-br from-primary/20 to-primary/5 relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-6xl font-bold text-primary/30 group-hover:scale-125 group-hover:rotate-12 transition-smooth duration-500">
                      {index + 1}
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-smooth" />
                </div>

                <CardHeader>
                  <CardTitle className="text-xl text-white group-hover:text-primary transition-smooth">
                    {project.title}
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-gray-300">{project.description}</p>

                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-xs bg-primary/10 text-primary border-primary/30">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>

                <CardFooter className="flex gap-3">
                  <Button
                    variant="default"
                    size="sm"
                    className="flex-1 bg-primary hover:bg-primary/90 text-black font-semibold hover:scale-105 transition-smooth border-0 neon-glow"
                    onClick={() => window.open(project.liveUrl, "_blank")}
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Live Demo
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 bg-transparent hover:bg-primary/10 text-primary border-primary/50 hover:border-primary hover:scale-105 transition-smooth"
                    onClick={() => window.open(project.githubUrl, "_blank")}
                  >
                    <Github className="h-4 w-4 mr-2" />
                    Code
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}