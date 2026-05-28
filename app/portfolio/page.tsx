"use client";

import { useEffect, useRef } from "react";
import { usePill, usePillTransition } from "@/context/PillContext";
import { getTrafficSource, trackOperatorEvent } from "@/lib/operator-events";
import TheConstruct from "@/transitions/TheConstruct";

// Blue components
import BlueNavbar         from "@/components/blue/Navbar";
import BlueHeroDejaVu     from "@/components/blue/HeroDejaVu";
import BlueExperience     from "@/components/blue/ExperienceSection";
import BlueProjects       from "@/components/blue/ProjectsGrid";
import BlueSkills         from "@/components/blue/SkillsSection";
import BlueCerts          from "@/components/blue/CertsSection";
import BlueContactForm21st from "@/components/blue/ContactForm21st";
import BlueGitHubStatus    from "@/components/blue/GitHubStatusSection";
import BlueFooter         from "@/components/blue/Footer";

// Red components
import RedNavbar          from "@/components/red/Navbar";
import RedHero            from "@/components/red/Hero";
import RedExperience      from "@/components/red/ExperienceSection";
import KnockKnockTerminal from "@/components/red/KnockKnockTerminal";
import RedProjects        from "@/components/red/ProjectsGrid";
import RedSkills          from "@/components/red/SkillsSection";
import RedCerts           from "@/components/red/CertsSection";
import BulletTimeSection  from "@/components/red/BulletTimeSection";
import NebuchadnezzarStatus from "@/components/red/NebuchadnezzarStatus";
import MatrixCamSection     from "@/components/red/MatrixCamSection";
import TerminalContactForm  from "@/components/red/TerminalContactForm";
import RedFooter            from "@/components/red/Footer";

export default function PortfolioPage() {
  const { mode } = usePill();
  const { constructVisible, switchMode, onConstructComplete } = usePillTransition();
  const isRed = mode === "red";
  const trackedMode = useRef<string | null>(null);

  useEffect(() => {
    if (trackedMode.current === mode) return;
    trackedMode.current = mode;
    fetch("/api/pageview", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ page: mode }),
    }).catch(() => {});

    trackOperatorEvent({
      type: "PILL_SWITCH",
      detail: `entered ${mode.toUpperCase()} pill`,
      page: "portfolio",
      metadata: {
        mode,
        source: getTrafficSource(document.referrer),
      },
    });
  }, [mode]);

  return (
    <div id="portfolio-root" className={isRed ? "mode-red" : "mode-blue"}
      style={{ minHeight: "100vh", backgroundColor: "var(--color-bg)",
        color: "var(--color-text)", fontFamily: "var(--font-main)",
        transition: "background-color 0.4s ease, color 0.4s ease" }}>

      {isRed ? (
        <>
          <RedNavbar   onSwitchMode={switchMode} />
          <RedHero />
          <KnockKnockTerminal />
          <RedExperience />
          <RedProjects />
          <RedSkills />
          <BulletTimeSection />
          <RedCerts />
          <NebuchadnezzarStatus />
          <MatrixCamSection />
          <TerminalContactForm />
          <RedFooter />
        </>
      ) : (
        <>
          <BlueNavbar  onSwitchMode={switchMode} />
          <div id="blue-stage">
            <BlueHeroDejaVu />
            <BlueExperience />
            <BlueProjects />
            <BlueSkills />
            <BlueCerts />
            <BlueGitHubStatus />
            <BlueContactForm21st />
            <BlueFooter />
          </div>
        </>
      )}

      <TheConstruct isVisible={constructVisible} onComplete={onConstructComplete} />
    </div>
  );
}
