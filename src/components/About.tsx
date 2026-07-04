"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/lib/animations";
import { aboutContent } from "@/lib/content";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import "./About.css";

export function About() {
  const reducedMotion = useReducedMotion();

  return (
    <section id="about" className="about section-padding">
      <div className="container-content">
        <motion.div
          variants={fadeUp}
          initial={reducedMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <SectionLabel>About</SectionLabel>
          <h2 className="heading-section">A bit about me</h2>
        </motion.div>

        <motion.div
          className="mt-10 grid gap-10 lg:mt-12 lg:grid-cols-2 lg:gap-16"
          variants={fadeUp}
          initial={reducedMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <p className="body-lg">{aboutContent.main}</p>
          <p className="body-lg">{aboutContent.supporting}</p>
        </motion.div>
      </div>
    </section>
  );
}
