import { motion, useReducedMotion } from 'motion/react';
import { FileText, Mail } from 'lucide-react';
import type { ComponentType } from 'react';
import logo from '@/assets/logo.png';
import { profile } from '@/data/profile';

/* ── Inline brand icons (no extra dependency) ──────────────────── */
function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.22.79 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 .5C5.37.5 0 5.87 0 12.5c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58l-.01-2.05c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.21.09 1.84 1.24 1.84 1.24 1.07 1.84 2.81 1.31 3.5 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.34-5.47-5.96 0-1.32.47-2.39 1.24-3.23-.13-.31-.54-1.53.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.65.25 2.87.12 3.18.77.84 1.23 1.91 1.23 3.23 0 4.63-2.81 5.65-5.49 5.95.43.37.81 1.1.81 2.22l-.01 3.29c0 .32.22.7.83.58A12.01 12.01 0 0 0 24 12.5C24 5.87 18.63.5 12 .5z" />
    </svg>
  );
}

type IconLink = {
  label: string;
  href: string;
  icon: ComponentType<{ className?: string }>;
  external?: boolean;
  download?: boolean;
};

const cluster1: IconLink[] = [
  { label: 'LinkedIn', href: profile.linkedin, icon: LinkedInIcon, external: true },
  { label: 'GitHub', href: profile.github, icon: GitHubIcon, external: true },
];

const cluster2: IconLink[] = [
  { label: 'Resume', href: profile.resume, icon: FileText, download: true },
  { label: 'Email', href: profile.email, icon: Mail },
];

const labelVariants = {
  rest: { width: 0, opacity: 0, marginLeft: 0 },
  hover: { width: 'auto', opacity: 1, marginLeft: 6 },
};

const labelTransition = { duration: 0.18, ease: 'easeOut' as const };

const logoSizing = {
  button: 52,
  stage: 44,
  image: 100,
};

const logoPulse = {
  scale: 1.08,
  minOpacity: 0.92,
  duration: 2.4,
};

function AnimatedLogo() {
  const reduce = useReducedMotion();

  return (
    <span
      className="pointer-events-none absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center"
      style={{ width: logoSizing.stage, height: logoSizing.stage }}
    >
      <motion.img
        src={logo}
        alt=""
        aria-hidden="true"
        draggable="false"
        className="relative select-none object-contain drop-shadow-[0_0_10px_rgba(56,214,255,0.7)]"
        style={{ width: logoSizing.image, height: logoSizing.image }}
        animate={
          reduce
            ? undefined
            : { scale: [1, logoPulse.scale, 1], opacity: [logoPulse.minOpacity, 1, logoPulse.minOpacity] }
        }
        transition={
          reduce
            ? undefined
            : { duration: logoPulse.duration, repeat: Infinity, ease: 'easeInOut' }
        }
      />
    </span>
  );
}

function BrandIdentity({ onClick }: { onClick: (e: React.MouseEvent) => void }) {
  return (
    <div className="flex min-w-0 items-center">
      <a
        href="#hero"
        onClick={onClick}
        aria-label={`${profile.name}, back to top`}
        className="group flex min-w-0 shrink-0 items-center gap-3 rounded-full pr-2 transition-opacity duration-200 hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/60 cursor-pointer sm:pr-4"
      >
        <span
          className="relative flex shrink-0 items-center justify-center rounded-full border border-blue-500/30 bg-gradient-to-br from-blue-500/10 to-purple-500/10 shadow-[0_0_20px_-4px_rgba(47,128,255,0.5)] transition-colors duration-200 group-hover:border-blue-500/50"
          style={{ width: logoSizing.button, height: logoSizing.button }}
        >
          <AnimatedLogo />
        </span>

        <span className="hidden min-w-0 flex-col leading-[0.95] sm:flex">
          <span className="truncate font-heading text-[15px] font-semibold tracking-normal text-slate-100 md:text-base">
            {profile.name}
          </span>
          <span className="mt-0.5 truncate text-[11px] font-medium tracking-normal text-slate-400 md:text-xs">
            {profile.role}
          </span>
        </span>
      </a>
    </div>
  );
}

function IconButton({ link }: { link: IconLink }) {
  const Icon = link.icon;
  return (
    <motion.a
      href={link.href}
      aria-label={link.label}
      title={link.label}
      target={link.external ? '_blank' : undefined}
      rel={link.external ? 'noreferrer' : undefined}
      download={link.download}
      initial="rest"
      whileHover="hover"
      whileTap={{ scale: 0.94 }}
      className="flex h-8 min-w-8 items-center justify-center overflow-hidden rounded-full px-2 text-slate-400 transition-colors duration-150 hover:bg-white/[0.06] hover:text-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/60 cursor-pointer"
    >
      <Icon className="h-[15px] w-[15px] shrink-0" />
      <motion.span
        variants={labelVariants}
        transition={labelTransition}
        className="overflow-hidden whitespace-nowrap text-[11px] font-medium tracking-wide"
        style={{ display: 'inline-block' }}
      >
        {link.label}
      </motion.span>
    </motion.a>
  );
}

function IconCluster({ links }: { links: IconLink[] }) {
  return (
    <motion.div
      layout
      transition={{ duration: 0.18, ease: 'easeOut' }}
      className="flex items-center gap-0.5 rounded-full border border-white/[0.08] bg-white/[0.03] px-1 py-1 backdrop-blur-sm"
    >
      {links.map((link, i) => (
        <div key={link.label} className="flex items-center">
          {i > 0 && <span className="mx-0.5 h-4 w-px bg-white/[0.08]" />}
          <IconButton link={link} />
        </div>
      ))}
    </motion.div>
  );
}

function TopUtilityBar() {
  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    document.querySelector('#hero')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="fixed left-0 right-0 top-0 z-50"
    >
      <div className="relative flex h-[60px] items-center px-4 sm:px-7">
        {/* Brand identity */}
        <BrandIdentity onClick={scrollToTop} />

        {/* External utility clusters */}
        <nav
          aria-label="Professional links"
          className="absolute right-4 top-1/2 flex -translate-y-1/2 items-center gap-2.5 sm:right-7"
        >
          <IconCluster links={cluster1} />
          <div className="hidden sm:block">
            <IconCluster links={cluster2} />
          </div>
        </nav>
      </div>
    </motion.header>
  );
}

export default TopUtilityBar;
