"use client";

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

const navItems = ["About", "Skills", "Projects", "Certificates", "Résumé"];

export function Header() {
  return (
    <header
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "18px 0 12px",
        borderBottom: `1px solid ${galaxyTheme.neonCyan}40`,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div
          style={{
            width: 18,
            height: 18,
            borderRadius: 4,
            background: `linear-gradient(135deg, ${galaxyTheme.neonCyan}, ${galaxyTheme.hotMagenta})`,
            color: galaxyTheme.darkVoid,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 11,
            fontWeight: 700,
            boxShadow: `0 0 12px ${galaxyTheme.neonCyan}`,
          }}
        >
          a/m
        </div>
        <span style={{ fontSize: 12, letterSpacing: 0.4, color: galaxyTheme.starWhite }}>Alex Morgan</span>
      </div>

      <nav
        style={{
          display: "flex",
          alignItems: "center",
          gap: 28,
          color: galaxyTheme.neonCyan,
          fontSize: 13,
        }}
      >
        {navItems.map((item) => (
          <a 
            key={item} 
            href="#" 
            style={{ 
              color: galaxyTheme.neonCyan, 
              textDecoration: "none",
              transition: "all 0.3s ease",
              textShadow: `0 0 8px ${galaxyTheme.neonCyan}`,
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = galaxyTheme.hotMagenta;
              e.currentTarget.style.textShadow = `0 0 12px ${galaxyTheme.hotMagenta}`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = galaxyTheme.neonCyan;
              e.currentTarget.style.textShadow = `0 0 8px ${galaxyTheme.neonCyan}`;
            }}
          >
            {item}
          </a>
        ))}
        <div
          style={{
            border: `1px solid ${galaxyTheme.neonCyan}`,
            borderRadius: 999,
            padding: "8px 14px",
            color: galaxyTheme.starWhite,
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            boxShadow: `0 0 12px ${galaxyTheme.neonCyan}40`,
            cursor: "pointer",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = `0 0 20px ${galaxyTheme.neonCyan}`;
            e.currentTarget.style.borderColor = galaxyTheme.hotMagenta;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = `0 0 12px ${galaxyTheme.neonCyan}40`;
            e.currentTarget.style.borderColor = galaxyTheme.neonCyan;
          }}
        >
          Résumé
          <span style={{ fontSize: 12 }}>↓</span>
        </div>
      </nav>
    </header>
  );
}

export function HeroButtons() {
  return (
    <div style={{ display: "flex", gap: 16, marginTop: 26, flexWrap: "wrap" }}>
      <a
        href="#projects"
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 8,
          background: `linear-gradient(135deg, ${galaxyTheme.neonCyan}, ${galaxyTheme.cosmicBlue})`,
          color: galaxyTheme.darkVoid,
          textDecoration: "none",
          padding: "14px 22px",
          fontWeight: 700,
          fontSize: 14,
          cursor: "pointer",
          transition: "all 0.3s ease",
          boxShadow: `0 0 20px ${galaxyTheme.neonCyan}`,
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
        Explore my projects
        <span style={{ marginLeft: 10, fontSize: 20 }}>↗</span>
      </a>
      <a
        href="#contact"
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 8,
          background: "transparent",
          color: galaxyTheme.neonCyan,
          border: `1px solid ${galaxyTheme.neonCyan}`,
          textDecoration: "none",
          padding: "14px 22px",
          fontWeight: 700,
          fontSize: 14,
          cursor: "pointer",
          transition: "all 0.3s ease",
          boxShadow: `0 0 12px ${galaxyTheme.neonCyan}40`,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = `${galaxyTheme.neonCyan}10`;
          e.currentTarget.style.boxShadow = `0 0 20px ${galaxyTheme.neonCyan}`;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "transparent";
          e.currentTarget.style.boxShadow = `0 0 12px ${galaxyTheme.neonCyan}40`;
        }}
      >
        Let&apos;s connect
        <span style={{ marginLeft: 10, fontSize: 20 }}>↗</span>
      </a>
    </div>
  );
}

interface ToolkitCard {
  title: string;
  icon: string;
  text: string;
  meta: string;
}

export function ToolkitCard({ card }: { card: ToolkitCard }) {
  return (
    <div
      style={{
        border: `1px solid ${galaxyTheme.neonCyan}40`,
        background: `${galaxyTheme.vividPurple}08`,
        borderRadius: 12,
        padding: "18px 18px 16px",
        minHeight: 220,
        cursor: "pointer",
        transition: "all 0.3s ease",
        boxShadow: `0 0 12px ${galaxyTheme.nebulaPink}20`,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = galaxyTheme.neonCyan;
        e.currentTarget.style.boxShadow = `0 0 25px ${galaxyTheme.neonCyan}40`;
        e.currentTarget.style.transform = "translateY(-4px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = `${galaxyTheme.neonCyan}40`;
        e.currentTarget.style.boxShadow = `0 0 12px ${galaxyTheme.nebulaPink}20`;
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      <div
        style={{
          width: 42,
          height: 42,
          borderRadius: 10,
          background: `${galaxyTheme.neonCyan}20`,
          color: galaxyTheme.neonCyan,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 20,
          fontWeight: 700,
          marginBottom: 18,
          boxShadow: `0 0 12px ${galaxyTheme.neonCyan}40`,
        }}
      >
        {card.icon}
      </div>

      <h3 style={{ margin: "0 0 12px", fontSize: 32, fontWeight: 700, color: galaxyTheme.starWhite }}>{card.title}</h3>

      <div style={{ color: galaxyTheme.starWhite, fontSize: 14, lineHeight: 1.7, opacity: 0.85 }}>{card.text}</div>
      <div style={{ color: galaxyTheme.neonCyan, fontSize: 13, lineHeight: 1.7, marginTop: 18, opacity: 0.7 }}>{card.meta}</div>
    </div>
  );
}
