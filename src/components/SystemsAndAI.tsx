import { motion } from 'motion/react';
import { fadeInUp, defaultViewport } from '@/utils/animations';

const akhilosFeatures = [
  'Custom workflow automation',
  'AI tool integration layer',
  'Personal infrastructure management',
  'Rapid prototyping environment',
];

const aiItems = [
  { title: 'Agentic AI', description: 'AI-driven development workflows' },
  { title: 'Local LLMs', description: 'On-device inference and experimentation' },
  { title: 'AI Prototyping', description: 'Rapid concept validation with AI assistance' },
  { title: 'Homelab Infrastructure', description: 'Self-hosted services and compute' },
];

export default function SystemsAndAI() {
  return (
    <section id="systems" className="bg-[#111118]/50 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        {/* Header */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
        >
          <h2 className="text-3xl font-bold tracking-tight gradient-text-blue md:text-4xl">
            Systems, Homelab &amp; AI
          </h2>
          <p className="mt-4 max-w-2xl text-slate-400">
            Practical experimentation with infrastructure, personal systems, and
            AI-assisted development.
          </p>
        </motion.div>

        {/* Two-column layout */}
        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Left — AkhilOS spotlight */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            className="rounded-2xl border border-white/[0.06] bg-[#16161D] p-8"
          >
            {/* Terminal header */}
            <p className="font-mono text-sm text-emerald-400">
              ~/akhilos $
              <motion.span
                className="ml-1 inline-block h-4 w-2 bg-emerald-400"
                animate={{ opacity: [1, 0] }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  repeatType: 'reverse',
                  ease: 'easeInOut',
                }}
              />
            </p>

            <h3 className="mt-4 text-2xl font-bold text-slate-100">AkhilOS</h3>

            <p className="mt-3 text-sm leading-relaxed text-slate-400">
              A Raspberry Pi-powered personal command center designed for
              managing workflows, shortcuts, AI tool integrations, and systems
              experimentation. Part terminal, part dashboard, part laboratory.
            </p>

            {/* Feature list */}
            <ul className="mt-6 space-y-3">
              {akhilosFeatures.map((feature) => (
                <li key={feature} className="flex items-center gap-3">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
                  <span className="text-sm text-slate-400">{feature}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Right — AI & Experimentation */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            className="rounded-2xl border border-white/[0.06] bg-[#16161D] p-8"
          >
            <h3 className="text-2xl font-bold text-slate-100">
              AI-Forward Development
            </h3>

            <p className="mt-3 text-sm leading-relaxed text-slate-400">
              I integrate AI capabilities directly into my development and
              prototyping workflows — not as a novelty, but as a genuine
              accelerant for building and shipping software.
            </p>

            {/* 2x2 grid */}
            <div className="mt-6 grid grid-cols-2 gap-4">
              {aiItems.map((item) => (
                <div
                  key={item.title}
                  className="rounded-xl border border-white/[0.06] bg-[#0A0A0F] p-4"
                >
                  <h4 className="text-sm font-semibold text-slate-200">
                    {item.title}
                  </h4>
                  <p className="mt-1 text-xs text-slate-500">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
