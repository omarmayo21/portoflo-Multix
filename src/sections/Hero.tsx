import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Sparkles, ShieldCheck, Zap } from 'lucide-react';
import { useLanguage } from '../i18n/context';
import { useSanity } from '../context/SanityContext';
import { HeroCanvas } from '../components/3d/HeroCanvas';
import { MagneticButton } from '../components/ui/MagneticButton';
import { HeroBrowserShowcase } from '../components/ui/HeroBrowserShowcase';

export const Hero: React.FC = () => {
  const { t, language } = useLanguage();
  const { websiteContent } = useSanity();

  const heroBadge = websiteContent?.heroBadge?.[language] || websiteContent?.heroBadge?.en || t('hero.badge');
  const heroSubtitle = websiteContent?.heroSubtitle?.[language] || websiteContent?.heroSubtitle?.en || t('hero.subtitle');

  return (
    <section className="relative min-h-[92vh] lg:min-h-screen w-full flex items-center justify-center pt-28 pb-16 overflow-hidden bg-[#0F1D38] select-none">
      {/* Background 3D Canvas Dust & Subtle Badge */}
      <HeroCanvas />

      {/* Radial Ambient Gradient Orbs */}
      <div className="absolute top-1/4 left-10 w-[500px] h-[500px] bg-[#2A4073]/20 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-[#FF5E3A]/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Main Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Copy, CTAs & Badges */}
          <div className="lg:col-span-6 text-center lg:text-start space-y-6">
            
            {/* Badge Pill */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#2A4073]/30 border border-[#2A4073]/60 backdrop-blur-md shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#FF5E3A]" />
              <span className="text-xs font-bold font-heading uppercase tracking-widest text-slate-200">
                {heroBadge}
              </span>
            </motion.div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black font-heading tracking-tight text-white leading-[1.08]">
              <motion.span
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="block"
              >
                {t('hero.titleLine1')}
              </motion.span>

              <motion.span
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="block text-gradient-accent py-1"
              >
                {t('hero.titleLine2')}
              </motion.span>

              <motion.span
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="block text-gradient-primary"
              >
                {t('hero.titleLine3')}
              </motion.span>
            </h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed max-w-lg mx-auto lg:mx-0"
            >
              {heroSubtitle}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2"
            >
              <MagneticButton href="#projects" className="w-full sm:w-auto">
                <div className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#2A4073] to-[#FF5E3A] text-white font-bold font-heading text-xs sm:text-sm shadow-glow-accent hover:shadow-[0_0_30px_#FF5E3A] transition-all duration-300">
                  <span>{t('hero.ctaPrimary')}</span>
                  <ArrowUpRight className={`w-4 h-4 ${direction === 'rtl' ? 'rotate-[-90deg]' : ''}`} />
                </div>
              </MagneticButton>

              <MagneticButton href="#contact" className="w-full sm:w-auto">
                <div className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-white/5 border border-white/10 text-white font-bold font-heading text-xs sm:text-sm hover:bg-white/10 transition-all duration-300 backdrop-blur-md">
                  <span>{t('hero.ctaSecondary')}</span>
                </div>
              </MagneticButton>
            </motion.div>

            {/* Trust Badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.65 }}
              className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-center lg:justify-start gap-5 text-xs text-slate-400 font-medium"
            >
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-[#FF5E3A]" />
                <span>5–20 Days Delivery</span>
              </div>
              <span className="hidden sm:inline text-slate-700">•</span>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>100% Mobile & SEO Responsive</span>
              </div>
            </motion.div>

          </div>

          {/* Right Column: Floating Real Projects UI Showcase */}
          <div className="lg:col-span-6">
            <HeroBrowserShowcase />
          </div>

        </div>
      </div>
    </section>
  );
};
