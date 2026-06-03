import { motion } from 'motion/react';
import { staggerContainer, fadeInUp, defaultViewport } from '@/utils/animations';
import { identityPillars } from '@/data/skills';

function IdentityPillars() {
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
                className="group rounded-2xl border border-white/[0.06] bg-[#16161D] p-6 card-glow cursor-pointer"
              >
                {/* Icon */}
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 transition-colors duration-200 group-hover:bg-blue-500/15">
                  <Icon className="h-6 w-6 text-blue-400" />
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold text-slate-100">
                  {pillar.title}
                </h3>

                {/* Description */}
                <p className="mt-2 text-sm text-slate-400 leading-relaxed">
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
