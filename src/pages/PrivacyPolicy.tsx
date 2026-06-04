import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

/* TODO: replace placeholder copy with your final privacy policy text */

function PrivacyPolicy() {
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
          Privacy Policy
        </h1>
        <p className="text-sm text-slate-600 mb-10">Last updated: {new Date().getFullYear()}</p>

        {/* Body */}
        <div className="space-y-6 text-slate-400 leading-relaxed">
          <p>
            This is a personal portfolio website. It does not collect, store, or
            share any personal information about visitors. There are no analytics
            trackers, no cookies beyond standard browser behavior, and no
            third-party data brokers involved.
          </p>
          <p>
            Any contact information you voluntarily provide (for example, by
            sending an email via a contact link) is used solely to respond to
            your message. It is not retained, shared, or used for any other
            purpose.
          </p>
          <p>
            This site is hosted as a static web application. If you have any
            questions about this policy, you are welcome to reach out via the
            contact links on the main page.
          </p>
        </div>
      </div>
    </div>
  );
}

export default PrivacyPolicy;
