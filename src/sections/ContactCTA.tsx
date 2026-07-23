import React, { useState, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle2, Sparkles, MessageSquare } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useLanguage } from '../i18n/context';
import { SectionHeader } from '../components/ui/SectionHeader';

export const ContactCTA: React.FC = () => {
  const { t, direction } = useLanguage();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '',
    budget: '',
    message: '',
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setFormSubmitted(true);

      // Trigger Confetti Celebration
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#2A4073', '#FF5E3A', '#FFFFFF'],
      });
    }, 1200);
  };

  return (
    <section id="contact" className="py-24 relative bg-[#0F1D38] overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-[#FF5E3A]/15 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#2A4073]/25 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          badge={t('contact.badge')}
          title={t('contact.title')}
          subtitle={t('contact.subtitle')}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Direct Contact Cards */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 rounded-3xl bg-[#0F1D38]/80 border border-white/10 backdrop-blur-xl shadow-2xl space-y-8">
              <div className="flex items-start gap-4">
                <div className="p-3.5 rounded-2xl bg-[#FF5E3A]/20 text-[#FF5E3A] shrink-0">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <span className="block text-xs uppercase font-bold tracking-wider text-slate-400 font-heading mb-1">
                    {t('contact.directInfo.emailTitle')}
                  </span>
                  <a href="mailto:hello@multix.studio" className="text-lg font-bold text-white hover:text-[#FF5E3A] transition-colors font-heading">
                    hello@multix.studio
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3.5 rounded-2xl bg-[#2A4073]/40 text-[#A5C0EE] shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <span className="block text-xs uppercase font-bold tracking-wider text-slate-400 font-heading mb-1">
                    {t('contact.directInfo.phoneTitle')}
                  </span>
                  <a href="https://wa.me/971501234567" target="_blank" rel="noopener noreferrer" className="text-lg font-bold text-white hover:text-[#FF5E3A] transition-colors font-heading">
                    +971 50 123 4567 / WhatsApp
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3.5 rounded-2xl bg-[#FF5E3A]/20 text-[#FF5E3A] shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <span className="block text-xs uppercase font-bold tracking-wider text-slate-400 font-heading mb-1">
                    {t('contact.directInfo.locationTitle')}
                  </span>
                  <span className="text-lg font-bold text-white font-heading">
                    {t('contact.directInfo.locationValue')}
                  </span>
                </div>
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-gradient-to-br from-[#2A4073]/40 to-[#FF5E3A]/20 border border-white/10 backdrop-blur-xl">
              <div className="flex items-center gap-3 mb-2 text-[#FF5E3A]">
                <Sparkles className="w-5 h-5" />
                <span className="text-sm font-bold font-heading text-white">Fast Response Guarantee</span>
              </div>
              <p className="text-xs text-slate-300">
                All client project inquiries are assigned to a Senior Creative Director within 12 hours.
              </p>
            </div>
          </div>

          {/* Interactive Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl bg-[#0F1D38]/80 border border-white/10 backdrop-blur-xl shadow-2xl">
              {formSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-16 text-center space-y-4"
                >
                  <div className="w-20 h-20 rounded-full bg-[#FF5E3A]/20 border-2 border-[#FF5E3A] text-[#FF5E3A] flex items-center justify-center mx-auto shadow-glow-accent">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-bold font-heading text-white">
                    {t('contact.form.successTitle')}
                  </h3>
                  <p className="text-sm text-slate-300 max-w-md mx-auto">
                    {t('contact.form.successSubtitle')}
                  </p>
                  <button
                    onClick={() => setFormSubmitted(false)}
                    className="mt-6 px-6 py-2.5 rounded-full bg-white/10 text-xs font-bold text-white hover:bg-white/20 transition-all"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 font-heading mb-2">
                        {t('contact.form.nameLabel')}
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder={t('contact.form.namePlaceholder')}
                        className="w-full px-4 py-3.5 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-[#FF5E3A] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 font-heading mb-2">
                        {t('contact.form.emailLabel')}
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder={t('contact.form.emailPlaceholder')}
                        className="w-full px-4 py-3.5 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-[#FF5E3A] transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 font-heading mb-2">
                        {t('contact.form.serviceLabel')}
                      </label>
                      <select
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full px-4 py-3.5 rounded-2xl bg-[#0F1D38] border border-white/10 text-white focus:outline-none focus:border-[#FF5E3A] transition-colors"
                      >
                        <option value="">{t('contact.form.serviceDefault')}</option>
                        <option value="3d-web">3D & WebGL Website</option>
                        <option value="frontend">React/Next.js Web App</option>
                        <option value="uiux">UI/UX & Brand Identity</option>
                        <option value="other">Full Custom Agency Build</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 font-heading mb-2">
                        {t('contact.form.budgetLabel')}
                      </label>
                      <select
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        className="w-full px-4 py-3.5 rounded-2xl bg-[#0F1D38] border border-white/10 text-white focus:outline-none focus:border-[#FF5E3A] transition-colors"
                      >
                        <option value="">{t('contact.form.budgetDefault')}</option>
                        <option value="10k-20k">$10,000 – $20,000</option>
                        <option value="20k-50k">$20,000 – $50,000</option>
                        <option value="50k+">$50,000+</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 font-heading mb-2">
                      {t('contact.form.messageLabel')}
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder={t('contact.form.messagePlaceholder')}
                      className="w-full px-4 py-3.5 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-[#FF5E3A] transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#2A4073] to-[#FF5E3A] text-white font-bold font-heading text-center shadow-glow-accent hover:shadow-[0_0_30px_#FF5E3A] transition-all flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <span>{t('contact.form.submitting')}</span>
                    ) : (
                      <>
                        <span>{t('contact.form.submitButton')}</span>
                        <Send className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
