"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeUp } from "@/lib/animations";
import { experience } from "@/lib/content";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import "./Experience.css";

export function Experience() {
  const [activeIndex, setActiveIndex] = useState(0);
  const reducedMotion = useReducedMotion();
  const activeJob = experience[activeIndex];

  return (
    <section id="experience" className="experience section-padding">
      <div className="container-content">
        <motion.div
          variants={fadeUp}
          initial={reducedMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="experience__header"
        >
          <SectionLabel>Experience</SectionLabel>
          <h2 className="heading-section">Where I&apos;ve shipped</h2>
        </motion.div>

        <div className="experience__container mt-12 lg:mt-16">
          {/* Tabs Navigation */}
          <div className="experience__tabs" role="tablist" aria-label="Job history tabs">
            {experience.map((job, idx) => {
              const isActive = idx === activeIndex;
              return (
                <button
                  key={`tab-${job.company}-${idx}`}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`panel-${idx}`}
                  id={`tab-${idx}`}
                  onClick={() => setActiveIndex(idx)}
                  className={`experience__tab ${isActive ? "experience__tab--active" : ""}`}
                >
                  {/* Vertical indicator for desktop, horizontal for mobile */}
                  {isActive && !reducedMotion && (
                    <motion.div
                      layoutId="activeTabIndicator"
                      className="experience__tab-indicator"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="experience__tab-text">{job.company}</span>
                </button>
              );
            })}
          </div>

          {/* Tab Panel */}
          <div className="experience__panel-container">
            <AnimatePresence mode="wait">
              <motion.div
                key={`panel-${activeIndex}`}
                role="tabpanel"
                id={`panel-${activeIndex}`}
                aria-labelledby={`tab-${activeIndex}`}
                initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reducedMotion ? { opacity: 1 } : { opacity: 0, y: -10 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="experience__panel"
              >
                <div className="experience__panel-header">
                  <div className="experience__role-meta">
                    <h3 className="experience__role">{activeJob.role}</h3>
                    <span className="experience__company-name">@ {activeJob.company}</span>
                  </div>
                  <span className="experience__dates">{activeJob.dates}</span>
                </div>

                <ul className="experience__bullets mt-8 space-y-4">
                  {activeJob.bullets.map((bullet, bIdx) => (
                    <li key={`bullet-${activeIndex}-${bIdx}`} className="experience__bullet">
                      {bullet}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
