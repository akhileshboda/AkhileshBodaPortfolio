import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
import { fadeInUp, defaultViewport } from '@/utils/animations';
import { GraduationCap, Crosshair, Sparkles, Heart } from 'lucide-react';

const infoItems = [
  {
    icon: GraduationCap,
    label: 'Currently',
    value: 'Bach IT · Cybersecurity, Monash University',
  },
  {
    icon: Crosshair,
    label: 'Focus',
    value: 'Product-Focused Development',
  },
  {
    icon: Sparkles,
    label: 'Interests',
    value: 'Mobile, Security, AI, Systems',
  },
  {
    icon: Heart,
    label: 'Approach',
    value: 'User-Centered, Empathy-Driven',
  },
];

function AboutStory() {
  const reduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center'],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section id="about" className="py-24 md:py-32">
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
            Origin Story
          </h2>
          <p className="mt-3 text-slate-400 text-lg max-w-xl">
            From human-centered care to human-centered code — the path that
            shapes how I build.
          </p>
        </motion.div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left — Narrative with Scroll Line */}
          <div ref={containerRef} className="relative flex">
            {/* Scroll-linked Timeline Line */}
            <div className="absolute left-0 top-2 bottom-6 w-[2px] bg-white/[0.05] rounded-full hidden md:block">
              <motion.div 
                className="absolute top-0 left-0 w-full bg-blue-500 rounded-full shadow-[0_0_12px_rgba(59,130,246,0.6)]"
                style={{ height: reduceMotion ? '100%' : lineHeight }}
              />
            </div>
            
            <div className="space-y-12 md:pl-8">
              <motion.div
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={defaultViewport}
                className="relative"
              >
                {/* Timeline Dot */}
                <div className="absolute -left-[37px] top-2 h-3 w-3 rounded-full border-2 border-[#020611] bg-slate-600 hidden md:block transition-colors duration-500" />
                <p className="text-slate-300 leading-relaxed text-lg">
                  My path into technology started in an unexpected place — physical
                  therapy and human-centered care. Working directly with people
                  taught me to listen before acting, to understand needs before
                  proposing solutions, and to measure success by real outcomes rather
                  than assumptions.
                </p>
              </motion.div>

              <motion.div
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={defaultViewport}
                className="relative"
              >
                <div className="absolute -left-[37px] top-2 h-3 w-3 rounded-full border-2 border-[#020611] bg-slate-500 hidden md:block transition-colors duration-500" />
                <p className="text-slate-300 leading-relaxed text-lg">
                  That experience reshaped how I think about software. Technology is
                  most powerful when it serves real human needs — when it&apos;s
                  built with the same empathy and precision that good care demands. I
                  didn&apos;t leave that mindset behind when I entered IT. I brought
                  it with me.
                </p>
              </motion.div>

              <motion.div
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={defaultViewport}
                className="relative"
              >
                <div className="absolute -left-[37px] top-2 h-3 w-3 rounded-full border-2 border-[#020611] bg-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.8)] hidden md:block transition-colors duration-500" />
                <p className="text-slate-300 leading-relaxed text-lg">
                  Today, I&apos;m a Bachelor of Information Technology student at
                  Monash University, majoring in Cybersecurity, building across
                  mobile development, secure systems, and product-focused software.
                  Every project I take on is shaped by a simple question:{' '}
                  <span className="text-slate-100 font-medium italic">
                    does this genuinely serve the person using it?
                  </span>
                </p>
              </motion.div>
            </div>
          </div>

          {/* Right — Info Card */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
          >
            <div className="group rounded-2xl border border-white/[0.06] bg-[#16161D] p-8 space-y-6 relative overflow-hidden transition-colors duration-500 hover:border-blue-500/20">
              {/* Background ambient hover glow */}
              <div className="pointer-events-none absolute -bottom-20 -right-20 h-48 w-48 rounded-full bg-blue-500/0 blur-[60px] transition-all duration-500 group-hover:bg-blue-500/10" />

              {infoItems.map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.div 
                    key={item.label} 
                    className="flex items-start gap-4 relative z-10"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={defaultViewport}
                    transition={{ delay: i * 0.1, duration: 0.4 }}
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 transition-colors duration-300 group-hover:bg-blue-500/20">
                      <Icon className="h-5 w-5 text-blue-400 transition-transform duration-300 group-hover:scale-110" />
                    </div>
                    <div>
                      <span className="block text-xs font-medium uppercase tracking-wider text-slate-500">
                        {item.label}
                      </span>
                      <span className="mt-0.5 block text-sm text-slate-200">
                        {item.value}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default AboutStory;
