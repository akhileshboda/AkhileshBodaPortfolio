import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

/* TODO: replace placeholder copy with your final accessibility statement */

function Accessibility() {
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
          Accessibility
        </h1>
        <p className="text-sm text-slate-600 mb-10">Last updated: {new Date().getFullYear()}</p>

        {/* Body */}
        <div className="space-y-6 text-slate-400 leading-relaxed">
          <p>
            This portfolio aims to meet WCAG 2.1 Level AA accessibility
            guidelines. It is built with semantic HTML, logical heading
            hierarchy, and descriptive ARIA labels where needed.
          </p>
          <p>
            Animations respect the{' '}
            <code className="text-slate-300 bg-white/[0.06] rounded px-1 py-0.5 text-sm font-mono">
              prefers-reduced-motion
            </code>{' '}
            media query — visitors who have reduced-motion enabled in their
            operating system will see minimal or no animations. The site is
            keyboard navigable and tested for adequate color contrast.
          </p>
          <p>
            Accessibility is an ongoing effort. If you encounter any barriers
            while using this site, please reach out via the contact links on the
            main page. Feedback is genuinely appreciated.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Accessibility;
