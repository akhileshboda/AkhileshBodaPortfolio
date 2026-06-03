import { motion } from 'motion/react';
import { timelineEvents } from '@/data/timeline';
import {
  fadeInUp,
  staggerContainer,
  timelineItem,
  defaultViewport,
} from '@/utils/animations';

const dotColor: Record<string, string> = {
  origin: 'bg-amber-400',
  education: 'bg-blue-400',
  project: 'bg-emerald-400',
  experience: 'bg-purple-400',
  direction: 'bg-blue-500',
};

const Timeline = () => {
  return (
    <section id="journey" className="py-24 md:py-32 bg-[#111118]/50">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section heading */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          className="text-center mb-20"
        >
          <motion.h2
            variants={fadeInUp}
            className="text-3xl md:text-4xl font-bold gradient-text-blue"
          >
            The Journey
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-slate-400 mt-4 max-w-2xl mx-auto text-base md:text-lg leading-relaxed"
          >
            From human-centered care to product-centric technology — key
            milestones along the way.
          </motion.p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="timeline-line" />

          <div className="space-y-12 md:space-y-16">
            {timelineEvents.map((event, index) => {
              const isLeft = index % 2 === 0;

              return (
                <motion.div
                  key={`${event.year}-${event.title}`}
                  variants={timelineItem(isLeft)}
                  initial="hidden"
                  whileInView="visible"
                  viewport={defaultViewport}
                  className={`relative flex items-start ${
                    isLeft
                      ? 'md:justify-start md:text-right'
                      : 'md:justify-end md:text-left'
                  }`}
                >
                  {/* Timeline dot */}
                  <div
                    className={`absolute w-4 h-4 rounded-full ring-4 ring-[#111118] ${
                      dotColor[event.category] ?? 'bg-slate-400'
                    } top-1 left-[24px] -translate-x-1/2 md:left-1/2 md:-translate-x-1/2 z-10`}
                  />

                  {/* Content */}
                  <div
                    className={`pl-16 md:pl-0 md:w-1/2 ${
                      isLeft ? 'md:pr-16' : 'md:pl-16'
                    }`}
                  >
                    <span className="text-sm font-mono text-slate-500">
                      {event.year}
                    </span>
                    <h3 className="text-lg font-semibold text-slate-100 mt-1">
                      {event.title}
                    </h3>
                    <p className="text-sm text-slate-400 mt-2 leading-relaxed">
                      {event.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;
