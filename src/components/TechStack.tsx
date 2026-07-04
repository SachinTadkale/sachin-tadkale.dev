"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeUp } from "@/lib/animations";
import { techStack } from "@/lib/content";
import { TechIcon } from "@/components/icons/TechIcon";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";
import "./TechStack.css";

export function TechStack() {
  const reducedMotion = useReducedMotion();
  const [activeTab, setActiveTab] = useState(techStack[0].id);

  const activeGroup = techStack.find((g) => g.id === activeTab) || techStack[0];

  return (
    <section
      id="stack"
      className="tech-stack flex items-center py-20 lg:py-0 lg:h-screen lg:min-h-[650px]"
    >
      <div className="container-content w-full">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_1.9fr] lg:gap-16 items-center">
          {/* Left: Info & Category Tabs */}
          <motion.div
            variants={fadeUp}
            initial={reducedMotion ? false : "hidden"}
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="space-y-8"
          >
            <div className="space-y-3">
              <SectionLabel>Tech Stack</SectionLabel>
              <h2 className="heading-section">Tools I use to ship and scale</h2>
              <p className="text-secondary max-w-md">
                Grouped by how I actually use them — from daily product work to
                AI experiments I&apos;m exploring.
              </p>
            </div>

            {/* Vertical Tab Selector List */}
            <nav className="flex flex-col border-left">
              {techStack.map((group) => {
                const isActive = activeTab === group.id;
                return (
                  <button
                    key={group.id}
                    onClick={() => setActiveTab(group.id)}
                    className={cn(
                      "tech-stack__tab-btn focus-ring",
                      isActive && "tech-stack__tab-btn--active",
                    )}
                    data-cursor="pointer"
                  >
                    <span className="tech-stack__tab-label">{group.label}</span>
                    <span className="tech-stack__tab-desc">
                      {group.description}
                    </span>
                  </button>
                );
              })}
            </nav>
          </motion.div>

          {/* Right: Grid of Tools (Interactive Active view) */}
          <div className="tech-stack__grid-container">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reducedMotion ? { opacity: 1 } : { opacity: 0, y: -15 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="grid grid-cols-2 sm:grid-cols-3 gap-4"
              >
                {activeGroup.items.map((item) => (
                  <div key={item.name} className="tech-stack__grid-item group">
                    <div className="tech-stack__grid-icon">
                      <TechIcon name={item.name} size={20} />
                    </div>
                    <span className="tech-stack__grid-name">{item.name}</span>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
