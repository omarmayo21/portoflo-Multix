import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../i18n/context';
import { SectionHeader } from '../components/ui/SectionHeader';

export const OurProcess: React.FC = () => {
  const { t } = useLanguage();
  const steps = t('process.steps') as any[];

  return (
    <section id="process" className="py-24 relative bg-[#0F1D38] overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-[#2A4073]/20 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          badge={t('process.badge')}
          title={t('process.title')}
          subtitle={t('process.subtitle')}
        />

        {/* Step Cards List */}
        <div className="space-y-6">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="group relative p-8 sm:p-10 rounded-3xl bg-[#0F1D38]/80 border border-white/10 hover:border-[#FF5E3A]/50 transition-all duration-300 backdrop-blur-md flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
            >
              <div className="flex items-start gap-6">
                <span className="text-4xl sm:text-6xl font-black font-heading text-[#FF5E3A] opacity-90 group-hover:scale-110 transition-transform duration-300">
                  {step.number}
                </span>

                <div>
                  <h3 className="text-xl sm:text-2xl font-bold font-heading text-white group-hover:text-[#FF5E3A] transition-colors mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed max-w-2xl">
                    {step.description}
                  </p>
                </div>
              </div>

              <div className="shrink-0 px-4 py-2 rounded-full bg-[#2A4073]/30 border border-white/10 text-xs font-mono text-slate-300">
                {step.duration}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
