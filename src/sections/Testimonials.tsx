import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '../i18n/context';
import { SectionHeader } from '../components/ui/SectionHeader';

export const Testimonials: React.FC = () => {
  const { t, direction } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = t('testimonials.items') as any[];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const current = testimonials[currentIndex];

  return (
    <section id="testimonials" className="py-24 relative bg-[#0F1D38] overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-[#FF5E3A]/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          badge={t('testimonials.badge')}
          title={t('testimonials.title')}
          subtitle={t('testimonials.subtitle')}
        />

        {/* Testimonial Showcase Card */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="p-8 sm:p-12 rounded-3xl bg-[#0F1D38]/90 border border-white/10 shadow-2xl backdrop-blur-xl relative"
            >
              {/* Quote Mark Icon */}
              <Quote className="w-16 h-16 text-[#FF5E3A]/20 absolute top-8 right-8 pointer-events-none" />

              {/* Star Rating */}
              <div className="flex items-center gap-1 mb-6">
                {[...Array(current.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-[#FF5E3A] text-[#FF5E3A]" />
                ))}
              </div>

              {/* Quote Body */}
              <p className="text-lg sm:text-2xl text-white font-normal leading-relaxed font-sans mb-8">
                "{current.content}"
              </p>

              {/* Author Footer */}
              <div className="flex items-center gap-4 pt-6 border-t border-white/10">
                <img
                  src={current.avatar}
                  alt={current.name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-[#FF5E3A] shadow-glow-accent"
                />

                <div>
                  <h4 className="text-lg font-bold font-heading text-white">
                    {current.name}
                  </h4>
                  <p className="text-xs text-slate-400 font-medium">
                    {current.role} — <span className="text-[#FF5E3A]">{current.company}</span>
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={direction === 'rtl' ? handleNext : handlePrev}
              className="p-3 rounded-full bg-[#2A4073]/40 border border-white/10 text-white hover:bg-[#FF5E3A] transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    currentIndex === idx ? 'bg-[#FF5E3A] w-8' : 'bg-slate-700'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={direction === 'rtl' ? handlePrev : handleNext}
              className="p-3 rounded-full bg-[#2A4073]/40 border border-white/10 text-white hover:bg-[#FF5E3A] transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
