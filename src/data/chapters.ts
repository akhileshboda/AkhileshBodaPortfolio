/**
 * Chapter registry — the single source of truth for the voyage.
 *
 * Every waypoint of the journey is defined here once and consumed by the
 * navigation rail, the mobile chapter sheet, the keyboard navigator, the
 * waypoint HUD, and the galaxy atmosphere (each chapter tints deep space
 * with its own light).
 */

export interface Chapter {
  /** DOM id of the section element */
  id: string;
  /** Two-digit chapter number used in HUD + nav ("00" is the launch pad) */
  number: string;
  /** Short label used in navigation */
  label: string;
  /** Narrative waypoint name shown in the HUD and chapter headers */
  waypoint: string;
  /** Atmosphere tint — a subtle nebula glow color for this leg of the voyage */
  atmosphere: string;
}

export const chapters: Chapter[] = [
  {
    id: 'launch',
    number: '00',
    label: 'Launch',
    waypoint: 'Launch Pad',
    atmosphere: 'rgba(47, 128, 255, 0.16)',
  },
  {
    id: 'origin',
    number: '01',
    label: 'Origin',
    waypoint: 'First Light',
    atmosphere: 'rgba(255, 179, 71, 0.10)',
  },
  {
    id: 'transition',
    number: '02',
    label: 'Transition',
    waypoint: 'Escape Velocity',
    atmosphere: 'rgba(56, 214, 255, 0.12)',
  },
  {
    id: 'studies',
    number: '03',
    label: 'Studies',
    waypoint: 'Star Charts',
    atmosphere: 'rgba(59, 130, 246, 0.14)',
  },
  {
    id: 'projects',
    number: '04',
    label: 'Projects',
    waypoint: 'Constellations',
    atmosphere: 'rgba(139, 92, 246, 0.13)',
  },
  {
    id: 'hackathons',
    number: '05',
    label: 'Hackathons',
    waypoint: 'Meteor Showers',
    atmosphere: 'rgba(251, 146, 60, 0.10)',
  },
  {
    id: 'purdue',
    number: '06',
    label: 'Purdue',
    waypoint: 'Distant Orbit',
    atmosphere: 'rgba(207, 185, 145, 0.10)',
  },
  {
    id: 'ai-first',
    number: '07',
    label: 'AI-First',
    waypoint: 'New Propulsion',
    atmosphere: 'rgba(45, 212, 191, 0.11)',
  },
  {
    id: 'discipline',
    number: '08',
    label: 'Discipline',
    waypoint: 'Gravity Training',
    atmosphere: 'rgba(244, 114, 182, 0.09)',
  },
  {
    id: 'flight-log',
    number: '09',
    label: 'Flight Log',
    waypoint: 'Flight Log',
    atmosphere: 'rgba(99, 102, 241, 0.12)',
  },
  {
    id: 'mission',
    number: '10',
    label: 'Mission',
    waypoint: 'Present Position',
    atmosphere: 'rgba(96, 165, 250, 0.15)',
  },
];

/** Chapters shown in navigation (the launch pad is reachable via the brand link) */
export const navChapters = chapters.filter((c) => c.id !== 'launch');

export const chapterIndexById = new Map(chapters.map((c, i) => [c.id, i]));
