import { motion } from 'motion/react';
import { Mail, ExternalLink, FileText, Code2 } from 'lucide-react';
import { fadeInUp, defaultViewport } from '@/utils/animations';
import { profile } from '@/data/profile';

const contactLinks = [
  { icon: Mail, label: 'Email', href: profile.email, external: false },
  { icon: ExternalLink, label: 'LinkedIn', href: profile.linkedin, external: true },
  { icon: Code2, label: 'GitHub', href: profile.github, external: true },
  { icon: FileText, label: 'Resume', href: profile.resume, external: false },
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
          {contactLinks.map(({ icon: Icon, label, href, external }) => (
            <motion.a
              key={label}
              href={href}
              target={external ? '_blank' : undefined}
              rel={external ? 'noopener noreferrer' : undefined}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 text-slate-400 hover:text-slate-100 transition-colors duration-200 cursor-pointer"
            >
              <Icon className="w-4 h-4" />
              <span className="text-sm">{label}</span>
            </motion.a>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default Contact;
