import { Code2, ExternalLink, Mail, FileText } from 'lucide-react';
import { profile } from '@/data/profile';
import { scrollToChapterId } from '@/journey/navigation';

/**
 * Fixed utility bar — brand on the left, comms on the right.
 * Deliberately quiet so the sky stays the star of the show.
 */
export default function TopBar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/[0.05] bg-[#020611]/60 backdrop-blur-md">
      <div className="flex h-14 items-center justify-between px-4 md:px-6">
        {/* Brand — returns to the launch pad */}
        <button
          type="button"
          onClick={() => scrollToChapterId('launch')}
          className="group flex cursor-pointer items-center gap-3 focus-ring rounded-md"
          aria-label="Return to the start of the journey"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] font-mono text-xs font-semibold text-cyan-200/90 transition-colors duration-300 group-hover:border-cyan-300/30">
            AB
          </span>
          <span className="hidden text-left sm:block">
            <span className="block text-sm font-medium leading-tight text-slate-200">
              {profile.name}
            </span>
            <span className="block font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">
              {profile.role}
            </span>
          </span>
        </button>

        {/* Comms */}
        <nav aria-label="External links" className="flex items-center gap-1 md:gap-2">
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile"
            className="focus-ring flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition-colors duration-200 hover:bg-white/[0.05] hover:text-slate-100"
          >
            <Code2 className="h-4 w-4" aria-hidden="true" />
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn profile"
            className="focus-ring flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition-colors duration-200 hover:bg-white/[0.05] hover:text-slate-100"
          >
            <ExternalLink className="h-4 w-4" aria-hidden="true" />
          </a>
          <a
            href={profile.email}
            aria-label="Send an email"
            className="focus-ring flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition-colors duration-200 hover:bg-white/[0.05] hover:text-slate-100"
          >
            <Mail className="h-4 w-4" aria-hidden="true" />
          </a>
          <a
            href={profile.resume}
            className="focus-ring ml-1 hidden items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-3.5 py-2 text-xs font-medium text-slate-300 transition-colors duration-200 hover:border-cyan-300/25 hover:text-slate-100 sm:flex"
          >
            <FileText className="h-3.5 w-3.5" aria-hidden="true" />
            Resume
          </a>
        </nav>
      </div>
    </header>
  );
}
