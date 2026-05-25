"use client";

import { usePill, usePillTransition } from "@/context/PillContext";
import TheConstruct from "@/transitions/TheConstruct";

// Blue components
import BlueNavbar   from "@/components/blue/Navbar";
// import BlueHero     from "@/components/blue/Hero";
import BlueHeroDejaVu from "@/components/blue/HeroDejaVu";
import BlueProjects from "@/components/blue/ProjectsGrid";
import BlueCerts    from "@/components/blue/CertsSection";
import BlueContactForm21st from "@/components/blue/ContactForm21st";
import BlueFooter   from "@/components/blue/Footer";

// Red components
import RedNavbar   from "@/components/red/Navbar";
import RedHero     from "@/components/red/Hero";
import RedProjects from "@/components/red/ProjectsGrid";
import RedCerts    from "@/components/red/CertsSection";

import TerminalContactForm    from "@/components/red/TerminalContactForm";
import NebuchadnezzarStatus   from "@/components/red/NebuchadnezzarStatus";

export default function PortfolioPage() {
  const { mode } = usePill();
  const { constructVisible, switchMode, onConstructComplete } = usePillTransition();
  const isRed = mode === "red";

  return (
    <div id="portfolio-root" className={isRed ? "mode-red" : "mode-blue"}
      style={{ minHeight: "100vh", backgroundColor: "var(--color-bg)",
        color: "var(--color-text)", fontFamily: "var(--font-main)",
        transition: "background-color 0.4s ease, color 0.4s ease" }}>

      {isRed ? (
        <>
          <RedNavbar   onSwitchMode={switchMode} />
          <RedHero />
          <RedProjects />
          <RedCerts />
          <NebuchadnezzarStatus />
          <TerminalContactForm />
        </>
      ) : (
        <>
          <BlueNavbar  onSwitchMode={switchMode} />
          {/* <BlueHero /> */}
          <BlueHeroDejaVu />
          <BlueProjects />
          <BlueCerts />
          <BlueContactForm21st />
          <BlueFooter />
        </>
      )}

      {/* The Construct — renders on top of everything during pill switch */}
      <TheConstruct isVisible={constructVisible} onComplete={onConstructComplete} />
    </div>
  );
}
