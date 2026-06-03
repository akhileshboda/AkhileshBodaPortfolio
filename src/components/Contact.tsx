import { motion } from 'motion/react';
import { Mail, ExternalLink, FileText } from 'lucide-react';
import { fadeInUp, defaultViewport } from '@/utils/animations';

const contactLinks = [
  { icon: Mail, label: 'hello@akhil.dev', href: '#' },
  { icon: ExternalLink, label: 'LinkedIn', href: '#' },
  { icon: ExternalLink, label: 'GitHub', href: '#' },
  { icon: FileText, label: 'Resume', href: '#' },
];

const Contact = () => {
  return (
    <section id="contact" className="py-24 md:py-32 bg-[#111118]/50">
      {/* Section divider */}
      <div className="section-divider mb-20" />

      <div className="max-w-6xl mx-auto px-6">
        {/* Heading */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          className="text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold gradient-text-blue">
            Let&apos;s Connect
          </h2>
          <p className="text-slate-400 mt-4 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
            I&apos;m open to conversations about product-focused development,
            mobile engineering, and meaningful technology work.
          </p>
        </motion.div>

        {/* Contact links */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          className="flex flex-wrap justify-center gap-6 mt-10"
        >
          {contactLinks.map(({ icon: Icon, label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-slate-400 hover:text-slate-100 transition-colors duration-200 cursor-pointer"
            >
              <Icon className="w-4 h-4" />
              <span className="text-sm">{label}</span>
            </a>
          ))}
        </motion.div>

        {/* Footer */}
        <motion.footer
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          className="mt-20 pt-8 border-t border-white/[0.06] text-center"
        >
          <p className="text-sm text-slate-600">
            &copy; 2025 Akhil. Built with intention.
          </p>
          <p className="text-xs text-slate-700 mt-2">
            React · TypeScript · Tailwind CSS · Motion
          </p>
        </motion.footer>
      </div>
    </section>
  );
};

export default Contact;
