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

export default function Home() {
  return (
    <main
      style={{
        background: "#0b0f0d",
        color: "#edf4ec",
        minHeight: "100vh",
        fontFamily: 'Arial, "Helvetica Neue", sans-serif',
      }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 26px 60px" }}>
        <header
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "18px 0 12px",
            borderBottom: "1px solid rgba(255,255,255,0.04)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 18,
                height: 18,
                borderRadius: 4,
                background: "#edf4ec",
                color: "#0b0f0d",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 11,
                fontWeight: 700,
              }}
            >
              a/m
            </div>
            <span style={{ fontSize: 12, letterSpacing: 0.4, color: "#edf4ec" }}>Alex Morgan</span>
          </div>

          <nav
            style={{
              display: "flex",
              alignItems: "center",
              gap: 28,
              color: "#c8d2ca",
              fontSize: 13,
            }}
          >
            {navItems.map((item) => (
              <a key={item} href="#" style={{ color: "#c8d2ca", textDecoration: "none" }}>
                {item}
              </a>
            ))}
            <div
              style={{
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: 999,
                padding: "8px 14px",
                color: "#edf4ec",
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
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
                  color: "#d5f6ad",
                  marginBottom: 20,
                  fontWeight: 600,
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
                  color: "#eef4ea",
                  maxWidth: 760,
                }}
              >
                Curiosity in.
                <br />
                Real things
                <span style={{ color: "#d5f6ad" }}> built out.</span>
              </h1>

              <p
                style={{
                  marginTop: 22,
                  maxWidth: 640,
                  color: "#b8c3ba",
                  fontSize: 17,
                  lineHeight: 1.6,
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
                    background: "#d5f6ad",
                    color: "#101910",
                    textDecoration: "none",
                    padding: "14px 22px",
                    fontWeight: 700,
                    fontSize: 14,
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
                    color: "#edf4ec",
                    border: "1px solid rgba(255,255,255,0.12)",
                    textDecoration: "none",
                    padding: "14px 22px",
                    fontWeight: 700,
                    fontSize: 14,
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
                borderLeft: "1px solid rgba(255,255,255,0.06)",
                paddingLeft: 18,
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "flex-end",
                color: "#a9b9b0",
                fontSize: 12,
                letterSpacing: 2.2,
                textTransform: "uppercase",
              }}
            >
              <div style={{ textAlign: "right" }}>
                Right-side ID block
              </div>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              color: "#8d9d93",
              fontSize: 12,
              letterSpacing: 2.6,
              textTransform: "uppercase",
              marginTop: 36,
              paddingTop: 18,
              borderTop: "1px solid rgba(255,255,255,0.06)",
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
                  color: "#d5f6ad",
                  marginBottom: 18,
                  fontWeight: 600,
                }}
              >
                01 / A LITTLE CONTEXT
              </div>

              <div
                style={{
                  height: 420,
                  borderRadius: 12,
                  background: "linear-gradient(135deg, #202a2a 0%, #d6d7d3 28%, #6f8b8f 55%, #1f2320 100%)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    inset: 28,
                    borderRadius: 10,
                    background: "linear-gradient(120deg, rgba(0,0,0,0.2), rgba(255,255,255,0.05) 40%, rgba(0,0,0,0.5))",
                    border: "1px solid rgba(0,0,0,0.18)",
                  }}
                />
              </div>

              <div
                style={{
                  marginTop: 16,
                  fontSize: 11,
                  letterSpacing: 2.3,
                  textTransform: "uppercase",
                  color: "#a8b5ae",
                }}
              >
                A desk, a question, a new build.
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
                  color: "#edf4ec",
                }}
              >
                Understanding how it works.
                <br />
                Then making it work better.
              </h2>

              <p
                style={{
                  marginTop: 24,
                  color: "#b4c0b6",
                  lineHeight: 1.7,
                  fontSize: 18,
                  maxWidth: 560,
                }}
              >
                I&apos;m a third-year IT student who likes turning “what if” into working prototypes. My interests sit between full-stack development, practical networking, and building tools people actually enjoy using.
              </p>

              <p
                style={{
                  marginTop: 20,
                  color: "#b4c0b6",
                  lineHeight: 1.7,
                  fontSize: 18,
                  maxWidth: 560,
                }}
              >
                Outside coursework, you&apos;ll find me experimenting in a Linux home lab, documenting what breaks, and learning to ask better questions.
              </p>

              <div style={{ display: "flex", gap: 12, marginTop: 26, flexWrap: "wrap" }}>
                <span
                  style={{
                    border: "1px solid rgba(255,255,255,0.12)",
                    background: "rgba(255,255,255,0.02)",
                    color: "#edf4ec",
                    borderRadius: 999,
                    padding: "9px 14px",
                    fontSize: 12,
                    letterSpacing: 0.5,
                  }}
                >
                  Builder instead
                </span>
                <span
                  style={{
                    border: "1px solid rgba(255,255,255,0.12)",
                    background: "rgba(255,255,255,0.02)",
                    color: "#edf4ec",
                    borderRadius: 999,
                    padding: "9px 14px",
                    fontSize: 12,
                    letterSpacing: 0.5,
                  }}
                >
                  Linux learner
                </span>
              </div>
            </div>

            <aside
              style={{
                border: "1px solid rgba(255,255,255,0.08)",
                background: "rgba(255,255,255,0.02)",
                borderRadius: 14,
                padding: "18px 18px 14px",
                alignSelf: "end",
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  letterSpacing: 2.3,
                  textTransform: "uppercase",
                  color: "#d5f6ad",
                  marginBottom: 10,
                }}
              >
                CURRENTLY STUDYING
              </div>

              <div style={{ fontSize: 12, color: "#edf4ec", lineHeight: 1.8 }}>
                <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>B.S. Information Technology</div>
                <div>Example State University</div>
                <div>2023 — 2027 • expected</div>
                <div style={{ marginTop: 16 }}>
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
                  color: "#d5f6ad",
                  marginBottom: 18,
                  fontWeight: 600,
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
                }}
              >
                A growing stack. A solid
                <br />
                foundation.
              </h2>
            </div>

            <div
              style={{
                color: "#b8c5bb",
                fontSize: 15,
                lineHeight: 1.7,
                maxWidth: 340,
                justifySelf: "end",
                marginBottom: 14,
              }}
            >
              Tools I use in code with a focus on clarity, reliability, and practical problem solving.
            </div>
          </div>

          <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", marginTop: 26 }} />

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
                  border: "1px solid rgba(255,255,255,0.08)",
                  background: "rgba(255,255,255,0.01)",
                  borderRadius: 12,
                  padding: "18px 18px 16px",
                  minHeight: 220,
                }}
              >
                <div
                  style={{
                    width: 42,
                    height: 42,
                    borderRadius: 10,
                    background: "rgba(213,246,173,0.12)",
                    color: "#d5f6ad",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 20,
                    fontWeight: 700,
                    marginBottom: 18,
                  }}
                >
                  {card.icon}
                </div>

                <h3 style={{ margin: "0 0 12px", fontSize: 32, fontWeight: 700 }}>{card.title}</h3>

                <div style={{ color: "#b8c3ba", fontSize: 14, lineHeight: 1.7 }}>{card.text}</div>
                <div style={{ color: "#7a8a82", fontSize: 13, lineHeight: 1.7, marginTop: 18 }}>{card.meta}</div>
              </div>
            ))}
          </div>

          <div
            style={{
              marginTop: 26,
              borderRadius: 10,
              background: "rgba(213,246,173,0.12)",
              border: "1px solid rgba(213,246,173,0.2)",
              color: "#d5f6ad",
              padding: "14px 18px",
              fontSize: 14,
              letterSpacing: 1.1,
              textTransform: "uppercase",
            }}
          >
            Currently exploring • Cloud deployment, automated testing, and writing software that&apos;s easier to maintain.
          </div>
        </section>
      </div>
    </main>
  );
}
