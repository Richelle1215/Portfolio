import {
  Header,
  HeroSection,
  AboutSection,
  ProjectsSection,
  ExperienceSection,
  ContactSection,
  CursorSpotlight,
  ScrollIndicator,
} from "./interactive-elements";

const galaxyTheme = {
  darkVoid: "#090711",
  deepPurple: "#180d2b",
  vividPurple: "#7c3aed",
  neonCyan: "#06f9ff",
  hotMagenta: "#ff006e",
  cosmicBlue: "#0099ff",
  starWhite: "#f5f0ff",
  nebulaPink: "#ff1493",
  deepBlue: "#11143b",
};

export default function Home() {
  return (
    <main
      style={{
        background: `linear-gradient(90deg, 
          ${galaxyTheme.darkVoid} 0%,
          ${galaxyTheme.deepPurple} 22%,
          ${galaxyTheme.deepBlue} 46%,
          #100b1c 68%,
          #1b0914 100%)`,
        backgroundAttachment: "fixed",
        color: galaxyTheme.starWhite,
        minHeight: "100vh",
        fontFamily: "var(--font-geist-sans), sans-serif",
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
        <ProjectsSection />
        <ExperienceSection />
        <ContactSection />
      </div>
    </main>
  );
}
