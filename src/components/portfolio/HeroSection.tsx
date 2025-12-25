import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, Download } from "lucide-react";
import AnimatedBackground from "./AnimatedBackground";
import { useNavigate } from "react-router-dom";

export default function HeroSection() {
  const navigate = useNavigate();

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden py-24 sm:py-32"
    >
      <AnimatedBackground />
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-float pointer-events-none" />
      <div
        className="absolute bottom-20 right-10 w-96 h-96 bg-primary/3 rounded-full blur-3xl animate-float pointer-events-none"
        style={{ animationDelay: "1s" }}
      />
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="glass-card rounded-3xl p-8 xl:p-12 relative neon-glow">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 items-center">
              <div className="flex flex-col items-center xl:items-start text-center xl:text-left order-2 xl:order-1">
                <div className="mb-8">
                  <h1 className="text-3xl xl:text-5xl font-bold mb-4 text-white">
                    Hi, I'm{" "}
                    <span aria-hidden className="ml-2">
                      {Array.from("Shivanshu Verma").map((ch, i) => (
                        <span
                          key={`name-${i}-${ch}`}
                          className="neon-text inline-block animate-slide-in-left opacity-0"
                          style={{ animationDelay: `${i * 0.09}s` }}
                        >
                          {ch === " " ? "\u00A0" : ch}
                        </span>
                      ))}
                    </span>
                  </h1>
                  <h2 className="text-xl xl:text-2xl text-gray-300 mb-6 opacity-0 animate-fade-in-up stagger-1">
                    Full-Stack Developer | Problem Solver
                  </h2>
                  <p className="text-base sm:text-lg xl:text-xl text-gray-400 max-w-xl mx-auto xl:mx-0 opacity-0 animate-fade-in-up stagger-2">
                    Full-Stack Developer passionate about creating scalable,
                    user-focused web applications and solving complex problems
                    with clean, efficient code.
                  </p>
                </div>

                <div
                  className="
                    grid grid-cols-2 gap-4
                    sm:flex sm:flex-row sm:items-center 
                    mb-8 opacity-0 animate-fade-in-up stagger-3
                    w-full sm:w-auto
                  "
                >
                  <Button
                    className="w-auto bg-primary hover:bg-primary/90 text-black font-semibold hover:scale-105 transition-smooth border-0 neon-glow"
                    onClick={() => navigate("/projects")}
                  >
                    View My Work
                  </Button>
                  <Button
                    variant="outline"
                    className="w-auto bg-transparent hover:bg-primary/10 text-primary border-primary/50 hover:border-primary hover:scale-105 transition-smooth"
                    onClick={() => navigate("/contact")}
                  >
                    Get In Touch
                  </Button>
                  <a
                    href="/resume.pdf"
                    download
                    className="col-span-2 sm:col-span-1"
                  >
                    <Button
                      variant="outline"
                      className="w-full sm:w-auto bg-primary/10 hover:bg-primary/20 text-primary border-primary/50 hover:border-primary hover:scale-105 transition-smooth"
                    >
                      <Download className="h-5 w-5 mr-2" />
                      Resume
                    </Button>
                  </a>
                </div>

                <div className="flex items-center gap-6 opacity-0 animate-fade-in-up stagger-4">
                  <a
                    href="https://github.com/Shivanshu08Verma"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-primary hover:scale-125 transition-smooth"
                  >
                    <Github className="h-6 w-6" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/shivanshu-verma-899575321/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-primary hover:scale-125 transition-smooth"
                  >
                    <Linkedin className="h-6 w-6" />
                  </a>
                  <a
                    href="mailto:shivanshuv2005@gmail.com"
                    className="text-gray-400 hover:text-primary hover:scale-125 transition-smooth"
                  >
                    <Mail className="h-6 w-6" />
                  </a>
                </div>
              </div>
              <div className="flex justify-center xl:justify-end order-1 xl:order-2 opacity-0 animate-scale-in stagger-1">
                <div className="relative w-64 h-64 sm:w-80 sm:h-80 xl:w-[400px] xl:h-[400px] group">
                  <div className="absolute -inset-0.5 bg-gradient-to-br from-primary to-primary-glow rounded-2xl blur opacity-30 group-hover:opacity-60 transition-duration-500 animate-pulse-glow" />

                  <div className="relative w-full h-full rounded-2xl border border-primary/30 overflow-hidden bg-black/20 backdrop-blur-sm">
                    <img
                      src="https://github.com/shadcn.png"
                      alt="Shivanshu Verma"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
