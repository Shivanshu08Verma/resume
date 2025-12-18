import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import PageMeta from "@/components/common/PageMeta";
import ContactSection from "@/components/portfolio/ContactSection";
import { Toaster } from "@/components/ui/toaster";

export default function ContactPage() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [location.pathname]);

  return (
    <>
      <PageMeta title="Contact — DevPortfolio" description="Contact" />
      <div className="min-h-screen smooth-scroll">
        <main>
          <ContactSection />
        </main>
        <Toaster />
      </div>
    </>
  );
}
