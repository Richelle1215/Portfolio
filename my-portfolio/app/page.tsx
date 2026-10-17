import { Header, HeroSection, CursorSpotlight, ScrollIndicator } from "./interactive-elements";

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
        minHeight: "200vh",
        fontFamily: 'Arial, "Helvetica Neue", sans-serif',
        position: "relative",
        overflow: "hidden",
      }}
    >
      <CursorSpotlight />
      <ScrollIndicator />

      {/* Animated starfield background */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          zIndex: 0,
          backgroundImage: `
            radial-gradient(2px 2px at 20px 30px, ${galaxyTheme.starWhite}, rgba(255,255,255,0)),
            radial-gradient(2px 2px at 60px 70px, white, rgba(255,255,255,0)),
            radial-gradient(1px 1px at 50px 50px, ${galaxyTheme.neonCyan}, rgba(255,255,255,0)),
            radial-gradient(1px 1px at 130px 80px, ${galaxyTheme.starWhite}, rgba(255,255,255,0)),
            radial-gradient(2px 2px at 90px 10px, ${galaxyTheme.hotMagenta}, rgba(255,255,255,0))
          `,
          backgroundRepeat: "repeat",
          backgroundSize: "200px 200px",
          opacity: 0.5,
        }}
      />

      {/* Floating nebula orbs */}
      <div
        style={{
          position: "fixed",
          top: "20%",
          left: "10%",
          width: "300px",
          height: "300px",
          background: `radial-gradient(circle, ${galaxyTheme.nebulaPink}40 0%, transparent 70%)`,
          borderRadius: "50%",
          filter: "blur(80px)",
          animation: "float 15s ease-in-out infinite",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "fixed",
          top: "60%",
          right: "15%",
          width: "400px",
          height: "400px",
          background: `radial-gradient(circle, ${galaxyTheme.vividPurple}30 0%, transparent 70%)`,
          borderRadius: "50%",
          filter: "blur(90px)",
          animation: "float 20s ease-in-out infinite reverse",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "fixed",
          bottom: "-10%",
          left: "50%",
          width: "350px",
          height: "350px",
          background: `radial-gradient(circle, ${galaxyTheme.cosmicBlue}25 0%, transparent 70%)`,
          borderRadius: "50%",
          filter: "blur(85px)",
          animation: "float 18s ease-in-out infinite",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />

      <style>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0); }
          25% { transform: translate(30px, -30px); }
          50% { transform: translate(-20px, 20px); }
          75% { transform: translate(50px, 10px); }
        }
      `}</style>

      <div style={{ position: "relative", zIndex: 1 }}>
        <Header />
        <HeroSection />
      </div>
    </main>
  );
}
