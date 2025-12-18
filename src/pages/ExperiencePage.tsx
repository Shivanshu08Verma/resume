import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import PageMeta from "@/components/common/PageMeta";
import ExperienceSection from "@/components/portfolio/ExperienceSection";
import { Toaster } from "@/components/ui/toaster";

export default function ExperiencePage() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [location.pathname]);

  return (
    <>
      <PageMeta title="Experience — DevPortfolio" description="Experience" />
      <div className="min-h-screen smooth-scroll">
        <main>
          <ExperienceSection />
        </main>
        <Toaster />
      </div>
    </>
  );
}
