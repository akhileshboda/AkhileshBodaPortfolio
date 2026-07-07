import { ChapterShell, ChapterHeader } from '@/components/ChapterShell';
import Reveal from '@/components/Reveal';
import { projects, type Project } from '@/data/projects';

function ConstellationFigure({ project }: { project: Project }) {
  const { stars, lines } = project.constellation;

  return (
    <svg
      viewBox="0 0 100 60"
      aria-hidden="true"
      className="h-20 w-full opacity-70 transition-opacity duration-500 group-hover:opacity-100"
    >
      {lines.map(([a, b], i) => (
        <line
          key={i}
          x1={stars[a][0]}
          y1={stars[a][1]}
          x2={stars[b][0]}
          y2={stars[b][1]}
          stroke={project.accent}
          strokeOpacity="0.35"
          strokeWidth="0.5"
          strokeDasharray="2 1.5"
        />
      ))}
      {stars.map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="2.6" fill={project.accent} fillOpacity="0.16" />
          <circle cx={x} cy={y} r="1.1" fill={project.accent} fillOpacity="0.95" />
        </g>
      ))}
    </svg>
  );
}

function ProjectCard({ project, delay }: { project: Project; delay: number }) {
  return (
    <Reveal delay={delay} className="h-full">
      <article className="card-glow group flex h-full flex-col rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 backdrop-blur-sm">
        <ConstellationFigure project={project} />

        <div className="mt-4 flex flex-wrap items-center gap-3">
          <h3 className="text-lg font-semibold text-slate-50">{project.title}</h3>
          <span
            className={`status-${project.status} rounded-full px-2.5 py-0.5 text-[11px] font-medium`}
          >
            {project.statusLabel}
          </span>
        </div>

        <p className="mt-1.5 text-sm font-medium text-slate-300">{project.tagline}</p>
        <p className="mt-2.5 flex-1 text-sm leading-relaxed text-slate-400">
          {project.description}
        </p>

        <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="What this project demonstrates">
          {project.demonstrates.map((item) => (
            <li
              key={item}
              className="rounded-md border border-white/[0.07] bg-white/[0.03] px-2 py-1 text-[11px] text-slate-400"
            >
              {item}
            </li>
          ))}
        </ul>

        <p className="mt-4 border-t border-white/[0.05] pt-3 font-mono text-[11px] tracking-wide text-slate-500">
          {project.techStack.join(' · ')}
        </p>
      </article>
    </Reveal>
  );
}

/**
 * Waypoint 04 — Constellations. Each project is a set of stars I've
 * connected into something with a shape.
 */
export default function ProjectConstellations() {
  return (
    <ChapterShell id="projects" wide>
      <ChapterHeader
        id="projects"
        title="Constellations I've drawn so far."
        lede="Individual skills are just stars. Projects are where they get connected into something with a recognisable shape — mobile-first, product-minded, built to be used."
      />

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} delay={index * 0.07} />
        ))}
      </div>
    </ChapterShell>
  );
}
