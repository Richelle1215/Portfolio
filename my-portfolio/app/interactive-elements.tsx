"use client";

import { useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import Link from "next/link";
import { portfolioProjects } from "./portfolio-data";
import { CertificateGallery } from "./certificate-gallery";

type ShowcaseTab = "projects" | "certificates" | "skills";

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
  const navItems: { label: string; href: string; tab?: ShowcaseTab }[] = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Experience", href: "#experience" },
    { label: "Education", href: "#education" },
    { label: "Contact", href: "#contact" },
  ];
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
            key={item.label}
            href={item.href}
            className={item.label === "Home" ? "site-nav__link is-home" : "site-nav__link"}
            onClick={(event) => {
              if (item.tab) {
                event.preventDefault();
                window.dispatchEvent(
                  new CustomEvent("portfolio-showcase-tab", { detail: { tab: item.tab } }),
                );
                document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
                onNavigate?.(item.tab);
                setIsMobileMenuOpen(false);
                return;
              }

              if (onNavigate) {
                event.preventDefault();
                onNavigate(item.label.toLowerCase());
              }
              setIsMobileMenuOpen(false);
            }}
          >
            {item.label}
          </a>
        ))}
      </nav>
    </header>
  );
}

export function HeroSection() {
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
    const hero = document.querySelector(".hero");
    if (!(hero instanceof HTMLElement)) return { x, y };

    const heroBounds = hero.getBoundingClientRect();
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
    <section id="home" className="hero">
      <div className="hero-copy">
        <p className="hero-subtitle">WELCOME TO MY PORTFOLIO</p>
        <h1 className="hero-title" aria-label="Hi, I am Richelle">
          <span aria-hidden="true">Hi, I am</span>
          <span className="hero-title__name" aria-hidden="true">
            {"Richelle".split("").map((letter, index) => (
              <span key={`${letter}-${index}`} style={{ animationDelay: `${index * 85}ms` }}>
                {letter}
              </span>
            ))}
          </span>
        </h1>
        <p className="hero-intro">
          An Information Technology student at Our Lady of Lourdes College Foundation looking for an internship opportunity to apply my academic knowledge and skills in the IT industry. With an interest in software development, data analysis, and quality assurance, I am looking forward to contributing to the organization's data-heavy initiatives like system development, data analysis, software testing, and other related projects.
        </p>
        <div className="hero-actions">
          <a className="hero-cta" href="/documents/Richelle_Mendez_CV.pdf" download="Richelle_Mendez_CV.pdf">Download CV</a>
          <a className="hero-cta hero-cta--secondary" href="#contact">Let's connect</a>
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

export function ProjectsSection() {
  const { ref, isVisible } = useScrollAnimation();
  const [activeTab, setActiveTab] = useState<ShowcaseTab>("projects");

  useEffect(() => {
    const handleShowcaseTab = (event: Event) => {
      const tab = (event as CustomEvent<{ tab?: ShowcaseTab }>).detail?.tab;
      if (tab === "projects" || tab === "certificates" || tab === "skills") {
        setActiveTab(tab);
      }
    };

    window.addEventListener("portfolio-showcase-tab", handleShowcaseTab);
    return () => window.removeEventListener("portfolio-showcase-tab", handleShowcaseTab);
  }, []);

  const handleTabKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;

    const tabs = Array.from(
      event.currentTarget.querySelectorAll<HTMLButtonElement>('[role="tab"]'),
    );
    if (tabs.length === 0) return;

    const activeTabElement =
      event.target instanceof Element
        ? event.target.closest<HTMLButtonElement>('[role="tab"]')
        : null;
    if (!activeTabElement) return;

    event.preventDefault();
    const currentIndex = tabs.indexOf(activeTabElement);
    const nextIndex =
      event.key === "Home"
        ? 0
        : event.key === "End"
          ? tabs.length - 1
          : (currentIndex + (event.key === "ArrowRight" ? 1 : tabs.length - 1)) % tabs.length;
    tabs[nextIndex].focus();
    setActiveTab((tabs[nextIndex].dataset.tab as ShowcaseTab) ?? "projects");
  };

  const skills = [
    { category: "Backend", icon: "◎", items: ["Laravel", "Blade", "PHP", "REST APIs", "Database Design"] },
    { category: "Mobile", icon: "📱", items: ["Kotlin", "Android Development", "Mobile Apps", "Java"] },
    { category: "Frontend", icon: "</>", items: ["JavaScript", "TypeScript", "React", "Next.js", "HTML & CSS"] },
    { category: "Tools & Platforms", icon: "⚙️", items: ["Git", "GitHub", "MySQL", "Docker", "VS Code"] },
  ];

  return (
    <section id="projects" ref={ref} className={`projects-section${isVisible ? " is-visible" : ""}`} style={{ minHeight: "100vh", padding: "100px 40px", position: "relative", opacity: isVisible ? 1 : 0, transform: isVisible ? "translateY(0)" : "translateY(30px)", transition: "all 0.8s ease-out" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", zIndex: 5, position: "relative" }}>
        <div className="portfolio-showcase__heading">
          <p className="certificate-eyebrow">Portfolio / 01</p>
          <h2>Portfolio Showcase</h2>
          <p>Explore my journey through projects, certifications, and technical expertise. Each project reflects a milestone in my continuous learning path.</p>
        </div>
        <div className="portfolio-showcase__tabs" role="tablist" aria-label="Portfolio sections" onKeyDown={handleTabKeyDown}>
          <button type="button" id="portfolio-tab-projects" role="tab" data-tab="projects" aria-selected={activeTab === "projects"} aria-controls="portfolio-tabpanel" tabIndex={activeTab === "projects" ? 0 : -1} onClick={() => setActiveTab("projects")}><span aria-hidden="true">⌘</span>Projects</button>
          <button type="button" id="portfolio-tab-certificates" role="tab" data-tab="certificates" aria-selected={activeTab === "certificates"} aria-controls="portfolio-tabpanel" tabIndex={activeTab === "certificates" ? 0 : -1} onClick={() => setActiveTab("certificates")}><span aria-hidden="true">♙</span>Certificates</button>
          <button type="button" id="portfolio-tab-skills" role="tab" data-tab="skills" aria-selected={activeTab === "skills"} aria-controls="portfolio-tabpanel" tabIndex={activeTab === "skills" ? 0 : -1} onClick={() => setActiveTab("skills")}><span aria-hidden="true">✣</span>Tech Stack</button>
        </div>
        <div id="portfolio-tabpanel" className="portfolio-showcase__panel" role="tabpanel" aria-labelledby={`portfolio-tab-${activeTab}`} tabIndex={0}>
          {activeTab === "projects" && (
            <div className="projects-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "24px" }}>
              {portfolioProjects.map((project, idx) => (
                <article key={project.slug} className="project-card" style={{ animationDelay: `${idx * 80}ms` }}>
                  <span className={`project-card__art project-card__art--${project.slug}`} aria-hidden="true">
                    <span>PROJECT / {String(idx + 1).padStart(2, "0")}</span>
                    <strong>{project.title}</strong>
                    <small>{project.category}</small>
                  </span>
                  <span className="project-card__copy">
                    <strong>{project.title}</strong>
                    <small>{project.category}</small>
                    <span className="project-card__description">{project.description}</span>
                    <span className="project-card__tags">{project.technologies.map((tag) => <span key={tag}>{tag}</span>)}</span>
                  </span>
                  <a className="project-card__source" href={project.repository} target="_blank" rel="noopener noreferrer">GitHub repository <span aria-hidden="true">↗</span></a>
                </article>
              ))}
            </div>
          )}
          {activeTab === "certificates" && <CertificateGallery />}
          {activeTab === "skills" && (
            <div id="skills" className="showcase-skills">
              <p className="showcase-skills__eyebrow">Tools & Technologies</p>
              <div className="showcase-skills__grid">
                {skills.map((skill) => (
                  <article className="showcase-skill-card" key={skill.category}>
                    <span className="showcase-skill-card__icon" aria-hidden="true">{skill.icon}</span>
                    <h3>{skill.category}</h3>
                    <div className="showcase-skill-card__items">
                      {skill.items.map((item) => <span key={item}>{item}</span>)}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
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

export function EducationSection() {
  const { ref, isVisible } = useScrollAnimation();
  const education = [
    { degree: "Bachelor of Science in Information Technology", school: "Our Lady of Lourdes College Foundation", period: "2023 - Present", status: "Ongoing", description: "Fourth-year student focused on full-stack web development, mobile application development, and quality assurance." },
    { degree: "Senior High School Graduate", school: "Asian Technological Skills Institute Inc.", period: "2021 - 2023", status: "Completed", description: "General Academic Strand with focus on STEM and technology fundamentals." },
    { degree: "Junior High School Graduate", school: "Gonzalo Aler National High School", period: "2017 - 2020", status: "Completed", description: "Completed junior secondary education with strong academic performance." },
  ];

  return (
    <section id="education" ref={ref} className="education-section" style={{ minHeight: "100vh", padding: "100px 40px", position: "relative", opacity: isVisible ? 1 : 0, transform: isVisible ? "translateY(0)" : "translateY(30px)", transition: "all 0.8s ease-out" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto", zIndex: 5, position: "relative" }}>
        <h2 style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)", fontWeight: 900, color: galaxyTheme.starWhite, margin: "0 0 20px", letterSpacing: "-1px", textAlign: "center" }}><TextReveal>Education</TextReveal></h2>
        <div style={{ fontSize: "14px", color: galaxyTheme.neonCyan, letterSpacing: "2px", textTransform: "uppercase", marginBottom: "60px", fontWeight: 600, textAlign: "center" }}>• Academic Journey</div>

        <div style={{ position: "relative" }}>
          {education.map((edu, idx) => (
            <div key={edu.degree} className="education-item" style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: "40px", marginBottom: "60px", padding: "30px", background: `linear-gradient(135deg, rgba(124, 58, 237, 0.08), rgba(6, 249, 255, 0.02))`, border: `1px solid ${galaxyTheme.neonCyan}30`, borderRadius: "12px", transition: "all 0.3s ease", opacity: isVisible ? 1 : 0, animation: isVisible ? `slideLeft 0.6s ease-out ${idx * 0.15}s forwards` : "none" }} onMouseEnter={(e) => { e.currentTarget.style.borderColor = galaxyTheme.neonCyan; e.currentTarget.style.boxShadow = `0 0 20px ${galaxyTheme.neonCyan}30`; }} onMouseLeave={(e) => { e.currentTarget.style.borderColor = `${galaxyTheme.neonCyan}30`; e.currentTarget.style.boxShadow = "none"; }}>
              <div>
                <div style={{ color: galaxyTheme.neonCyan, fontSize: "12px", fontWeight: 600, letterSpacing: "1px", textTransform: "uppercase", marginBottom: "8px" }}>{edu.period}</div>
                <div style={{ color: galaxyTheme.hotMagenta, fontSize: "14px", fontWeight: 700 }}>{edu.status}</div>
              </div>

              <div>
                <h3 style={{ color: galaxyTheme.starWhite, margin: "0 0 8px", fontSize: "18px", fontWeight: 700 }}>{edu.degree}</h3>
                <p style={{ color: galaxyTheme.neonCyan, margin: "0 0 12px", fontSize: "14px", fontWeight: 600 }}>{edu.school}</p>
                <p style={{ color: galaxyTheme.starWhite, opacity: 0.75, lineHeight: 1.6, margin: 0 }}>{edu.description}</p>
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
