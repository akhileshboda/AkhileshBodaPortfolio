import { motion } from 'motion/react';
import { ArrowRight, FileText, Mail } from 'lucide-react';
import { heroStagger, fadeInUp } from '@/utils/animations';

function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center dot-grid-bg overflow-hidden"
    >
      {/* Decorative gradient orb */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[520px] w-[520px] rounded-full bg-gradient-to-br from-blue-500/20 via-purple-500/10 to-transparent blur-[120px] opacity-60"
      />

      <motion.div
        variants={heroStagger}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto max-w-4xl px-6 text-center"
      >
        {/* Pill / Tag */}
        <motion.div variants={fadeInUp} className="mb-8 flex justify-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-1.5 text-xs font-medium text-slate-400 tracking-wide">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            B.IT Cybersecurity @ Monash University
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={fadeInUp}
          className="gradient-text-hero text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight"
        >
          I build user-centered software across mobile, systems, security, and
          product.
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={fadeInUp}
          className="mx-auto mt-6 max-w-2xl text-lg md:text-xl text-slate-400 leading-relaxed"
        >
          Product-focused developer bridging user empathy, technical execution,
          and business outcomes — with a foundation in human-centered care.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={fadeInUp}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          {/* Primary — View Projects */}
          <a
            href="#projects"
            className="inline-flex items-center gap-2 rounded-xl bg-blue-500 px-6 py-3 text-sm font-medium text-white hover:bg-blue-600 transition-colors duration-200 cursor-pointer"
          >
            View Projects
            <ArrowRight className="h-4 w-4" />
          </a>

          {/* Secondary — Resume */}
          <a
            href="#"
            className="inline-flex items-center gap-2 rounded-xl border border-white/[0.1] bg-white/[0.03] px-6 py-3 text-sm font-medium text-slate-300 hover:border-blue-500/30 hover:text-slate-100 transition-all duration-200 cursor-pointer"
          >
            <FileText className="h-4 w-4" />
            Resume
          </a>

          {/* Tertiary — Contact */}
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-4 py-3 text-sm font-medium text-slate-400 hover:text-slate-100 transition-colors duration-200 cursor-pointer"
          >
            <Mail className="h-4 w-4" />
            Contact
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default Hero;
