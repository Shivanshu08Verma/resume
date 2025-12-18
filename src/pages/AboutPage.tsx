import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import PageMeta from "@/components/common/PageMeta";
import AboutSection from "@/components/portfolio/AboutSection";
import { Toaster } from "@/components/ui/toaster";

export default function AboutPage() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [location.pathname]);

  return (
    <>
      <PageMeta title="About — DevPortfolio" description="About" />
      <div className="min-h-screen smooth-scroll">
        <main>
          <AboutSection />
        </main>
        <Toaster />
      </div>
    </>
  );
}
