import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { useLanguage } from '../../i18n/context';

interface IntroLoaderProps {
  onComplete: () => void;
}

export const IntroLoader: React.FC<IntroLoaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsFinished(true);
            setTimeout(onComplete, 800);
          }, 300);
          return 100;
        }
        const increment = Math.floor(Math.random() * 8) + 4;
        return Math.min(prev + increment, 100);
      });
    }, 45);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0F1D38] text-white select-none overflow-hidden"
        >
          {/* Background Ambient Orbs */}
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#2A4073]/30 rounded-full blur-[140px] pointer-events-none animate-pulse-slow" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#FF5E3A]/20 rounded-full blur-[120px] pointer-events-none" />

          {/* Center Logo & Loading Visual */}
          <div className="relative z-10 flex flex-col items-center px-6 max-w-md w-full text-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="relative flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-[#2A4073] to-[#FF5E3A] p-[1px] shadow-glow-accent">
                <div className="w-full h-full bg-[#0F1D38] rounded-[15px] flex items-center justify-center">
                  <Sparkles className="w-7 h-7 text-[#FF5E3A] animate-pulse" />
                </div>
              </div>
              <span className="text-4xl font-extrabold tracking-wider font-heading text-white">
                MULTIX<span className="text-[#FF5E3A]">.</span>
              </span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-xs uppercase tracking-[0.25em] text-slate-400 font-medium mb-10"
            >
              {t('loader.tagline')}
            </motion.p>

            {/* Glowing Bar & Progress Counter */}
            <div className="w-full space-y-3">
              <div className="relative w-full h-[3px] bg-slate-800 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#2A4073] via-[#FF5E3A] to-white shadow-[0_0_15px_#FF5E3A]"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-xs font-mono text-slate-400 pt-2">
                <span>{t('loader.loading')}</span>
                <span className="text-[#FF5E3A] font-bold text-sm">{progress}%</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
