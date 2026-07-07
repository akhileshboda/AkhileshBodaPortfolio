import type { LucideIcon } from 'lucide-react';
import {
  ShieldCheck,
  Code2,
  Smartphone,
  Network,
  Database,
  Users,
} from 'lucide-react';

/**
 * Monash University studies — Bachelor of Information Technology,
 * majoring in cybersecurity.
 *
 * Focus areas are grouped thematically rather than listed unit-by-unit.
 * To surface specific units on the site, add them to the `units` array of
 * the relevant focus area and they will render as chips under that card.
 */

export const degree = {
  institution: 'Monash University',
  location: 'Melbourne, Australia',
  qualification: 'Bachelor of Information Technology',
  major: 'Cybersecurity',
  commenced: '2023',
} as const;

export interface StudyFocusArea {
  icon: LucideIcon;
  title: string;
  summary: string;
  /** Optional specific unit names/codes — rendered as chips when present */
  units: string[];
}

export const focusAreas: StudyFocusArea[] = [
  {
    icon: ShieldCheck,
    title: 'Cybersecurity',
    summary:
      'The core of the degree — how systems are attacked and how they are defended. Security thinking, threat awareness, and privacy shape how I write and review every line of code.',
    units: [],
  },
  {
    icon: Code2,
    title: 'Software Development',
    summary:
      'Programming fundamentals through to object-oriented design, algorithms, and data structures — the engineering foundation under everything I build.',
    units: [],
  },
  {
    icon: Smartphone,
    title: 'Mobile Development',
    summary:
      'Native Android studio work in Kotlin and Jetpack Compose, where NutriTrack was born — and where I discovered that mobile is my favourite place to build.',
    units: [],
  },
  {
    icon: Network,
    title: 'Systems & Networks',
    summary:
      'What actually happens beneath the software — operating systems, networking, and the infrastructure that security work depends on understanding.',
    units: [],
  },
  {
    icon: Database,
    title: 'Data Foundations',
    summary:
      'Modelling, storing, and querying data well — the quiet discipline behind reliable products and the groundwork for working intelligently with AI.',
    units: [],
  },
  {
    icon: Users,
    title: 'IT Professional Practice',
    summary:
      'Ethics, communication, and teamwork in technology delivery. The human side of IT — familiar territory for someone who started in care work.',
    units: [],
  },
];
