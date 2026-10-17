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

export function useScrollAnimation() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.1 });

    if (ref.current) observer.observe(ref.current);
    return () => { if (ref.current) observer.unobserve(ref.current); };
  }, []);

  return { ref, isVisible };
}

export function useParallax(speed = 0.5) {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => setOffset(window.scrollY * speed);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [speed]);

  return offset;
}

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
    const handleScroll = () => setIsVisible(window.scrollY < 200);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div style={{ position: "fixed", bottom: "30px", right: "40px", zIndex: 100, animation: "bounce 2s ease-in-out infinite" }}>
      <style>{`@keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(10px); } }`}</style>
      <div style={{ width: "30px", height: "30px", border: `2px solid ${galaxyTheme.neonCyan}`, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: galaxyTheme.neonCyan, fontSize: "18px", boxShadow: `0 0 12px ${galaxyTheme.neonCyan}` }}>∨</div>
    </div>
  );
}

export function GridOverlay({ position = "top-right" }: { position?: string }) {
  const parallax = useParallax(0.3);
  const positions: Record<string, any> = { "top-left": { top: "60px", left: "20px" }, "top-right": { top: "60px", right: "20px" }, "bottom-left": { bottom: "20px", left: "20px" }, "bottom-right": { bottom: "20px", right: "20px" } };

  return (
    <div style={{ position: "absolute", ...positions[position], display: "grid", gridTemplateColumns: "repeat(3, 30px)", gap: "10px", zIndex: 2, transform: `translateY(${parallax}px)` }}>
      {[...Array(9)].map((_, i) => (<div key={i} style={{ width: "8px", height: "8px", background: galaxyTheme.neonCyan, boxShadow: `0 0 8px ${galaxyTheme.neonCyan}` }} />))}
    </div>
  );
}

export function TextReveal({ children, delay = 0 }: { children: string; delay?: number }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setTimeout(() => setIsVisible(true), delay);
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => { if (ref.current) observer.unobserve(ref.current); };
  }, [delay]);

  return (
    <div ref={ref} style={{ display: "inline-block", overflow: "hidden" }}>
      <div style={{ animation: isVisible ? "slideUp 0.8s ease-out" : "none" }}>
        <style>{`@keyframes slideUp { from { transform: translateY(100%); opacity: 0; } to { transform: translateY(0); opacity: 1; } }`}</style>
        {children}
      </div>
    </div>
  );
}

export function Header({ onNavigate }: { onNavigate?: (id: string) => void }) {
  const navItems = ["Home", "About", "Skills", "Projects", "Experience", "Contact"];
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 40px", position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, backdropFilter: "blur(10px)", background: `rgba(10, 0, 21, 0.95)`, borderBottom: `1px solid ${galaxyTheme.neonCyan}40` }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 18, fontWeight: 700, color: galaxyTheme.starWhite, letterSpacing: "2px" }}>
        <div style={{ display: "flex", gap: "4px" }}>
          <span style={{ color: "#ff3366" }}>●</span>
          <span style={{ color: "#ffcc00" }}>●</span>
          <span style={{ color: "#00ff66" }}>●</span>
        </div>
        <span style={{ color: galaxyTheme.neonCyan }}>ALEX.DEV</span>
      </div>

      <nav style={{ display: "flex", alignItems: "center", gap: 30, fontSize: 13, letterSpacing: "1px", textTransform: "uppercase", flexWrap: "wrap" }}>
        {navItems.map((item) => (
          <a key={item} href={`#${item.toLowerCase()}`} onClick={(e) => { e.preventDefault(); onNavigate?.(item.toLowerCase()); setIsMobileMenuOpen(false); }} style={{ color: item === "Home" ? galaxyTheme.starWhite : galaxyTheme.neonCyan, textDecoration: "none", cursor: "pointer", transition: "all 0.3s ease", padding: item === "Home" ? "8px 16px" : "0", border: item === "Home" ? `1px solid ${galaxyTheme.starWhite}` : "none", borderRadius: "6px" }} onMouseEnter={(e) => { if (item !== "Home") e.currentTarget.style.color = galaxyTheme.hotMagenta; }} onMouseLeave={(e) => { if (item !== "Home") e.currentTarget.style.color = galaxyTheme.neonCyan; }}>
            {item}
          </a>
        ))}
      </nav>
    </header>
  );
}

