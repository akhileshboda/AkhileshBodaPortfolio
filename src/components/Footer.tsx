import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { fadeInUp, defaultViewport } from '@/utils/animations';
import { profile } from '@/data/profile';

const footerLinks = [
  { label: 'Privacy', to: '/privacy' },
  { label: 'Terms', to: '/terms' },
  { label: 'Accessibility', to: '/accessibility' },
  { label: 'Credits', to: '/credits' },
];

function Footer() {
  return (
    <motion.footer
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={defaultViewport}
      className="lg:ml-60 border-t border-white/[0.05] bg-bg-secondary"
    >
      <div className="mx-auto max-w-6xl px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Left — copyright + stack */}
        <p className="text-xs text-slate-600 text-center sm:text-left leading-relaxed">
          © {new Date().getFullYear()} {profile.name}. Built with React,
          TypeScript, Tailwind &amp; Motion.
        </p>

        {/* Right — legal links */}
        <nav aria-label="Footer links">
          <ul className="flex items-center gap-4 flex-wrap justify-center">
            {footerLinks.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="text-xs text-slate-600 hover:text-slate-400 transition-colors duration-200"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </motion.footer>
  );
}

export default Footer;
