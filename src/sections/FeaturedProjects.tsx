import React from 'react';
import { useLanguage } from '../i18n/context';
import { useSanity } from '../context/SanityContext';
import { SectionHeader } from '../components/ui/SectionHeader';
import { ProjectCard } from '../components/ui/ProjectCard';

export const FeaturedProjects: React.FC = () => {
  const { t } = useLanguage();
  const { projects } = useSanity();

  return (
    <section id="projects" className="py-24 relative bg-[#0F1D38] overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#2A4073]/20 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          badge={t('projects.badge')}
          title={t('projects.title')}
          subtitle={t('projects.subtitle')}
        />

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard
              key={project._id || project.id || index}
              project={project}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
