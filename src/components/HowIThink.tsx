"use client";

import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenRuler,
  faServer,
  faWrench,
  faArrowsRotate,
} from "@fortawesome/free-solid-svg-icons";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { principles } from "@/lib/content";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import "./HowIThink.css";

const icons = [faPenRuler, faServer, faWrench, faArrowsRotate];

export function HowIThink() {
  const reducedMotion = useReducedMotion();

  return (
    <section className="how-i-think section-padding">
      <div className="container-content">
        <motion.div
          variants={fadeUp}
          initial={reducedMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <SectionLabel>How I Think</SectionLabel>
          <h2 className="heading-section">Principles that guide my work</h2>
          <p className="prose-width body-lg mt-4 text-secondary">
            Not a process deck — just how I approach problems when building
            software and AI products.
          </p>
        </motion.div>

        <motion.div
          className="mt-12 grid gap-8 sm:grid-cols-2 lg:mt-16"
          variants={staggerContainer}
          initial={reducedMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {principles.map((principle, index) => (
            <motion.article
              key={principle.title}
              variants={fadeUp}
              className="how-i-think__card group"
            >
              <div className="flex items-center gap-4">
                <div className="how-i-think__card-icon-wrap">
                  <FontAwesomeIcon
                    icon={icons[index % icons.length]}
                    className="w-5 h-5"
                  />
                </div>
                <h3 className="heading-subsection">{principle.title}</h3>
              </div>
              <p className="body-md mt-2 text-secondary">
                {principle.description}
              </p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
