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
}

export const projects: Project[] = [
  {
    id: 'summit',
    title: 'Summit',
    tagline: 'Academic planning, reimagined for Monash students.',
    description:
      'An iOS course-planning app concept designed to simplify academic planning, course structure exploration, unit selection, and GPA/WAM prediction for university students.',
    demonstrates: [
      'iOS Development',
      'Product Thinking',
      'Student-Centered UX',
      'Academic Tooling',
    ],
    techStack: ['Swift', 'UIKit', 'iOS', 'CoreData'],
    status: 'concept',
    statusLabel: 'Concept',
  },
  {
    id: 'nutritrack',
    title: 'NutriTrack',
    tagline: 'Nutrition tracking built natively for Android.',
    description:
      'An Android nutrition tracking application built with Kotlin and Jetpack Compose, focused on clean mobile UI patterns and practical health/fitness data handling.',
    demonstrates: [
      'Android Development',
      'Jetpack Compose',
      'Mobile UI',
      'Health & Fitness',
    ],
    techStack: ['Kotlin', 'Jetpack Compose', 'Android', 'Room'],
    status: 'completed',
    statusLabel: 'Completed',
  },
  {
    id: 'kindred',
    title: 'Kindred',
    tagline: 'Connecting people through thoughtful design.',
    description:
      'A product and design-driven software project exploring meaningful user connection. Full case study and technical deep-dive in development.',
    demonstrates: [
      'Product Design',
      'Software Engineering',
      'User Experience',
      'Full-Stack Development',
    ],
    techStack: ['React', 'TypeScript', 'Node.js'],
    status: 'coming-soon',
    statusLabel: 'Case Study Coming Soon',
  },
  {
    id: 'akhilos',
    title: 'AkhilOS',
    tagline: 'A personal command center for workflows and experimentation.',
    description:
      'A Raspberry Pi-powered terminal environment built as a personal command center for managing workflows, shortcuts, AI tools, and systems experimentation.',
    demonstrates: [
      'Systems Thinking',
      'Linux Administration',
      'Homelabbing',
      'Personal Infrastructure',
    ],
    techStack: ['Raspberry Pi', 'Linux', 'Bash', 'Python', 'Docker'],
    status: 'in-development',
    statusLabel: 'In Development',
  },
  {
    id: 'macromate',
    title: 'MacroMate',
    tagline: 'Your intelligent macronutrient companion for iOS.',
    description:
      'An upcoming flagship iOS application designed to bring intelligent macro tracking, meal planning, and nutritional insight to a native Apple experience.',
    demonstrates: [
      'iOS Development',
      'Product Strategy',
      'Health Tech',
      'Native Mobile',
    ],
    techStack: ['Swift', 'SwiftUI', 'iOS', 'HealthKit'],
    status: 'in-development',
    statusLabel: 'In Development',
  },
];
