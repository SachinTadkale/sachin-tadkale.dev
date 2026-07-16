import { notFound } from "next/navigation";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowRight,
  faArrowUpRightFromSquare,
  faDownload,
} from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { caseStudies, siteConfig } from "@/lib/content";
import { Tag } from "@/components/ui/Tag";
import { GalleryCarousel } from "@/components/ui/GalleryCarousel";
import { CaseStudySidebar } from "@/components/ui/CaseStudySidebar";
import "./CaseStudyDetails.css";

type PageParams = Promise<{ id: string }>;

export async function generateStaticParams() {
  return caseStudies.map((study) => ({
    id: study.id,
  }));
}

export async function generateMetadata({ params }: { params: PageParams }) {
  const { id } = await params;
  const study = caseStudies.find((s) => s.id === id);

  if (!study) {
    return {
      title: "Project Not Found",
    };
  }

  const url = `${siteConfig.url}/work/${study.id}`;

  return {
    title: study.details.metaTitle,
    description: study.details.metaDescription,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: study.details.metaTitle,
      description: study.details.metaDescription,
      url,
      type: "article",
      images: [
        {
          url: study.image,
          alt: study.imageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: study.details.metaTitle,
      description: study.details.metaDescription,
      images: [study.image],
    },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: PageParams;
}) {
  const { id } = await params;
  const studyIndex = caseStudies.findIndex((s) => s.id === id);

  const sections = [
    { id: "overview", label: "Overview" },
    { id: "problem", label: "The Problem" },
    { id: "objectives", label: "Objectives" },
    { id: "planning", label: "Planning & Research" },
    { id: "architecture", label: "Architecture" },
    { id: "decisions", label: "Engineering Decisions" },
    { id: "implementation", label: "Implementation" },
    { id: "tech-challenges", label: "Challenges & Trade-offs" },
    { id: "results", label: "Results" },
    { id: "tech-stack", label: "Technology Stack" },
    { id: "gallery", label: "Gallery" },
  ];

  if (studyIndex === -1) {
    notFound();
  }

  const study = caseStudies[studyIndex];
  const nextStudy = caseStudies[(studyIndex + 1) % caseStudies.length];

  // Dynamic JSON-LD structured schemas for search engines
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TechArticle",
        "@id": `${siteConfig.url}/work/${study.id}#article`,
        isPartOf: {
          "@type": "WebPage",
          "@id": `${siteConfig.url}/work/${study.id}`,
          url: `${siteConfig.url}/work/${study.id}`,
          name: study.details.metaTitle,
        },
        headline: study.details.metaTitle,
        description: study.details.metaDescription,
        image: study.image,
        author: {
          "@type": "Person",
          name: siteConfig.name,
          jobTitle: "AI Engineer & Software Developer",
          url: siteConfig.url,
        },
        publisher: {
          "@type": "Person",
          name: siteConfig.name,
        },
        mainEntityOfPage: `${siteConfig.url}/work/${study.id}`,
      },
      {
        "@type": "SoftwareApplication",
        name: study.name,
        applicationCategory: "BusinessApplication",
        operatingSystem: "All",
        author: {
          "@type": "Person",
          name: siteConfig.name,
        },
      },
    ],
  };

  return (
    <main className="case-study-details">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Header section with back navigation */}
      <header className="case-study-details__header border-bottom">
        <div className="container-content py-6 flex justify-between items-center">
          <Link
            href="/#work"
            className="case-study-details__back flex items-center gap-2 focus-ring py-2"
            title="Back to portfolio"
            aria-label="Back to portfolio"
          >
            <FontAwesomeIcon icon={faArrowLeft} />
            <span className="hidden sm:inline">Back to portfolio</span>
          </Link>
          <div className="flex flex-wrap gap-3">
            {study.platforms ? (
              study.platforms.map((platform) => {
                const isDownload =
                  platform.label.toLowerCase().includes("android") ||
                  platform.label.toLowerCase().includes("apk") ||
                  platform.url.endsWith(".apk");
                const isGithub = platform.url.toLowerCase().includes("github.com");
                return (
                  <a
                    key={platform.label}
                    href={platform.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="case-study-details__link flex items-center gap-1.5 focus-ring"
                    title={platform.label}
                    aria-label={platform.label}
                  >
                    <span className="hidden sm:inline">{platform.label}</span>
                    <FontAwesomeIcon
                      icon={isDownload ? faDownload : isGithub ? faGithub : faArrowUpRightFromSquare}
                      className="w-3.5 h-3.5"
                    />
                  </a>
                );
              })
            ) : (
              <>
                {study.liveUrl && !study.liveUrl.startsWith("[EDIT") && (
                  <a
                    href={study.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="case-study-details__link flex items-center gap-1.5 focus-ring"
                    title="Live Site"
                    aria-label="Live Site"
                  >
                    <span className="hidden sm:inline">Live Site</span>
                    <FontAwesomeIcon
                      icon={faArrowUpRightFromSquare}
                      className="w-3.5 h-3.5"
                    />
                  </a>
                )}
                {study.githubUrl && !study.githubUrl.startsWith("[EDIT") && (
                  <a
                    href={study.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="case-study-details__link flex items-center gap-1.5 focus-ring"
                    title="GitHub"
                    aria-label="GitHub"
                  >
                    <span className="hidden sm:inline">GitHub</span>
                    <FontAwesomeIcon icon={faGithub} className="w-3.5 h-3.5" />
                  </a>
                )}
              </>
            )}
          </div>
        </div>
      </header>

      {/* Editorial Title Header */}
      <section className="case-study-details__title-section container-content py-12 lg:py-16">
        <h1 className="case-study-details__title heading-hero font-serif mt-4">
          {study.name}
        </h1>
        <p className="case-study-details__tagline body-lg text-secondary mt-4 max-w-2xl">
          {study.tagline}
        </p>
      </section>

      {/* Structured Content Sections */}
      <div className="container-content grid gap-12 lg:grid-cols-[minmax(0,1fr)_220px] items-start pb-24">
        {/* Main Case Study Columns */}
        <div className="space-y-16">
          {/* 1. Overview */}
          <section id="overview" className="space-y-4">
            <h2 className="case-study-details__section-label">Overview</h2>
            <p className="case-study-details__text">{study.details.overview}</p>
          </section>

          {/* 2. The Problem */}
          <section id="problem" className="space-y-4">
            <h2 className="case-study-details__section-label">The Problem</h2>
            <p className="case-study-details__text">{study.details.problem}</p>
          </section>

          {/* 3. Objectives */}
          <section id="objectives" className="space-y-6">
            <h2 className="case-study-details__section-label">Objectives</h2>

            <div className="space-y-4">
              <div>
                <h4 className="case-study-details__sub-label">Project Goals</h4>
                <ul className="case-study-details__list mt-2">
                  {study.details.objectives.goals.map((g, idx) => (
                    <li key={idx} className="case-study-details__list-item">
                      {g}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="case-study-details__sub-label">
                  Success Criteria
                </h4>
                <ul className="case-study-details__list mt-2">
                  {study.details.objectives.criteria.map((c, idx) => (
                    <li key={idx} className="case-study-details__list-item">
                      {c}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="case-study-details__sub-label">Constraints</h4>
                <ul className="case-study-details__list mt-2">
                  {study.details.objectives.constraints.map((c, idx) => (
                    <li key={idx} className="case-study-details__list-item">
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* 4. Planning & Research */}
          <section id="planning" className="space-y-4">
            <h2 className="case-study-details__section-label">
              Planning &amp; Research
            </h2>
            <p className="case-study-details__text">
              {study.details.planningResearch}
            </p>
          </section>

          {/* 5. Architecture */}
          <section id="architecture" className="space-y-6">
            <h2 className="case-study-details__section-label">Architecture</h2>

            {study.details.architecture.diagramSvg &&
              study.details.architecture.diagramSvg.trim() !== "" && (
                <div
                  className="case-study-details__svg-wrapper"
                  dangerouslySetInnerHTML={{
                    __html: study.details.architecture.diagramSvg,
                  }}
                />
              )}

            <div className="space-y-4">
              <div>
                <h4 className="case-study-details__sub-label">
                  Component Responsibilities
                </h4>
                <p className="case-study-details__text mt-1">
                  {study.details.architecture.responsibilities}
                </p>
              </div>

              <div>
                <h4 className="case-study-details__sub-label">Data Flow</h4>
                <p className="case-study-details__text mt-1">
                  {study.details.architecture.dataFlow}
                </p>
              </div>

              <div>
                <h4 className="case-study-details__sub-label">
                  Infrastructure
                </h4>
                <p className="case-study-details__text mt-1">
                  {study.details.architecture.infrastructure}
                </p>
              </div>
            </div>
          </section>

          {/* 6. Engineering Decisions */}
          <section id="decisions" className="space-y-6">
            <h2 className="case-study-details__section-label">
              Engineering Decisions
            </h2>
            <div className="grid gap-6 sm:grid-cols-2">
              {study.details.engineeringDecisions.map((dec, idx) => (
                <div key={idx} className="case-study-details__highlight-card">
                  <h3 className="case-study-details__highlight-title">
                    {dec.choice}
                  </h3>
                  <p className="case-study-details__highlight-desc mt-2">
                    {dec.reason}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* 7. Implementation */}
          <section id="implementation" className="space-y-4">
            <h2 className="case-study-details__section-label">
              Implementation
            </h2>
            <p className="case-study-details__text">
              {study.details.implementation}
            </p>
          </section>

          {/* 8. Challenges & Trade-offs */}
          <section id="tech-challenges" className="space-y-6">
            <h2 className="case-study-details__section-label">
              Challenges &amp; Trade-offs
            </h2>
            <div className="space-y-8">
              {study.details.challengesTradeoffs.map((c, idx) => (
                <div key={idx} className="case-study-details__challenge-box">
                  <div className="case-study-details__challenge-step">
                    <span className="case-study-details__step-tag">
                      Problem
                    </span>
                    <p className="case-study-details__step-text">{c.problem}</p>
                  </div>
                  <div className="case-study-details__challenge-step">
                    <span className="case-study-details__step-tag">
                      Options
                    </span>
                    <ul className="case-study-details__options-list mt-1">
                      {c.solutionsConsidered.map((opt, oIdx) => (
                        <li
                          key={oIdx}
                          className="case-study-details__option-item"
                        >
                          {opt}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="case-study-details__challenge-step">
                    <span className="case-study-details__step-tag">
                      Decision
                    </span>
                    <p className="case-study-details__step-text font-semibold text-primary">
                      {c.finalDecision}
                    </p>
                  </div>
                  <div className="case-study-details__challenge-step">
                    <span className="case-study-details__step-tag">
                      Reasoning
                    </span>
                    <p className="case-study-details__step-text">
                      {c.reasoning}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 9. Results */}
          <section id="results" className="space-y-6">
            <h2 className="case-study-details__section-label">Results</h2>
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="case-study-details__impact-card">
                <span className="case-study-details__impact-label font-semibold">
                  Business Outcome
                </span>
                <p className="case-study-details__text mt-2">
                  {study.details.results.outcomes}
                </p>
              </div>
              <div className="case-study-details__impact-card">
                <span className="case-study-details__impact-label font-semibold">
                  Performance
                </span>
                <p className="case-study-details__text mt-2">
                  {study.details.results.performance}
                </p>
              </div>
            </div>
            {study.details.results.metrics && (
              <div className="mt-6 p-6 border bg-[var(--color-bg-secondary)]">
                <h4 className="case-study-details__metrics-title">
                  Performance Metrics
                </h4>
                <ul className="case-study-details__metrics-list mt-3">
                  {study.details.results.metrics.map((m, idx) => (
                    <li key={idx} className="case-study-details__metric-item">
                      {m}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="p-6 border bg-[var(--color-bg-secondary)] mt-6">
              <h4 className="case-study-details__metrics-title">
                Lessons &amp; Reflections
              </h4>
              <p className="case-study-details__text mt-2">
                {study.details.results.lessons}
              </p>
            </div>
          </section>

          {/* 10. Technology Stack (Displayed after the story) */}
          <section id="tech-stack" className="space-y-6">
            <h2 className="case-study-details__section-label">
              Technology Stack
            </h2>
            <div className="grid gap-6 sm:grid-cols-2">
              {study.details.technologies.map((t, idx) => (
                <div key={idx} className="case-study-details__tech-group">
                  <span className="case-study-details__tech-label">
                    {t.category}
                  </span>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {t.items.map((item) => (
                      <Tag key={item}>{item}</Tag>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 11. Gallery */}
          {study.details.gallery && study.details.gallery.length > 0 && (
            <section id="gallery" className="space-y-6">
              <h2 className="case-study-details__section-label">Gallery</h2>
              <GalleryCarousel items={study.details.gallery} />
            </section>
          )}

          {/* 12. Next Project */}
          <section
            id="next-cta"
            className="case-study-details__next border py-10 px-8 flex justify-between items-center bg-[var(--color-bg-secondary)]"
          >
            <div>
              <span className="case-study-details__next-label">
                Next Case Study
              </span>
              <h3 className="case-study-details__next-title font-serif mt-2">
                {nextStudy.name}
              </h3>
            </div>
            <Link
              href={`/work/${nextStudy.id}`}
              className="case-study-details__next-btn flex items-center gap-2 focus-ring"
            >
              <span>Read next review</span>
              <FontAwesomeIcon icon={faArrowRight} />
            </Link>
          </section>
        </div>

        {/* Sidebar Indexing Navigation */}
        <CaseStudySidebar sections={sections} />
      </div>
    </main>
  );
}
