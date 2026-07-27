import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Award, Globe, Flame } from 'lucide-react';
import { useLanguage } from '../i18n/context';
import { useSanity } from '../context/SanityContext';
import { SectionHeader } from '../components/ui/SectionHeader';

export const About: React.FC = () => {
  const { t, language } = useLanguage();
  const { websiteContent } = useSanity();
  const stats = t('about.stats') as any[];

  // Dynamic Sanity content with i18n fallback
  const aboutBadge = websiteContent?.aboutBadge?.[language] || websiteContent?.aboutBadge?.en || t('about.badge');
  const aboutTitle = websiteContent?.aboutTitle?.[language] || websiteContent?.aboutTitle?.en || t('about.title');
  const aboutDescription = websiteContent?.aboutDescription?.[language] || websiteContent?.aboutDescription?.en || t('about.subtitle');

  return (
    <section id="about" className="py-24 relative bg-[#091224] overflow-hidden border-t border-white/5">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#2A4073]/20 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          badge={aboutBadge}
          title={aboutTitle}
          subtitle={aboutDescription}
        />

        {/* Studio Story Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-6 space-y-6"
          >
            <h3 className="text-3xl sm:text-4xl font-extrabold font-heading text-white leading-tight">
              {t('about.storyTitle')}
            </h3>

            <p className="text-base text-slate-300 leading-relaxed font-normal">
              {t('about.storyText1')}
            </p>

            <p className="text-base text-slate-300 leading-relaxed font-normal">
              {t('about.storyText2')}
            </p>

            <div className="pt-4 flex flex-wrap gap-4">
              <div className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-[#2A4073]/30 border border-white/10">
                <Flame className="w-5 h-5 text-[#FF5E3A]" />
                <span className="text-xs font-bold text-white font-heading">Zero Templates Policy</span>
              </div>
              <div className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-[#2A4073]/30 border border-white/10">
                <ShieldCheck className="w-5 h-5 text-[#A5C0EE]" />
                <span className="text-xs font-bold text-white font-heading">60 FPS WebGL Standard</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-6"
          >
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop"
                alt="Multix Studio Team"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F1D38] via-transparent to-transparent opacity-80" />
              
              <div className="absolute bottom-6 left-6 right-6 p-6 rounded-2xl bg-[#0F1D38]/80 backdrop-blur-md border border-white/10 flex items-center justify-between">
                <div>
                  <span className="block text-xl font-bold font-heading text-white">MULTIX STUDIO HQ</span>
                  <span className="text-xs text-slate-400">Dubai, UAE & London, UK</span>
                </div>
                <Globe className="w-8 h-8 text-[#FF5E3A]" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="p-8 rounded-3xl bg-[#0F1D38]/80 border border-white/10 text-center shadow-xl hover:border-[#FF5E3A]/40 transition-colors"
            >
              <span className="block text-4xl sm:text-5xl font-black font-heading text-[#FF5E3A] mb-2 shadow-glow-accent">
                {stat.value}
              </span>
              <span className="text-xs sm:text-sm font-semibold text-slate-300">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
