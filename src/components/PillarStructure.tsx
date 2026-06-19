import { motion, type MotionValue } from 'motion/react';
import type { CSSProperties, ReactNode } from 'react';
import { pillars } from '@/data/skills';
import ParthenonFrame from '@/components/ParthenonFrame';
import PillarCard from '@/components/PillarCard';
import PillarProgressRail from '@/components/PillarProgressRail';
import { TEMPLE_BAYS, xPct, yPct, type TempleBay } from '@/components/pillarGeometry';
import logo from '@/assets/logo.png';

interface PillarStructureProps {
  progress: MotionValue<number>;
  activeIndex: number;
  reduce: boolean;
}

function cardSlotStyle(bay: TempleBay): CSSProperties {
  return {
    left: xPct(bay.card.x),
    top: yPct(bay.card.y),
    width: xPct(bay.card.width),
    height: yPct(bay.card.height),
  };
}

function entablaturePhraseStyle(): CSSProperties {
  return {
    left: xPct(270),
    top: yPct(319),
    width: xPct(900),
    height: yPct(31),
  };
}

function crestLogoStyle(): CSSProperties {
  return {
    left: xPct(720),
    top: yPct(176),
  };
}

function stateFor(index: number, activeIndex: number) {
  return {
    active: index <= activeIndex,
    frontier: index === activeIndex,
    completed: index < activeIndex,
  };
}

