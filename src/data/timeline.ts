export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  category: 'origin' | 'education' | 'project' | 'experience' | 'direction';
}

export const timelineEvents: TimelineEvent[] = [
  {
    year: 'Foundation',
    title: 'Physical Therapy & Human-Centered Care',
    description:
      'Developed a deep understanding of empathy, patient needs, and care-driven problem solving — skills that now shape how I approach user-centered software.',
    category: 'origin',
  },
  {
    year: '2022',
    title: 'Transition into Information Technology',
    description:
      'Made the deliberate shift into technology, recognising that software could scale the human-centered impact I valued in care work.',
    category: 'education',
  },
  {
    year: '2023',
    title: 'Cybersecurity Major at Monash University',
    description:
      'Chose cybersecurity as a major, building a mindset around secure development, threat modelling, privacy, and trust in software systems.',
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
    title: 'AIVA — Product Operations',
    description:
      'Gained hands-on exposure to product execution, stakeholder coordination, operational workflows, and product-team dynamics at AIVA.',
    category: 'experience',
  },
  {
    year: '2024',
    title: 'AkhilOS & Homelab Experimentation',
    description:
      'Built a Raspberry Pi-powered personal command center and began experimenting with local AI, automation, and systems-level tooling.',
    category: 'project',
  },
  {
    year: '2025',
    title: 'AI-Forward Development & Prototyping',
    description:
      'Integrated agentic AI capabilities, local LLMs, and AI-assisted workflows into product development and rapid prototyping.',
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
