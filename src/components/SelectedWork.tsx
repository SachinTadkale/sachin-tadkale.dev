"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeUp } from "@/lib/animations";
import { caseStudies } from "@/lib/content";
import { CaseStudyBlock } from "@/components/CaseStudyBlock";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import "./SelectedWork.css";

export function SelectedWork() {
  const [activeIndex, setActiveIndex] = useState(0);
  const reducedMotion = useReducedMotion();
  const activeStudy = caseStudies[activeIndex];

  // Force all projects to have the same layout direction (content left, image right)
  const modifiedStudy = {
    ...activeStudy,
    imagePosition: "right" as const,
  };

  return (
    <section id="work" className="selected-work lg:h-screen lg:min-h-[750px] flex flex-col justify-center py-16 lg:py-0">
      <div className="container-wide w-full">
        
        {/* Header Section: Flex layout with title on left, quote/note on right */}
        <motion.div
          variants={fadeUp}
          initial={reducedMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="container-content selected-work__header-row"
        >
          <div>
            <SectionLabel>Selected Work</SectionLabel>
            <h2 className="heading-section mt-2">Projects that show how I build</h2>
          </div>
          <div className="selected-work__note">
            <span className="selected-work__note-marker" />
            <p className="selected-work__note-text">
              Focused on the real-world problem, key decisions, and concrete outcomes.
            </p>
          </div>
        </motion.div>

        {/* Tab Navigation and Panel: Structured to stick directly to the header */}
        <div className="container-content">
          <div className="selected-work__tabs-container">
            <div className="selected-work__tabs" role="tablist" aria-label="Project case studies">
              {caseStudies.map((study, idx) => {
                const isActive = idx === activeIndex;
                return (
                  <button
                    key={study.id}
                    role="tab"
                    aria-selected={isActive}
                    aria-controls={`project-panel-${study.id}`}
                    id={`project-tab-${study.id}`}
                    onClick={() => setActiveIndex(idx)}
                    className={`selected-work__tab ${
                      isActive ? "selected-work__tab--active" : ""
                    }`}
                  >
                    {isActive && !reducedMotion && (
                      <motion.div
                        layoutId="activeProjectIndicator"
                        className="selected-work__tab-indicator"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span className="selected-work__tab-name">{study.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tab Panel */}
          <div className="selected-work__panel mt-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={modifiedStudy.id}
                role="tabpanel"
                id={`project-panel-${modifiedStudy.id}`}
                aria-labelledby={`project-tab-${modifiedStudy.id}`}
                initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reducedMotion ? { opacity: 1 } : { opacity: 0, y: -15 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
              >
                <CaseStudyBlock study={modifiedStudy} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

      </div>
    </section>
  );
}
