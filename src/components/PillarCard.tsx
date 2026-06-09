import { motion, useReducedMotion } from 'motion/react';
import type { LucideIcon } from 'lucide-react';

interface PillarCardProps {
  number: string;
  title: string;
  copy: string;
  icon: LucideIcon;
  /** This pillar (and every pillar before it) has been scrolled past */
  active: boolean;
  /** This is the current frontier pillar — the live scroll position */
  frontier: boolean;
}

/**
 * One temple column. A frosted-glass content card sits on a shaft that fills
 * upward when the pillar activates. Mirrors OriginIdentityCard's glass + hover
 * recipe exactly. Activation is conveyed by opacity, brightness, a filled-vs-
 * hollow state node (shape, not colour alone) and — only on the frontier — a
 * yellow "human spark" accent. Fully readable without scroll or hover.
 */
function PillarCard({ number, title, copy, icon: Icon, active, frontier }: PillarCardProps) {
  const reduce = useReducedMotion();

  return (
    <motion.article
      whileHover={reduce ? undefined : { y: -3 }}
      className={`group relative flex h-full cursor-default flex-col overflow-hidden rounded-xl border bg-surface/55 p-4 backdrop-blur-md transition-[border-color,background-color,box-shadow,opacity] duration-500 hover:border-white/[0.16] hover:bg-surface/75 hover:!opacity-100 hover:shadow-[0_12px_34px_-16px_rgba(56,214,255,0.32)] md:p-5 ${
        active ? 'border-white/[0.12] opacity-100' : 'border-white/[0.07] opacity-60'
      }`}
    >
      {/* 1px top-light border — catches the light from above */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent"
      />

      {/* Shaft fill — rises from the base as the pillar activates */}
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute inset-x-0 bottom-0 origin-bottom bg-gradient-to-t from-cyan-400/[0.10] via-blue-500/[0.05] to-transparent transition-[height,opacity] duration-700 ease-out ${
          active ? 'h-full opacity-100' : 'h-0 opacity-0'
        }`}
      />

      {/* Ambient glow blob — reveals on hover; tinted by current state */}
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute -bottom-12 -right-10 h-28 w-28 rounded-full blur-[42px] transition-colors duration-500 group-hover:bg-cyan-500/[0.10] ${
          frontier ? 'bg-human-spark/[0.06]' : active ? 'bg-cyan-500/[0.06]' : 'bg-cyan-500/0'
        }`}
      />

      {/* Number + state node */}
      <div className="relative z-10 flex items-center justify-between">
        <span
          className={`font-mono text-[11px] font-medium tracking-[0.1em] transition-colors duration-500 ${
            frontier
              ? 'text-human-spark'
              : active
                ? 'text-cyan-200/90'
                : 'text-slate-500 group-hover:text-slate-300'
          }`}
        >
          {number}
        </span>
        <span className="relative grid h-4 w-4 place-items-center">
          <span
            className={`h-2 w-2 rounded-full border transition-all duration-500 ${
              frontier
                ? 'border-human-spark bg-human-spark shadow-[0_0_8px_1px_rgba(255,214,0,0.5)]'
                : active
                  ? 'border-cyan-300/70 bg-cyan-300/80'
                  : 'border-white/25 bg-transparent'
            }`}
          />
          {frontier && !reduce && (
            <motion.span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 rounded-full bg-human-spark/30"
              animate={{ scale: [1, 2.1, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2.6, repeat: Infinity, ease: 'easeOut' }}
            />
          )}
        </span>
      </div>

      {/* Icon */}
      <div
        className={`relative z-10 mt-4 flex h-10 w-10 items-center justify-center rounded-lg border transition-colors duration-500 group-hover:border-cyan-400/25 group-hover:bg-cyan-500/15 ${
          active ? 'border-cyan-400/20 bg-cyan-500/10' : 'border-white/[0.05] bg-white/[0.03]'
        }`}
      >
        <Icon
          aria-hidden="true"
          className={`h-5 w-5 transition-colors duration-500 ${
            active ? 'text-cyan-200' : 'text-slate-400 group-hover:text-cyan-200/90'
          }`}
        />
      </div>

      {/* Title */}
      <h3
        className={`relative z-10 mt-4 text-[15px] font-semibold leading-snug transition-colors duration-500 ${
          active ? 'text-slate-50' : 'text-slate-300 group-hover:text-slate-100'
        }`}
      >
        {title}
      </h3>

      {/* Copy */}
      <p className="relative z-10 mt-2 text-[13px] leading-relaxed text-slate-400">{copy}</p>
    </motion.article>
  );
}

export default PillarCard;
