import {
  Header,
  HeroSection,
  AboutSection,
  SkillsSection,
  ProjectsSection,
  ExperienceSection,
  ContactSection,
  CursorSpotlight,
  ScrollIndicator,
} from "./interactive-elements";

const galaxyTheme = {
  darkVoid: "#0a0015",
  deepPurple: "#1a0033",
  vividPurple: "#7c3aed",
  neonCyan: "#06f9ff",
  hotMagenta: "#ff006e",
  cosmicBlue: "#0099ff",
  starWhite: "#f5f0ff",
  nebulaPink: "#ff1493",
  deepBlue: "#001a4d",
};

export default function Home() {
  return (
    <main
      style={{
        background: `linear-gradient(90deg, 
          ${galaxyTheme.darkVoid} 0%,
          ${galaxyTheme.deepPurple} 20%,
          ${galaxyTheme.deepBlue} 40%,
          ${galaxyTheme.darkVoid} 60%,
          #1a0000 80%,
          #330000 100%)`,
        backgroundAttachment: "fixed",
        color: galaxyTheme.starWhite,
        minHeight: "100vh",
        fontFamily: 'Arial, "Helvetica Neue", sans-serif',
        position: "relative",
        overflow: "hidden",
      }}
    >
      <CursorSpotlight />
      <ScrollIndicator />

      <div style={{ position: "relative", zIndex: 1 }}>
        <Header />
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ExperienceSection />
        <ContactSection />
      </div>
    </main>
  );
}

