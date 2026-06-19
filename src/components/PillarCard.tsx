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
 * Frosted-glass content card that sits in front of a temple column. Three
 * scroll-driven states — completed (cyan), current (yellow "human spark"),
 * inactive (muted) — conveyed by opacity + border weight + node shape, not
 * colour alone. Mirrors OriginIdentityCard's glass + hover recipe; readable
 * without scroll or hover.
 */
function PillarCard({ number, title, copy, icon: Icon, active, frontier }: PillarCardProps) {
  const reduce = useReducedMotion();
  const state = frontier ? 'current' : active ? 'completed' : 'inactive';

  return (
    <motion.article
      tabIndex={0}
      whileFocus={reduce ? undefined : { y: -2 }}
      whileHover={reduce ? undefined : { y: -2 }}
      className={`group relative flex h-full cursor-default flex-col overflow-hidden rounded-[0.625rem] border bg-[linear-gradient(180deg,rgba(10,22,45,0.76),rgba(6,12,26,0.64))] p-3 text-left backdrop-blur-md transition-[border-color,background-color,box-shadow,opacity] duration-500 hover:bg-[linear-gradient(180deg,rgba(15,31,61,0.84),rgba(8,16,34,0.72))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/60 focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary ${
        state === 'current'
          ? 'border-human-spark/55 shadow-[0_0_28px_-14px_rgba(255,214,0,0.6)]'
          : state === 'completed'
            ? 'border-cyan-300/30 shadow-[0_0_24px_-18px_rgba(56,214,255,0.55)] hover:border-cyan-200/50'
            : 'border-slate-500/12 opacity-75 hover:border-cyan-200/22 hover:opacity-95'
      }`}
    >
      {/* 1px top-light */}
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent ${
          state === 'current' ? 'via-human-spark/45' : 'via-cyan-200/24'
        } to-transparent`}
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-4 top-7 h-px bg-gradient-to-r from-transparent via-cyan-300/10 to-transparent"
      />
      {/* ambient glow blob, tinted by state */}
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute bottom-0 right-0 h-20 w-20 rounded-full blur-[36px] transition-colors duration-500 ${
          state === 'current'
            ? 'bg-human-spark/[0.10]'
              : state === 'completed'
                ? 'bg-cyan-500/[0.08]'
                : 'bg-cyan-500/0 group-hover:bg-cyan-500/[0.07]'
        }`}
      />
      {/* inset architectural brackets */}
      <span aria-hidden="true" className="pointer-events-none absolute left-2 top-2 h-5 w-5 border-l border-t border-cyan-200/18" />
      <span aria-hidden="true" className="pointer-events-none absolute right-2 top-2 h-5 w-5 border-r border-t border-cyan-200/18" />
      <span aria-hidden="true" className="pointer-events-none absolute bottom-2 left-2 h-5 w-5 border-b border-l border-cyan-200/12" />
      <span aria-hidden="true" className="pointer-events-none absolute bottom-2 right-2 h-5 w-5 border-b border-r border-cyan-200/12" />

      {/* number + state node */}
      <div className="relative z-10 flex items-center justify-between">
        <span
          className={`font-mono text-[11px] font-medium tracking-[0.1em] transition-colors duration-500 ${
            state === 'current'
              ? 'text-human-spark'
              : state === 'completed'
                ? 'text-cyan-200/90'
                : 'text-slate-500 group-hover:text-slate-400'
          }`}
        >
          {number}
        </span>
        <span className="relative grid h-4 w-4 place-items-center">
          <span
            className={`rounded-full border transition-all duration-500 ${
              state === 'current'
                ? 'h-2 w-2 border-human-spark bg-human-spark shadow-[0_0_8px_1px_rgba(255,214,0,0.5)]'
                : state === 'completed'
                  ? 'h-2 w-2 border-cyan-300/70 bg-cyan-300/80'
                  : 'h-1.5 w-1.5 border-white/25 bg-transparent'
            }`}
          />
          {state === 'current' && !reduce && (
            <motion.span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 rounded-full bg-human-spark/30"
              animate={{ scale: [1, 2.1, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2.6, repeat: Infinity, ease: 'easeOut' }}
            />
          )}
        </span>
      </div>

      {/* icon */}
      <div
        className={`relative z-10 mt-2.5 flex h-8 w-8 items-center justify-center rounded-md border transition-colors duration-500 ${
          state === 'current'
            ? 'border-human-spark/40 bg-human-spark/[0.07]'
            : state === 'completed'
              ? 'border-cyan-300/25 bg-cyan-500/10'
              : 'border-white/[0.07] bg-white/[0.03] group-hover:border-cyan-200/18'
        }`}
      >
        <Icon
          aria-hidden="true"
          className={`h-4 w-4 transition-colors duration-500 ${
            state === 'current'
              ? 'text-human-spark'
              : state === 'completed'
                ? 'text-cyan-200'
                : 'text-slate-400'
          }`}
        />
      </div>

      {/* title + copy */}
      <h3
        className={`relative z-10 mt-3 text-sm font-semibold leading-snug transition-colors duration-500 md:text-[15px] ${
          active ? 'text-slate-50' : 'text-slate-300'
        }`}
      >
        {title}
      </h3>
      <p className="relative z-10 mt-1.5 text-[13px] leading-relaxed text-slate-400">{copy}</p>
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute bottom-3 left-3 right-3 h-px bg-gradient-to-r from-transparent ${
          state === 'current'
            ? 'via-human-spark/40'
            : state === 'completed'
              ? 'via-cyan-300/25'
              : 'via-white/10'
        } to-transparent`}
      />
    </motion.article>
  );
}

export default PillarCard;
