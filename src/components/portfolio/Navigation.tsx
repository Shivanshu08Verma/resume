import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Download } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { id: "home", label: "Home", path: "/" },
  { id: "about", label: "About", path: "/about" },
  { id: "skills", label: "Skills", path: "/skills" },
  { id: "projects", label: "Projects", path: "/projects" },
  { id: "experience", label: "Experience", path: "/experience" },
  { id: "contact", label: "Contact", path: "/contact" },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const activeSection =
    location.pathname === "/" ? "home" : location.pathname.replace(/^\//, "");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (path: string) => {
    setIsMobileMenuOpen(false);
    if (location.pathname === path) {
      // if already on the same route, ensure we scroll to top
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-smooth",
        isScrolled ? "glass-nav shadow-lg" : "glass-nav"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link
            to="/"
            className="text-2xl font-bold neon-text cursor-pointer hover:scale-105 transition-smooth"
          >
            DevPortfolio
          </Link>

          <div className="hidden xl:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.id}
                to={item.path}
                onClick={() => handleNavClick(item.path)}
                className={cn(
                  "text-sm font-medium transition-smooth cursor-pointer",
                  activeSection === item.id
                    ? "text-primary font-bold"
                    : "text-gray-400 hover:text-primary"
                )}
              >
                {item.label}
              </Link>
            ))}
            <a href="/resume.pdf" download>
              <Button
                size="sm"
                variant="outline"
                className="bg-primary/10 hover:bg-primary/20 text-primary border-primary/50 hover:border-primary hover:scale-105 transition-smooth"
                onClick={() => window.open("/resume.pdf", "_blank")}
              >
                <Download className="h-4 w-4 mr-2" />
                Resume
              </Button>
            </a>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="xl:hidden text-primary hover:bg-primary/10"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>

        {isMobileMenuOpen && (
          <div className="xl:hidden py-4 border-t border-primary/20">
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <Link
                  key={item.id}
                  to={item.path}
                  onClick={() => handleNavClick(item.path)}
                  className={cn(
                    "text-left px-4 py-2 rounded-md transition-smooth cursor-pointer block",
                    activeSection === item.id
                      ? "bg-primary/20 text-primary font-bold"
                      : "text-gray-400 hover:bg-primary/10 hover:text-primary"
                  )}
                >
                  {item.label}
                </Link>
              ))}
              <a href="/resume.pdf" download>
                <Button
                  variant="outline"
                  className="mx-4 bg-primary/10 hover:bg-primary/20 text-primary border-primary/50 hover:border-primary"
                  onClick={() => {
                    window.open("/resume.pdf", "_blank");
                    setIsMobileMenuOpen(false);
                  }}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Resume
                </Button>
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
