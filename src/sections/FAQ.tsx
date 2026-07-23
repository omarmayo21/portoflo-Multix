import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { useLanguage } from '../i18n/context';
import { SectionHeader } from '../components/ui/SectionHeader';

export const FAQ: React.FC = () => {
  const { t } = useLanguage();
  const [openId, setOpenId] = useState<string | null>('faq-1');

  const faqItems = t('faq.items') as any[];

  const toggleAccordion = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="py-24 relative bg-[#091224] overflow-hidden border-t border-white/5">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          badge={t('faq.badge')}
          title={t('faq.title')}
          subtitle={t('faq.subtitle')}
        />

        <div className="space-y-4">
          {faqItems.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div
                key={item.id}
                className="rounded-2xl bg-[#0F1D38]/80 border border-white/10 overflow-hidden transition-colors"
              >
                <button
                  onClick={() => toggleAccordion(item.id)}
                  className="w-full p-6 text-start flex items-center justify-between gap-4 font-bold font-heading text-lg text-white hover:text-[#FF5E3A] transition-colors"
                >
                  <span>{item.question}</span>
                  <div className={`p-2 rounded-full transition-colors ${isOpen ? 'bg-[#FF5E3A] text-white' : 'bg-[#2A4073]/40 text-slate-300'}`}>
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 text-sm text-slate-300 leading-relaxed border-t border-white/5 pt-4">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
