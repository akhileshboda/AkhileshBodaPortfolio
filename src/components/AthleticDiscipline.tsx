import { motion } from 'motion/react';
import { athleticDisciplines } from '@/data/skills';
import {
  staggerContainer,
  fadeInUp,
  defaultViewport,
} from '@/utils/animations';

const AthleticDiscipline = () => {
  return (
    <section id="athletics" className="py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section heading */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          className="text-center mb-16"
        >
          <motion.h2
            variants={fadeInUp}
            className="text-3xl md:text-4xl font-bold gradient-text-blue"
          >
            Discipline Beyond Code
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-slate-400 mt-4 max-w-2xl mx-auto text-base md:text-lg leading-relaxed"
          >
            Elite athletics shaped the consistency, resilience, and execution
            mindset I bring to professional work.
          </motion.p>
        </motion.div>

        {/* Cards grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          {athleticDisciplines.map((discipline) => (
            <motion.article
              key={discipline.sport}
              variants={fadeInUp}
              className="bg-[#16161D] border border-white/[0.06] rounded-2xl p-8 card-glow"
            >
              <h3 className="text-xl font-semibold text-slate-100">
                {discipline.sport}
              </h3>

              <span className="inline-flex mt-2 text-xs font-medium px-3 py-1 rounded-full bg-white/[0.04] text-slate-400 border border-white/[0.06]">
                {discipline.level}
              </span>

              <p className="text-sm font-medium text-blue-400 mt-4">
                {discipline.attribute}
              </p>

              <p className="text-sm text-slate-400 mt-3 leading-relaxed">
                {discipline.description}
              </p>
            </motion.article>
          ))}
        </motion.div>

        {/* Bottom paragraph */}
        <motion.p
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          className="mt-12 max-w-3xl mx-auto text-center text-slate-500 text-sm leading-relaxed"
        >
          These experiences are not listed for their own sake. They represent
          years of process-oriented work — the same approach I apply to learning
          new technologies, shipping products, and developing as a professional.
        </motion.p>
      </div>
    </section>
  );
};

export default AthleticDiscipline;
