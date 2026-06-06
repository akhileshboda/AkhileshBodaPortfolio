import { motion, useReducedMotion } from 'motion/react';
import { staggerContainer, fadeInUp, defaultViewport } from '@/utils/animations';
import { identityPillars } from '@/data/skills';

function IdentityPillars() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="pillars" className="py-24 md:py-32 bg-[#111118]/50">
      <div className="mx-auto max-w-6xl px-6">
        {/* Section heading */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold gradient-text-blue">
            What I Bring
          </h2>
          <p className="mt-3 text-slate-400 text-lg max-w-2xl">
            Six dimensions that define how I approach technology, product
            development, and professional execution.
          </p>
        </motion.div>

        {/* Card grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {identityPillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <motion.article
                key={pillar.title}
                variants={fadeInUp}
                whileHover={reduceMotion ? undefined : { y: -4 }}
                className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-[#16161D] p-6 cursor-default transition-all duration-300 hover:border-blue-500/30 hover:bg-[#1a1a24]"
              >
                {/* Background ambient hover glow */}
                <div className="pointer-events-none absolute -top-16 -right-16 h-32 w-32 rounded-full bg-blue-500/0 blur-[50px] transition-all duration-500 group-hover:bg-blue-500/10" />

                {/* Icon */}
                <motion.div 
                  className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 border border-white/[0.02] shadow-[0_4px_12px_rgba(0,0,0,0.1)] transition-colors duration-300 group-hover:bg-blue-500/20 group-hover:border-blue-500/20"
                  whileHover={reduceMotion ? undefined : { rotate: 5, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Icon className="h-6 w-6 text-blue-400" />
                </motion.div>

                {/* Title */}
                <h3 className="text-lg font-semibold text-slate-100 transition-colors duration-200 group-hover:text-blue-400">
                  {pillar.title}
                </h3>

                {/* Description */}
                <p className="mt-2 text-sm text-slate-400 leading-relaxed transition-colors duration-200 group-hover:text-slate-300">
                  {pillar.description}
                </p>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

export default IdentityPillars;
