export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  category: 'origin' | 'education' | 'project' | 'experience' | 'direction';
}

/** The flight log — every recorded burn of the voyage so far. */
export const timelineEvents: TimelineEvent[] = [
  {
    year: 'Foundation',
    title: 'Physical Therapy & Human-Centered Care',
    description:
      'Developed a deep understanding of empathy, patient needs, and care-driven problem solving — skills that now shape how I approach user-centered software.',
    category: 'origin',
  },
  {
    year: '2023',
    title: 'Transition into Technology',
    description:
      'Made the deliberate shift into technology, recognising that software could scale the human-centered impact I valued in care work.',
    category: 'education',
  },
  {
    year: '2023',
    title: 'Monash University IT & Cybersecurity Studies',
    description:
      'Began the Bachelor of Information Technology at Monash, majoring in cybersecurity — building foundations across secure development, software engineering, systems, and data.',
    category: 'education',
  },
  {
    year: '2023',
    title: 'First Mobile Development Projects',
    description:
      'Began building native applications across iOS and Android, discovering a strong affinity for mobile-first product development.',
    category: 'project',
  },
  {
    year: '2024',
    title: 'Hackathon Participation',
    description:
      'First hackathon season — team formation, ruthless scoping, and shipping a working prototype against the clock.',
    category: 'experience',
  },
  {
    year: '2025',
    title: 'Hackathon Participation',
    description:
      'Returned sharper: faster prototyping, stronger product framing, and AI-assisted tooling folded into the build itself.',
    category: 'experience',
  },
  {
    year: 'Jan 2026',
    title: 'Purdue University Exchange',
    description:
      'A study exchange in West Lafayette, Indiana — a short but meaningful chapter that broadened my technical, cultural, and professional perspective.',
    category: 'experience',
  },
  {
    year: '2026',
    title: 'AI-First Development Approach',
    description:
      'Made AI a first-class part of my development workflow — for ideation, prototyping, building, debugging, and improving product velocity.',
    category: 'direction',
  },
  {
    year: 'Now',
    title: 'Product-Focused Developer',
    description:
      'Pursuing a career at the intersection of product, mobile, security, and AI — building software that bridges users, business, and technology.',
    category: 'direction',
  },
];
