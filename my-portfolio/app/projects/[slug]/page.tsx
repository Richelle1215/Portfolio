import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { portfolioProjects } from "../../portfolio-data";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return portfolioProjects.map((project) => ({ slug: project.slug }));
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = portfolioProjects.find((item) => item.slug === slug);

  if (!project) notFound();

  const projectIndex = portfolioProjects.findIndex((item) => item.slug === slug) + 1;

  return (
    <main className="project-detail-page">
      <header className="project-detail-header">
        <Link className="project-detail-header__brand" href="/" aria-label="Richelle Mendez home">
          RM<span aria-hidden="true">.</span>
        </Link>
        <nav aria-label="Main navigation">
          <Link href="/#home">Home</Link>
          <Link href="/#about">About</Link>
          <Link href="/#projects" aria-current="page">Portfolio</Link>
          <Link href="/#contact">Contact</Link>
        </nav>
      </header>

      <div className="project-detail">
        <div className="project-detail__breadcrumb">
          <Link className="project-back" href="/#projects">
            <span aria-hidden="true">←</span> Back to projects
          </Link>
          <nav aria-label="Breadcrumb">
            <ol>
              <li><Link href="/#projects">Projects</Link></li>
              <li aria-hidden="true">›</li>
              <li aria-current="page">{project.title}</li>
            </ol>
          </nav>
        </div>

        <div className="project-detail__layout">
          <section className="project-detail__overview" aria-labelledby="project-title">
            <p className="project-detail__eyebrow">
              Project {String(projectIndex).padStart(2, "0")} / {project.category}
            </p>
            <h1 id="project-title">{project.title}</h1>
            <span className="project-detail__accent" aria-hidden="true" />
            <p className="project-detail__description">{project.detail}</p>

            <div className="project-detail__stats" aria-label="Project overview">
              <div>
                <strong>{project.technologies.length}</strong>
                <span>Technologies</span>
              </div>
              <div>
                <strong>{project.highlights.length}</strong>
                <span>Key features</span>
              </div>
            </div>

            <div className="project-detail__actions">
              {project.liveDemo && (
                <a
                  className="project-detail__action project-detail__action--demo"
                  href={project.liveDemo}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Live demo <span aria-hidden="true">↗</span>
                </a>
              )}
              <a
                className="project-detail__action project-detail__action--source"
                href={project.repository}
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub <span aria-hidden="true">↗</span>
              </a>
            </div>

            <div className="project-detail__technologies">
              <h2><span aria-hidden="true">⌘</span> Technologies used</h2>
              <ul>
                {project.technologies.map((technology) => (
                  <li key={technology}>{technology}</li>
                ))}
              </ul>
            </div>
          </section>

          <div className="project-detail__side">
            <figure className={`project-detail__cover${project.coverImage ? " project-detail__cover--image" : ""}`}>
              {project.coverImage ? (
                <Image
                  src={project.coverImage}
                  alt={project.coverAlt ?? `${project.title} project cover`}
                  fill
                  sizes="(max-width: 760px) 100vw, 48vw"
                  priority
                />
              ) : (
                <>
                  <span className="project-detail__cover-index">
                    PORTFOLIO / {String(projectIndex).padStart(2, "0")}
                  </span>
                  <strong>{project.title}</strong>
                  <span className="project-detail__cover-category">{project.category}</span>
                </>
              )}
              <figcaption className="project-detail__cover-caption">
                Project overview · {String(projectIndex).padStart(2, "0")}
              </figcaption>
            </figure>

            <section className="project-detail__features" aria-labelledby="features-title">
              <h2 id="features-title"><span aria-hidden="true">✦</span> Key features</h2>
              <ul>
                {project.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
