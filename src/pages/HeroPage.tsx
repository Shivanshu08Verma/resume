import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import PageMeta from '@/components/common/PageMeta';
import { Toaster } from '@/components/ui/toaster';
import HeroSection from '@/components/portfolio/HeroSection';

export default function HeroPage() {
      const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [location.pathname]);
  return (
    <>
      <PageMeta title="DevPortfolio Pro - Full Stack Developer" description="Home" />
      <div className="min-h-screen smooth-scroll">
        <main>
          <HeroSection />
        </main>
        <Toaster />
      </div>
    </>
  );
}