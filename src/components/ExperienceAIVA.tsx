import { motion } from 'motion/react';
import { fadeInUp, defaultViewport } from '@/utils/animations';

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
          className="mt-10 rounded-2xl border border-white/[0.06] bg-[#16161D] p-8 md:p-12"
        >
          {/* Company header */}
          <div>
            <h3 className="text-xl font-semibold text-slate-100">AIVA</h3>
            <p className="mt-1 text-sm text-slate-500">Product Operations</p>
          </div>

          {/* Separator */}
          <div className="section-divider my-6" />

          {/* Description */}
          <p className="text-slate-300 leading-relaxed">
            At AIVA, I worked within the product operations function, gaining
            direct exposure to how products move from concept through execution.
            This role involved coordinating across stakeholders, supporting
            product workflows, managing operational processes, and contributing
            to the systems that keep product teams aligned and effective.
          </p>

          <p className="mt-4 text-slate-300 leading-relaxed">
            This experience shaped my understanding of product execution beyond
            code — the coordination, prioritisation, communication, and
            stakeholder alignment that determine whether good ideas actually
            ship.
          </p>

          {/* Highlight cards */}
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {highlights.map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-white/[0.06] bg-[#0A0A0F] p-4"
              >
                <h4 className="text-sm font-semibold text-slate-200">
                  {item.title}
                </h4>
                <p className="mt-1 text-xs text-slate-400">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
