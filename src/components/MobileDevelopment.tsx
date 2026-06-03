import { motion } from 'motion/react';
import { fadeInUp, staggerContainer, defaultViewport } from '@/utils/animations';
import { mobilePlatforms } from '@/data/skills';

export default function MobileDevelopment() {
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
          className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3"
        >
          {mobilePlatforms.map((platform) => (
            <motion.div
              key={platform.platform}
              variants={fadeInUp}
              className="card-glow rounded-2xl border border-white/[0.06] bg-[#16161D] p-8"
            >
              {/* Platform name with gradient accent */}
              <h3
                className={`bg-gradient-to-r ${platform.accent} bg-clip-text text-2xl font-bold text-transparent`}
              >
                {platform.platform}
              </h3>

              {/* Subtitle */}
              <p className="mt-1 text-sm font-medium uppercase tracking-wider text-slate-500">
                {platform.subtitle}
              </p>

              {/* Description */}
              <p className="mt-4 text-sm leading-relaxed text-slate-400">
                {platform.description}
              </p>

              {/* Technologies */}
              <div className="mt-6 flex flex-wrap gap-2">
                {platform.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-white/[0.06] bg-white/[0.04] px-3 py-1 font-mono text-xs text-slate-400"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Closing paragraph */}
        <motion.p
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          className="mx-auto mt-12 max-w-3xl text-center text-sm leading-relaxed text-slate-400"
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
