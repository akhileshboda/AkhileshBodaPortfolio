import { motion, useReducedMotion } from 'motion/react';
import { fadeInUp, staggerContainer, defaultViewport } from '@/utils/animations';
import { projects } from '@/data/projects';
import type { ProjectStatus } from '@/data/projects';
import { ArrowUpRight } from 'lucide-react';

const statusClassMap: Record<ProjectStatus, string> = {
  completed: 'status-completed',
  concept: 'status-concept',
  'in-development': 'status-in-development',
  'coming-soon': 'status-coming-soon',
};

export default function Projects() {
  const reduceMotion = useReducedMotion();

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
              whileHover={reduceMotion ? undefined : 'hover'}
              initial="initial"
              className="group relative flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-white/[0.06] bg-[#16161D] transition-colors duration-300 hover:border-blue-500/30 hover:bg-[#1a1a24]"
            >
              {/* Image Placeholder with Parallax / Scale on Hover */}
              <div className="relative h-48 w-full overflow-hidden bg-gradient-to-br from-blue-900/20 to-purple-900/20">
                <motion.div 
                  className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_70%)]"
                  variants={{
                    initial: { scale: 1, opacity: 0.5 },
                    hover: { scale: 1.1, opacity: 1 }
                  }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                />
                {/* Abstract pattern to make it look less empty */}
                <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '16px 16px' }} />
                
                {/* Top Right Action Icon */}
                <div className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-black/40 backdrop-blur-md border border-white/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <ArrowUpRight className="h-4 w-4 text-white" />
                </div>
              </div>

              {/* Card Content */}
              <div className="flex flex-1 flex-col p-6 z-10 bg-[#16161D] transition-colors duration-300 group-hover:bg-[#1a1a24]">
                {/* Status badge */}
                <span
                  className={`inline-flex self-start rounded-full px-3 py-1 text-xs font-medium ${statusClassMap[project.status]}`}
                >
                  {project.statusLabel}
                </span>

                {/* Title */}
                <h3 className="mt-4 text-xl font-semibold text-slate-100 transition-colors group-hover:text-blue-400">
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

                {/* Tech stack pills — animated slide up on hover */}
                <div className="mt-auto overflow-hidden pt-4">
                  <motion.div 
                    className="flex flex-wrap gap-2"
                    variants={{
                      initial: { y: 10, opacity: 0.5 },
                      hover: { y: 0, opacity: 1 }
                    }}
                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  >
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md bg-white/[0.04] border border-white/[0.02] px-2 py-1 font-mono text-xs text-slate-300 shadow-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </motion.div>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
