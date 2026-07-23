import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Globe, Sparkles } from 'lucide-react';
import { projectsData } from '../../data/projects';
import { useLanguage } from '../../i18n/context';

export const HeroBrowserShowcase: React.FC = () => {
  const { language } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);

  const projects = projectsData.slice(0, 6);
  const activeProject = projects[activeIndex];

  return (
    <div className="relative w-full max-w-lg lg:max-w-xl mx-auto">
      {/* Background Soft Radial Glow */}
      <div className="absolute inset-0 bg-[#FF5E3A]/15 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute -top-10 -left-10 w-48 h-48 bg-[#2A4073]/30 rounded-full blur-[90px] pointer-events-none" />

      {/* Main Perspective Floating Glass Browser Window */}
      <motion.div
        initial={{ opacity: 0, y: 30, rotateX: 6, rotateY: -6 }}
        animate={{ opacity: 1, y: 0, rotateX: 0, rotateY: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative rounded-2xl bg-[#0F1D38]/90 border border-white/15 overflow-hidden shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] backdrop-blur-2xl group"
      >
        {/* Browser Top Window Chrome Bar */}
        <div className="px-4 py-3 bg-[#091224]/90 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
          </div>

          {/* URL Address Bar */}
          <div className="px-4 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-mono text-slate-300 flex items-center gap-2 truncate max-w-[240px] sm:max-w-[320px]">
            <Globe className="w-3 h-3 text-[#FF5E3A] shrink-0" />
            <span className="truncate">{activeProject.liveDemo.replace('https://', '')}</span>
          </div>

          <a
            href={activeProject.liveDemo}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 rounded-lg bg-white/5 hover:bg-[#FF5E3A] text-slate-300 hover:text-white transition-colors"
            title="Open live website"
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Screenshot Viewport */}
        <a
          href={activeProject.liveDemo}
          target="_blank"
          rel="noopener noreferrer"
          className="relative block aspect-[16/10] overflow-hidden bg-slate-900"
        >
          <img
            src={activeProject.coverImage}
            alt={activeProject.title[language]}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F1D38] via-transparent to-transparent opacity-60" />

          {/* Floating Live Badge Overlay */}
          <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-[#0F1D38]/85 border border-white/10 backdrop-blur-md flex items-center justify-between">
            <div>
              <span className="block text-sm font-bold font-heading text-white">
                {activeProject.title[language]}
              </span>
              <span className="text-[11px] text-slate-400">
                {activeProject.category[language]}
              </span>
            </div>

            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FF5E3A] text-white text-[11px] font-bold font-heading shadow-glow-accent">
              <span>View Live</span>
              <ExternalLink className="w-3 h-3" />
            </div>
          </div>
        </a>
      </motion.div>

      {/* Floating Mini Browser Selector Tabs */}
      <div className="mt-4 grid grid-cols-3 sm:grid-cols-6 gap-2">
        {projects.map((proj, idx) => (
          <button
            key={proj.id}
            onClick={() => setActiveIndex(idx)}
            className={`p-1.5 rounded-xl border text-center transition-all duration-300 overflow-hidden ${
              activeIndex === idx
                ? 'bg-[#2A4073]/50 border-[#FF5E3A] shadow-glow-accent scale-105'
                : 'bg-[#0F1D38]/60 border-white/10 hover:border-white/20 opacity-70 hover:opacity-100'
            }`}
          >
            <div className="aspect-[16/10] rounded-lg overflow-hidden mb-1 bg-slate-800">
              <img src={proj.coverImage} alt="" className="w-full h-full object-cover" />
            </div>
            <span className="block text-[10px] font-heading font-semibold text-slate-200 truncate px-1">
              {proj.title[language].split(' ')[0]}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
