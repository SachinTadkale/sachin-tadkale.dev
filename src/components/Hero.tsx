"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { SocialLinks } from "@/components/icons/SocialLinks";
import { heroFollow, heroLine, heroLineStagger } from "@/lib/animations";
import { siteConfig } from "@/lib/content";
import { Button } from "@/components/ui/Button";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import "./Hero.css";

export function Hero() {
  const reducedMotion = useReducedMotion();
  const headlineLines = [
    "Engineering reliable software today.",
    "Building intelligent systems for tomorrow.",
  ];

  return (
    <section className="hero section-padding pt-32 lg:pt-40">
      <div className="container-content">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
          <div className="w-full lg:max-w-[55%]">
            <motion.div
              initial={reducedMotion ? false : "hidden"}
              animate="visible"
              variants={heroLineStagger}
            >
              <motion.div variants={heroLine}>
                <SectionLabel>FULL-STACK SOFTWARE ENGINEER</SectionLabel>
              </motion.div>

              <h1 className="heading-hero">
                {headlineLines.map((line) => (
                  <motion.span key={line} variants={heroLine} className="block">
                    {line}
                  </motion.span>
                ))}
              </h1>
            </motion.div>

            <motion.p
              variants={heroFollow}
              initial={reducedMotion ? false : "hidden"}
              animate="visible"
              className="prose-width body-lg mt-6"
            >
              Full-stack engineer passionate about building products that are
              simple to use, reliable in production, and ready to grow.
              Currently expanding into AI applications with LLMs, RAG, and
              intelligent workflows.
            </motion.p>

            <motion.div
              variants={heroFollow}
              initial={reducedMotion ? false : "hidden"}
              animate="visible"
              className="hero__btn-group"
            >
              <Button href="#work" data-cursor="pointer">
                Explore Work
              </Button>
              <Button
                variant="secondary"
                href={siteConfig.resumeUrl}
                download
                data-cursor="pointer"
              >
                View Resume
              </Button>
            </motion.div>

            <motion.div
              variants={heroFollow}
              initial={reducedMotion ? false : "hidden"}
              animate="visible"
              className="mt-8"
            >
              <SocialLinks />
            </motion.div>
          </div>

          <motion.div
            initial={reducedMotion ? false : { opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.6,
              delay: 0.45,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="w-full lg:max-w-[40%] flex justify-center lg:justify-end"
          >
            <div className="hero-image-container">
              {/* Minimalist image placeholder */}
              <div className="hero-image-placeholder">
                <div className="hero-image-placeholder__content">
                  <svg
                    className="hero-image-placeholder__icon"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  <span className="hero-image-placeholder__label">
                    sachin_tadkale.jpeg
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
