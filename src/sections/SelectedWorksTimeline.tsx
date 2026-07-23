import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Calendar, TrendingUp, ShieldCheck, Zap } from 'lucide-react';
import { useLanguage } from '../i18n/context';
import { SectionHeader } from '../components/ui/SectionHeader';

export const SelectedWorksTimeline: React.FC = () => {
  const { t, language } = useLanguage();
  const [sliderPosition, setSliderPosition] = useState(50);

  const timelineEvents = [
    {
      year: '2026',
      title: { en: 'Aura Atelier 3D Flagship', ar: 'منصة أورا أتيلييه ثلاثية الأبعاد' },
      category: 'E-Commerce & WebGL',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1200&auto=format&fit=crop',
      metric: '+142% Sales'
    },
    {
      year: '2025',
      title: { en: 'NexusHealth Telemedicine', ar: 'نيكسوس هيلث للرعاية الرقمية' },
      category: 'Healthcare App',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1200&auto=format&fit=crop',
      metric: '250k Patients'
    },
    {
      year: '2024',
      title: { en: 'Vanguard Luxury Real Estate', ar: 'فانغارد للعقارات الفاخرة' },
      category: 'Real Estate 3D',
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200&auto=format&fit=crop',
      metric: '$450M Volume'
    },
    {
      year: '2023',
      title: { en: 'Voyage Private Jet Globe', ar: 'رحلات الطيران الخاص العالمية' },
      category: 'WebGL Spatial Map',
      image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=1200&auto=format&fit=crop',
      metric: 'Global Awards'
    }
  ];

  return (
    <section className="py-24 relative bg-[#091224] overflow-hidden border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          badge={t('featuredProject.badge')}
          title={t('featuredProject.title')}
          subtitle={t('featuredProject.subtitle')}
        />

        {/* Interactive Before / After Comparison Slider */}
        <div className="mb-20">
          <div className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-3xl overflow-hidden border border-white/10 shadow-2xl select-none">
            {/* After Image (Full width background) */}
            <img
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1600&auto=format&fit=crop"
              alt="After 3D Multix Store"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute top-4 right-4 z-10 px-4 py-1.5 rounded-full bg-[#FF5E3A] text-white text-xs font-bold font-heading shadow-glow-accent">
              {t('featuredProject.afterLabel')}
            </div>

            {/* Before Image (Clipped overlay) */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${sliderPosition}%` }}
            >
              <img
                src="https://images.unsplash.com/photo-1472851294608-062f824d29cc?q=80&w=1600&auto=format&fit=crop"
                alt="Before Store"
                className="absolute inset-0 w-full h-full object-cover filter grayscale contrast-125"
                style={{ width: '100vw', maxWidth: '1280px' }}
              />
              <div className="absolute top-4 left-4 z-10 px-4 py-1.5 rounded-full bg-slate-900/90 text-slate-300 text-xs font-bold font-heading border border-white/10">
                {t('featuredProject.beforeLabel')}
              </div>
            </div>

            {/* Range Input Slider Controller */}
            <input
              type="range"
              min="0"
              max="100"
              value={sliderPosition}
              onChange={(e) => setSliderPosition(Number(e.target.value))}
              className="absolute inset-0 opacity-0 cursor-ew-resize z-30 w-full h-full"
            />

            {/* Vertical Divider Line & Handle */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-[#FF5E3A] z-20 pointer-events-none shadow-[0_0_15px_#FF5E3A]"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#FF5E3A] text-white flex items-center justify-center shadow-glow-accent font-bold text-xs">
                ↔
              </div>
            </div>
          </div>
        </div>

        {/* Horizontal Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {timelineEvents.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="p-6 rounded-3xl bg-[#0F1D38]/70 border border-white/10 hover:border-[#FF5E3A]/40 transition-all duration-300 group"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-3xl font-black font-heading text-[#FF5E3A]">
                  {item.year}
                </span>
                <span className="px-2.5 py-1 rounded-md bg-[#2A4073]/40 text-[10px] font-mono text-slate-300">
                  {item.metric}
                </span>
              </div>

              <div className="aspect-[16/10] rounded-xl overflow-hidden mb-4 bg-slate-900">
                <img
                  src={item.image}
                  alt=""
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <h4 className="text-lg font-bold font-heading text-white group-hover:text-[#FF5E3A] transition-colors mb-1">
                {item.title[language]}
              </h4>
              <p className="text-xs text-slate-400 font-medium">
                {item.category}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
