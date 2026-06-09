import { motion, useReducedMotion } from 'motion/react';
import type { LucideIcon } from 'lucide-react';

export interface IdentityCardData {
  /** Mono uppercase label, rendered in Human Spark yellow */
  label: string;
  icon: LucideIcon;
  /** One or more value lines; the first is the primary near-white line */
  value: string[];
}

interface OriginIdentityCardProps extends IdentityCardData {
  index: number;
}

/**
 * Frosted-glass identity card. Default: translucent navy + backdrop blur + 1px
 * top-light. Hover: border brightens, surface firms up, subtle cyan glow + a
 * 2-3px lift. Yellow is reserved for the label/icon (the "human spark"); the
 * value text stays near-white. Fully readable without hover.
 */
function OriginIdentityCard({ label, icon: Icon, value, index }: OriginIdentityCardProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35, margin: '-40px' }}
      transition={{
        duration: 0.5,
        delay: index * 0.08,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      whileHover={reduceMotion ? undefined : { y: -3 }}
      className="group relative flex min-h-[7rem] cursor-default flex-col overflow-hidden rounded-xl border border-white/[0.08] bg-surface/55 p-4 backdrop-blur-md transition-[border-color,background-color,box-shadow] duration-300 hover:border-white/[0.16] hover:bg-surface/75 hover:shadow-[0_12px_34px_-16px_rgba(56,214,255,0.32)] md:p-5"
    >
      {/* 1px top-light border — catches the light from above */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent"
      />
      {/* Ambient cyan glow blob, revealed on hover */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-12 -right-12 h-28 w-28 rounded-full bg-cyan-500/0 blur-[42px] transition-colors duration-500 group-hover:bg-cyan-500/[0.09]"
      />

      {/* Label + spark icon */}
      <div className="relative z-10 flex items-center gap-2">
        <Icon
          aria-hidden="true"
          className="h-3.5 w-3.5 shrink-0 text-human-spark/90 transition-opacity duration-300 group-hover:text-human-spark"
        />
        <span className="font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-human-spark/90 transition-colors duration-300 group-hover:text-human-spark">
          {label}
        </span>
      </div>

      {/* Value lines — pushed to the bottom so the grid baselines align */}
      <div className="relative z-10 mt-auto space-y-0.5 pt-3">
        {value.map((line, i) => (
          <p
            key={line}
            className={
              i === 0
                ? 'text-sm font-medium leading-snug text-slate-100'
                : 'text-[13px] leading-snug text-slate-400'
            }
          >
            {line}
          </p>
        ))}
      </div>
    </motion.div>
  );
}

export default OriginIdentityCard;
