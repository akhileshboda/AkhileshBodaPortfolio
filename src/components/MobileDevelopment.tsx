import { motion, useReducedMotion } from 'motion/react';
import { fadeInUp, staggerContainer, defaultViewport } from '@/utils/animations';
import { mobilePlatforms } from '@/data/skills';

export default function MobileDevelopment() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="mobile" className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        {/* Header */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
        >
          <h2 className="text-3xl font-bold tracking-tight gradient-text-blue md:text-4xl">
            Mobile Development
          </h2>
          <p className="mt-4 max-w-2xl text-slate-400">
            Native and cross-platform mobile development is a core professional
            direction — not a side interest.
          </p>
        </motion.div>

        {/* Platform cards */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-3"
        >
          {mobilePlatforms.map((platform) => (
            <motion.div
              key={platform.platform}
              variants={fadeInUp}
              whileHover={reduceMotion ? undefined : { y: -8, scale: 1.02 }}
              className="group relative flex flex-col overflow-hidden rounded-[2rem] border-[4px] border-[#1f2029] bg-[#0A0A0F] shadow-2xl transition-all duration-300 hover:border-blue-500/20 hover:shadow-[0_20px_40px_-15px_rgba(59,130,246,0.15)]"
              style={{ aspectRatio: '9/18' }} // Tall phone ratio
            >
              {/* Fake device notch/island */}
              <div className="absolute top-2 left-1/2 h-5 w-24 -translate-x-1/2 rounded-full bg-[#16161D] shadow-[inset_0_1px_3px_rgba(0,0,0,0.5)] z-20 transition-colors duration-300 group-hover:bg-[#1a1a24]" />
              
              {/* Screen Content Area */}
              <div className="flex flex-1 flex-col relative z-10 px-8 pt-16 pb-8 bg-gradient-to-b from-[#111118] to-[#0A0A0F]">
                
                {/* Platform name with gradient accent */}
                <h3
                  className={`bg-gradient-to-r ${platform.accent} bg-clip-text text-3xl font-bold text-transparent tracking-tight`}
                >
                  {platform.platform}
                </h3>

                {/* Subtitle */}
                <p className="mt-2 text-xs font-semibold uppercase tracking-widest text-slate-500">
                  {platform.subtitle}
                </p>

                {/* Description */}
                <p className="mt-6 text-sm leading-relaxed text-slate-400">
                  {platform.description}
                </p>

                {/* Technologies */}
                <div className="mt-auto flex flex-wrap gap-2 pt-8">
                  {platform.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-white/[0.04] bg-white/[0.02] px-3 py-1 font-mono text-[11px] text-slate-300 shadow-sm transition-colors duration-200 group-hover:bg-blue-500/10 group-hover:border-blue-500/20 group-hover:text-blue-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Ambient Glow from Bottom */}
              <div className="pointer-events-none absolute -bottom-16 left-1/2 h-32 w-full -translate-x-1/2 rounded-full bg-blue-500/5 blur-[40px] transition-opacity duration-500 group-hover:bg-blue-500/15" />
            </motion.div>
          ))}
        </motion.div>

        {/* Closing paragraph */}
        <motion.p
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          className="mx-auto mt-16 max-w-3xl text-center text-sm leading-relaxed text-slate-400"
        >
          I believe in choosing the right tool for the right platform. Native
          development delivers the highest-quality user experience, while
          cross-platform development serves genuine reach requirements. Both have
          a place in a thoughtful mobile strategy.
        </motion.p>
      </div>
    </section>
  );
}
