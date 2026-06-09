import type { LucideIcon } from 'lucide-react';
import {
  Layers,
  Smartphone,
  ShieldCheck,
  Server,
  BrainCircuit,
  Target,
} from 'lucide-react';

/* ========== PILLARS OF PRACTICE ========== */

export interface Pillar {
  number: string;
  icon: LucideIcon;
  title: string;
  copy: string;
}

export const pillars: Pillar[] = [
  {
    number: '01',
    icon: Layers,
    title: 'Product-Focused Developer',
    copy: 'I build for users, outcomes, and shipped value — not just features and tickets.',
  },
  {
    number: '02',
    icon: Smartphone,
    title: 'Mobile App Builder',
    copy: 'Native iOS, Android, and cross-platform experiences with clean, intuitive interaction.',
  },
  {
    number: '03',
    icon: ShieldCheck,
    title: 'Secure Development Thinker',
    copy: 'A cybersecurity foundation shapes how I think about privacy, threat modelling, and resilient systems.',
  },
  {
    number: '04',
    icon: Server,
    title: 'Systems Prototyper',
    copy: 'From homelabs to practical infrastructure, I build systems from scratch and iterate toward usefulness.',
  },
  {
    number: '05',
    icon: BrainCircuit,
    title: 'AI-Forward Builder',
    copy: 'Agentic AI, local LLMs, and AI-assisted workflows are part of how I prototype and ship.',
  },
  {
    number: '06',
    icon: Target,
    title: 'Disciplined Operator',
    copy: 'Athletic discipline shaped my consistency, resilience, and ability to execute under pressure.',
  },
];

/* ========== MOBILE PLATFORMS ========== */

export interface MobilePlatform {
  platform: string;
  subtitle: string;
  description: string;
  technologies: string[];
  accent: string;
}

export const mobilePlatforms: MobilePlatform[] = [
  {
    platform: 'iOS',
    subtitle: 'Native Apple Development',
    description:
      'Building native iOS experiences with Swift, UIKit, and SwiftUI. Focused on polished interactions, Apple design guidelines, and platform-native capabilities.',
    technologies: ['Swift', 'SwiftUI', 'UIKit', 'CoreData', 'HealthKit'],
    accent: 'from-blue-500 to-blue-600',
  },
  {
    platform: 'Android',
    subtitle: 'Native Android Development',
    description:
      'Developing modern Android applications with Kotlin and Jetpack Compose. Focused on Material Design, responsive layouts, and clean architecture patterns.',
    technologies: ['Kotlin', 'Jetpack Compose', 'Room', 'Material Design 3'],
    accent: 'from-emerald-500 to-emerald-600',
  },
  {
    platform: 'Cross-Platform',
    subtitle: 'Flutter & Multi-Platform',
    description:
      'Exploring cross-platform development with Flutter for scenarios where reaching multiple platforms from a single codebase creates genuine product value.',
    technologies: ['Flutter', 'Dart', 'Firebase', 'Platform Channels'],
    accent: 'from-purple-500 to-purple-600',
  },
];

/* ========== ATHLETIC DISCIPLINES ========== */

export interface AthleticDiscipline {
  sport: string;
  level: string;
  attribute: string;
  description: string;
}

export const athleticDisciplines: AthleticDiscipline[] = [
  {
    sport: 'Rowing',
    level: 'Competitive',
    attribute: 'Endurance & Team Coordination',
    description:
      'Years of competitive rowing developed an understanding of sustained effort, synchronised teamwork, and performing under physical and mental fatigue.',
  },
  {
    sport: 'Field Hockey',
    level: 'State-Level Goalkeeper',
    attribute: 'Pressure & Split-Second Decision Making',
    description:
      'Playing goalkeeper at a state level required constant situational awareness, rapid decision-making under pressure, and the ability to absorb and redirect feedback instantly.',
  },
  {
    sport: 'Natural Bodybuilding',
    level: 'National-Level Competitor',
    attribute: 'Consistency & Long-Term Execution',
    description:
      'Competing at a national level in natural bodybuilding demands months of disciplined preparation, precise tracking, iterative adjustment, and an unwavering commitment to process over outcome.',
  },
];
