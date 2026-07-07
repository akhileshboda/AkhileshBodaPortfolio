import { motion, useReducedMotion } from 'motion/react';
import { ChevronDown, FileText, Mail, Sparkles } from 'lucide-react';
import { profile } from '@/data/profile';
import { scrollToChapterId } from '@/journey/navigation';

/**
 * Waypoint 00 — the launch pad. Full-viewport opening frame of the voyage.
 */
export default function LaunchHero() {
  const reduce = useReducedMotion();

  const stagger = {
    hidden: {},
    visible: {
      transition: reduce ? {} : { staggerChildren: 0.14, delayChildren: 0.2 },
    },
  };
  const item = {
    hidden: reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: reduce ? 0 : 0.7, ease: [0.25, 0.46, 0.45, 0.94] as const },
    },
  };

  return (
    <section
      id="launch"
      aria-label="Introduction"
      className="relative flex min-h-[calc(100svh-3.5rem)] flex-col justify-center overflow-hidden px-6 pb-16 pt-8 md:px-10 md:pb-24"
    >
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="visible"
        className="mx-auto w-full max-w-5xl"
      >
        {/* Mission patch */}
        <motion.div variants={item} className="mb-8 flex">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-1.5 text-xs font-medium tracking-wide text-slate-400 backdrop-blur-sm">
            <span
              aria-hidden="true"
              className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.8)]"
            />
            Bachelor of Information Technology · Monash University
          </span>
        </motion.div>

        {/* Callsign */}
        <motion.p
          variants={item}
          className="font-mono text-xs uppercase tracking-[0.3em] text-cyan-200/80"
        >
          Akhilesh Boda — Product Developer
        </motion.p>

        {/* Headline */}
        <motion.h1
          variants={item}
          className="mt-5 max-w-3xl text-[2.5rem] font-bold leading-[1.08] tracking-tight text-slate-50 sm:text-5xl lg:text-6xl"
        >
          One voyage through{' '}
          <span className="gradient-text-accent">
            product, mobile, security, and AI.
          </span>
        </motion.h1>

        {/* Subcopy */}
        <motion.p
          variants={item}
          className="mt-6 max-w-xl text-lg leading-relaxed text-slate-400 md:text-xl"
        >
          I started in human-centered care and carried it into software —
          building products with empathy, discipline, and a security mindset.
          This site is the flight path. Scroll to travel it.
        </motion.p>

        {/* CTAs */}
        <motion.div variants={item} className="mt-10 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => scrollToChapterId('origin')}
            className="focus-ring group inline-flex h-11 cursor-pointer items-center gap-2.5 rounded-xl border border-cyan-300/25 bg-gradient-to-br from-[#07101f] via-[#0b1a32] to-[#123158] px-5 text-[0.8125rem] font-medium text-slate-50 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] transition-all duration-300 hover:border-cyan-300/45 hover:shadow-[0_16px_42px_-22px_rgba(47,128,255,0.85)]"
          >
            Begin the voyage
            <ChevronDown
              className="h-3.5 w-3.5 text-cyan-200/80 transition-transform duration-300 motion-safe:group-hover:translate-y-0.5"
              aria-hidden="true"
            />
          </button>
          <button
            type="button"
            onClick={() => scrollToChapterId('projects')}
            className="focus-ring inline-flex h-11 cursor-pointer items-center gap-2 rounded-xl border border-white/[0.09] bg-white/[0.025] px-5 text-[0.8125rem] font-medium text-slate-300 backdrop-blur-sm transition-colors duration-300 hover:border-blue-400/25 hover:text-slate-100"
          >
            <Sparkles className="h-3.5 w-3.5 text-slate-500" aria-hidden="true" />
            View constellations
          </button>
          <a
            href={profile.resume}
            className="focus-ring inline-flex h-11 items-center gap-2 rounded-xl border border-white/[0.09] bg-white/[0.02] px-5 text-[0.8125rem] font-medium text-slate-400 backdrop-blur-sm transition-colors duration-300 hover:border-blue-400/25 hover:text-slate-100"
          >
            <FileText className="h-3.5 w-3.5 text-slate-500" aria-hidden="true" />
            Resume
          </a>
          <a
            href={profile.email}
            className="focus-ring inline-flex h-11 items-center gap-2 rounded-xl border border-white/[0.09] bg-white/[0.02] px-5 text-[0.8125rem] font-medium text-slate-400 backdrop-blur-sm transition-colors duration-300 hover:border-blue-400/25 hover:text-slate-100"
          >
            <Mail className="h-3.5 w-3.5 text-slate-500" aria-hidden="true" />
            Contact
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: reduce ? 0 : 1.4, duration: 0.8 }}
        className="pointer-events-none absolute bottom-7 left-1/2 hidden -translate-x-1/2 text-center md:block"
      >
        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-slate-500">
          Scroll or press <span className="text-slate-300">↓</span> to travel
        </p>
        <ChevronDown
          aria-hidden="true"
          className="mx-auto mt-2 h-4 w-4 text-slate-500 motion-safe:animate-bounce"
        />
      </motion.div>
    </section>
  );
}
