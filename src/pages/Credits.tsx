import { Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink } from 'lucide-react';

const credits = [
  {
    category: 'Framework & Language',
    items: [
      { name: 'React 19', url: 'https://react.dev' },
      { name: 'TypeScript', url: 'https://www.typescriptlang.org' },
    ],
  },
  {
    category: 'Styling',
    items: [
      { name: 'Tailwind CSS v4', url: 'https://tailwindcss.com' },
    ],
  },
  {
    category: 'Animation',
    items: [
      { name: 'Motion (Framer Motion)', url: 'https://motion.dev' },
    ],
  },
  {
    category: '3D & WebGL',
    items: [
      { name: 'Three.js — the Milky Way voyage', url: 'https://threejs.org' },
    ],
  },
  {
    category: 'Icons',
    items: [
      { name: 'Lucide React', url: 'https://lucide.dev' },
    ],
  },
  {
    category: 'Fonts',
    items: [
      { name: 'Space Grotesk — Google Fonts', url: 'https://fonts.google.com/specimen/Space+Grotesk' },
      { name: 'Inter — Google Fonts', url: 'https://fonts.google.com/specimen/Inter' },
      { name: 'JetBrains Mono — Google Fonts', url: 'https://fonts.google.com/specimen/JetBrains+Mono' },
    ],
  },
  {
    category: 'Build Tooling',
    items: [
      { name: 'Vite', url: 'https://vitejs.dev' },
    ],
  },
  {
    category: 'Routing',
    items: [
      { name: 'React Router v7', url: 'https://reactrouter.com' },
    ],
  },
];

function Credits() {
  return (
    <div className="min-h-screen bg-bg-primary text-text-primary px-6 py-16">
      <div className="mx-auto max-w-2xl">
        {/* Back link */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-300 transition-colors duration-200 mb-12 group"
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform duration-200" />
          Back to Portfolio
        </Link>

        {/* Heading */}
        <h1 className="text-3xl md:text-4xl font-bold text-slate-100 mb-2">
          Credits
        </h1>
        <p className="text-slate-500 mb-10 leading-relaxed">
          This site is built on excellent open-source work. Thank you to the
          maintainers of the following projects.
        </p>

        {/* Credits list */}
        <div className="space-y-8">
          {credits.map((group) => (
            <div key={group.category}>
              <h2 className="text-xs font-medium uppercase tracking-wider text-slate-600 mb-3">
                {group.category}
              </h2>
              <ul className="space-y-2">
                {group.items.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-slate-400 hover:text-slate-200 transition-colors duration-200 group"
                    >
                      {item.name}
                      <ExternalLink className="h-3 w-3 text-slate-600 group-hover:text-slate-400 transition-colors duration-200" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Credits;
