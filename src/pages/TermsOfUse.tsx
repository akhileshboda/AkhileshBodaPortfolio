import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

/* TODO: replace placeholder copy with your final terms of use text */

function TermsOfUse() {
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
          Terms of Use
        </h1>
        <p className="text-sm text-slate-600 mb-10">Last updated: {new Date().getFullYear()}</p>

        {/* Body */}
        <div className="space-y-6 text-slate-400 leading-relaxed">
          <p>
            This website is a personal portfolio and is provided for
            informational purposes only. The content — including text, project
            descriptions, and design — is original work unless otherwise noted.
          </p>
          <p>
            You are welcome to view and share this portfolio. You may not
            reproduce, redistribute, or use the content for commercial purposes
            without explicit permission. Project code linked from this site may
            carry its own open-source licence — refer to the relevant repository
            for details.
          </p>
          <p>
            This site is provided without warranty of any kind. The author makes
            no guarantees about accuracy, completeness, or availability. Links to
            external sites are provided for convenience and do not imply
            endorsement.
          </p>
        </div>
      </div>
    </div>
  );
}

export default TermsOfUse;
