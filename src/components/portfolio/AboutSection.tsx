import { Card, CardContent } from "@/components/ui/card";
import { Award, Code, Rocket, Users } from "lucide-react";

const highlights = [
  {
    icon: Code,
    title: "Clean Code",
    description:
      "Writing clean, efficient, and maintainable code with a focus on clarity and best practices.",
  },
  {
    icon: Rocket,
    title: "Fast Learning",
    description:
      "Quickly adapting to new tools, frameworks, and technologies to build better solutions.",
  },
  {
    icon: Users,
    title: "Team Player",
    description:
      "Working collaboratively, sharing ideas, and learning from others to create impactful projects.",
  },
  {
    icon: Award,
    title: "Quality Focus",
    description:
      "Paying attention to detail and ensuring that every feature works smoothly and delivers a great user experience.",
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="py-20 xl:py-32 relative pb-20">
      <img
        src="/about bg.png"
        alt="About background"
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="container mx-auto px-4 opacity-100 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl xl:text-5xl font-bold mb-4 text-white">
              About Me
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              A passionate developer with expertise in building modern web
              applications
            </p>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 mb-16">
            <div className="glass-card rounded-2xl p-8 space-y-6 opacity-0 animate-slide-in-left">
              <h3 className="text-2xl font-bold neon-text">Background</h3>
              <p className="text-gray-300 leading-relaxed">
                As a B.Tech student at IIT Patna, I’m deeply passionate about
                technology, problem-solving, and creating meaningful digital
                experiences. My journey in software development has helped me
                build a strong foundation in modern web technologies and clean
                coding practices.
              </p>
              <p className="text-gray-300 leading-relaxed">
                I enjoy understanding how systems work, exploring new tools, and
                turning ideas into solutions that are both logical and
                user-friendly. Consistency, clarity, and continuous learning
                drive everything I build.
              </p>
            </div>

            <div className="glass-card rounded-2xl p-8 space-y-6 opacity-0 animate-slide-in-right">
              <h3 className="text-2xl font-bold neon-text">What I Do</h3>
              <p className="text-gray-300 leading-relaxed">
                I love transforming ideas into functional and intuitive web
                applications. From designing smooth user flows to writing
                scalable frontend logic, I focus on building applications that
                are fast, clean, and enjoyable to use.
              </p>
              <p className="text-gray-300 leading-relaxed">
                My approach blends technical understanding with problem-solving
                creativity. Whether it’s cracking programming challenges or
                working on real projects, I’m always excited to learn, iterate,
                and push myself to higher standards.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
            {highlights.map((highlight, index) => (
              <Card
                key={index}
                className="glass-card border-primary/20 hover:border-primary/40 transition-smooth hover:shadow-lg hover:scale-105 opacity-0 animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center gap-4">
                    <div className="p-3 rounded-lg bg-primary/10 neon-glow">
                      <highlight.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2 text-white">
                        {highlight.title}
                      </h4>
                      <p className="text-sm text-gray-400">
                        {highlight.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