export function HeroSection() {
  const parallax = useParallax(0.5);
  return (
    <section id="home" style={{ minHeight: "100vh", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px", alignItems: "center", padding: "100px 40px 60px", position: "relative", overflow: "hidden", marginTop: "60px" }}>
      <style>{`@keyframes slideInLeft { from { opacity: 0; transform: translateX(-50px); } to { opacity: 1; transform: translateX(0); } } @keyframes slideInRight { from { opacity: 0; transform: translateX(50px); } to { opacity: 1; transform: translateX(0); } } @keyframes scaleIn { from { opacity: 0; transform: scale(0.8); } to { opacity: 1; transform: scale(1); } } @media (max-width: 768px) { section { grid-template-columns: 1fr !important; } }`}</style>
      <GridOverlay position="top-left" />
      <GridOverlay position="bottom-right" />

      <div style={{ display: "flex", flexDirection: "column", gap: "20px", zIndex: 5, animation: "slideInLeft 0.8s ease-out", transform: `translateY(${parallax * 0.3}px)` }}>
        <h1 style={{ fontSize: "clamp(3rem, 8vw, 6rem)", fontWeight: 900, color: galaxyTheme.starWhite, margin: 0, lineHeight: 0.9, letterSpacing: "-2px", textTransform: "uppercase" }}><TextReveal delay={0}>Hello!</TextReveal></h1>
        <p style={{ fontSize: "16px", color: galaxyTheme.starWhite, opacity: 0.7, lineHeight: 1.8, maxWidth: "500px", letterSpacing: "0.5px" }}>I&apos;m Alex, an IT student passionate about building digital solutions. Welcome to my portfolio where curiosity meets code. Let&apos;s explore what we can build together.</p>
        <div style={{ display: "flex", gap: "16px", marginTop: "20px", flexWrap: "wrap" }}>
          <a href="#projects" style={{ padding: "12px 32px", background: `linear-gradient(135deg, ${galaxyTheme.neonCyan}, ${galaxyTheme.cosmicBlue})`, color: galaxyTheme.darkVoid, border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: 700, fontSize: "14px", transition: "all 0.3s ease", boxShadow: `0 0 20px ${galaxyTheme.neonCyan}`, textDecoration: "none", display: "inline-block" }} onMouseEnter={(e) => { e.currentTarget.style.boxShadow = `0 0 30px ${galaxyTheme.neonCyan}, 0 0 40px ${galaxyTheme.cosmicBlue}`; e.currentTarget.style.transform = "translateY(-2px)"; }} onMouseLeave={(e) => { e.currentTarget.style.boxShadow = `0 0 20px ${galaxyTheme.neonCyan}`; e.currentTarget.style.transform = "translateY(0)"; }}>View Projects</a>
        </div>
      </div>

      <div style={{ position: "relative", height: "400px", display: "flex", alignItems: "center", justifyContent: "center", animation: "slideInRight 0.8s ease-out", transform: `translateY(${parallax * 0.2}px)` }}>
        <div style={{ width: "100%", height: "100%", background: `linear-gradient(135deg, rgba(255, 20, 147, 0.1), rgba(255, 20, 147, 0.2))`, borderRadius: "12px", border: `2px solid ${galaxyTheme.neonCyan}40`, display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden", boxShadow: `0 0 40px ${galaxyTheme.nebulaPink}30` }}>
          <div style={{ fontSize: "80px", opacity: 0.5, animation: "scaleIn 1s ease-out" }}>👨‍💻</div>
          <div style={{ position: "absolute", width: "80px", height: "80px", background: galaxyTheme.starWhite, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "all 0.3s ease", boxShadow: `0 10px 40px rgba(245, 240, 255, 0.3)` }} onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.1)"; }} onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; }}>
            <div style={{ width: 0, height: 0, borderLeft: "30px solid #000", borderTop: "20px solid transparent", borderBottom: "20px solid transparent", marginLeft: "6px" }} />
          </div>
        </div>
      </div>
    </section>
  );
}

export function AboutSection() {
  const { ref, isVisible } = useScrollAnimation();
  const parallax = useParallax(0.2);

  return (
    <section id="about" ref={ref} style={{ minHeight: "100vh", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px", alignItems: "center", padding: "100px 40px", position: "relative", overflow: "hidden", opacity: isVisible ? 1 : 0, transform: isVisible ? `translateY(0)` : "translateY(30px)", transition: "all 0.8s ease-out" }}>
      <GridOverlay position="top-left" />
      <GridOverlay position="bottom-right" />

      <div style={{ zIndex: 5, transform: `translateY(${parallax * 0.1}px)` }}>
        <h2 style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)", fontWeight: 900, color: galaxyTheme.starWhite, margin: "0 0 20px", letterSpacing: "-1px" }}><TextReveal>About Me</TextReveal></h2>
        <div style={{ fontSize: "14px", color: galaxyTheme.neonCyan, letterSpacing: "2px", textTransform: "uppercase", marginBottom: "20px", fontWeight: 600 }}>• Education & Background</div>
        <p style={{ fontSize: "16px", color: galaxyTheme.starWhite, opacity: 0.85, lineHeight: 1.8, marginBottom: "20px" }}>I&apos;m a third-year IT student at Example State University, graduating in 2027. My passion lies in connecting technology with real-world problems through thoughtful design and clean code.</p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginTop: "40px" }}>
          <div style={{ background: `${galaxyTheme.neonCyan}10`, borderRadius: "8px", padding: "20px", border: `1px solid ${galaxyTheme.neonCyan}40` }}>
            <div style={{ color: galaxyTheme.neonCyan, fontWeight: 700, marginBottom: "10px" }}>Currently Studying</div>
            <div style={{ fontSize: "14px", color: galaxyTheme.starWhite, opacity: 0.8 }}>Database Systems<br />Networking<br />Web Development<br />Information Security</div>
          </div>

          <div style={{ background: `${galaxyTheme.hotMagenta}10`, borderRadius: "8px", padding: "20px", border: `1px solid ${galaxyTheme.hotMagenta}40` }}>
            <div style={{ color: galaxyTheme.hotMagenta, fontWeight: 700, marginBottom: "10px" }}>Interests</div>
            <div style={{ fontSize: "14px", color: galaxyTheme.starWhite, opacity: 0.8 }}>Full-Stack Development<br />Linux & Networking<br />Cloud Deployment<br />Open Source</div>
          </div>
        </div>
      </div>

      <div style={{ background: `linear-gradient(135deg, rgba(124, 58, 237, 0.1), rgba(255, 20, 147, 0.1))`, borderRadius: "12px", border: `2px solid ${galaxyTheme.neonCyan}40`, padding: "40px", zIndex: 5, boxShadow: `0 0 40px ${galaxyTheme.nebulaPink}20`, transform: `translateY(${parallax * 0.15}px)` }}>
        <h3 style={{ color: galaxyTheme.neonCyan, marginTop: 0, marginBottom: "20px" }}>Fun Facts</h3>
        <ul style={{ color: galaxyTheme.starWhite, opacity: 0.85, lineHeight: 2, listStyle: "none", padding: 0 }}>
          <li>🎓 Third-year IT student</li>
          <li>🏠 Built a Linux home lab</li>
          <li>🔧 Love experimenting with new tech</li>
          <li>📚 Always learning & documenting</li>
          <li>🚀 Passionate about clean code</li>
        </ul>
      </div>
    </section>
  );
}

export function SkillsSection() {
  const { ref, isVisible } = useScrollAnimation();
  const skills = [
    { category: "Development", icon: "</>", items: ["JavaScript", "TypeScript", "React", "Next.js", "HTML & CSS"] },
    { category: "Backend", icon: "◌", items: ["PostgreSQL", "MySQL", "Firebase", "Supabase", "REST APIs"] },
    { category: "Systems", icon: ">", items: ["Linux", "TCP/IP", "Networking", "Bash", "Docker"] },
    { category: "Tools", icon: "+", items: ["Git", "GitHub", "Figma", "Vercel", "Postman"] },
  ];

  return (
    <section id="skills" ref={ref} style={{ minHeight: "100vh", padding: "100px 40px", position: "relative", overflow: "hidden", opacity: isVisible ? 1 : 0, transform: isVisible ? "translateY(0)" : "translateY(30px)", transition: "all 0.8s ease-out" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", zIndex: 5, position: "relative" }}>
        <h2 style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)", fontWeight: 900, color: galaxyTheme.starWhite, margin: "0 0 20px", letterSpacing: "-1px", textAlign: "center" }}><TextReveal>Tech Stack</TextReveal></h2>
        <div style={{ fontSize: "14px", color: galaxyTheme.neonCyan, letterSpacing: "2px", textTransform: "uppercase", marginBottom: "40px", fontWeight: 600, textAlign: "center" }}>• Tools & Technologies</div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "20px" }}>
          {skills.map((skill) => (
            <div key={skill.category} style={{ background: `${galaxyTheme.vividPurple}08`, border: `1px solid ${galaxyTheme.neonCyan}40`, borderRadius: "12px", padding: "24px", cursor: "pointer", transition: "all 0.3s ease", boxShadow: `0 0 12px ${galaxyTheme.nebulaPink}20` }} onMouseEnter={(e) => { e.currentTarget.style.borderColor = galaxyTheme.neonCyan; e.currentTarget.style.boxShadow = `0 0 25px ${galaxyTheme.neonCyan}40`; e.currentTarget.style.transform = "translateY(-4px)"; }} onMouseLeave={(e) => { e.currentTarget.style.borderColor = `${galaxyTheme.neonCyan}40`; e.currentTarget.style.boxShadow = `0 0 12px ${galaxyTheme.nebulaPink}20`; e.currentTarget.style.transform = "translateY(0)"; }}>
              <div style={{ width: "50px", height: "50px", background: `${galaxyTheme.neonCyan}20`, borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "24px", marginBottom: "16px", boxShadow: `0 0 12px ${galaxyTheme.neonCyan}40` }}>{skill.icon}</div>
              <h3 style={{ color: galaxyTheme.starWhite, margin: "0 0 12px", fontSize: "20px" }}>{skill.category}</h3>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {skill.items.map((item) => (<span key={item} style={{ background: `${galaxyTheme.neonCyan}15`, border: `1px solid ${galaxyTheme.neonCyan}40`, color: galaxyTheme.neonCyan, padding: "6px 12px", borderRadius: "20px", fontSize: "12px", fontWeight: 600 }}>{item}</span>))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ProjectsSection() {
  const { ref, isVisible } = useScrollAnimation();
  const projects = [
    { title: "Portfolio Website", description: "Modern portfolio with galaxy theme and smooth animations. Features parallax scrolling, text reveal animations, responsive design, and interactive cursor effects.", tags: ["Next.js", "React", "TypeScript"], image: "🌌", link: "#", details: "Full-stack portfolio with modern UX design" },
    { title: "Linux Home Lab", description: "Network setup with virtual machines, routing configuration, security policies, and packet analysis. Built with VirtualBox and Cisco Packet Tracer.", tags: ["Linux", "Networking", "Docker"], image: "🖥️", link: "#", details: "Enterprise networking infrastructure" },
    { title: "REST API Backend", description: "Full-stack application with PostgreSQL database, JWT authentication, and RESTful endpoints. Deployed on Vercel with automated testing.", tags: ["Node.js", "PostgreSQL", "REST"], image: "⚙️", link: "#", details: "Scalable backend infrastructure" },
  ];

  return (
    <section id="projects" ref={ref} style={{ minHeight: "100vh", padding: "100px 40px", position: "relative", overflow: "hidden", opacity: isVisible ? 1 : 0, transform: isVisible ? "translateY(0)" : "translateY(30px)", transition: "all 0.8s ease-out" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", zIndex: 5, position: "relative" }}>
        <h2 style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)", fontWeight: 900, color: galaxyTheme.starWhite, margin: "0 0 20px", letterSpacing: "-1px", textAlign: "center" }}><TextReveal>Projects</TextReveal></h2>
        <div style={{ fontSize: "14px", color: galaxyTheme.neonCyan, letterSpacing: "2px", textTransform: "uppercase", marginBottom: "40px", fontWeight: 600, textAlign: "center" }}>• Recent Work & Case Studies</div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "24px" }}>
          {projects.map((project, idx) => (
            <div key={project.title} style={{ background: `linear-gradient(135deg, rgba(124, 58, 237, 0.1), rgba(255, 20, 147, 0.05))`, border: `1px solid ${galaxyTheme.neonCyan}40`, borderRadius: "12px", overflow: "hidden", cursor: "pointer", transition: "all 0.3s ease", boxShadow: `0 0 20px ${galaxyTheme.nebulaPink}20`, opacity: isVisible ? 1 : 0, animation: isVisible ? `slideUp 0.6s ease-out ${idx * 0.1}s forwards` : "none" }} onMouseEnter={(e) => { e.currentTarget.style.borderColor = galaxyTheme.neonCyan; e.currentTarget.style.boxShadow = `0 0 30px ${galaxyTheme.neonCyan}40`; e.currentTarget.style.transform = "translateY(-8px)"; }} onMouseLeave={(e) => { e.currentTarget.style.borderColor = `${galaxyTheme.neonCyan}40`; e.currentTarget.style.boxShadow = `0 0 20px ${galaxyTheme.nebulaPink}20`; e.currentTarget.style.transform = "translateY(0)"; }}>
              <div style={{ height: "200px", background: `linear-gradient(135deg, ${galaxyTheme.deepPurple}, ${galaxyTheme.deepBlue})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "80px", borderBottom: `1px solid ${galaxyTheme.neonCyan}40`, filter: "drop-shadow(0 0 20px rgba(6, 249, 255, 0.3))" }}>{project.image}</div>
              <div style={{ padding: "24px" }}>
                <h3 style={{ color: galaxyTheme.starWhite, margin: "0 0 8px", fontSize: "20px", fontWeight: 700 }}>{project.title}</h3>
                <p style={{ color: galaxyTheme.neonCyan, fontSize: "12px", opacity: 0.7, margin: "0 0 12px", fontWeight: 600 }}>{project.details}</p>
                <p style={{ color: galaxyTheme.starWhite, opacity: 0.7, fontSize: "14px", margin: "0 0 16px", lineHeight: 1.6 }}>{project.description}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "16px" }}>
                  {project.tags.map((tag) => (<span key={tag} style={{ background: `${galaxyTheme.hotMagenta}15`, border: `1px solid ${galaxyTheme.hotMagenta}40`, color: galaxyTheme.hotMagenta, padding: "4px 10px", borderRadius: "16px", fontSize: "11px", fontWeight: 600 }}>{tag}</span>))}
                </div>
                <a href={project.link} style={{ display: "inline-block", color: galaxyTheme.neonCyan, textDecoration: "none", fontWeight: 600, fontSize: "12px", transition: "all 0.3s ease", cursor: "pointer" }} onMouseEnter={(e) => { e.currentTarget.style.color = galaxyTheme.hotMagenta; }} onMouseLeave={(e) => { e.currentTarget.style.color = galaxyTheme.neonCyan; }}>View Details →</a>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`@keyframes slideUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }`}</style>
    </section>
  );
}

export function ExperienceSection() {
  const { ref, isVisible } = useScrollAnimation();
  const experiences = [
    { title: "Full-Stack Developer (Intern)", company: "Tech Startup XYZ", period: "Jun 2024 - Present", description: "Building web applications with React and Node.js. Working on database optimization and API design.", skills: ["React", "Node.js", "PostgreSQL", "Docker"] },
    { title: "IT Support Technician", company: "University IT Department", period: "Jan 2023 - May 2024", description: "Provided technical support to 500+ users. Managed network infrastructure and system administration.", skills: ["Linux", "Networking", "Active Directory", "Ticketing Systems"] },
    { title: "Web Development Student", company: "Example State University", period: "Sep 2021 - Present", description: "Pursuing B.S. in Information Technology with focus on software development and cybersecurity.", skills: ["TypeScript", "React", "Next.js", "Database Design"] },
  ];

  return (
    <section id="experience" ref={ref} style={{ minHeight: "100vh", padding: "100px 40px", position: "relative", overflow: "hidden", opacity: isVisible ? 1 : 0, transform: isVisible ? "translateY(0)" : "translateY(30px)", transition: "all 0.8s ease-out" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto", zIndex: 5, position: "relative" }}>
        <h2 style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)", fontWeight: 900, color: galaxyTheme.starWhite, margin: "0 0 20px", letterSpacing: "-1px", textAlign: "center" }}><TextReveal>Experience</TextReveal></h2>
        <div style={{ fontSize: "14px", color: galaxyTheme.neonCyan, letterSpacing: "2px", textTransform: "uppercase", marginBottom: "60px", fontWeight: 600, textAlign: "center" }}>• Work History & Timeline</div>

        <div style={{ position: "relative" }}>
          {experiences.map((exp, idx) => (
            <div key={exp.title} style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: "40px", marginBottom: "60px", padding: "30px", background: `linear-gradient(135deg, rgba(124, 58, 237, 0.08), rgba(255, 20, 147, 0.02))`, border: `1px solid ${galaxyTheme.neonCyan}30`, borderRadius: "12px", transition: "all 0.3s ease", opacity: isVisible ? 1 : 0, animation: isVisible ? `slideLeft 0.6s ease-out ${idx * 0.15}s forwards` : "none" }} onMouseEnter={(e) => { e.currentTarget.style.borderColor = galaxyTheme.neonCyan; e.currentTarget.style.boxShadow = `0 0 20px ${galaxyTheme.neonCyan}30`; }} onMouseLeave={(e) => { e.currentTarget.style.borderColor = `${galaxyTheme.neonCyan}30`; e.currentTarget.style.boxShadow = "none"; }}>
              <div>
                <div style={{ color: galaxyTheme.neonCyan, fontSize: "12px", fontWeight: 600, letterSpacing: "1px", textTransform: "uppercase", marginBottom: "8px" }}>{exp.period}</div>
                <div style={{ color: galaxyTheme.hotMagenta, fontSize: "14px", fontWeight: 700 }}>{exp.company}</div>
              </div>

              <div>
                <h3 style={{ color: galaxyTheme.starWhite, margin: "0 0 12px", fontSize: "18px", fontWeight: 700 }}>{exp.title}</h3>
                <p style={{ color: galaxyTheme.starWhite, opacity: 0.75, lineHeight: 1.6, marginBottom: "16px" }}>{exp.description}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {exp.skills.map((skill) => (<span key={skill} style={{ background: `${galaxyTheme.neonCyan}10`, border: `1px solid ${galaxyTheme.neonCyan}30`, color: galaxyTheme.neonCyan, padding: "4px 12px", borderRadius: "20px", fontSize: "11px", fontWeight: 600 }}>{skill}</span>))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`@keyframes slideLeft { from { opacity: 0; transform: translateX(-30px); } to { opacity: 1; transform: translateX(0); } }`}</style>
    </section>
  );
}

export function ContactSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="contact" ref={ref} style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "100px 40px", position: "relative", overflow: "hidden", opacity: isVisible ? 1 : 0, transform: isVisible ? "translateY(0)" : "translateY(30px)", transition: "all 0.8s ease-out" }}>
      <div style={{ maxWidth: "600px", textAlign: "center", zIndex: 5, position: "relative" }}>
        <h2 style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)", fontWeight: 900, color: galaxyTheme.starWhite, margin: "0 0 20px", letterSpacing: "-1px" }}><TextReveal>Let&apos;s Connect</TextReveal></h2>
        <p style={{ fontSize: "16px", color: galaxyTheme.starWhite, opacity: 0.85, lineHeight: 1.8, marginBottom: "40px" }}>Interested in collaborating or learning more? Feel free to reach out. I&apos;m always open to new opportunities and conversations.</p>

        <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
          <a href="mailto:alex@example.com" style={{ padding: "12px 32px", background: `linear-gradient(135deg, ${galaxyTheme.neonCyan}, ${galaxyTheme.cosmicBlue})`, color: galaxyTheme.darkVoid, border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: 700, fontSize: "14px", transition: "all 0.3s ease", boxShadow: `0 0 20px ${galaxyTheme.neonCyan}`, textDecoration: "none", display: "inline-block" }} onMouseEnter={(e) => { e.currentTarget.style.boxShadow = `0 0 30px ${galaxyTheme.neonCyan}, 0 0 40px ${galaxyTheme.cosmicBlue}`; e.currentTarget.style.transform = "translateY(-2px)"; }} onMouseLeave={(e) => { e.currentTarget.style.boxShadow = `0 0 20px ${galaxyTheme.neonCyan}`; e.currentTarget.style.transform = "translateY(0)"; }}>Email Me</a>

          <a href="https://github.com" target="_blank" rel="noopener noreferrer" style={{ padding: "12px 32px", background: "transparent", color: galaxyTheme.neonCyan, border: `1px solid ${galaxyTheme.neonCyan}`, borderRadius: "6px", cursor: "pointer", fontWeight: 700, fontSize: "14px", transition: "all 0.3s ease", boxShadow: `0 0 12px ${galaxyTheme.neonCyan}40`, textDecoration: "none", display: "inline-block" }} onMouseEnter={(e) => { e.currentTarget.style.background = `${galaxyTheme.neonCyan}10`; e.currentTarget.style.boxShadow = `0 0 20px ${galaxyTheme.neonCyan}`; }} onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.boxShadow = `0 0 12px ${galaxyTheme.neonCyan}40`; }}>GitHub</a>
        </div>

        <div style={{ marginTop: "60px", borderTop: `1px solid ${galaxyTheme.neonCyan}40`, paddingTop: "40px" }}>
          <p style={{ color: galaxyTheme.neonCyan, opacity: 0.6, fontSize: "12px", letterSpacing: "1px" }}>© 2024 Alex Morgan. All rights reserved. Built with Next.js & React.</p>
        </div>
      </div>
    </section>
  );
}
