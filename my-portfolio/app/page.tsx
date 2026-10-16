const navItems = ["About", "Skills", "Projects", "Certificates", "Résumé"];

const toolkitCards = [
  {
    title: "Development",
    icon: "</>",
    text: "JavaScript / TypeScript / Python / React / Next.js / HTML & CSS",
    meta: "Building responsive, accessible web apps.",
  },
  {
    title: "Data & back end",
    icon: "◌",
    text: "PostgreSQL / MySQL / SQL / Firebase / Supabase / REST APIs",
    meta: "From data modeling to API integration and logic.",
  },
  {
    title: "Systems & networks",
    icon: ">",
    text: "Linux / TCP/IP / Subnetting / Packet tracing / Bash",
    meta: "Learning what happens underneath the app.",
  },
  {
    title: "Tools & workflow",
    icon: "+",
    text: "Git / GitHub / Docker / Figma / Vercel / Postman",
    meta: "Small commits, clear workflows, and faster iteration.",
  },
];

// Galaxy color palette
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
        background: `linear-gradient(135deg, ${galaxyTheme.darkVoid} 0%, ${galaxyTheme.deepPurple} 25%, ${galaxyTheme.deepBlue} 50%, ${galaxyTheme.darkVoid} 100%)`,
        backgroundAttachment: "fixed",
        color: galaxyTheme.starWhite,
        minHeight: "100vh",
        fontFamily: 'Arial, "Helvetica Neue", sans-serif',
        position: "relative",
        overflow: "hidden",
      }}
    >
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
          bottom: "10%",
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

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 26px 60px", position: "relative", zIndex: 1 }}>
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

        <section style={{ paddingTop: 36, paddingBottom: 26 }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1.6fr 0.7fr",
              gap: 24,
              alignItems: "flex-end",
            }}
          >
            <div style={{ maxWidth: 720 }}>
              <div
                style={{
                  fontSize: 12,
                  letterSpacing: 3.5,
                  textTransform: "uppercase",
                  color: galaxyTheme.neonCyan,
                  marginBottom: 20,
                  fontWeight: 600,
                  textShadow: `0 0 8px ${galaxyTheme.neonCyan}`,
                }}
              >
                • IT STUDENT • OPEN TO INTERNSHIP OPPORTUNITIES
              </div>

              <h1
                style={{
                  margin: 0,
                  fontSize: "clamp(4rem, 7vw, 9rem)",
                  lineHeight: 0.88,
                  letterSpacing: "-0.065em",
                  fontWeight: 700,
                  color: galaxyTheme.starWhite,
                  maxWidth: 760,
                  background: `linear-gradient(90deg, ${galaxyTheme.starWhite}, ${galaxyTheme.neonCyan})`,
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Curiosity in.
                <br />
                Real things
                <span style={{
                  background: `linear-gradient(90deg, ${galaxyTheme.hotMagenta}, ${galaxyTheme.neonCyan})`,
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}> built out.</span>
              </h1>

              <p
                style={{
                  marginTop: 22,
                  maxWidth: 640,
                  color: galaxyTheme.starWhite,
                  fontSize: 17,
                  lineHeight: 1.6,
                  opacity: 0.85,
                }}
              >
                Hey, I&apos;m Alex — an IT student connecting code, networks, and thoughtful design to make everyday problems a little simpler.
              </p>

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
            </div>

            <div
              style={{
                minHeight: 160,
                borderLeft: `1px solid ${galaxyTheme.neonCyan}40`,
                paddingLeft: 18,
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "flex-end",
                color: galaxyTheme.neonCyan,
                fontSize: 12,
                letterSpacing: 2.2,
                textTransform: "uppercase",
                opacity: 0.7,
              }}
            >
              <div style={{ textAlign: "right" }}>
                Exploring the cosmos
              </div>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              color: galaxyTheme.neonCyan,
              fontSize: 12,
              letterSpacing: 2.6,
              textTransform: "uppercase",
              marginTop: 36,
              paddingTop: 18,
              borderTop: `1px solid ${galaxyTheme.neonCyan}40`,
              opacity: 0.6,
            }}
          >
            <span>B.S. Information technology — class of 2027</span>
            <span>Illustrative student portfolio</span>
          </div>
        </section>

        <section style={{ paddingTop: 40, paddingBottom: 22 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1.1fr 1.3fr 0.9fr", gap: 26, alignItems: "stretch" }}>
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
              <div
                style={{
                  fontSize: 12,
                  letterSpacing: 2.8,
                  textTransform: "uppercase",
                  color: galaxyTheme.neonCyan,
                  marginBottom: 18,
                  fontWeight: 600,
                  textShadow: `0 0 8px ${galaxyTheme.neonCyan}`,
                }}
              >
                01 / A LITTLE CONTEXT
              </div>

              <div
                style={{
                  height: 420,
                  borderRadius: 12,
                  background: `linear-gradient(135deg, ${galaxyTheme.deepPurple} 0%, ${galaxyTheme.nebulaPink}20 40%, ${galaxyTheme.vividPurple}30 70%, ${galaxyTheme.darkVoid} 100%)`,
                  border: `1px solid ${galaxyTheme.neonCyan}40`,
                  position: "relative",
                  overflow: "hidden",
                  boxShadow: `inset 0 0 30px ${galaxyTheme.nebulaPink}20`,
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    inset: 28,
                    borderRadius: 10,
                    background: `linear-gradient(120deg, rgba(0,0,0,0.2), rgba(6, 249, 255, 0.05) 40%, rgba(0,0,0,0.5))`,
                    border: `1px solid ${galaxyTheme.neonCyan}20`,
                  }}
                />
              </div>

              <div
                style={{
                  marginTop: 16,
                  fontSize: 11,
                  letterSpacing: 2.3,
                  textTransform: "uppercase",
                  color: galaxyTheme.neonCyan,
                  opacity: 0.6,
                }}
              >
                Building in the cosmic void.
              </div>
            </div>

            <div style={{ paddingTop: 20 }}>
              <h2
                style={{
                  margin: 0,
                  fontSize: "clamp(2.2rem, 4vw, 4rem)",
                  lineHeight: 1.02,
                  letterSpacing: "-0.06em",
                  fontWeight: 700,
                  color: galaxyTheme.starWhite,
                  background: `linear-gradient(90deg, ${galaxyTheme.starWhite}, ${galaxyTheme.neonCyan})`,
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Understanding how it works.
                <br />
                Then making it work better.
              </h2>

              <p
                style={{
                  marginTop: 24,
                  color: galaxyTheme.starWhite,
                  lineHeight: 1.7,
                  fontSize: 18,
                  maxWidth: 560,
                  opacity: 0.85,
                }}
              >
                I&apos;m a third-year IT student who likes turning "what if" into working prototypes. My interests sit between full-stack development, practical networking, and building tools people actually enjoy using.
              </p>

              <p
                style={{
                  marginTop: 20,
                  color: galaxyTheme.starWhite,
                  lineHeight: 1.7,
                  fontSize: 18,
                  maxWidth: 560,
                  opacity: 0.85,
                }}
              >
                Outside coursework, you&apos;ll find me experimenting in a Linux home lab, documenting what breaks, and learning to ask better questions.
              </p>

              <div style={{ display: "flex", gap: 12, marginTop: 26, flexWrap: "wrap" }}>
                <span
                  style={{
                    border: `1px solid ${galaxyTheme.neonCyan}`,
                    background: `${galaxyTheme.neonCyan}10`,
                    color: galaxyTheme.neonCyan,
                    borderRadius: 999,
                    padding: "9px 14px",
                    fontSize: 12,
                    letterSpacing: 0.5,
                    boxShadow: `0 0 8px ${galaxyTheme.neonCyan}40`,
                  }}
                >
                  Builder instead
                </span>
                <span
                  style={{
                    border: `1px solid ${galaxyTheme.hotMagenta}`,
                    background: `${galaxyTheme.hotMagenta}10`,
                    color: galaxyTheme.hotMagenta,
                    borderRadius: 999,
                    padding: "9px 14px",
                    fontSize: 12,
                    letterSpacing: 0.5,
                    boxShadow: `0 0 8px ${galaxyTheme.hotMagenta}40`,
                  }}
                >
                  Linux learner
                </span>
              </div>
            </div>

            <aside
              style={{
                border: `1px solid ${galaxyTheme.neonCyan}40`,
                background: `${galaxyTheme.vividPurple}08`,
                borderRadius: 14,
                padding: "18px 18px 14px",
                alignSelf: "end",
                boxShadow: `0 0 20px ${galaxyTheme.nebulaPink}20`,
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  letterSpacing: 2.3,
                  textTransform: "uppercase",
                  color: galaxyTheme.neonCyan,
                  marginBottom: 10,
                  textShadow: `0 0 6px ${galaxyTheme.neonCyan}`,
                }}
              >
                CURRENTLY STUDYING
              </div>

              <div style={{ fontSize: 12, color: galaxyTheme.starWhite, lineHeight: 1.8 }}>
                <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>B.S. Information Technology</div>
                <div style={{ opacity: 0.8 }}>Example State University</div>
                <div style={{ opacity: 0.8 }}>2023 — 2027 • expected</div>
                <div style={{ marginTop: 16, opacity: 0.85 }}>
                  Database systems <br />
                  Networking <br />
                  Web development <br />
                  Information security
                </div>
              </div>
            </aside>
          </div>
        </section>

        <section style={{ paddingTop: 70, paddingBottom: 10 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1.2fr 0.9fr", gap: 26, alignItems: "end" }}>
            <div>
              <div
                style={{
                  fontSize: 12,
                  letterSpacing: 2.8,
                  textTransform: "uppercase",
                  color: galaxyTheme.neonCyan,
                  marginBottom: 18,
                  fontWeight: 600,
                  textShadow: `0 0 8px ${galaxyTheme.neonCyan}`,
                }}
              >
                02 / THE TOOLKIT
              </div>

              <h2
                style={{
                  margin: 0,
                  fontSize: "clamp(2.6rem, 5vw, 5rem)",
                  lineHeight: 1.03,
                  letterSpacing: "-0.06em",
                  fontWeight: 700,
                  maxWidth: 760,
                  color: galaxyTheme.starWhite,
                  background: `linear-gradient(90deg, ${galaxyTheme.starWhite}, ${galaxyTheme.neonCyan})`,
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                A growing stack. A solid
                <br />
                foundation.
              </h2>
            </div>

            <div
              style={{
                color: galaxyTheme.starWhite,
                fontSize: 15,
                lineHeight: 1.7,
                maxWidth: 340,
                justifySelf: "end",
                marginBottom: 14,
                opacity: 0.85,
              }}
            >
              Tools I use in code with a focus on clarity, reliability, and practical problem solving.
            </div>
          </div>

          <div style={{ borderTop: `1px solid ${galaxyTheme.neonCyan}40`, marginTop: 26 }} />

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
              gap: 20,
              marginTop: 26,
            }}
          >
            {toolkitCards.map((card) => (
              <div
                key={card.title}
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
            ))}
          </div>

          <div
            style={{
              marginTop: 26,
              borderRadius: 10,
              background: `${galaxyTheme.neonCyan}15`,
              border: `1px solid ${galaxyTheme.neonCyan}40`,
              color: galaxyTheme.neonCyan,
              padding: "14px 18px",
              fontSize: 14,
              letterSpacing: 1.1,
              textTransform: "uppercase",
              boxShadow: `0 0 20px ${galaxyTheme.neonCyan}30`,
            }}
          >
            Currently exploring • Cloud deployment, automated testing, and writing software that&apos;s easier to maintain.
          </div>
        </section>
      </div>
    </main>
  );
}
