/**
 * Hackathon seasons — presented as evidence of rapid prototyping,
 * collaboration, and product thinking under real constraints.
 */

export interface HackathonSeason {
  year: string;
  title: string;
  description: string;
  takeaways: string[];
}

export const hackathonSeasons: HackathonSeason[] = [
  {
    year: '2024',
    title: 'Entering the arena',
    description:
      'My first hackathon season: forming a team with strangers, cutting an idea down to something buildable, and shipping a working prototype before the clock ran out. The compressed format taught me how much product clarity matters when time is the scarcest resource.',
    takeaways: [
      'Scoping ruthlessly under a deadline',
      'Dividing work across a brand-new team',
      'Demoing something real, not slideware',
    ],
  },
  {
    year: '2025',
    title: 'Returning sharper',
    description:
      'A second season with better instincts: faster prototyping, cleaner splits between product and engineering work, and AI-assisted tooling folded into the build itself. Less time proving we could build — more time deciding what was worth building.',
    takeaways: [
      'Prototyping at higher velocity',
      'Framing the problem before the solution',
      'Using AI tooling as a build multiplier',
    ],
  },
];

/** What repeated hackathon participation demonstrates */
export const hackathonEvidence = [
  'Rapid prototyping',
  'Collaboration under pressure',
  'Product thinking',
  'Creativity within constraints',
  'Learning through building',
];
