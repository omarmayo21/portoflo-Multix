import React, { useRef, useState, MouseEvent } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { Project } from '../../types';
import { useLanguage } from '../../i18n/context';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const { language, direction } = useLanguage();
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rX = ((y - centerY) / centerY) * -6;
    const rY = ((x - centerX) / centerX) * 6;

    setRotateX(rX);
    setRotateY(rY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.a
      href={project.liveDemo}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      style={{ perspective: 1000 }}
      className="block w-full text-start"
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        animate={{ rotateX, rotateY }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="group relative rounded-3xl bg-[#0F1D38]/90 border border-white/10 overflow-hidden shadow-2xl hover:border-[#FF5E3A]/60 transition-colors duration-400 flex flex-col h-full"
      >
        {/* Cover Image Container */}
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-900">
          <img
            src={project.coverImage}
            alt={project.title[language]}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            loading="lazy"
          />

          {/* Dark Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F1D38] via-[#0F1D38]/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />

          {/* Category Badge */}
          <div className="absolute top-4 right-4 z-10 px-3 py-1 rounded-full bg-[#0F1D38]/80 backdrop-blur-md border border-white/10 text-xs font-semibold text-slate-300">
            {project.category[language]}
          </div>
        </div>

        {/* Content Details */}
        <div className="p-6 sm:p-8 flex flex-col justify-between flex-grow bg-[#0F1D38]/95">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold font-heading text-white group-hover:text-[#FF5E3A] transition-colors duration-300 mb-2.5">
              {project.title[language]}
            </h3>
            <p className="text-sm text-slate-300 line-clamp-2 leading-relaxed mb-6">
              {project.description[language]}
            </p>
          </div>

          {/* Tech Stack & Action Button */}
          <div className="space-y-4 pt-4 border-t border-white/10">
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-md bg-[#2A4073]/30 border border-white/5 text-[11px] font-mono text-slate-300"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Live Demo Action Button */}
            <div className="w-full py-3 rounded-2xl bg-gradient-to-r from-[#2A4073] to-[#FF5E3A] text-white text-xs font-bold font-heading shadow-glow-accent group-hover:shadow-[0_0_25px_#FF5E3A] transition-all flex items-center justify-center gap-2">
              <span>Live Demo</span>
              <ExternalLink className="w-4 h-4" />
            </div>
          </div>
        </div>
      </motion.div>
    </motion.a>
  );
};
