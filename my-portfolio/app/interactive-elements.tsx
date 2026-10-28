"use client";

import { useCallback, useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import { ProjectPreview } from "./project-preview";

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

type ItemBounds = Pick<DOMRect, "left" | "right" | "top" | "bottom">;

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
    <div className="scroll-indicator" style={{ position: "fixed", bottom: "30px", right: "40px", zIndex: 100, animation: "bounce 2s ease-in-out infinite" }}>
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
  const navItems = ["Home", "About", "Skills", "Projects", "Experience", "Certificates", "Contact"];
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="site-mark" aria-label="Richelle's portfolio">
        <div className="site-mark__dots" aria-hidden="true">
          <span style={{ color: "#ff3366" }}>●</span>
          <span style={{ color: "#ffcc00" }}>●</span>
          <span style={{ color: "#00ff66" }}>●</span>
        </div>
      </div>

      <button
        type="button"
        className="site-menu-toggle"
        aria-expanded={isMobileMenuOpen}
        aria-controls="site-navigation"
        aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
        onClick={() => setIsMobileMenuOpen((isOpen) => !isOpen)}
      >
        <span />
        <span />
        <span />
      </button>

      <nav id="site-navigation" className={`site-nav${isMobileMenuOpen ? " is-open" : ""}`} aria-label="Main navigation">
        {navItems.map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            className={item === "Home" ? "site-nav__link is-home" : "site-nav__link"}
            onClick={(event) => {
              if (onNavigate) {
                event.preventDefault();
                onNavigate(item.toLowerCase());
              }
              setIsMobileMenuOpen(false);
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
  const heroRef = useRef<HTMLElement>(null);
  const hangerRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{
    pointerId: number;
    startX: number;
    startY: number;
    originX: number;
    originY: number;
    bounds: ItemBounds;
  } | null>(null);
  const offsetRef = useRef({ x: 0, y: 0, rotation: 0 });
  const [isReady, setIsReady] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const enableDragging = () => setIsReady(true);
    const entranceFallback = window.setTimeout(enableDragging, 2200);
    const handleMotionPreferenceChange = (event: MediaQueryListEvent) => {
      if (event.matches) {
        window.clearTimeout(entranceFallback);
        enableDragging();
      }
    };

    if (reducedMotion.matches) {
      window.clearTimeout(entranceFallback);
      enableDragging();
    }
    reducedMotion.addEventListener("change", handleMotionPreferenceChange);

    return () => {
      window.clearTimeout(entranceFallback);
      reducedMotion.removeEventListener("change", handleMotionPreferenceChange);
    };
  }, []);

  const getItemBounds = () => {
    const hanger = hangerRef.current;
    const card = hanger?.querySelector(".hero-id-card");
    const lanyard = hanger?.querySelector(".hero-lanyard");
    if (!(card instanceof HTMLElement) || !(lanyard instanceof HTMLElement)) return null;

    const cardBounds = card.getBoundingClientRect();
    const lanyardBounds = lanyard.getBoundingClientRect();
    return {
      left: Math.min(cardBounds.left, lanyardBounds.left),
      right: Math.max(cardBounds.right, lanyardBounds.right),
      top: Math.min(cardBounds.top, lanyardBounds.top),
      bottom: Math.max(cardBounds.bottom, lanyardBounds.bottom),
    };
  };

  const getClampedOffset = (
    x: number,
    y: number,
    bounds: ItemBounds,
    originX: number,
    originY: number,
  ) => {
    const heroBounds = heroRef.current?.getBoundingClientRect();
    if (!heroBounds) return { x, y };

    const headerBottom = document.querySelector(".site-header")?.getBoundingClientRect().bottom ?? 0;
    const leftLimit = Math.max(heroBounds.left, 0);
    const rightLimit = Math.min(heroBounds.right, window.innerWidth);
    const topLimit = Math.max(heroBounds.top, headerBottom, 0);
    const bottomLimit = heroBounds.bottom;
    const baseLeft = bounds.left - originX;
    const baseRight = bounds.right - originX;
    const baseTop = bounds.top - originY;
    const baseBottom = bounds.bottom - originY;
    const clamp = (value: number, min: number, max: number) =>
      Math.min(Math.max(value, min), Math.max(min, max));

    return {
      x: clamp(x, leftLimit - baseLeft, rightLimit - baseRight),
      y: clamp(y, topLimit - baseTop, bottomLimit - baseBottom),
    };
  };

  const applyOffset = (x: number, y: number, rotation: number) => {
    const hanger = hangerRef.current;
    if (!hanger) return;

    offsetRef.current = { x, y, rotation };
    hanger.style.setProperty("--hero-drag-x", `${x}px`);
    hanger.style.setProperty("--hero-drag-y", `${y}px`);
    hanger.style.setProperty("--hero-drag-rotation", `${rotation}deg`);
  };

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (!isReady || event.button !== 0 || dragRef.current) return;

    const bounds = getItemBounds();
    if (!bounds) return;

    try {
      event.currentTarget.setPointerCapture(event.pointerId);
    } catch {
      return;
    }

    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      originX: offsetRef.current.x,
      originY: offsetRef.current.y,
      bounds,
    };
    setIsDragging(true);
    event.preventDefault();
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;

    const x = drag.originX + event.clientX - drag.startX;
    const y = drag.originY + event.clientY - drag.startY;
    const position = getClampedOffset(x, y, drag.bounds, drag.originX, drag.originY);
    const rotation = Math.max(-7, Math.min(7, (event.clientX - drag.startX) * 0.035));
    applyOffset(position.x, position.y, rotation);
    event.preventDefault();
  };

  const finishPointerDrag = (event: PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;

    dragRef.current = null;
    applyOffset(0, 0, 0);
    setIsDragging(false);

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  const handleLostPointerCapture = (event: PointerEvent<HTMLDivElement>) => {
    if (dragRef.current?.pointerId !== event.pointerId) return;

    dragRef.current = null;
    applyOffset(0, 0, 0);
    setIsDragging(false);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!isReady) return;

    const directions: Record<string, { x: number; y: number }> = {
      ArrowLeft: { x: -1, y: 0 },
      ArrowRight: { x: 1, y: 0 },
      ArrowUp: { x: 0, y: -1 },
      ArrowDown: { x: 0, y: 1 },
    };
    const direction = directions[event.key];
    const bounds = getItemBounds();
    if (!direction || !bounds) return;

    event.preventDefault();
    const distance = event.shiftKey ? 24 : 8;
    const current = offsetRef.current;
    const position = getClampedOffset(
      current.x + direction.x * distance,
      current.y + direction.y * distance,
      bounds,
      current.x,
      current.y,
    );
    applyOffset(position.x, position.y, 0);
  };

  return (
    <section id="home" ref={heroRef} className="hero">
      <div className="hero-copy">
        <h1 className="hero-title" aria-label="I'm Richelle">
          <span>I&apos;m</span>
          <span>Richelle</span>
        </h1>
        <p className="hero-intro">
          Full-stack developer passionate about creating innovative solutions. I build web and mobile applications using modern technologies. Welcome to my portfolio where creativity meets code.
        </p>
        <div className="hero-actions">
          <a className="hero-cta" href="#projects">View Projects</a>
        </div>
      </div>

      <div className="hero-visual">
        <div
          ref={hangerRef}
          className={`hero-hanger${isReady ? "" : " is-entering"}${isDragging ? " is-dragging" : ""}`}
          role="group"
          aria-roledescription="draggable item"
          aria-label="Richelle's developer ID card. Drag to reposition; use arrow keys to move, or Shift plus arrow keys for larger steps."
          aria-disabled={!isReady}
          tabIndex={0}
          onAnimationEnd={(event) => {
            if (event.target === event.currentTarget && event.animationName === "hero-id-entrance") {
              setIsReady(true);
            }
          }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={finishPointerDrag}
          onPointerCancel={finishPointerDrag}
          onLostPointerCapture={handleLostPointerCapture}
          onKeyDown={handleKeyDown}
        >
          <div className="hero-lanyard" aria-hidden="true" />
          <img
            className="hero-id-card"
            src="/ID.png"
            alt="Richelle's developer ID card, showing her portrait and computer studies lanyard"
            draggable={false}
          />
        </div>
      </div>
    </section>
  );
}

