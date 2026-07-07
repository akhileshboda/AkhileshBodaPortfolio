import { ArrowUp, Code2, ExternalLink, FileText, Mail } from 'lucide-react';
import { ChapterShell, ChapterHeader } from '@/components/ChapterShell';
import Reveal from '@/components/Reveal';
import { skillThemes } from '@/data/skills';
import { profile } from '@/data/profile';
import { scrollToChapter } from '@/journey/navigation';

const channels = [
  { icon: ExternalLink, label: 'LinkedIn', href: profile.linkedin, external: true },
  { icon: Code2, label: 'GitHub', href: profile.github, external: true },
  { icon: FileText, label: 'Resume', href: profile.resume, external: false },
];

/**
 * Waypoint 10 — Present Position. Where the ship is now, what systems
 * are onboard, and how to open a channel.
 */
export default function CurrentMission() {
  return (
    <ChapterShell id="mission" wide>
      <ChapterHeader
        id="mission"
        title="Present position: product-focused developer."
        lede="The current mission: building software at the intersection of product, mobile, cybersecurity, and AI-first development — human-centered by background, disciplined by training."
      />

      {/* Onboard systems */}
      <Reveal>
        <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.22em] text-slate-500">
          Systems onboard
        </p>
      </Reveal>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {skillThemes.map(({ icon: Icon, title, copy }, index) => (
          <Reveal key={title} delay={index * 0.05} className="h-full">
            <div className="card-glow h-full rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 backdrop-blur-sm">
              <Icon className="h-4.5 w-4.5 text-blue-200/85" aria-hidden="true" />
              <h3 className="mt-3 text-sm font-semibold text-slate-100">{title}</h3>
              <p className="mt-1.5 text-[13px] leading-relaxed text-slate-400">{copy}</p>
            </div>
          </Reveal>
        ))}
      </div>

      {/* Open channel */}
      <Reveal delay={0.1}>
        <div className="mt-16 rounded-3xl border border-blue-400/[0.14] bg-gradient-to-b from-blue-500/[0.07] via-transparent to-transparent p-8 text-center md:p-12">
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-cyan-200/70">
            Open channel
          </p>
          <h3 className="mt-3 text-2xl font-bold tracking-tight text-slate-50 md:text-3xl">
            The next chapter is unwritten. Let&apos;s talk.
          </h3>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-slate-400">
            I&apos;m open to conversations about product-focused development,
            mobile engineering, and meaningful technology work.
          </p>

          <div className="mt-8 flex flex-col items-center gap-4">
            <a
              href={profile.email}
              className="focus-ring inline-flex h-12 items-center gap-2.5 rounded-xl border border-cyan-300/30 bg-gradient-to-br from-[#07101f] via-[#0b1a32] to-[#123158] px-7 text-sm font-medium text-slate-50 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] transition-all duration-300 hover:border-cyan-300/50 hover:shadow-[0_16px_42px_-22px_rgba(47,128,255,0.9)]"
            >
              <Mail className="h-4 w-4 text-cyan-200/85" aria-hidden="true" />
              akhileshboda@outlook.com
            </a>

            <div className="flex flex-wrap items-center justify-center gap-5">
              {channels.map(({ icon: Icon, label, href, external }) => (
                <a
                  key={label}
                  href={href}
                  target={external ? '_blank' : undefined}
                  rel={external ? 'noopener noreferrer' : undefined}
                  className="focus-ring flex items-center gap-2 rounded-md text-sm text-slate-400 transition-colors duration-200 hover:text-slate-100"
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </Reveal>

      {/* End of transmission */}
      <Reveal delay={0.15}>
        <div className="mt-16 flex flex-col items-center gap-5 text-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-slate-600">
            — End of transmission —
          </p>
          <button
            type="button"
            onClick={() => scrollToChapter(0)}
            className="focus-ring group inline-flex cursor-pointer items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.02] px-4 py-2 text-xs font-medium text-slate-400 transition-colors duration-300 hover:border-cyan-300/25 hover:text-slate-100"
          >
            <ArrowUp
              className="h-3.5 w-3.5 transition-transform duration-300 motion-safe:group-hover:-translate-y-0.5"
              aria-hidden="true"
            />
            Return to launch
          </button>
        </div>
      </Reveal>
    </ChapterShell>
  );
}
