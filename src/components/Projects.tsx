import { motion } from 'motion/react';
import { fadeInUp, staggerContainer, defaultViewport } from '@/utils/animations';
import { projects } from '@/data/projects';
import type { ProjectStatus } from '@/data/projects';

const statusClassMap: Record<ProjectStatus, string> = {
  completed: 'status-completed',
  concept: 'status-concept',
  'in-development': 'status-in-development',
  'coming-soon': 'status-coming-soon',
};

export default function Projects() {
  return (
    <section id="projects" className="bg-[#111118]/50 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        {/* Header */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
        >
          <h2 className="text-3xl font-bold tracking-tight gradient-text-blue md:text-4xl">
            Featured Projects
          </h2>
          <p className="mt-4 max-w-2xl text-slate-400">
            Selected work across mobile development, product design, and systems
            experimentation.
          </p>
        </motion.div>

        {/* Project grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {projects.map((project) => (
            <motion.article
              key={project.id}
              variants={fadeInUp}
              className="card-glow flex h-full cursor-pointer flex-col rounded-2xl border border-white/[0.06] bg-[#16161D] p-6 transition-colors duration-200 hover:border-blue-500/30"
            >
              {/* Status badge */}
              <span
                className={`inline-flex self-start rounded-full px-3 py-1 text-xs font-medium ${statusClassMap[project.status]}`}
              >
                {project.statusLabel}
              </span>

              {/* Title */}
              <h3 className="mt-4 text-xl font-semibold text-slate-100">
                {project.title}
              </h3>

              {/* Tagline */}
              <p className="mt-2 text-sm text-slate-400">{project.tagline}</p>

              {/* Description */}
              <p className="mt-3 text-sm leading-relaxed text-slate-400/80">
                {project.description}
              </p>

              {/* Demonstrates tags */}
              <div className="mt-4 flex flex-wrap gap-2">
                {project.demonstrates.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md border border-blue-500/20 bg-blue-500/10 px-2 py-1 text-xs text-blue-400"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Tech stack pills — pushed to bottom */}
              <div className="mt-auto flex flex-wrap gap-2 pt-4">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-md bg-white/[0.04] px-2 py-1 font-mono text-xs text-slate-500"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