export function AboutSection() {
  const { ref, isVisible } = useScrollAnimation();
  const parallax = useParallax(0.2);

  return (
    <section id="about" ref={ref} className="about-section" style={{ minHeight: "100vh", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px", alignItems: "center", padding: "100px 40px", position: "relative", opacity: isVisible ? 1 : 0, transform: isVisible ? `translateY(0)` : "translateY(30px)", transition: "all 0.8s ease-out" }}>
      <div style={{ zIndex: 5, transform: `translateY(${parallax * 0.1}px)` }}>
        <h2 style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)", fontWeight: 900, color: galaxyTheme.starWhite, margin: "0 0 20px", letterSpacing: "-1px" }}><TextReveal>About Me</TextReveal></h2>
        <div style={{ fontSize: "14px", color: galaxyTheme.neonCyan, letterSpacing: "2px", textTransform: "uppercase", marginBottom: "20px", fontWeight: 600 }}>• Full-Stack Developer</div>
        <p style={{ fontSize: "16px", color: galaxyTheme.starWhite, opacity: 0.85, lineHeight: 1.8, marginBottom: "20px" }}>I&apos;m a passionate full-stack developer with expertise in web and mobile development. I specialize in building scalable applications using Laravel, Blade, Kotlin, and modern JavaScript frameworks. I love crafting elegant solutions to complex problems and contributing to open-source projects.</p>

        <div className="about-facts" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginTop: "40px" }}>
          <div style={{ background: `${galaxyTheme.neonCyan}10`, borderRadius: "8px", padding: "20px", border: `1px solid ${galaxyTheme.neonCyan}40` }}>
            <div style={{ color: galaxyTheme.neonCyan, fontWeight: 700, marginBottom: "10px" }}>Tech Stack</div>
            <div style={{ fontSize: "14px", color: galaxyTheme.starWhite, opacity: 0.8 }}>Laravel & Blade<br />Kotlin<br />JavaScript/TypeScript<br />React & Next.js</div>
          </div>

          <div style={{ background: `${galaxyTheme.hotMagenta}10`, borderRadius: "8px", padding: "20px", border: `1px solid ${galaxyTheme.hotMagenta}40` }}>
            <div style={{ color: galaxyTheme.hotMagenta, fontWeight: 700, marginBottom: "10px" }}>Interests</div>
            <div style={{ fontSize: "14px", color: galaxyTheme.starWhite, opacity: 0.8 }}>Full-Stack Development<br />Mobile Apps<br />Database Design<br />Open Source</div>
          </div>
        </div>
      </div>

      <div className="about-fun-facts" style={{ background: `linear-gradient(135deg, rgba(124, 58, 237, 0.1), rgba(255, 20, 147, 0.1))`, borderRadius: "12px", border: `2px solid ${galaxyTheme.neonCyan}40`, padding: "40px", zIndex: 5, boxShadow: `0 0 40px ${galaxyTheme.nebulaPink}20`, transform: `translateY(${parallax * 0.15}px)` }}>
        <h3 style={{ color: galaxyTheme.neonCyan, marginTop: 0, marginBottom: "20px" }}>Fun Facts</h3>
        <ul style={{ color: galaxyTheme.starWhite, opacity: 0.85, lineHeight: 2, listStyle: "none", padding: 0 }}>
          <li>💻 Full-stack developer with 20+ projects</li>
          <li>🚀 Expertise in Laravel, Kotlin, and JavaScript</li>
          <li>📱 Built multiple mobile and web apps</li>
          <li>🎓 Passionate learner & tech enthusiast</li>
          <li>🔧 Love clean code & best practices</li>
        </ul>
      </div>
    </section>
  );
}

