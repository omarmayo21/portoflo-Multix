import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight, MessageSquare, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useLanguage } from '../i18n/context';
import { trackLeadEvent } from '../utils/analytics';

export const ThankYouPage: React.FC = () => {
  const { t } = useLanguage();

  useEffect(() => {
    // 1. Trigger confetti celebration
    confetti({
      particleCount: 150,
      spread: 90,
      origin: { y: 0.5 },
      colors: ['#2A4073', '#FF5E3A', '#FFFFFF'],
    });

    // 2. Fire fallback Meta Lead pixel event if user navigated directly
    trackLeadEvent({ service: 'Thank You Conversion Verification' });
  }, []);

  return (
    <div className="min-h-screen bg-[#0F1D38] text-white flex items-center justify-center px-4 py-20 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#FF5E3A]/15 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-[#2A4073]/30 rounded-full blur-[150px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-2xl w-full p-8 sm:p-12 rounded-3xl bg-[#0F1D38]/90 border border-white/10 backdrop-blur-2xl shadow-2xl text-center space-y-8 relative z-10"
      >
        <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-[#FF5E3A] to-[#2A4073] p-1 mx-auto shadow-glow-accent">
          <div className="w-full h-full rounded-full bg-[#0F1D38] flex items-center justify-center text-[#FF5E3A]">
            <CheckCircle2 className="w-12 h-12" />
          </div>
        </div>

        <div className="space-y-3">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FF5E3A]/20 text-[#FF5E3A] text-xs font-bold font-heading uppercase tracking-wider">
            <Sparkles className="w-4 h-4" /> Submission Confirmed
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-heading text-white">
            Thank You for Reaching Out!
          </h1>
          <p className="text-slate-300 text-base max-w-lg mx-auto">
            Your inquiry has been logged successfully. A Senior Creative Director will review your project details and respond within 12 hours.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 text-left space-y-3">
          <h4 className="text-xs uppercase tracking-wider text-slate-400 font-bold font-heading">Next Steps</h4>
          <ul className="text-sm text-slate-200 space-y-2 list-disc list-inside">
            <li>We review your requirements and campaign goals.</li>
            <li>We prepare a custom project proposal & timeline estimate.</li>
            <li>We schedule an intro strategy call.</li>
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <a
            href="/"
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-[#2A4073] to-[#FF5E3A] text-white font-bold font-heading shadow-glow-accent hover:shadow-[0_0_30px_#FF5E3A] transition-all flex items-center justify-center gap-2"
          >
            <span>Return to Home</span>
            <ArrowRight className="w-5 h-5" />
          </a>

          <a
            href="https://wa.me/971501234567"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold font-heading border border-white/10 transition-all flex items-center justify-center gap-2"
          >
            <MessageSquare className="w-5 h-5 text-[#25D366]" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>
      </motion.div>
    </div>
  );
};
