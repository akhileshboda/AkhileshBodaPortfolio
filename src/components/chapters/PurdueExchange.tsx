import { CalendarDays, MapPin, GraduationCap } from 'lucide-react';
import { ChapterShell, ChapterHeader } from '@/components/ChapterShell';
import Reveal from '@/components/Reveal';

const facts = [
  { icon: CalendarDays, label: 'January 2026' },
  { icon: MapPin, label: 'West Lafayette, Indiana' },
  { icon: GraduationCap, label: 'Study exchange · Purdue University' },
];

/** Transfer-orbit diagram: home system → distant orbit and back. */
function OrbitDiagram() {
  return (
    <svg
      viewBox="0 0 420 320"
      role="img"
      aria-label="Diagram of a transfer orbit between Monash University in Melbourne and Purdue University in West Lafayette"
      className="w-full max-w-md"
    >
      {/* Home orbit — Melbourne */}
      <ellipse cx="120" cy="200" rx="78" ry="30" fill="none" stroke="rgba(96,165,250,0.35)" strokeWidth="1" />
      <circle cx="120" cy="200" r="6" fill="#60A5FA" fillOpacity="0.9" />
      <circle cx="120" cy="200" r="12" fill="#60A5FA" fillOpacity="0.15" />
      <text x="120" y="248" textAnchor="middle" className="orbit-label">
        MELBOURNE · MONASH
      </text>

      {/* Distant orbit — West Lafayette */}
      <ellipse cx="312" cy="96" rx="64" ry="26" fill="none" stroke="rgba(207,185,145,0.4)" strokeWidth="1" />
      <circle cx="312" cy="96" r="5" fill="#CFB991" fillOpacity="0.95" />
      <circle cx="312" cy="96" r="11" fill="#CFB991" fillOpacity="0.16" />
      <text x="312" y="52" textAnchor="middle" className="orbit-label orbit-label-gold">
        WEST LAFAYETTE · PURDUE
      </text>

      {/* Transfer trajectory */}
      <path
        d="M 168 176 Q 240 150 268 116"
        fill="none"
        stroke="rgba(56,214,255,0.5)"
        strokeWidth="1.2"
        strokeDasharray="4 4"
      />
      <path
        d="M 268 116 l -7 1.5 M 268 116 l -2 7"
        stroke="rgba(56,214,255,0.7)"
        strokeWidth="1.2"
        fill="none"
      />
      <text x="212" y="132" textAnchor="middle" className="orbit-label orbit-label-cyan">
        JAN 2026 TRANSFER
      </text>

      {/* Return trajectory */}
      <path
        d="M 292 130 Q 230 190 176 204"
        fill="none"
        stroke="rgba(148,163,184,0.3)"
        strokeWidth="1"
        strokeDasharray="2 5"
      />
    </svg>
  );
}

/**
 * Waypoint 06 — Distant Orbit. The Purdue University exchange:
 * a short transfer orbit with lasting course corrections.
 */
export default function PurdueExchange() {
  return (
    <ChapterShell id="purdue">
      <ChapterHeader
        id="purdue"
        title="A month in a distant orbit."
        lede="January 2026: a study exchange at Purdue University in West Lafayette, Indiana. Short by the calendar — long by what it changed."
      />

      <div className="grid items-center gap-10 md:grid-cols-2 md:gap-14">
        <Reveal>
          <div className="space-y-5 text-base leading-relaxed text-slate-400">
            <p>
              For one Midwest-winter month I studied inside a completely
              different academic system — new teaching styles, new
              expectations, and a campus culture built around engineering at
              scale. Every routine I&apos;d optimised at home had to be rebuilt
              from scratch, quickly.
            </p>
            <p>
              That was the point. The exchange compressed a lot of growth into
              a small window: technical perspective from a different
              curriculum, cultural perspective from living inside another
              country&apos;s daily rhythm, and professional perspective from
              seeing how another part of the world builds its engineers.
            </p>
            <p>
              I came back with a wider frame of reference — and the
              confidence that I can land in an unfamiliar system and be
              productive fast.
            </p>
          </div>

          <ul className="mt-7 flex flex-wrap gap-2.5">
            {facts.map(({ icon: Icon, label }) => (
              <li
                key={label}
                className="flex items-center gap-2 rounded-full border border-[#CFB991]/20 bg-[#CFB991]/[0.05] px-3.5 py-1.5 text-xs font-medium text-[#e8ddc4]"
              >
                <Icon className="h-3.5 w-3.5 text-[#CFB991]" aria-hidden="true" />
                {label}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.12} className="flex justify-center">
          <OrbitDiagram />
        </Reveal>
      </div>
    </ChapterShell>
  );
}
