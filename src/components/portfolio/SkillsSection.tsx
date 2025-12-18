import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Code2, Database, Wrench,FileCode } from "lucide-react";
import HexGridBackground from "./animation/HexGridBackground";

const frontendSkills = [
  "React",
  "JavaScript",
  "HTML5",
  "CSS3",
  "Tailwind CSS",
  "Redux",
  "Vite",
];

const backendSkills = [
  "Node.js",
  "Express.js",
  "MongoDB",
];

const tools = [
  "Git",
  "GitHub",
  "VS Code",
  "Canva",
  "Postman",
];

const programmingLanguages = [
  "JavaScript",
  "Python",
  "Java",
  "C++",
  "C"
];

export default function SkillsSection() {
  return (
    <section id="skills" className="min-h-screen pt-28 relative pb-20">
      <HexGridBackground />
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl xl:text-5xl font-bold mb-4 text-white">Skills & Expertise</h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              A comprehensive toolkit for building modern web applications
            </p>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            <Card className="glass-card border-primary/20 hover:border-primary/40 transition-smooth group">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary group-hover:text-black transition-smooth neon-glow">
                    <Code2 className="h-6 w-6 text-primary group-hover:text-black" />
                  </div>
                  <CardTitle className="text-2xl text-white">Frontend</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {frontendSkills.map((skill, index) => (
                    <div
                      key={skill}
                      className="px-4 py-2 bg-primary/10 border border-primary/30 rounded-lg text-sm font-medium text-gray-300 hover:border-primary hover:bg-primary hover:text-black transition-smooth cursor-default opacity-0 animate-scale-in"
                      style={{ animationDelay: `${index * 0.05}s` }}
                    >
                      {skill}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card border-primary/20 hover:border-primary/40 transition-smooth group">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary group-hover:text-black transition-smooth neon-glow">
                    <Database className="h-6 w-6 text-primary group-hover:text-black" />
                  </div>
                  <CardTitle className="text-2xl text-white">Backend</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {backendSkills.map((skill, index) => (
                    <div
                      key={skill}
                      className="px-4 py-2 bg-primary/10 border border-primary/30 rounded-lg text-sm font-medium text-gray-300 hover:border-primary hover:bg-primary hover:text-black transition-smooth cursor-default opacity-0 animate-scale-in"
                      style={{ animationDelay: `${index * 0.05}s` }}
                    >
                      {skill}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card border-primary/20 hover:border-primary/40 transition-smooth group">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary group-hover:text-black transition-smooth neon-glow">
                    <FileCode className="h-6 w-6 text-primary group-hover:text-black" />
                  </div>
                  <CardTitle className="text-2xl text-white">Languages</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {programmingLanguages.map((language, index) => (
                    <div
                      key={language}
                      className="px-4 py-2 bg-primary/10 border border-primary/30 rounded-lg text-sm font-medium text-gray-300 hover:border-primary hover:bg-primary hover:text-black transition-smooth cursor-default opacity-0 animate-scale-in"
                      style={{ animationDelay: `${index * 0.05}s` }}
                    >
                      {language}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card border-primary/20 hover:border-primary/40 transition-smooth group">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary group-hover:text-black transition-smooth neon-glow">
                    <Wrench className="h-6 w-6 text-primary group-hover:text-black" />
                  </div>
                  <CardTitle className="text-2xl text-white">Tools</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {tools.map((tool, index) => (
                    <div
                      key={tool}
                      className="px-4 py-2 bg-primary/10 border border-primary/30 rounded-lg text-sm font-medium text-gray-300 hover:border-primary hover:bg-primary hover:text-black transition-smooth cursor-default opacity-0 animate-scale-in"
                      style={{ animationDelay: `${index * 0.05}s` }}
                    >
                      {tool}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}