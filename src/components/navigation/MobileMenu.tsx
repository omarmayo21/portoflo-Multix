import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../../i18n/context';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navItems: { label: string; href: string }[];
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose, navItems }) => {
  const { t, direction } = useLanguage();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[99] bg-[#0F1D38]/95 backdrop-blur-2xl flex flex-col justify-between p-6 sm:p-10 border-b border-white/10"
        >
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-[#FF5E3A]" />
              <span className="text-2xl font-black font-heading tracking-wider text-white">
                MULTIX<span className="text-[#FF5E3A]">.</span>
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-3 rounded-full bg-white/10 text-white hover:bg-[#FF5E3A] transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Staggered Navigation Items */}
          <div className="flex flex-col gap-4 my-auto">
            {navItems.map((item, idx) => (
              <motion.a
                key={idx}
                href={item.href}
                onClick={onClose}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: idx * 0.08 + 0.1, duration: 0.4 }}
                className="text-3xl sm:text-4xl font-bold font-heading text-slate-200 hover:text-[#FF5E3A] transition-colors flex items-center justify-between border-b border-white/5 pb-3"
              >
                <span>{item.label}</span>
                <ArrowUpRight className={`w-6 h-6 text-[#FF5E3A] opacity-60 ${direction === 'rtl' ? 'rotate-[-90deg]' : ''}`} />
              </motion.a>
            ))}
          </div>

          {/* Footer CTA */}
          <div className="pt-6 border-t border-white/10">
            <a
              href="#contact"
              onClick={onClose}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#2A4073] to-[#FF5E3A] text-white font-bold font-heading text-center block shadow-glow-accent text-lg"
            >
              {t('nav.letsTalk')}
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
