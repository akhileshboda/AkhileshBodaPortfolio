import { Link } from 'react-router-dom';
import { profile } from '@/data/profile';

const footerLinks = [
  { label: 'Privacy', to: '/privacy' },
  { label: 'Terms', to: '/terms' },
  { label: 'Accessibility', to: '/accessibility' },
  { label: 'Credits', to: '/credits' },
];

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/[0.05] bg-[#030816]/80 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row">
        <p className="text-center text-xs leading-relaxed text-slate-600 sm:text-left">
          © {new Date().getFullYear()} {profile.name}. Built with React,
          TypeScript, Tailwind, Motion &amp; Three.js.
        </p>

        <nav aria-label="Footer links">
          <ul className="flex flex-wrap items-center justify-center gap-4">
            {footerLinks.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="focus-ring rounded text-xs text-slate-600 transition-colors duration-200 hover:text-slate-400"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
