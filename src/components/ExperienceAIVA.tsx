import { motion, useReducedMotion } from 'motion/react';
import { fadeInUp, staggerContainer, defaultViewport } from '@/utils/animations';

const highlights = [
  {
    title: 'Product Execution',
    description: 'Supported the lifecycle from ideation to delivery',
  },
  {
    title: 'Stakeholder Coordination',
    description: 'Bridged technical and non-technical teams',
  },
  {
    title: 'Operational Workflows',
    description: 'Maintained and improved product processes',
  },
  {
    title: 'Product Thinking',
    description: 'Developed intuition for prioritisation and scope',
  },
];

export default function ExperienceAIVA() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="experience" className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <motion.h2
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          className="text-3xl font-bold tracking-tight gradient-text-blue md:text-4xl"
        >
          Product Operations Experience
        </motion.h2>

        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          className="mt-10 relative overflow-hidden rounded-2xl border border-white/[0.06] bg-[#16161D] p-8 md:p-12 transition-colors duration-500 hover:border-blue-500/20"
        >
          {/* Subtle background glow */}
          <div className="pointer-events-none absolute -top-32 -left-32 h-64 w-64 rounded-full bg-blue-500/5 blur-[80px]" />

          {/* Company header */}
          <div className="relative z-10">
            <h3 className="text-xl font-semibold text-slate-100">AIVA</h3>
            <p className="mt-1 text-sm text-slate-500">Product Operations</p>
          </div>

          {/* Separator */}
          <div className="section-divider my-6 relative z-10" />

          {/* Description */}
          <div className="relative z-10 space-y-4">
            <p className="text-slate-300 leading-relaxed">
              At AIVA, I worked within the product operations function, gaining
              direct exposure to how products move from concept through execution.
              This role involved coordinating across stakeholders, supporting
              product workflows, managing operational processes, and contributing
              to the systems that keep product teams aligned and effective.
            </p>

            <p className="text-slate-300 leading-relaxed">
              This experience shaped my understanding of product execution beyond
              code — the coordination, prioritisation, communication, and
              stakeholder alignment that determine whether good ideas actually
              ship.
            </p>
          </div>

          {/* Highlight cards */}
          <motion.div 
            className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 relative z-10"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
          >
            {highlights.map((item) => (
              <motion.div
                key={item.title}
                variants={fadeInUp}
                whileHover={reduceMotion ? undefined : { x: 4 }}
                className="group relative overflow-hidden rounded-xl border border-white/[0.06] bg-[#0A0A0F] p-5 transition-all duration-300 hover:bg-[#12121a] hover:border-blue-500/30"
              >
                {/* Glowing Left Timeline Indicator */}
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-white/[0.05] transition-colors duration-300 group-hover:bg-blue-400" />
                
                <h4 className="text-sm font-semibold text-slate-200 pl-2 transition-colors duration-200 group-hover:text-blue-100">
                  {item.title}
                </h4>
                <p className="mt-1.5 text-xs leading-relaxed text-slate-400 pl-2 transition-colors duration-200 group-hover:text-slate-300">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