export function SkillsSection() {
  const { ref, isVisible } = useScrollAnimation();
  const skills = [
    { category: "Backend", icon: "◎", items: ["Laravel", "Blade", "PHP", "REST APIs", "Database Design"] },
    { category: "Mobile", icon: "📱", items: ["Kotlin", "Android Development", "Mobile Apps", "Java"] },
    { category: "Frontend", icon: "</>", items: ["JavaScript", "TypeScript", "React", "Next.js", "HTML & CSS"] },
    { category: "Tools & Platforms", icon: "⚙️", items: ["Git", "GitHub", "MySQL", "Docker", "VS Code"] },
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

type PortfolioProject = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  image: string;
  link: string;
  details: string;
};

const projects: PortfolioProject[] = [
  { id: "basic-ed", title: "BasicEd Library", description: "A Laravel starter welcome page, sign-in and registration flows, a minimal dashboard, profile editing, and staff approval management.", tags: ["Laravel", "Blade", "PHP"], image: "📚", link: "https://github.com/Richelle1215/BasicEd_Library", details: "Laravel starter & staff approval" },
  { id: "smart-kitchen", title: "SmartKitchen", description: "A warm recipe-community homepage, recipe discovery filters, and seeded cuisine categories. Recipe listings are database-backed and empty in this view-only preview.", tags: ["Laravel", "Blade", "Recipes"], image: "🍳", link: "https://github.com/Richelle1215/SmartKitchen", details: "Recipe community" },
  { id: "budget-tracker", title: "Budget Tracker", description: "Native Android finance manager recreated from its Jetpack Compose onboarding and dashboard. Additions stay in this temporary preview only.", tags: ["Kotlin", "Android", "Compose"], image: "💰", link: "https://github.com/Richelle1215/Budget-Tracker", details: "Android · Personal finance" },
  { id: "hayst", title: "HAYST", description: "A separate red static marketplace landing page from the HAYST repository. It is not the nested LUMIÈRE jewelry store.", tags: ["HTML", "Static site"], image: "🎯", link: "https://github.com/Richelle1215/HAYST", details: "Static marketplace landing" },
  { id: "pet-health", title: "PetHealthTracker", description: "Native Android app with four real Compose routes: robot home, pet BMI, five game cards, and a robot customization closet.", tags: ["Kotlin", "Android", "Compose"], image: "🐾", link: "https://github.com/Richelle1215/PetHealthTracker", details: "Android · Pet companion" },
  { id: "lumiere", title: "LUMIÈRE Store", description: "A luxury jewelry storefront nested in HAYST. The standalone LARAVEL-E-COMMERCE repository contains only a README; the source UI lives in HAYST.", tags: ["Laravel", "Blade", "Jewelry"], image: "🛍️", link: "https://github.com/Richelle1215/HAYST/tree/main/LARAVEL_E-COMMERCE_PROJECT", details: "Nested Laravel storefront" },
];

export function ProjectsSection() {
  const { ref, isVisible } = useScrollAnimation();
  const [activeProject, setActiveProject] = useState<PortfolioProject | null>(null);
  const closePreview = useCallback(() => setActiveProject(null), []);

  return (
    <section id="projects" ref={ref} className={`projects-section${isVisible ? " is-visible" : ""}`} style={{ minHeight: "100vh", padding: "100px 40px", position: "relative", opacity: isVisible ? 1 : 0, transform: isVisible ? "translateY(0)" : "translateY(30px)", transition: "all 0.8s ease-out" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", zIndex: 5, position: "relative" }}>
        <h2 style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)", fontWeight: 900, color: galaxyTheme.starWhite, margin: "0 0 20px", letterSpacing: "-1px", textAlign: "center" }}><TextReveal>Projects</TextReveal></h2>
        <div style={{ fontSize: "14px", color: galaxyTheme.neonCyan, letterSpacing: "2px", textTransform: "uppercase", marginBottom: "40px", fontWeight: 600, textAlign: "center" }}>• Source-faithful, view-only previews</div>
        <div className="projects-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "24px" }}>
          {projects.map((project, idx) => (
            <article key={project.title} className="project-card" style={{ animationDelay: `${idx * 80}ms` }}>
              <button className="project-card__link" type="button" onClick={() => setActiveProject(project)} aria-label={`Open ${project.title} in-page preview`}>
                <span className="project-card__art" aria-hidden="true">{project.image}</span>
                <span className="project-card__copy"><strong>{project.title}</strong><small>{project.details}</small><span className="project-card__description">{project.description}</span><span className="project-card__tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</span><span className="project-card__cta">Explore preview <span aria-hidden="true">↗</span></span></span>
              </button>
              <a className="project-card__source" href={project.link} target="_blank" rel="noopener noreferrer">View source repository <span aria-hidden="true">↗</span></a>
            </article>
          ))}
        </div>
      </div>
      {activeProject && <ProjectPreview project={activeProject} onClose={closePreview} />}
    </section>
  );
}

export function ExperienceSection() {
  const { ref, isVisible } = useScrollAnimation();
  const experiences = [
    { title: "Full-Stack Developer", company: "Personal Projects", period: "2024 - Present", description: "Actively developing and maintaining 20+ full-stack applications. Specializing in Laravel/Blade backend systems and Kotlin mobile apps. Building production-ready applications with focus on clean code and user experience.", skills: ["Laravel", "Kotlin", "JavaScript", "MySQL", "Android"] },
    { title: "Mobile App Developer", company: "Personal & Portfolio Projects", period: "2023 - Present", description: "Designed and developed multiple Android applications using Kotlin. Created finance tracking and pet health management apps. Implemented SQLite databases, UI/UX design, and mobile-specific features.", skills: ["Kotlin", "Android", "SQLite", "Java", "UI/UX Design"] },
    { title: "Web Developer", company: "Portfolio & Educational Projects", period: "2022 - Present", description: "Built comprehensive web applications using Laravel and modern JavaScript frameworks. Developed e-commerce platforms, library management systems, and recipe sharing applications with responsive design.", skills: ["Laravel", "Blade", "PHP", "React", "Next.js", "MySQL"] },
  ];

  return (
    <section id="experience" ref={ref} className="experience-section" style={{ minHeight: "100vh", padding: "100px 40px", position: "relative", opacity: isVisible ? 1 : 0, transform: isVisible ? "translateY(0)" : "translateY(30px)", transition: "all 0.8s ease-out" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto", zIndex: 5, position: "relative" }}>
        <h2 style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)", fontWeight: 900, color: galaxyTheme.starWhite, margin: "0 0 20px", letterSpacing: "-1px", textAlign: "center" }}><TextReveal>Experience</TextReveal></h2>
        <div style={{ fontSize: "14px", color: galaxyTheme.neonCyan, letterSpacing: "2px", textTransform: "uppercase", marginBottom: "60px", fontWeight: 600, textAlign: "center" }}>• Work History & Timeline</div>

        <div style={{ position: "relative" }}>
          {experiences.map((exp, idx) => (
            <div key={exp.title} className="experience-item" style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: "40px", marginBottom: "60px", padding: "30px", background: `linear-gradient(135deg, rgba(124, 58, 237, 0.08), rgba(255, 20, 147, 0.02))`, border: `1px solid ${galaxyTheme.neonCyan}30`, borderRadius: "12px", transition: "all 0.3s ease", opacity: isVisible ? 1 : 0, animation: isVisible ? `slideLeft 0.6s ease-out ${idx * 0.15}s forwards` : "none" }} onMouseEnter={(e) => { e.currentTarget.style.borderColor = galaxyTheme.neonCyan; e.currentTarget.style.boxShadow = `0 0 20px ${galaxyTheme.neonCyan}30`; }} onMouseLeave={(e) => { e.currentTarget.style.borderColor = `${galaxyTheme.neonCyan}30`; e.currentTarget.style.boxShadow = "none"; }}>
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

export function SwingingIDCard() {
  return (
    <section id="id-card" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "100px 40px", position: "relative", overflow: "hidden", background: "transparent" }}>
      <div style={{ position: "relative", animation: "swing 3s ease-in-out infinite", transformOrigin: "top center" }}>
        <style>{`
          @keyframes swing {
            0%, 100% { transform: rotate(-9deg); }
            50% { transform: rotate(9deg); }
          }
        `}</style>
        
        {/* Lanyard/String */}
        <div style={{ position: "absolute", width: "25px", height: "120px", background: "linear-gradient(180deg, #1a3a52 0%, #0d1f2d 100%)", top: "-120px", left: "50%", transform: "translateX(-50%)", borderRadius: "4px", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ width: "100%", height: "100%", background: "linear-gradient(90deg, transparent 40%, rgba(255,255,255,0.1) 50%, transparent 60%)", borderRadius: "4px", padding: "8px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "20px", fontSize: "12px", color: "#8fa3c7", fontWeight: 600, textAlign: "center", lineHeight: 1.2 }}>
            <span style={{ fontSize: "20px" }}>🔐</span>
            <div style={{ writingMode: "vertical-rl", transform: "rotate(180deg)", fontSize: "10px", letterSpacing: "1px" }}>DEVELOPER ID</div>
          </div>
        </div>

        {/* Metal Clip */}
        <div style={{ position: "absolute", width: "28px", height: "18px", background: "linear-gradient(180deg, #c0c0c0 0%, #a8a8a8 50%, #909090 100%)", top: "-5px", left: "50%", transform: "translateX(-50%)", borderRadius: "2px", boxShadow: "0 2px 5px rgba(0,0,0,0.5)", border: "1px solid #808080" }} />
        
        {/* Card */}
        <div style={{ width: "280px", height: "420px", padding: "0", border: "none", borderRadius: "24px", color: "white", textAlign: "center", background: "linear-gradient(135deg, #0d4a6b 0%, #1a6a8f 50%, #0d5a7f 100%)", boxShadow: "0 20px 60px rgba(0,0,0,0.8), 0 0 40px rgba(6, 249, 255, 0.2)", overflow: "hidden", position: "relative" }}>
          
          {/* Background tech pattern - subtle */}
          <div style={{ position: "absolute", top: "40px", right: "-20px", width: "200px", height: "200px", opacity: 0.15, background: "radial-gradient(circle, #06f9ff 1px, transparent 1px)", backgroundSize: "20px 20px", pointerEvents: "none" }} />
          
          {/* Photo Container */}
          <div style={{ width: "100%", height: "280px", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
            <img 
              src="/myphoto.png" 
              alt="Richelle Mendez" 
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
          
          {/* Name Section */}
          <div style={{ padding: "20px", position: "relative", zIndex: 2 }}>
            <h2 style={{ fontSize: "32px", margin: "10px 0 0", color: galaxyTheme.starWhite, fontWeight: 900, letterSpacing: "1px", textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}>RICHELLE</h2>
            <p style={{ color: "#a8d5e8", fontSize: "12px", margin: "8px 0 0", fontWeight: 500, letterSpacing: "0.5px" }}>Full-Stack Developer</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ContactSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="contact" ref={ref} style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "100px 40px", position: "relative", overflow: "hidden", opacity: isVisible ? 1 : 0, transform: isVisible ? "translateY(0)" : "translateY(30px)", transition: "all 0.8s ease-out" }}>
      <div style={{ maxWidth: "600px", textAlign: "center", zIndex: 5, position: "relative" }}>
        <h2 style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)", fontWeight: 900, color: galaxyTheme.starWhite, margin: "0 0 20px", letterSpacing: "-1px" }}><TextReveal>Let&apos;s Connect</TextReveal></h2>
        <p style={{ fontSize: "16px", color: galaxyTheme.starWhite, opacity: 0.85, lineHeight: 1.8, marginBottom: "40px" }}>I&apos;m always interested in collaborating on interesting projects or discussing new ideas. Feel free to reach out through any of these channels. Let&apos;s build something amazing together!</p>

        <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
          <a href="https://github.com/Richelle1215" target="_blank" rel="noopener noreferrer" style={{ padding: "12px 32px", background: `linear-gradient(135deg, ${galaxyTheme.neonCyan}, ${galaxyTheme.cosmicBlue})`, color: galaxyTheme.darkVoid, border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: 700, fontSize: "14px", transition: "all 0.3s ease", boxShadow: `0 0 20px ${galaxyTheme.neonCyan}`, textDecoration: "none", display: "inline-block" }} onMouseEnter={(e) => { e.currentTarget.style.boxShadow = `0 0 30px ${galaxyTheme.neonCyan}, 0 0 40px ${galaxyTheme.cosmicBlue}`; e.currentTarget.style.transform = "translateY(-2px)"; }} onMouseLeave={(e) => { e.currentTarget.style.boxShadow = `0 0 20px ${galaxyTheme.neonCyan}`; e.currentTarget.style.transform = "translateY(0)"; }}>GitHub Profile</a>

          <a href="https://www.linkedin.com/in/richelle1215/" target="_blank" rel="noopener noreferrer" style={{ padding: "12px 32px", background: "transparent", color: galaxyTheme.neonCyan, border: `1px solid ${galaxyTheme.neonCyan}`, borderRadius: "6px", cursor: "pointer", fontWeight: 700, fontSize: "14px", transition: "all 0.3s ease", boxShadow: `0 0 12px ${galaxyTheme.neonCyan}40`, textDecoration: "none", display: "inline-block" }} onMouseEnter={(e) => { e.currentTarget.style.background = `${galaxyTheme.neonCyan}10`; e.currentTarget.style.boxShadow = `0 0 20px ${galaxyTheme.neonCyan}`; }} onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.boxShadow = `0 0 12px ${galaxyTheme.neonCyan}40`; }}>LinkedIn</a>

          <a href="https://profile.indeed.com/?hl=en_PH&amp;co=PH&amp;from=gnav-applymgt--app-tracker-webapp" target="_blank" rel="noopener noreferrer" style={{ padding: "12px 32px", background: "transparent", color: galaxyTheme.neonCyan, border: `1px solid ${galaxyTheme.neonCyan}`, borderRadius: "6px", cursor: "pointer", fontWeight: 700, fontSize: "14px", transition: "all 0.3s ease", boxShadow: `0 0 12px ${galaxyTheme.neonCyan}40`, textDecoration: "none", display: "inline-block" }} onMouseEnter={(e) => { e.currentTarget.style.background = `${galaxyTheme.neonCyan}10`; e.currentTarget.style.boxShadow = `0 0 20px ${galaxyTheme.neonCyan}`; }} onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.boxShadow = `0 0 12px ${galaxyTheme.neonCyan}40`; }}>Indeed Resume</a>

          <a href="https://ph.jobstreet.com/profile/me" target="_blank" rel="noopener noreferrer" style={{ padding: "12px 32px", background: "transparent", color: galaxyTheme.neonCyan, border: `1px solid ${galaxyTheme.neonCyan}`, borderRadius: "6px", cursor: "pointer", fontWeight: 700, fontSize: "14px", transition: "all 0.3s ease", boxShadow: `0 0 12px ${galaxyTheme.neonCyan}40`, textDecoration: "none", display: "inline-block" }} onMouseEnter={(e) => { e.currentTarget.style.background = `${galaxyTheme.neonCyan}10`; e.currentTarget.style.boxShadow = `0 0 20px ${galaxyTheme.neonCyan}`; }} onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.boxShadow = `0 0 12px ${galaxyTheme.neonCyan}40`; }}>Jobstreet Profile</a>
        </div>

        <div style={{ marginTop: "60px", borderTop: `1px solid ${galaxyTheme.neonCyan}40`, paddingTop: "40px" }}>
          <p style={{ color: galaxyTheme.neonCyan, opacity: 0.6, fontSize: "12px", letterSpacing: "1px" }}>© 2024 Richelle Mendez. All rights reserved. Built with Next.js & React.</p>
        </div>
      </div>
    </section>
  );
}
