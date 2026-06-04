import { motion } from 'motion/react';
import { fadeInUp, staggerContainer, defaultViewport } from '@/utils/animations';
import { MapPin, GraduationCap, Globe, ArrowRight } from 'lucide-react';

const highlights = [
  {
    icon: GraduationCap,
    label: 'Institution',
    value: 'Purdue University',
    sub: 'West Lafayette, Indiana',
  },
  {
    icon: Globe,
    label: 'Program',
    value: 'Academic Exchange',
    sub: 'United States',
  },
  {
    icon: MapPin,
    label: 'Impact',
    value: 'Technical & Cultural Breadth',
    sub: 'U.S. tech ecosystem exposure',
  },
];

function PurdueExchange() {
  return (
    <section id="purdue" className="py-24 md:py-32 bg-[#111118]/50">
      <div className="mx-auto max-w-6xl px-6">
        {/* Section heading */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          className="mb-16"
        >
          {/* Chapter pill */}
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1 text-xs font-medium text-slate-500 tracking-wide">
            <span className="h-1 w-1 rounded-full bg-amber-400" />
            Exchange Experience
          </div>

          <h2 className="text-3xl md:text-4xl font-bold gradient-text-blue">
            Purdue Exchange
          </h2>
          <p className="mt-3 text-slate-400 text-lg max-w-xl leading-relaxed">
            A U.S. chapter that sharpened the direction.
          </p>
        </motion.div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left — Narrative */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            className="space-y-6"
          >
            <p className="text-slate-300 leading-relaxed">
              My exchange at Purdue University gave me a wider academic and
              professional frame of reference. Studying within a different
              educational system — one with a strong pipeline into U.S. industry
              and graduate research — exposed me to a distinct approach to
              computer science, product culture, and technical ambition.
            </p>
            <p className="text-slate-300 leading-relaxed">
              Living and studying independently in a new country strengthened my
              adaptability and reinforced the kind of developer I want to become:
              product-focused, technically credible, and comfortable operating
              across disciplines and environments. The experience clarified my
              interest in U.S. graduate study, the broader technology ecosystem,
              and building software at the intersection of product, systems, and
              human impact.
            </p>

            {/* Subtle CTA */}
            <motion.div
              variants={fadeInUp}
              className="pt-2"
            >
              <a
                href="#journey"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('journey')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors duration-200 cursor-pointer group"
              >
                See the full timeline
                <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform duration-200" />
              </a>
            </motion.div>
          </motion.div>

          {/* Right — Highlight cards */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            className="space-y-4"
          >
            {highlights.map((item) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.label}
                  variants={fadeInUp}
                  className="flex items-start gap-4 rounded-2xl border border-white/[0.06] bg-[#16161D] p-6 card-glow"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-500/10">
                    <Icon className="h-5 w-5 text-amber-400" />
                  </div>
                  <div>
                    <span className="block text-xs font-medium uppercase tracking-wider text-slate-500">
                      {item.label}
                    </span>
                    <span className="mt-0.5 block text-sm font-medium text-slate-200">
                      {item.value}
                    </span>
                    <span className="mt-0.5 block text-xs text-slate-500">
                      {item.sub}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default PurdueExchange;
