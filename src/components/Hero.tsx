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
    "I build reliable, scalable",
    "software and AI-powered",
    "products — from idea to production.",
  ];

  return (
    <section className="hero section-padding pt-32 lg:pt-40">
      <div className="container-wide">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div>
            <motion.div
              initial={reducedMotion ? false : "hidden"}
              animate="visible"
              variants={heroLineStagger}
            >
              <motion.div variants={heroLine}>
                <SectionLabel>
                  AI Engineer &amp; Software Developer
                </SectionLabel>
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
              I&apos;m learning and building with modern AI tools — combining
              solid engineering fundamentals with LLMs, RAG, and
              production-ready deployments.
            </motion.p>

            <motion.div
              variants={heroFollow}
              initial={reducedMotion ? false : "hidden"}
              animate="visible"
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <Button href="#work" data-cursor="pointer">
                View My Work
              </Button>
              <Button
                variant="secondary"
                href={siteConfig.resumeUrl}
                download
                data-cursor="pointer"
              >
                Download Resume
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
            className="flex justify-center"
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
