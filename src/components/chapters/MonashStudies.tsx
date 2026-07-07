import { GraduationCap, MapPin, CalendarDays, ShieldCheck } from 'lucide-react';
import { ChapterShell, ChapterHeader } from '@/components/ChapterShell';
import Reveal from '@/components/Reveal';
import { degree, focusAreas } from '@/data/studies';

/**
 * Waypoint 03 — Star Charts. Monash University studies: the navigation
 * charts for everything built since.
 */
export default function MonashStudies() {
  return (
    <ChapterShell id="studies" wide>
      <ChapterHeader
        id="studies"
        title="Drawing the star charts at Monash."
        lede="A Bachelor of Information Technology, majoring in cybersecurity — the formal foundations under everything I build, from secure development to native mobile."
      />

      {/* Degree card */}
      <Reveal className="mb-10">
        <div className="rounded-2xl border border-blue-400/[0.14] bg-gradient-to-br from-blue-500/[0.06] via-transparent to-transparent p-6 md:p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="flex items-start gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-blue-300/20 bg-blue-400/[0.08]">
                <GraduationCap className="h-5 w-5 text-blue-200" aria-hidden="true" />
              </span>
              <div>
                <h3 className="text-lg font-semibold text-slate-50 md:text-xl">
                  {degree.qualification}
                </h3>
                <p className="mt-1 text-sm text-slate-400">{degree.institution}</p>
              </div>
            </div>
            <dl className="flex flex-wrap gap-x-6 gap-y-3 text-sm">
              <div className="flex items-center gap-2 text-slate-400">
                <ShieldCheck className="h-3.5 w-3.5 text-blue-300/80" aria-hidden="true" />
                <dt className="sr-only">Major</dt>
                <dd>
                  Major: <span className="text-slate-200">{degree.major}</span>
                </dd>
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                <CalendarDays className="h-3.5 w-3.5 text-blue-300/80" aria-hidden="true" />
                <dt className="sr-only">Commenced</dt>
                <dd>
                  Since <span className="text-slate-200">{degree.commenced}</span>
                </dd>
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                <MapPin className="h-3.5 w-3.5 text-blue-300/80" aria-hidden="true" />
                <dt className="sr-only">Location</dt>
                <dd className="text-slate-200">{degree.location}</dd>
              </div>
            </dl>
          </div>
        </div>
      </Reveal>

      {/* Focus areas */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {focusAreas.map(({ icon: Icon, title, summary, units }, index) => (
          <Reveal key={title} delay={index * 0.06} className="h-full">
            <div className="card-glow h-full rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 backdrop-blur-sm">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-blue-200/15 bg-blue-400/[0.06]">
                <Icon className="h-4.5 w-4.5 text-blue-200/90" aria-hidden="true" />
              </span>
              <h3 className="mt-4 text-base font-semibold text-slate-100">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">{summary}</p>
              {units.length > 0 && (
                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {units.map((unit) => (
                    <li
                      key={unit}
                      className="rounded-md border border-white/[0.07] bg-white/[0.03] px-2 py-1 font-mono text-[11px] text-slate-400"
                    >
                      {unit}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.15}>
        <p className="mt-10 max-w-2xl text-sm leading-relaxed text-slate-500">
          The cybersecurity major is the through-line: it changed how I read
          every system I touch — what can fail, what can be abused, and what it
          takes to earn a user&apos;s trust before asking for their data.
        </p>
      </Reveal>
    </ChapterShell>
  );
}
