import { Github, Linkedin, Mail } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  const currentYear = new Date().getFullYear();
    const handleNavClick = (path: string) => {
    if (location.pathname === path) {
      // if already on the same route, ensure we scroll to top
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="border-t border-border bg-card">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold gradient-text mb-4">
                DevPortfolio
              </h3>
              <p className="text-muted-foreground">
                Building exceptional web experiences with modern technologies
                and creative solutions.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2">
                {[
                  { label: "Home", to: "/" },
                  { label: "About", to: "/about" },
                  { label: "Skills", to: "/skills" },
                  { label: "Projects", to: "/projects" },
                  { label: "Experience", to: "/experience" },
                  { label: "Contact", to: "/contact" },
                ].map((item) => (
                  <Link
                    key={item.label}
                    to={item.to}
                    onClick={() => handleNavClick(item.to)}
                    className="block text-muted-foreground hover:text-primary transition-smooth"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <div className="flex gap-4">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground transition-smooth"
                  aria-label="GitHub"
                >
                  <Github className="h-5 w-5" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground transition-smooth"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <a
                  href="mailto:alex@example.com"
                  className="p-2 rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground transition-smooth"
                  aria-label="Email"
                >
                  <Mail className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-border text-center text-muted-foreground">
            <p className="flex items-center justify-center gap-2">
              {currentYear} Dev Portfolio Pro
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
