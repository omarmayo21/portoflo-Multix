import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Palette, Code2, Sparkles, LayoutDashboard, ShoppingCart, Wrench, Check } from 'lucide-react';
import { useLanguage } from '../i18n/context';
import { useSanity } from '../context/SanityContext';
import { SectionHeader } from '../components/ui/SectionHeader';

export const Services: React.FC = () => {
  const { t, language } = useLanguage();
  const { services: sanityServices } = useSanity();
  const [activeCard, setActiveCard] = useState<string | null>(null);

  const iconMap: Record<string, React.ReactNode> = {
    Palette: <Palette className="w-7 h-7 text-[#FF5E3A]" />,
    Code2: <Code2 className="w-7 h-7 text-[#A5C0EE]" />,
    Sparkles: <Sparkles className="w-7 h-7 text-[#FF5E3A]" />,
    LayoutDashboard: <LayoutDashboard className="w-7 h-7 text-[#A5C0EE]" />,
    ShoppingCart: <ShoppingCart className="w-7 h-7 text-[#FF5E3A]" />,
    Wrench: <Wrench className="w-7 h-7 text-[#A5C0EE]" />,
  };

  const defaultServices = t('services.items') as any[];

  // Render Sanity services if available, otherwise default i18n
  const displayServices =
    sanityServices && sanityServices.length > 0
      ? sanityServices.map((s) => ({
          id: s._id,
          title: s.title?.[language] || s.title?.en || '',
          description: s.description?.[language] || s.description?.en || '',
          icon: s.iconName || 'Code2',
          features: (s.features || []).map((f: any) => (typeof f === 'string' ? f : f?.[language] || f?.en || '')),
        }))
      : defaultServices;

  return (
    <section id="services" className="py-24 relative bg-[#091224] border-t border-white/5 overflow-hidden">
      {/* Glow orb */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-[#FF5E3A]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          badge={t('services.badge')}
          title={t('services.title')}
          subtitle={t('services.subtitle')}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayServices.map((item, idx) => (
            <motion.div
              key={item.id || idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              onMouseEnter={() => setActiveCard(item.id)}
              onMouseLeave={() => setActiveCard(null)}
              className={`group relative p-8 rounded-3xl bg-[#0F1D38]/80 border transition-all duration-500 flex flex-col justify-between ${
                activeCard === item.id
                  ? 'border-[#FF5E3A]/60 bg-[#2A4073]/30 shadow-glow-accent -translate-y-2'
                  : 'border-white/10 hover:border-white/20'
              }`}
            >
              <div>
                {/* Icon Container */}
                <div className="w-14 h-14 rounded-2xl bg-[#2A4073]/40 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                  {iconMap[item.icon] || <Sparkles className="w-7 h-7 text-[#FF5E3A]" />}
                </div>

                <h3 className="text-2xl font-bold font-heading text-white group-hover:text-[#FF5E3A] transition-colors mb-3">
                  {item.title}
                </h3>

                <p className="text-sm text-slate-300 leading-relaxed mb-6">
                  {item.description}
                </p>
              </div>

              {/* Features Checklist */}
              {item.features && item.features.length > 0 && (
                <div className="pt-6 border-t border-white/10 space-y-2.5">
                  {item.features.map((feat: string, fIdx: number) => (
                    <div key={fIdx} className="flex items-center gap-2 text-xs font-medium text-slate-300">
                      <Check className="w-3.5 h-3.5 text-[#FF5E3A] shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
