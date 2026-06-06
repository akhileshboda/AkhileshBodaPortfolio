import { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { fadeInUp, staggerContainer, defaultViewport } from '@/utils/animations';

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
  const reduceMotion = useReducedMotion();
  const [typedText, setTypedText] = useState('');
  const fullText = '~/akhilos $';

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    let currentIndex = 0;
    
    const typeNextChar = () => {
      if (currentIndex < fullText.length) {
        setTypedText(fullText.slice(0, currentIndex + 1));
        currentIndex++;
        timeout = setTimeout(typeNextChar, 100);
      }
    };

    // Start typing after a short delay
    const startTimeout = setTimeout(typeNextChar, 500);

    return () => {
      clearTimeout(timeout);
      clearTimeout(startTimeout);
    };
  }, []);

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
            whileHover={reduceMotion ? undefined : { y: -2 }}
            className="group relative rounded-2xl border border-white/[0.06] bg-[#16161D] p-8 overflow-hidden transition-colors duration-300 hover:border-emerald-500/30 hover:bg-[#1a1c23]"
          >
            {/* Background subtle terminal glow */}
            <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-emerald-500/5 blur-[100px] transition-opacity duration-300 group-hover:bg-emerald-500/10" />

            {/* Terminal header */}
            <div className="flex items-center">
              <p className="font-mono text-sm text-emerald-400">
                {typedText}
                <motion.span
                  className="ml-1 inline-block h-4 w-2 bg-emerald-400 align-middle"
                  animate={{ opacity: [1, 0] }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    repeatType: 'reverse',
                    ease: 'easeInOut',
                  }}
                />
              </p>
            </div>

            <h3 className="mt-4 text-2xl font-bold text-slate-100 transition-colors duration-300 group-hover:text-emerald-400">
              AkhilOS
            </h3>

            <p className="mt-3 text-sm leading-relaxed text-slate-400">
              A Raspberry Pi-powered personal command center designed for
              managing workflows, shortcuts, AI tool integrations, and systems
              experimentation. Part terminal, part dashboard, part laboratory.
            </p>

            {/* Feature list */}
            <motion.ul 
              className="mt-6 space-y-3"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={defaultViewport}
            >
              {akhilosFeatures.map((feature) => (
                <motion.li 
                  key={feature} 
                  variants={fadeInUp}
                  className="flex items-center gap-3"
                >
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                  <span className="text-sm text-slate-400 transition-colors duration-200 group-hover:text-slate-300">{feature}</span>
                </motion.li>
              ))}
            </motion.ul>
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
            <motion.div 
              className="mt-6 grid grid-cols-2 gap-4"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={defaultViewport}
            >
              {aiItems.map((item) => (
                <motion.div
                  key={item.title}
                  variants={fadeInUp}
                  whileHover={reduceMotion ? undefined : { y: -2, scale: 1.02 }}
                  className="group/item cursor-default rounded-xl border border-white/[0.06] bg-[#0A0A0F] p-4 transition-all duration-300 hover:border-blue-500/30 hover:bg-[#12121a] hover:shadow-[0_0_20px_rgba(59,130,246,0.1)]"
                >
                  <h4 className="text-sm font-semibold text-slate-200 transition-colors duration-200 group-hover/item:text-blue-400">
                    {item.title}
                  </h4>
                  <p className="mt-1 text-xs text-slate-500 transition-colors duration-200 group-hover/item:text-slate-400">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
