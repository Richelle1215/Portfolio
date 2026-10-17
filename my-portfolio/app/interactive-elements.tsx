"use client";

import { useEffect, useRef, useState } from "react";

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

export function CursorSpotlight() {
  const spotlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (spotlightRef.current) {
        spotlightRef.current.style.left = `${e.clientX}px`;
        spotlightRef.current.style.top = `${e.clientY}px`;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      ref={spotlightRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "300px",
        height: "300px",
        pointerEvents: "none",
        zIndex: 999,
        transform: "translate(-50%, -50%)",
        background: `radial-gradient(circle, ${galaxyTheme.neonCyan}40 0%, ${galaxyTheme.neonCyan}20 20%, ${galaxyTheme.hotMagenta}15 40%, transparent 70%)`,
        filter: "blur(40px)",
        mixBlendMode: "screen",
        borderRadius: "50%",
      }}
    />
  );
}

export function ScrollIndicator() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY < 200);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: "30px",
        right: "40px",
        zIndex: 100,
        animation: "bounce 2s ease-in-out infinite",
      }}
    >
      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(10px); }
        }
      `}</style>
      <div
        style={{
          width: "30px",
          height: "30px",
          border: `2px solid ${galaxyTheme.neonCyan}`,
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: galaxyTheme.neonCyan,
          fontSize: "18px",
          boxShadow: `0 0 12px ${galaxyTheme.neonCyan}`,
        }}
      >
        ∨
      </div>
    </div>
  );
}

export function GridOverlay({ position = "top-right" }: { position?: string }) {
  const positions: Record<string, { top?: string; bottom?: string; left?: string; right?: string }> = {
    "top-left": { top: "60px", left: "20px" },
    "top-right": { top: "60px", right: "20px" },
    "bottom-left": { bottom: "20px", left: "20px" },
    "bottom-right": { bottom: "20px", right: "20px" },
  };

  return (
    <div
      style={{
        position: "absolute",
        ...positions[position],
        display: "grid",
        gridTemplateColumns: "repeat(3, 30px)",
        gap: "10px",
        zIndex: 2,
      }}
    >
      {[...Array(9)].map((_, i) => (
        <div
          key={i}
          style={{
            width: "8px",
            height: "8px",
            background: galaxyTheme.neonCyan,
            boxShadow: `0 0 8px ${galaxyTheme.neonCyan}`,
          }}
        />
      ))}
    </div>
  );
}

export function Header() {
  const navItems = ["Home", "About", "Skills", "Projects", "Certificates"];

  return (
    <header
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "20px 40px",
        position: "relative",
        zIndex: 10,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          fontSize: 18,
          fontWeight: 700,
          color: galaxyTheme.starWhite,
          letterSpacing: "2px",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "4px",
          }}
        >
          <span style={{ color: "#ff3366" }}>●</span>
          <span style={{ color: "#ffcc00" }}>●</span>
          <span style={{ color: "#00ff66" }}>●</span>
        </div>
        <span style={{ color: galaxyTheme.neonCyan }}>ALEX.DEV</span>
      </div>

      <nav
        style={{
          display: "flex",
          alignItems: "center",
          gap: 30,
          fontSize: 13,
          letterSpacing: "1px",
          textTransform: "uppercase",
        }}
      >
        {navItems.map((item) => (
          <a
            key={item}
            href="#"
            style={{
              color: item === "Home" ? galaxyTheme.starWhite : galaxyTheme.neonCyan,
              textDecoration: "none",
              cursor: "pointer",
              transition: "all 0.3s ease",
              padding: item === "Home" ? "8px 16px" : "0",
              border: item === "Home" ? `1px solid ${galaxyTheme.starWhite}` : "none",
              borderRadius: "6px",
              background: item === "Home" ? "transparent" : "transparent",
            }}
            onMouseEnter={(e) => {
              if (item !== "Home") {
                e.currentTarget.style.color = galaxyTheme.hotMagenta;
              }
            }}
            onMouseLeave={(e) => {
              if (item !== "Home") {
                e.currentTarget.style.color = galaxyTheme.neonCyan;
              }
            }}
          >
            {item}
          </a>
        ))}
      </nav>
    </header>
  );
}

export function HeroSection() {
  return (
    <section
      style={{
        minHeight: "100vh",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "40px",
        alignItems: "center",
        padding: "60px 40px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <style>{`
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>

      {/* Grid overlays */}
      <GridOverlay position="top-left" />
      <GridOverlay position="bottom-right" />

      {/* Left content */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          zIndex: 5,
          animation: "slideInLeft 0.8s ease-out",
        }}
      >
        <h1
          style={{
            fontSize: "clamp(3rem, 8vw, 6rem)",
            fontWeight: 900,
            color: galaxyTheme.starWhite,
            margin: 0,
            lineHeight: 0.9,
            letterSpacing: "-2px",
            textTransform: "uppercase",
          }}
        >
          Hello!
        </h1>

        <p
          style={{
            fontSize: "16px",
            color: galaxyTheme.starWhite,
            opacity: 0.7,
            lineHeight: 1.8,
            maxWidth: "500px",
            letterSpacing: "0.5px",
          }}
        >
          I&apos;m Alex, an IT student passionate about building digital solutions. Welcome to my portfolio where curiosity meets code. Let&apos;s explore what we can build together.
        </p>

        <div
          style={{
            display: "flex",
            gap: "16px",
            marginTop: "20px",
          }}
        >
          <a
            href="#projects"
            style={{
              padding: "12px 32px",
              background: `linear-gradient(135deg, ${galaxyTheme.neonCyan}, ${galaxyTheme.cosmicBlue})`,
              color: galaxyTheme.darkVoid,
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: 700,
              fontSize: "14px",
              transition: "all 0.3s ease",
              boxShadow: `0 0 20px ${galaxyTheme.neonCyan}`,
              textDecoration: "none",
              display: "inline-block",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = `0 0 30px ${galaxyTheme.neonCyan}, 0 0 40px ${galaxyTheme.cosmicBlue}`;
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = `0 0 20px ${galaxyTheme.neonCyan}`;
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            View Projects
          </a>
        </div>
      </div>

      {/* Right side - Image/Avatar area */}
      <div
        style={{
          position: "relative",
          height: "400px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          animation: "slideInRight 0.8s ease-out",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            background: `linear-gradient(135deg, rgba(255, 20, 147, 0.1), rgba(255, 20, 147, 0.2))`,
            borderRadius: "12px",
            border: `2px solid ${galaxyTheme.neonCyan}40`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            overflow: "hidden",
            boxShadow: `0 0 40px ${galaxyTheme.nebulaPink}30`,
          }}
        >
          {/* Placeholder for avatar/image */}
          <div
            style={{
              fontSize: "80px",
              opacity: 0.5,
              animation: "scaleIn 1s ease-out",
            }}
          >
            👨‍💻
          </div>

          {/* Play button */}
          <div
            style={{
              position: "absolute",
              width: "80px",
              height: "80px",
              background: galaxyTheme.starWhite,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transition: "all 0.3s ease",
              boxShadow: `0 10px 40px rgba(245, 240, 255, 0.3)`,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            <div
              style={{
                width: 0,
                height: 0,
                borderLeft: "30px solid #000",
                borderTop: "20px solid transparent",
                borderBottom: "20px solid transparent",
                marginLeft: "6px",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
