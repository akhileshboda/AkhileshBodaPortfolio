export type ProjectStatus = 'completed' | 'concept' | 'in-development' | 'coming-soon';

export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  demonstrates: string[];
  techStack: string[];
  status: ProjectStatus;
  statusLabel: string;
  /**
   * Decorative constellation for the project card — star points in a
   * 100×60 viewBox plus the indices of stars joined by lines.
   */
  constellation: {
    stars: [number, number][];
    lines: [number, number][];
  };
  /** Accent used for the constellation and card glow */
  accent: string;
}

export const projects: Project[] = [
  {
    id: 'summit',
    title: 'Summit',
    tagline: 'Academic planning, reimagined for Monash students.',
    description:
      'An iOS course-planning app concept designed to simplify academic planning, course structure exploration, unit selection, and GPA/WAM prediction for university students.',
    demonstrates: ['iOS Development', 'Product Thinking', 'Student-Centered UX', 'Academic Tooling'],
    techStack: ['Swift', 'UIKit', 'iOS', 'CoreData'],
    status: 'concept',
    statusLabel: 'Concept',
    constellation: {
      stars: [
        [12, 48],
        [30, 30],
        [50, 12],
        [70, 26],
        [88, 44],
        [50, 40],
      ],
      lines: [
        [0, 1],
        [1, 2],
        [2, 3],
        [3, 4],
        [1, 5],
        [5, 3],
      ],
    },
    accent: '#60A5FA',
  },
  {
    id: 'nutritrack',
    title: 'NutriTrack',
    tagline: 'Nutrition tracking built natively for Android.',
    description:
      'An Android nutrition tracking application built with Kotlin and Jetpack Compose, focused on clean mobile UI patterns and practical health/fitness data handling.',
    demonstrates: ['Android Development', 'Jetpack Compose', 'Mobile UI', 'Health & Fitness'],
    techStack: ['Kotlin', 'Jetpack Compose', 'Android', 'Room'],
    status: 'completed',
    statusLabel: 'Completed',
    constellation: {
      stars: [
        [10, 30],
        [28, 14],
        [46, 34],
        [64, 16],
        [84, 30],
        [64, 48],
      ],
      lines: [
        [0, 1],
        [1, 2],
        [2, 3],
        [3, 4],
        [4, 5],
        [5, 2],
      ],
    },
    accent: '#34D399',
  },
  {
    id: 'kindred',
    title: 'Kindred',
    tagline: 'Connecting people through thoughtful design.',
    description:
      'A product and design-driven software project exploring meaningful user connection. Full case study and technical deep-dive in development.',
    demonstrates: ['Product Design', 'Software Engineering', 'User Experience', 'Full-Stack Development'],
    techStack: ['React', 'TypeScript', 'Node.js'],
    status: 'coming-soon',
    statusLabel: 'Case Study Coming Soon',
    constellation: {
      stars: [
        [16, 20],
        [40, 12],
        [62, 24],
        [84, 18],
        [30, 44],
        [58, 48],
      ],
      lines: [
        [0, 1],
        [1, 2],
        [2, 3],
        [0, 4],
        [4, 5],
        [5, 2],
      ],
    },
    accent: '#F472B6',
  },
  {
    id: 'macromate',
    title: 'MacroMate',
    tagline: 'Your intelligent macronutrient companion for iOS.',
    description:
      'An upcoming flagship iOS application designed to bring intelligent macro tracking, meal planning, and nutritional insight to a native Apple experience.',
    demonstrates: ['iOS Development', 'Product Strategy', 'Health Tech', 'Native Mobile'],
    techStack: ['Swift', 'SwiftUI', 'iOS', 'HealthKit'],
    status: 'in-development',
    statusLabel: 'In Development',
    constellation: {
      stars: [
        [14, 40],
        [32, 22],
        [50, 46],
        [68, 20],
        [86, 38],
        [50, 10],
      ],
      lines: [
        [0, 1],
        [1, 2],
        [2, 3],
        [3, 4],
        [1, 5],
        [5, 3],
      ],
    },
    accent: '#A78BFA',
  },
  {
    id: 'akhilos',
    title: 'AkhilOS',
    tagline: 'Personal workflow and tooling experimentation.',
    description:
      'A personal command center for workflows, shortcuts, and AI tools — an ongoing experiment in designing my own development environment and automating the repetitive parts of building.',
    demonstrates: ['Systems Thinking', 'Workflow Design', 'Developer Tooling', 'Automation'],
    techStack: ['Linux', 'Bash', 'Python', 'Docker'],
    status: 'in-development',
    statusLabel: 'In Development',
    constellation: {
      stars: [
        [20, 14],
        [50, 20],
        [80, 14],
        [35, 44],
        [65, 44],
        [50, 32],
      ],
      lines: [
        [0, 1],
        [1, 2],
        [0, 3],
        [2, 4],
        [3, 5],
        [5, 4],
      ],
    },
    accent: '#38D6FF',
  },
];
