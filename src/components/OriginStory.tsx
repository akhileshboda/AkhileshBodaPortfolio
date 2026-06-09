import { motion } from 'motion/react';
import { GraduationCap, Crosshair, Sparkles, Heart } from 'lucide-react';
import { staggerContainer, fadeInUp, defaultViewport } from '@/utils/animations';
import OriginIdentityCard, { type IdentityCardData } from '@/components/OriginIdentityCard';
import OriginJourneyGraph from '@/components/OriginJourneyGraph';

const identityCards: IdentityCardData[] = [
  {
    label: 'CURRENTLY',
    icon: GraduationCap,
    value: ['Bachelor of Information Technology · Cybersecurity', 'Monash University'],
  },
  {
    label: 'FOCUS',
    icon: Crosshair,
    value: ['Product-Focused Development'],
  },
  {
    label: 'INTERESTS',
    icon: Sparkles,
    value: ['Mobile · Security · AI · Systems'],
  },
  {
    label: 'APPROACH',
    icon: Heart,
    value: ['User-Centered · Empathy-Driven'],
  },
];

/**
 * Origin Story — a cinematic, technical-editorial spread.
 * Left zone: chapter identity + a 2×2 grid of frosted-glass identity cards
 * (yellow "human spark" accents). Right zone: a scroll-linked journey graph.
 * Keeps id="about" so ChapterNav scroll-spy continues to work.
 */
function OriginStory() {
  return (
    <section id="about" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 gap-x-10 gap-y-14 lg:grid-cols-12 lg:gap-x-14">
          {/* ── Left zone — identity ───────────────────────────────── */}
          <div className="lg:col-span-5">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={defaultViewport}
            >
              {/* Chapter metadata */}
              <motion.div variants={fadeInUp} className="mb-5 flex items-center gap-2.5">
                <span aria-hidden="true" className="h-3 w-px bg-accent-cyan/70" />
                <span className="font-mono text-xs uppercase tracking-[0.22em] text-text-tertiary">
                  <span className="text-accent-cyan">01</span> / Origin
                </span>
              </motion.div>

              {/* Heading */}
              <motion.h2
                variants={fadeInUp}
                className="text-4xl font-bold leading-[1.05] tracking-tight text-slate-50 md:text-5xl lg:text-[3.5rem]"
              >
                Origin Story
              </motion.h2>

              {/* Supporting line */}
              <motion.p
                variants={fadeInUp}
                className="mt-4 max-w-md text-lg leading-relaxed text-slate-400"
              >
                From human-centered care to{' '}
                <span className="text-slate-300">human-centered code.</span>
              </motion.p>
            </motion.div>

            {/* Identity cards — 2×2 */}
            <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 md:gap-4">
              {identityCards.map((card, i) => (
                <OriginIdentityCard key={card.label} {...card} index={i} />
              ))}
            </div>
          </div>

          {/* ── Right zone — journey graph ─────────────────────────── */}
          <div className="relative lg:col-span-7 lg:pl-14">
            {/* Architectural divider between zones (desktop) */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute bottom-2 left-0 top-2 hidden w-px bg-gradient-to-b from-transparent via-white/[0.08] to-transparent lg:block"
            />
            <OriginJourneyGraph />
          </div>
        </div>
      </div>
    </section>
  );
}

export default OriginStory;
