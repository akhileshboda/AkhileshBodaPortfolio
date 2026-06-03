import { motion } from 'motion/react';
import { fadeInUp, defaultViewport } from '@/utils/animations';
import { GraduationCap, Crosshair, Sparkles, Heart } from 'lucide-react';

const infoItems = [
  {
    icon: GraduationCap,
    label: 'Currently',
    value: 'B.IT Cybersecurity, Monash University',
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
          {/* Left — Narrative */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            className="space-y-6"
          >
            <p className="text-slate-300 leading-relaxed">
              My path into technology started in an unexpected place — physical
              therapy and human-centered care. Working directly with people
              taught me to listen before acting, to understand needs before
              proposing solutions, and to measure success by real outcomes rather
              than assumptions.
            </p>
            <p className="text-slate-300 leading-relaxed">
              That experience reshaped how I think about software. Technology is
              most powerful when it serves real human needs — when it&apos;s
              built with the same empathy and precision that good care demands. I
              didn&apos;t leave that mindset behind when I entered IT. I brought
              it with me.
            </p>
            <p className="text-slate-300 leading-relaxed">
              Today, I&apos;m a Bachelor of Information Technology student at
              Monash University, majoring in Cybersecurity, building across
              mobile development, secure systems, and product-focused software.
              Every project I take on is shaped by a simple question:{' '}
              <span className="text-slate-100 font-medium italic">
                does this genuinely serve the person using it?
              </span>
            </p>
          </motion.div>

          {/* Right — Info Card */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
          >
            <div className="rounded-2xl border border-white/[0.06] bg-[#16161D] p-8 space-y-6">
              {infoItems.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-500/10">
                      <Icon className="h-5 w-5 text-blue-400" />
                    </div>
                    <div>
                      <span className="block text-xs font-medium uppercase tracking-wider text-slate-500">
                        {item.label}
                      </span>
                      <span className="mt-0.5 block text-sm text-slate-200">
                        {item.value}
                      </span>
                    </div>
                  </div>
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
