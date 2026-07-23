import React from 'react';
import { motion } from 'framer-motion';
import { Globe } from 'lucide-react';
import { useLanguage } from '../../i18n/context';

export const LanguageSwitcher: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { language, toggleLanguage, t } = useLanguage();

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleLanguage}
      className={`relative flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#2A4073]/40 border border-slate-700/60 hover:border-[#FF5E3A]/60 text-xs font-semibold text-slate-200 backdrop-blur-md transition-all shadow-sm hover:shadow-glow-accent group ${className}`}
      aria-label="Toggle language"
    >
      <Globe className="w-3.5 h-3.5 text-[#FF5E3A] group-hover:rotate-12 transition-transform duration-300" />
      <span className="font-heading tracking-wide uppercase">
        {language === 'en' ? 'العربية' : 'English'}
      </span>
      <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#FF5E3A] animate-pulse" />
    </motion.button>
  );
};
