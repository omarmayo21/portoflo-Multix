import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../i18n/context';
import { SectionHeader } from '../components/ui/SectionHeader';

interface TechTool {
  name: string;
  category: 'frontend' | '3d' | 'backend' | 'design';
  iconSvg: string;
  description: string;
}

export const TechStack: React.FC = () => {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const tools: TechTool[] = [
    { name: 'React 19', category: 'frontend', iconSvg: '⚛️', description: 'Next-gen reactive component architecture' },
    { name: 'Next.js 15', category: 'frontend', iconSvg: '▲', description: 'Server-side rendering & edge performance' },
    { name: 'Three.js', category: '3d', iconSvg: '🧊', description: 'WebGL 3D rendering engine' },
    { name: 'React Three Fiber', category: '3d', iconSvg: '⚡', description: 'Declarative R3F component pipeline' },
    { name: 'TypeScript', category: 'frontend', iconSvg: '📘', description: 'Type-safe enterprise architecture' },
    { name: 'Tailwind CSS', category: 'frontend', iconSvg: '🎨', description: 'Utility-first luxury styling' },
    { name: 'Framer Motion', category: '3d', iconSvg: '✨', description: 'Production-ready UI animation physics' },
    { name: 'Lenis Scroll', category: 'frontend', iconSvg: '🌊', description: 'Smooth momentum scroll engine' },
    { name: 'Node.js', category: 'backend', iconSvg: '🟢', description: 'High-throughput asynchronous runtime' },
    { name: 'Supabase', category: 'backend', iconSvg: '⚡', description: 'Real-time PostgreSQL cloud database' },
    { name: 'Firebase', category: 'backend', iconSvg: '🔥', description: 'Serverless authentication & real-time DB' },
    { name: 'PostgreSQL', category: 'backend', iconSvg: '🐘', description: 'Relational enterprise database' },
    { name: 'Laravel', category: 'backend', iconSvg: '🔴', description: 'Elegant PHP web framework' },
    { name: 'GSAP', category: '3d', iconSvg: '🟢', description: 'Complex timeline animation engine' },
    { name: 'Figma', category: 'design', iconSvg: '📐', description: 'Collaborative UI/UX design tokens' },
  ];

  const filteredTools = tools.filter((tool) => {
    if (activeCategory === 'all') return true;
    return tool.category === activeCategory;
  });

  return (
    <section id="tech-stack" className="py-24 relative bg-[#091224] overflow-hidden border-t border-white/5">
      {/* Glow orb */}
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-[#2A4073]/20 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          badge={t('techStack.badge')}
          title={t('techStack.title')}
          subtitle={t('techStack.subtitle')}
        />

        {/* Category Buttons Bar */}
        <div className="flex flex-wrap justify-center items-center gap-3 mb-14">
          {['all', 'frontend', '3d', 'backend', 'design'].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-xs font-bold font-heading capitalize transition-all ${
                activeCategory === cat
                  ? 'bg-[#FF5E3A] text-white shadow-glow-accent'
                  : 'bg-[#2A4073]/30 border border-white/10 text-slate-300 hover:text-white'
              }`}
            >
              {t(`techStack.categories.${cat}`)}
            </button>
          ))}
        </div>

        {/* Tech Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {filteredTools.map((tool, idx) => (
            <motion.div
              key={tool.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              whileHover={{ y: -8, scale: 1.05 }}
              className="p-6 rounded-3xl bg-[#0F1D38]/80 border border-white/10 hover:border-[#FF5E3A]/50 transition-all duration-300 text-center flex flex-col items-center justify-between group shadow-lg"
            >
              <div className="w-14 h-14 rounded-2xl bg-[#2A4073]/30 border border-white/10 flex items-center justify-center text-3xl mb-4 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                {tool.iconSvg}
              </div>

              <div>
                <h4 className="text-base font-bold font-heading text-white group-hover:text-[#FF5E3A] transition-colors mb-1">
                  {tool.name}
                </h4>
                <p className="text-[11px] text-slate-400 font-mono leading-tight">
                  {tool.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
