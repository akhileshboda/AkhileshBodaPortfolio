import type { LucideIcon } from 'lucide-react';
import {
  Layers,
  Apple,
  Smartphone,
  TabletSmartphone,
  ShieldCheck,
  BrainCircuit,
  Workflow,
  Medal,
} from 'lucide-react';

/* ========== ONBOARD SYSTEMS — SKILL THEMES ========== */

export interface SkillTheme {
  icon: LucideIcon;
  title: string;
  copy: string;
}

export const skillThemes: SkillTheme[] = [
  {
    icon: Layers,
    title: 'Product-Focused Development',
    copy: 'I build for users, outcomes, and shipped value — not just features and tickets.',
  },
  {
    icon: Apple,
    title: 'Native iOS Development',
    copy: 'Swift, SwiftUI, and UIKit — polished interactions built to Apple platform conventions.',
  },
  {
    icon: Smartphone,
    title: 'Native Android Development',
    copy: 'Kotlin and Jetpack Compose with Material Design and clean architecture patterns.',
  },
  {
    icon: TabletSmartphone,
    title: 'Cross-Platform Mobile',
    copy: 'Flutter for the cases where one codebase across platforms creates genuine product value.',
  },
  {
    icon: ShieldCheck,
    title: 'Cybersecurity Mindset',
    copy: 'A security major shapes how I think about privacy, threat modelling, and resilient systems.',
  },
  {
    icon: BrainCircuit,
    title: 'AI-First Development',
    copy: 'AI woven through ideation, prototyping, building, and debugging — judgment stays human.',
  },
  {
    icon: Workflow,
    title: 'Systems Thinking',
    copy: 'Understanding how the pieces connect — from workflows and tooling to the infrastructure underneath.',
  },
  {
    icon: Medal,
    title: 'Athletic Discipline',
    copy: 'Sport taught me consistency, resilience, and execution under pressure. It transfers.',
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
    attribute: 'Pressure & Split-Second Decisions',
    description:
      'Playing goalkeeper at a state level required constant situational awareness, rapid decision-making under pressure, and the ability to absorb and redirect feedback instantly.',
  },
  {
    sport: 'Natural Bodybuilding',
    level: 'National-Level Competitor',
    attribute: 'Consistency & Long-Term Execution',
    description:
      'Competing at a national level in natural bodybuilding demands months of disciplined preparation, precise tracking, iterative adjustment, and commitment to process over outcome.',
  },
];
