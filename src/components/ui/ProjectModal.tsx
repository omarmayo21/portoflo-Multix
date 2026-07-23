import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Github, Sparkles, CheckCircle2, Layers } from 'lucide-react';
import { Project } from '../../types';
import { useLanguage } from '../../i18n/context';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const { language, t, direction } = useLanguage();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 sm:p-6 lg:p-10 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#0F1D38]/90 backdrop-blur-xl"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 w-full max-w-5xl h-full sm:h-auto max-h-[92vh] bg-[#0F1D38] border border-white/10 rounded-none sm:rounded-3xl shadow-2xl overflow-y-auto flex flex-col"
        >
          {/* Sticky Header Bar */}
          <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-[#0F1D38]/90 backdrop-blur-md border-b border-white/10">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full bg-[#FF5E3A]/20 border border-[#FF5E3A]/40 text-xs font-bold text-[#FF5E3A]">
                {project.category[language]}
              </span>
              <span className="text-xs text-slate-400 font-mono">{project.year}</span>
            </div>

            <button
              onClick={onClose}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-xs font-semibold text-white hover:bg-[#FF5E3A] transition-colors"
            >
              <X className="w-4 h-4" />
              <span className="hidden sm:inline">{t('modal.close')}</span>
            </button>
          </div>

          {/* Modal Content */}
          <div className="p-6 sm:p-10 space-y-10">
            {/* Title & Subtitle */}
            <div>
              <h2 className="text-3xl sm:text-5xl font-extrabold font-heading text-white mb-4">
                {project.title[language]}
              </h2>
              <p className="text-lg text-slate-300 font-normal leading-relaxed max-w-3xl">
                {project.description[language]}
              </p>
            </div>

            {/* Main Cover Showcase */}
            <div className="relative rounded-2xl overflow-hidden aspect-[16/9] border border-white/10 shadow-2xl">
              <img
                src={project.coverImage}
                alt={project.title[language]}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Metrics Grid */}
            {project.metrics && project.metrics.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {project.metrics.map((metric, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-[#2A4073]/30 border border-white/10 backdrop-blur-md text-center"
                  >
                    <span className="block text-3xl font-black font-heading text-[#FF5E3A] mb-1">
                      {metric.value}
                    </span>
                    <span className="text-xs font-medium text-slate-300">
                      {metric.label[language]}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Challenge & Solution */}
            {(project.challenge || project.solution) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {project.challenge && (
                  <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                    <h3 className="text-lg font-bold font-heading text-white mb-3 flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-[#FF5E3A]" />
                      <span>{t('modal.challenge')}</span>
                    </h3>
                    <p className="text-sm text-slate-300 leading-relaxed">
                      {project.challenge[language]}
                    </p>
                  </div>
                )}

                {project.solution && (
                  <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                    <h3 className="text-lg font-bold font-heading text-white mb-3 flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                      <span>{t('modal.solution')}</span>
                    </h3>
                    <p className="text-sm text-slate-300 leading-relaxed">
                      {project.solution[language]}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Technologies */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 font-heading mb-4 flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#FF5E3A]" />
                <span>{t('modal.techStack')}</span>
              </h3>
              <div className="flex flex-wrap gap-2.5">
                {project.technologies.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-4 py-2 rounded-xl bg-[#2A4073]/40 border border-white/10 text-xs font-mono font-semibold text-white shadow-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Gallery Grid */}
            {project.gallery && project.gallery.length > 0 && (
              <div>
                <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 font-heading mb-4">
                  {t('modal.galleryTitle')}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {project.gallery.map((img, idx) => (
                    <div key={idx} className="rounded-xl overflow-hidden aspect-[4/3] border border-white/10">
                      <img src={img} alt="" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* External Links Bar */}
            <div className="flex flex-wrap items-center gap-4 pt-6 border-t border-white/10">
              <a
                href={project.liveDemo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 min-w-[200px] flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-gradient-to-r from-[#2A4073] to-[#FF5E3A] text-white font-bold font-heading shadow-glow-accent hover:shadow-[0_0_30px_#FF5E3A] transition-all"
              >
                <span>{t('modal.liveDemoBtn')}</span>
                <ExternalLink className="w-5 h-5" />
              </a>

              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-4 rounded-2xl bg-white/10 border border-white/10 text-white font-bold font-heading hover:bg-white/20 transition-all"
                >
                  <Github className="w-5 h-5" />
                  <span>{t('modal.githubBtn')}</span>
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
