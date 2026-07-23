import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Menu, X, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../../i18n/context';
import { LanguageSwitcher } from '../ui/LanguageSwitcher';
import { MagneticButton } from '../ui/MagneticButton';
import { MobileMenu } from './MobileMenu';

export const Navbar: React.FC = () => {
  const { t, direction } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      if (currentScrollY > lastScrollY && currentScrollY > 200) {
        setHidden(true);
      } else {
        setHidden(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const navItems = [
    { label: t('nav.projects'), href: '#projects' },
    { label: t('nav.services'), href: '#services' },
    { label: t('nav.about'), href: '#about' },
    { label: t('nav.process'), href: '#process' },
    { label: t('nav.testimonials'), href: '#testimonials' },
    { label: t('nav.contact'), href: '#contact' },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: hidden ? -100 : 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'py-3.5 bg-[#0F1D38]/80 backdrop-blur-xl border-b border-white/10 shadow-2xl'
            : 'py-6 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-[#2A4073] to-[#FF5E3A] p-[1px] shadow-glow-accent group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full bg-[#0F1D38] rounded-[11px] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-[#FF5E3A] group-hover:rotate-12 transition-transform duration-300" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black font-heading tracking-wider text-white">
                MULTIX<span className="text-[#FF5E3A]">.</span>
              </span>
              <span className="text-[9px] uppercase tracking-widest text-slate-400 font-medium -mt-1 hidden sm:block">
                {t('nav.tagline')}
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-[#2A4073]/20 border border-white/10 backdrop-blur-md rounded-full px-5 py-2">
            {navItems.map((item, idx) => (
              <a
                key={idx}
                href={item.href}
                className="px-3.5 py-1.5 text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/5 rounded-full transition-all duration-200"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            <LanguageSwitcher />

            <MagneticButton href="#contact" className="hidden sm:inline-block">
              <div className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#2A4073] to-[#FF5E3A] text-xs font-bold text-white shadow-glow-accent hover:shadow-[0_0_25px_#FF5E3A] transition-all duration-300">
                <span>{t('nav.letsTalk')}</span>
                <ArrowUpRight className={`w-4 h-4 ${direction === 'rtl' ? 'rotate-[-90deg]' : ''}`} />
              </div>
            </MagneticButton>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2.5 rounded-full bg-[#2A4073]/40 border border-white/10 text-slate-200 hover:text-white"
              aria-label="Open navigation menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Drawer */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        navItems={navItems}
      />
    </>
  );
};
