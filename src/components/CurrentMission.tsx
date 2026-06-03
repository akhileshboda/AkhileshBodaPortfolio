import { motion } from 'motion/react';
import { fadeInUp, defaultViewport } from '@/utils/animations';

const CurrentMission = () => {
  return (
    <section id="mission" className="py-24 md:py-32">
      <div className="max-w-3xl mx-auto px-6 text-center">
        {/* Pill label */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
        >
          <span className="inline-flex text-xs font-mono text-blue-400 uppercase tracking-widest px-4 py-2 rounded-full border border-blue-500/20 bg-blue-500/5">
            Current Direction
          </span>
        </motion.div>

        {/* Main statement */}
        <motion.h2
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-100 mt-8 leading-tight"
        >
          My next step is entering industry as a product-focused developer —
          bridging users, business needs, technical implementation, and product
          outcomes.
        </motion.h2>

        {/* Supporting text */}
        <motion.p
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          className="mt-6 text-slate-400 text-base md:text-lg leading-relaxed"
        >
          I&apos;m looking for a role where I can contribute to products that
          matter, work alongside strong teams, and continue growing at the
          intersection of mobile development, secure systems, and user-centered
          design.
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          className="mt-10 flex gap-4 justify-center flex-wrap"
        >
          <a
            href="#contact"
            className="inline-flex items-center px-6 py-3 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-medium text-sm transition-colors duration-200 cursor-pointer"
          >
            Get in Touch
          </a>
          <a
            href="#"
            className="inline-flex items-center px-6 py-3 rounded-xl border border-white/[0.06] hover:border-blue-500/30 text-slate-300 hover:text-slate-100 font-medium text-sm transition-colors duration-200 cursor-pointer"
          >
            View Resume
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default CurrentMission;
