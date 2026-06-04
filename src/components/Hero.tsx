import { motion } from 'motion/react';
import { ArrowRight, FileText, Mail } from 'lucide-react';
import { heroStagger, fadeInUp } from '@/utils/animations';
import { profile } from '@/data/profile';
import OrbAnchor from '@/components/OrbAnchor';

function Hero() {
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
        <motion.div
          variants={fadeInUp}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          {/* Primary — View Projects */}
          <motion.a
            href="#projects"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 rounded-xl bg-blue-500 px-6 py-3 text-sm font-medium text-white shadow-[0_8px_30px_-8px_rgba(47,128,255,0.6)] transition-colors duration-200 hover:bg-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#020611] cursor-pointer"
          >
            View Projects
            <ArrowRight className="h-4 w-4" />
          </motion.a>

          {/* Secondary — Resume */}
          <motion.a
            href={profile.resume}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 rounded-xl border border-white/[0.1] bg-white/[0.03] px-6 py-3 text-sm font-medium text-slate-300 backdrop-blur-sm transition-all duration-200 hover:border-blue-500/30 hover:text-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#020611] cursor-pointer"
          >
            <FileText className="h-4 w-4" />
            Resume
          </motion.a>

          {/* Tertiary — Contact */}
          <motion.a
            href={profile.email}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 rounded-xl border border-white/[0.06] px-5 py-3 text-sm font-medium text-slate-400 transition-colors duration-200 hover:text-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#020611] cursor-pointer"
          >
            <Mail className="h-4 w-4" />
            Contact
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default Hero;
