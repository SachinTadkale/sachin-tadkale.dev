"use client";

import type { Variants, Transition } from "framer-motion";

export const easeOut = [0, 0, 0.2, 1] as const;

export const easePremium = [0.22, 1, 0.36, 1] as const;

export const defaultTransition: Transition = {
  duration: 0.5,
  ease: easePremium,
};

export const viewportConfig = {
  once: true,
  margin: "-80px" as const,
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: defaultTransition,
  },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.05,
    },
  },
};

export const heroLineStagger: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const heroLine: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: easeOut },
  },
};

export const heroFollow: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: easeOut, delay: 0.35 },
  },
};

export function getMotionProps(reducedMotion: boolean) {
  if (reducedMotion) {
    return {
      initial: false as const,
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0 },
    };
  }
  return {
    initial: "hidden" as const,
    whileInView: "visible" as const,
    viewport: viewportConfig,
  };
}
