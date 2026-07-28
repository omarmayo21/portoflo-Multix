import React, { useState, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useLanguage } from '../i18n/context';
import { useSanity } from '../context/SanityContext';
import { SectionHeader } from '../components/ui/SectionHeader';
import { submitLeadForm } from '../lib/sanity/submitLead';
import { trackFormStart, trackCtaClick, trackLeadEvent } from '../utils/analytics';

export const ContactCTA: React.FC = () => {
  const { t, language } = useLanguage();
  const { websiteContent } = useSanity();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    budget: '',
    message: '',
    honeypot: '',
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    trackCtaClick('Main Contact Form Submit');

    const result = await submitLeadForm({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      service: formData.service,
      budget: formData.budget,
      message: formData.message,
      honeypot: formData.honeypot,
    });

    setIsSubmitting(false);

    if (result.success) {
      // Fire standard Meta Pixel & GA4 Lead events on successful submission
      trackLeadEvent({
        name: formData.name,
        service: formData.service || 'General Inquiry',
        budget: formData.budget || 'Custom',
      });

      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#2A4073', '#FF5E3A', '#FFFFFF'],
      });

      // Redirect to Thank You page
      setTimeout(() => {
        window.location.href = '/thank-you';
      }, 500);
    }
  };

  const contactEmail = websiteContent?.contactEmail || 'hello@multix.studio';
  const contactPhone = websiteContent?.contactPhone || '+971 50 123 4567';
  const contactLocation = websiteContent?.contactLocation?.[language] || websiteContent?.contactLocation?.en || t('contact.directInfo.locationValue');

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
                  <a href={`mailto:${contactEmail}`} className="text-lg font-bold text-white hover:text-[#FF5E3A] transition-colors font-heading">
                    {contactEmail}
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
                  <a href={`https://wa.me/${contactPhone.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="text-lg font-bold text-white hover:text-[#FF5E3A] transition-colors font-heading">
                    {contactPhone} / WhatsApp
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
                    {contactLocation}
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
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Honeypot Spam Protection Field */}
                <input
                  type="text"
                  name="honeypot"
                  value={formData.honeypot}
                  onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                  style={{ display: 'none' }}
                  tabIndex={-1}
                  autoComplete="off"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 font-heading mb-2">
                      {t('contact.form.nameLabel')}
                    </label>
                    <input
                      type="text"
                      required
                      onFocus={trackFormStart}
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
