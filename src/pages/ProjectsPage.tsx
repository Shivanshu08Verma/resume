import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import PageMeta from "@/components/common/PageMeta";
import ProjectsSection from "@/components/portfolio/ProjectsSection";
import { Toaster } from "@/components/ui/toaster";

export default function ProjectsPage() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [location.pathname]);

  return (
    <>
      <PageMeta title="Projects — DevPortfolio" description="Projects" />
      <div className="min-h-screen smooth-scroll">
        <main>
          <ProjectsSection />
        </main>
        <Toaster />
      </div>
    </>
  );
}
