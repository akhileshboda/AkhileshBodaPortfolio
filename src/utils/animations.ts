import type { Variants } from 'motion/react';

/* ========== REUSABLE MOTION VARIANTS ========== */

/** Fade in from below — default section entrance */
export const fadeInUp: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

/** Fade in without vertical movement */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

/** Scale in from slightly smaller */
export const scaleIn: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

/** Stagger container — orchestrates children */
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

/** Stagger with wider delay (for hero elements) */
export const heroStagger: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

/** Timeline item — slides in from left or right */
export const timelineItem = (fromLeft: boolean): Variants => ({
  hidden: {
    opacity: 0,
    x: fromLeft ? -40 : 40,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
});

/* ========== VIEWPORT OPTIONS ========== */

/** Default viewport trigger for scroll reveal */
export const defaultViewport = {
  once: true,
  amount: 0.2 as const,
  margin: '-50px' as const,
};

/** More sensitive viewport trigger for smaller elements */
export const sensitiveViewport = {
  once: true,
  amount: 0.1 as const,
  margin: '-20px' as const,
};
