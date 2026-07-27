import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, CheckCircle2, Send, ArrowRight, ShieldCheck, Star, HelpCircle } from 'lucide-react';
import { sanityClient, urlFor } from '../lib/sanity/client';
import { LANDING_PAGE_BY_SLUG_QUERY } from '../lib/sanity/queries';
import { submitLeadForm } from '../lib/sanity/submitLead';
import { trackViewContent, trackCtaClick, trackFormStart } from '../utils/analytics';
import { updateSeoMeta } from '../utils/seo';

interface LandingPageProps {
  slug: string;
}

export const LandingPage: React.FC<LandingPageProps> = ({ slug }) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    budget: '',
    message: '',
    honeypot: '',
  });

  useEffect(() => {
    async function fetchLandingPage() {
      try {
        const res = await sanityClient.fetch(LANDING_PAGE_BY_SLUG_QUERY, { slug });
        if (res) {
          setData(res);
          updateSeoMeta({
            title: res.seoTitle || `${res.pageName} | Multix Studio`,
            description: res.seoDescription,
            canonicalUrl: res.canonicalUrl,
          });
          trackViewContent(res.pageName || slug, 'Campaign Landing Page');
        }
      } catch (err) {
        console.warn('Error fetching landing page:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchLandingPage();
  }, [slug]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const result = await submitLeadForm({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      company: formData.company,
      service: formData.service || data?.pageName,
      budget: formData.budget,
      message: formData.message,
      honeypot: formData.honeypot,
      ctaClicked: data?.primaryCtaText?.en || 'Landing Page Form',
    });

    setIsSubmitting(false);

    if (result.success) {
      setSubmitted(true);
      window.location.href = '/thank-you';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0F1D38] flex items-center justify-center text-white font-heading">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 border-2 border-[#FF5E3A] border-t-transparent rounded-full animate-spin" />
          <span>Loading Landing Page...</span>
        </div>
      </div>
    );
  }

  // Fallback template if page slug not found in Sanity
  const titleEn = data?.heroTitle?.en || `Build Your High-Converting ${slug.replace('-', ' ')} Website`;
  const subtitleEn =
    data?.heroSubtitle?.en ||
    'Custom 3D WebGL designs, blazingly fast load times, and high-converting Meta Ads landing architectures.';

  return (
    <div className="min-h-screen bg-[#0F1D38] text-slate-100 selection:bg-[#FF5E3A] selection:text-white font-sans antialiased overflow-x-hidden relative">
      {/* Header */}
      <header className="py-6 px-4 sm:px-8 border-b border-white/10 bg-[#0F1D38]/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <a href="/" className="text-xl font-black font-heading tracking-wider text-white flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#2A4073] to-[#FF5E3A] flex items-center justify-center text-white font-black text-sm">
              M
            </span>
            MULTIX STUDIO
          </a>

          <a
            href="#lead-form"
            onClick={() => trackCtaClick('Header CTA', data?.pageName)}
            className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#2A4073] to-[#FF5E3A] text-white text-xs font-bold font-heading hover:shadow-glow-accent transition-all"
          >
            {data?.primaryCtaText?.en || 'Get Started Now'}
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute top-1/4 left-10 w-96 h-96 bg-[#FF5E3A]/15 rounded-full blur-[160px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FF5E3A]/20 text-[#FF5E3A] text-xs font-bold uppercase tracking-wider font-heading">
              <Sparkles className="w-4 h-4" /> Exclusive Agency Special Offer
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black font-heading text-white leading-tight">
              {titleEn}
            </h1>

            <p className="text-slate-300 text-lg leading-relaxed">{subtitleEn}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#FF5E3A]" />
                <span className="text-sm text-slate-200">100% Custom 3D & WebGL Architecture</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#FF5E3A]" />
                <span className="text-sm text-slate-200">Meta Ads & Pixel Ready Conversion Setup</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#FF5E3A]" />
                <span className="text-sm text-slate-200">Sub-100ms Load Performance</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#FF5E3A]" />
                <span className="text-sm text-slate-200">Dedicated Creative Director Support</span>
              </div>
            </div>
          </div>

          {/* Form Box */}
          <div id="lead-form" className="lg:col-span-5">
            <div className="p-8 rounded-3xl bg-[#0F1D38]/90 border border-white/10 backdrop-blur-2xl shadow-2xl space-y-6">
              <h3 className="text-2xl font-bold font-heading text-white">
                {data?.primaryCtaText?.en || 'Request Your Proposal'}
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Honeypot spam protection */}
                <input
                  type="text"
                  name="honeypot"
                  value={formData.honeypot}
                  onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                  style={{ display: 'none' }}
                  tabIndex={-1}
                  autocomplete="off"
                />

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 font-heading mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    onFocus={trackFormStart}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="John Doe"
                    className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-[#FF5E3A]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 font-heading mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="john@company.com"
                    className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-[#FF5E3A]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 font-heading mb-1">
                    Phone / WhatsApp
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+1 (555) 000-0000"
                    className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-[#FF5E3A]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 font-heading mb-1">
                    Project Message
                  </label>
                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your project goals..."
                    className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-[#FF5E3A] resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#2A4073] to-[#FF5E3A] text-white font-bold font-heading text-center shadow-glow-accent hover:shadow-[0_0_30px_#FF5E3A] transition-all flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <span>Submitting...</span>
                  ) : (
                    <>
                      <span>Submit Inquiry</span>
                      <Send className="w-5 h-5" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky Mobile CTA */}
      {data?.stickyMobileCta !== false && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 p-4 bg-[#0F1D38]/95 backdrop-blur-xl border-t border-white/10 z-50">
          <a
            href="#lead-form"
            onClick={() => trackCtaClick('Sticky Mobile CTA', data?.pageName)}
            className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#2A4073] to-[#FF5E3A] text-white font-bold font-heading text-center block shadow-glow-accent"
          >
            {data?.primaryCtaText?.en || 'Get Your Website Quote'}
          </a>
        </div>
      )}
    </div>
  );
};