function TabletColumnShell({
  children,
  completed,
  frontier,
}: {
  children: ReactNode;
  completed: boolean;
  frontier: boolean;
}) {
  return (
    <div className="relative h-full min-h-[300px]">
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-x-0 -inset-y-3 rounded-lg border transition-colors duration-500 ${
          frontier
            ? 'border-human-spark/35 shadow-[0_0_24px_-16px_rgba(255,214,0,0.7)]'
            : completed
              ? 'border-cyan-300/22'
              : 'border-white/[0.07]'
        }`}
      >
        <span className="absolute -top-2 left-5 right-5 h-px bg-gradient-to-r from-transparent via-cyan-300/30 to-transparent" />
        <span className="absolute -bottom-2 left-8 right-8 h-px bg-gradient-to-r from-transparent via-cyan-300/20 to-transparent" />
        <span className="absolute left-4 top-0 h-full w-px bg-cyan-300/10" />
        <span className="absolute right-4 top-0 h-full w-px bg-cyan-300/10" />
      </div>
      {children}
    </div>
  );
}

function PillarStructure({ progress, activeIndex, reduce }: PillarStructureProps) {
  return (
    <div className="relative">
      <div className="hidden xl:block">
        <div className="relative mx-auto aspect-[1440/1000] w-full">
          <ParthenonFrame activeIndex={activeIndex} progress={progress} reduce={reduce} />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute z-20 flex items-center justify-center overflow-hidden border-y border-cyan-300/18 bg-bg-primary/90 px-5 font-mono text-[9px] uppercase tracking-[0.28em] text-cyan-100/55 shadow-[0_0_24px_rgba(3,10,24,0.9)] backdrop-blur-md xl:text-[10px]"
            style={entablaturePhraseStyle()}
          >
            <span className="whitespace-nowrap">
              PRINCIPLES ARE ARCHITECTURE · PRACTICE IS CONSTRUCTION
            </span>
          </div>

          <div
            aria-hidden="true"
            className="pointer-events-none absolute z-20 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center overflow-visible rounded-full border border-cyan-200/16 bg-bg-primary/36 opacity-75 shadow-[0_0_16px_rgba(56,214,255,0.12)] backdrop-blur-sm"
            style={{ ...crestLogoStyle(), width: 'clamp(2.75rem,4vw,4rem)', height: 'clamp(2.75rem,4vw,4rem)' }}
          >
            {/* outer dashed ring — spins clockwise */}
            <motion.span
              aria-hidden="true"
              className="absolute inset-[-28%] rounded-full border border-dashed border-cyan-300/[0.22]"
              animate={reduce ? undefined : { rotate: 360 }}
              transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
            />
            {/* inner solid ring — counter-rotates */}
            <motion.span
              aria-hidden="true"
              className="absolute inset-[-16%] rounded-full border border-cyan-300/[0.12]"
              animate={reduce ? undefined : { rotate: -360 }}
              transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
            />
            <img
              src={logo}
              alt=""
              aria-hidden="true"
              draggable="false"
              className="relative h-10 w-10 select-none object-contain opacity-80 drop-shadow-[0_0_8px_rgba(56,214,255,0.38)]"
            />
          </div>

          <ol className="absolute inset-0 z-10">
            {pillars.map((p, i) => {
              const state = stateFor(i, activeIndex);
              return (
                <li key={p.number} className="absolute" style={cardSlotStyle(TEMPLE_BAYS[i])}>
                  <PillarCard
                    number={p.number}
                    title={p.title}
                    copy={p.copy}
                    icon={p.icon}
                    active={state.active}
                    frontier={state.frontier}
                  />
                </li>
              );
            })}
          </ol>
        </div>

        <div className="-mt-2">
          <PillarProgressRail progress={progress} activeIndex={activeIndex} reduce={reduce} />
        </div>
      </div>

      <div className="hidden md:block xl:hidden">
        <div aria-hidden="true" className="mx-auto mb-7 max-w-3xl">
          <div className="relative">
            <svg viewBox="0 0 720 122" className="h-28 w-full overflow-visible" fill="none">
              <path d="M36 108 L360 20 L684 108" stroke="rgba(56,214,255,0.38)" strokeWidth="1.4" vectorEffect="non-scaling-stroke" />
              <path d="M58 108 L360 42 L662 108" stroke="rgba(56,214,255,0.18)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
              <path d="M44 108 H676 M68 116 H652" stroke="rgba(56,214,255,0.34)" strokeWidth="1.2" vectorEffect="non-scaling-stroke" />
              <circle cx="360" cy="78" r="24" stroke="rgba(56,214,255,0.22)" />
            </svg>
            <div className="pointer-events-none absolute left-1/2 top-[56%] flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center overflow-visible rounded-full border border-cyan-200/14 bg-bg-primary/42 opacity-75">
              <img
                src={logo}
                alt=""
                aria-hidden="true"
                draggable="false"
                className="h-9 w-9 select-none object-contain opacity-80 drop-shadow-[0_0_8px_rgba(56,214,255,0.34)]"
              />
            </div>
          </div>
          <div className="border-y border-cyan-300/14 bg-bg-primary/70 py-2 text-center font-mono text-[10px] uppercase tracking-[0.22em] text-cyan-100/42 backdrop-blur-sm">
            PRINCIPLES ARE ARCHITECTURE · PRACTICE IS CONSTRUCTION
          </div>
        </div>

        <ol className="mx-auto grid max-w-3xl grid-cols-3 gap-4">
          {pillars.map((p, i) => {
            const state = stateFor(i, activeIndex);
            return (
              <li key={p.number}>
                <TabletColumnShell completed={state.completed} frontier={state.frontier}>
                  <PillarCard
                    number={p.number}
                    title={p.title}
                    copy={p.copy}
                    icon={p.icon}
                    active={state.active}
                    frontier={state.frontier}
                  />
                </TabletColumnShell>
              </li>
            );
          })}
        </ol>
      </div>

      <div className="md:hidden">
        <div className="relative mx-auto max-w-xl">
          <div aria-hidden="true" className="absolute bottom-4 left-2 top-4 w-px bg-white/[0.08]">
            <motion.div
              className="absolute inset-x-0 top-0 h-full"
              style={{
                scaleY: reduce ? 1 : progress,
                transformOrigin: 'top',
                background: 'linear-gradient(180deg, #2F80FF 0%, #38D6FF 100%)',
              }}
            />
          </div>

          <ol className="space-y-4">
            {pillars.map((p, i) => {
              const state = stateFor(i, activeIndex);
              return (
                <li key={p.number} className="relative pl-9">
                  <span
                    aria-hidden="true"
                    className={`absolute left-0 top-6 grid h-4 w-4 place-items-center rounded-full border bg-bg-primary transition-all duration-500 ${
                      state.frontier
                        ? 'border-human-spark'
                        : state.active
                          ? 'border-cyan-300/70'
                          : 'border-white/20'
                    }`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full transition-all duration-500 ${
                        state.frontier
                          ? 'bg-human-spark shadow-[0_0_8px_1px_rgba(255,214,0,0.55)]'
                          : state.active
                            ? 'bg-cyan-300/80'
                            : 'bg-transparent'
                      }`}
                    />
                  </span>
                  <PillarCard
                    number={p.number}
                    title={p.title}
                    copy={p.copy}
                    icon={p.icon}
                    active={state.active}
                    frontier={state.frontier}
                  />
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </div>
  );
}

export default PillarStructure;
