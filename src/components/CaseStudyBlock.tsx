"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { fadeUp } from "@/lib/animations";
import type { CaseStudy } from "@/lib/content";
import { Tag } from "@/components/ui/Tag";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useSpotlightBorder } from "@/hooks/useSpotlightBorder";
import { cn } from "@/lib/utils";
import "./CaseStudyBlock.css";

export function CaseStudyBlock({ study }: { study: CaseStudy }) {
  const reducedMotion = useReducedMotion();
  const spotlight = useSpotlightBorder<HTMLDivElement>();

  return (
    <motion.article
      variants={fadeUp}
      initial={reducedMotion ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16"
    >
      {/* Content Column (Always Left) */}
      <div className="space-y-6 lg:order-1">
        <div>
          <h3 className="heading-card">{study.name}</h3>
          <p className="case-study__description mt-3">{study.description}</p>
        </div>

        {/* Technology Stack Tags */}
        <div className="flex flex-wrap gap-2 pt-2">
          {study.tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>

        {/* Consistent Primary CTA Link */}
        <div className="pt-2">
          <Link
            href={`/work/${study.id}`}
            className="case-study__cta flex items-center gap-2 focus-ring"
            data-cursor="pointer"
          >
            <span>Explore Project</span>
            <FontAwesomeIcon icon={faArrowRight} className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>

      {/* Image Column (Always Right, Fully Clickable with Screen Design) */}
      <Link href={`/work/${study.id}`} className="case-study__image-link lg:order-2">
        <div
          ref={spotlight.ref}
          onMouseMove={spotlight.onMouseMove}
          onMouseEnter={spotlight.onMouseEnter}
          onMouseLeave={spotlight.onMouseLeave}
          className="case-study__image-wrap group"
          data-cursor="pointer"
        >
          <div className="case-study__screen-header">
            <span className="case-study__screen-dot bg-[#ff5f56]" />
            <span className="case-study__screen-dot bg-[#ffbd2e]" />
            <span className="case-study__screen-dot bg-[#27c93f]" />
          </div>
          <div className="overflow-hidden">
            <Image
              src={study.image}
              alt={study.imageAlt}
              width={700}
              height={480}
              className="h-auto w-full object-cover case-study__image"
            />
          </div>
        </div>
      </Link>

    </motion.article>
  );
}
