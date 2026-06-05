import { useRef, useState, type FocusEvent } from 'react';
import {
  LayoutGroup,
  motion,
  useReducedMotion,
} from 'motion/react';
import { FileText, Mail, PanelsTopLeft } from 'lucide-react';
import { heroStagger, fadeInUp } from '@/utils/animations';
import { profile } from '@/data/profile';
import OrbAnchor from '@/components/OrbAnchor';

type CtaId = 'projects' | 'resume' | 'contact';

function Hero() {
  const reduceMotion = useReducedMotion();
  const ctaGroupRef = useRef<HTMLDivElement>(null);
  const [activeCta, setActiveCta] = useState<CtaId | null>(null);

  const ctaBarTransition = reduceMotion
    ? { duration: 0.12 }
    : { type: 'spring' as const, stiffness: 420, damping: 34 };

  const handleCtaBlur = (event: FocusEvent<HTMLAnchorElement>) => {
    const nextTarget = event.relatedTarget;
    if (!nextTarget || !ctaGroupRef.current?.contains(nextTarget)) {
      setActiveCta(null);
    }
  };

  const renderActiveBar = (id: CtaId) => (
    activeCta === id && (
      <motion.span
        aria-hidden="true"
        layoutId="cta-active-bar"
        initial={false}
        transition={ctaBarTransition}
        className="pointer-events-none absolute bottom-1 left-4 right-4 h-px rounded-full bg-gradient-to-r from-cyan-300/0 via-cyan-300/65 via-blue-400/70 to-violet-400/0"
      />
    )
  );

  return (
    <section
      id="hero"
      className="relative flex flex-col h-[calc(100vh-60px)] overflow-hidden"
    >
      {/* Localized hero glow (center-left), behind content */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[8%] top-1/2 h-[560px] w-[560px] -translate-y-1/2 rounded-full blur-[130px] opacity-50"
        style={{
          background:
            'radial-gradient(circle, rgba(47,128,255,0.22) 0%, rgba(139,92,246,0.10) 45%, transparent 70%)',
        }}
      />

      {/* Mobile ambient glow (orb hidden < md) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-10%] top-[30%] h-[320px] w-[320px] rounded-full blur-[100px] opacity-50 md:hidden"
        style={{
          background:
            'radial-gradient(circle, rgba(56,214,255,0.18) 0%, rgba(139,92,246,0.12) 50%, transparent 72%)',
        }}
      />

      {/* Right-side orb */}
      <OrbAnchor />

      {/* Hero content — left aligned */}
      <motion.div
        variants={heroStagger}
        initial="hidden"
        animate="visible"
        className="hero-content relative z-10 max-w-2xl px-6 text-left md:px-10 lg:pl-4"
      >
        {/* Badge */}
        <motion.div variants={fadeInUp} className="mb-7 flex">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-1.5 text-xs font-medium tracking-wide text-slate-400 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
            Bachelor of Information Technology · Monash University
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={fadeInUp}
          className="text-4xl font-bold leading-[1.07] tracking-tight text-slate-50 sm:text-5xl lg:text-[3.4rem]"
        >
          I build user-centered software across{' '}
          <span className="gradient-text-accent">
            mobile, systems, security, and product.
          </span>
        </motion.h1>

        {/* Subcopy */}
        <motion.p
          variants={fadeInUp}
          className="mt-6 max-w-xl text-lg leading-relaxed text-slate-400 md:text-xl"
        >
          Product-focused developer bridging user empathy, technical execution,
          and business outcomes — with a foundation in human-centered care.
        </motion.p>

        {/* CTA Buttons */}
        <LayoutGroup>
          <motion.div
            ref={ctaGroupRef}
            variants={fadeInUp}
            onMouseLeave={() => setActiveCta(null)}
            className="mt-9 flex w-full max-w-[20.5rem] flex-wrap items-center gap-3 sm:max-w-none sm:gap-3.5"
          >
            {/* Primary — View Projects */}
            <motion.a
              href="#projects"
              onMouseEnter={() => setActiveCta('projects')}
              onFocus={() => setActiveCta('projects')}
              onBlur={handleCtaBlur}
              whileHover={reduceMotion ? undefined : { y: -1 }}
              className="group relative inline-flex h-11 cursor-pointer items-center gap-2.5 overflow-hidden rounded-[0.85rem] border border-blue-300/[0.18] bg-gradient-to-br from-[#07101f] via-[#0b1a32] to-[#12315d] px-5 text-[0.8125rem] font-medium tracking-[0.01em] text-slate-50 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] transition-[border-color,background-color,box-shadow,color] duration-300 hover:border-cyan-300/35 hover:shadow-[0_0_0_1px_rgba(56,214,255,0.10),0_16px_42px_-22px_rgba(47,128,255,0.85)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#020611]"
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_40%_0%,rgba(96,165,250,0.20),transparent_42%),linear-gradient(180deg,rgba(255,255,255,0.08),transparent_48%)] opacity-70 transition-opacity duration-300 group-hover:opacity-100"
              />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-px rounded-[0.78rem] border border-white/[0.06]"
              />
              {renderActiveBar('projects')}
              <span className="relative transition-transform duration-300 motion-safe:group-hover:translate-x-px">
                View Projects
              </span>
              <PanelsTopLeft className="relative h-3.5 w-3.5 text-blue-200/70 transition-colors duration-300 group-hover:text-cyan-100" />
            </motion.a>

            {/* Secondary — Resume */}
            <motion.a
              href={profile.resume}
              onMouseEnter={() => setActiveCta('resume')}
              onFocus={() => setActiveCta('resume')}
              onBlur={handleCtaBlur}
              className="group relative inline-flex h-11 cursor-pointer items-center gap-2 overflow-hidden rounded-[0.85rem] border border-white/[0.08] bg-white/[0.025] px-5 text-[0.8125rem] font-medium tracking-[0.01em] text-slate-400 backdrop-blur-sm transition-[border-color,box-shadow,color,background-color] duration-300 hover:border-blue-400/25 hover:bg-white/[0.04] hover:text-slate-100 hover:shadow-[inset_0_0_18px_rgba(59,130,246,0.08)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#020611]"
            >
              {renderActiveBar('resume')}
              <FileText className="relative h-3.5 w-3.5 text-slate-500 transition-colors duration-300 group-hover:text-blue-200" />
              <span className="relative">Resume</span>
            </motion.a>

            {/* Tertiary — Contact */}
            <motion.a
              href={profile.email}
              onMouseEnter={() => setActiveCta('contact')}
              onFocus={() => setActiveCta('contact')}
              onBlur={handleCtaBlur}
              className="group relative inline-flex h-11 cursor-pointer items-center gap-2 overflow-hidden rounded-[0.85rem] border border-white/[0.08] bg-white/[0.018] px-5 text-[0.8125rem] font-medium tracking-[0.01em] text-slate-400 backdrop-blur-sm transition-[border-color,box-shadow,color,background-color] duration-300 hover:border-blue-400/25 hover:bg-white/[0.035] hover:text-slate-100 hover:shadow-[inset_0_0_18px_rgba(59,130,246,0.07)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#020611]"
            >
              {renderActiveBar('contact')}
              <Mail className="relative h-3.5 w-3.5 text-slate-500 transition-colors duration-300 group-hover:text-blue-200" />
              <span className="relative">Contact</span>
            </motion.a>
          </motion.div>
        </LayoutGroup>
      </motion.div>
    </section>
  );
}

export default Hero;
