import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import PageMeta from "@/components/common/PageMeta";
import SkillsSection from "@/components/portfolio/SkillsSection";
import { Toaster } from "@/components/ui/toaster";

export default function SkillsPage() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [location.pathname]);

  return (
    <>
      <PageMeta title="Skills — DevPortfolio" description="Skills" />
      <div className="min-h-screen smooth-scroll">
        <main>
          <SkillsSection />
        </main>
        <Toaster />
      </div>
    </>
  );
}
