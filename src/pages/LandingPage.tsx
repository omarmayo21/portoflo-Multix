import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, CheckCircle2, Send, ShieldCheck, Zap, Star, MessageSquare, ArrowLeft, Plus, Minus, Lock, AlertCircle } from 'lucide-react';
import { sanityClient, urlFor } from '../lib/sanity/client';
import { LANDING_PAGE_BY_SLUG_QUERY, TESTIMONIALS_QUERY, FAQS_QUERY } from '../lib/sanity/queries';
import { submitLeadForm } from '../lib/sanity/submitLead';
import { trackViewContent, trackCtaClick, trackFormStart } from '../utils/analytics';
import { updateSeoMeta } from '../utils/seo';

interface LandingPageProps {
  slug: string;
}

export const LandingPage: React.FC<LandingPageProps> = ({ slug }) => {
  const [data, setData] = useState<any>(null);
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [faqs, setFaqs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [openFaqId, setOpenFaqId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: '',
    budget: '',
    honeypot: '',
  });

  useEffect(() => {
    async function fetchLandingPageData() {
      try {
        const [pageRes, testRes, faqRes] = await Promise.all([
          sanityClient.fetch(LANDING_PAGE_BY_SLUG_QUERY, { slug }),
          sanityClient.fetch(TESTIMONIALS_QUERY),
          sanityClient.fetch(FAQS_QUERY),
        ]);

        if (pageRes) {
          setData(pageRes);
          updateSeoMeta({
            title: pageRes.seoTitle || `احصل على موقع إلكتروني احترافي | MULTIX Studio`,
            description: pageRes.seoDescription || `نصمم ونطور مواقع إلكترونية سريعة واحترافية مخصصة لحملات Meta Ads.`,
            canonicalUrl: pageRes.canonicalUrl,
          });
        } else {
          updateSeoMeta({
            title: `احصل على موقع إلكتروني احترافي يزيد مبيعاتك | MULTIX Studio`,
            description: `تصميم وتطوير مواقع إلكترونية احترافية مخصصة لحملات Meta Ads.`,
          });
        }

        if (testRes && testRes.length > 0) setTestimonials(testRes.slice(0, 3));
        if (faqRes && faqRes.length > 0) setFaqs(faqRes.slice(0, 4));

        // Fire PageView & ViewContent analytics event on load
        trackViewContent(pageRes?.pageName || `حملة إعلانات: ${slug}`, 'Meta Ads Campaign Landing Page');
      } catch (err) {
        console.warn('Error fetching landing page data:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchLandingPageData();
  }, [slug]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    // Validation Check in Arabic
    if (!formData.name.trim()) {
      setValidationError('يرجى إدخال الاسم الكامل.');
      return;
    }
    if (!formData.phone.trim()) {
      setValidationError('يرجى إدخال رقم الهاتف / الواتساب للتواصل.');
      return;
    }
    if (!formData.message.trim()) {
      setValidationError('يرجى كتابة تفاصيل مشروعك واحتياجاتك.');
      return;
    }

    setIsSubmitting(true);
    trackCtaClick('Meta Ads Campaign Form Submit', data?.pageName || slug);

    // Save lead in Sanity & fire standard Meta Pixel 'Lead' event + GA4 generate_lead
    const result = await submitLeadForm({
      name: formData.name,
      phone: formData.phone,
      service: data?.pageName || `حملة إعلانات: ${slug}`,
      budget: formData.budget || 'غير محدد',
      message: formData.message,
      honeypot: formData.honeypot,
      ctaClicked: 'نموذج طلب عرض سعر Meta Ads (Mobile First)',
    });

    setIsSubmitting(false);

    if (result.success) {
      // Redirect immediately to Thank You page
      window.location.href = '/thank-you';
    } else {
      setValidationError('حدث خطأ أثناء إرسال البيانات. يرجى المحاولة مرة أخرى.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0F1D38] flex items-center justify-center text-white font-sans" dir="rtl">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 border-2 border-[#FF5E3A] border-t-transparent rounded-full animate-spin" />
          <span className="text-sm font-semibold tracking-wider">جاري تحميل الصفحة...</span>
        </div>
      </div>
    );
  }

  // Arabic Hero Copy
  const heroTitle =
    data?.heroTitle?.ar ||
    data?.heroTitle?.en ||
    '🚀 احصل على موقع إلكتروني احترافي يزيد مبيعاتك ويحول الزوار إلى عملاء';

  const heroSubtitle =
    data?.heroSubtitle?.ar ||
    data?.heroSubtitle?.en ||
    'نصمم ونطور مواقع إلكترونية سريعة، احترافية، ومتوافقة مع جميع الأجهزة، مع تجربة مستخدم مميزة تساعدك على زيادة العملاء وتحقيق أفضل نتائج من حملات Meta Ads.';

  const primaryCta = data?.primaryCtaText?.ar || data?.primaryCtaText?.en || 'احصل على عرض سعر مجاناً';

  const highlights = [
    'تصميم احترافي مخصص بالكامل',
    'متوافق مع جميع الأجهزة',
    'ربط Meta Pixel وتتبع التحويلات',
    'سرعة وأداء عالي',
    'تحسين محركات البحث (SEO)',
    'تسليم سريع خلال 7 أيام',
  ];

  return (
    <div dir="rtl" className="min-h-screen bg-[#0F1D38] text-slate-100 selection:bg-[#FF5E3A] selection:text-white font-sans antialiased overflow-x-hidden relative">
      
      {/* Top Header Navigation Bar */}
      <header className="py-4 px-4 sm:px-8 border-b border-white/10 bg-[#0F1D38]/90 backdrop-blur-xl sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <a href="/" className="text-xl font-black tracking-wider text-white flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#2A4073] to-[#FF5E3A] p-[1px] shadow-glow-accent">
              <div className="w-full h-full bg-[#0F1D38] rounded-[11px] flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-[#FF5E3A]" />
              </div>
            </div>
            <span>
              MULTIX<span className="text-[#FF5E3A]">.</span>
            </span>
          </a>

          <a
            href="#lead-form-hero"
            onClick={() => trackCtaClick('Top Header CTA', data?.pageName)}
            className="px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-gradient-to-r from-[#2A4073] to-[#FF5E3A] text-white text-xs font-bold shadow-glow-accent hover:shadow-[0_0_25px_#FF5E3A] transition-all"
          >
            {primaryCta}
          </a>
        </div>
      </header>

      {/* Main Hero & Lead Form Section */}
      <section className="py-8 sm:py-16 relative overflow-hidden">
        {/* Ambient Radial Lights */}
        <div className="absolute top-1/4 right-10 w-[500px] h-[500px] bg-[#2A4073]/25 rounded-full blur-[160px] pointer-events-none" />
        <div className="absolute top-1/3 left-10 w-[500px] h-[500px] bg-[#FF5E3A]/15 rounded-full blur-[150px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* MOBILE FIRST: Form is FIRST on mobile (order-1), copy is SECOND (order-2). Desktop maintains natural RTL layout */}
          
          {/* 1. Lead Capture Form Box (First thing on Mobile above the fold) */}
          <div id="lead-form-hero" className="order-1 lg:order-2 lg:col-span-5 w-full">
            <motion.div
              initial={{ opacity: 0, scale: 0.97, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="p-6 sm:p-8 rounded-3xl bg-[#0F1D38]/95 border border-white/15 backdrop-blur-2xl shadow-2xl space-y-5 relative border-t-4 border-t-[#FF5E3A]"
            >
              <div className="space-y-1 text-start">
                <span className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-[#FF5E3A]">
                  احصل على استشارة مجانية وعرض سعر
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white leading-snug">
                  طلب عرض سعر وخطة عمل لمشروعك
                </h3>
                <p className="text-xs text-slate-400">
                  أدخل بياناتك وسيقوم أحد خبراء التطوير بالتواصل معك خلال أقل من 12 ساعة.
                </p>
              </div>

              {/* Validation Warning Alert */}
              {validationError && (
                <div className="p-3 rounded-xl bg-[#FF5E3A]/20 border border-[#FF5E3A]/40 text-[#FF5E3A] text-xs font-semibold flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{validationError}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-3.5 text-start">
                {/* Honeypot Spam Protection Check */}
                <input
                  type="text"
                  name="honeypot"
                  value={formData.honeypot}
                  onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                  style={{ display: 'none' }}
                  tabIndex={-1}
                  autoComplete="off"
                />

                {/* 1. Full Name (Required) */}
                <div>
                  <label className="block text-xs font-bold tracking-wider text-slate-300 mb-1">
                    الاسم الكامل *
                  </label>
                  <input
                    type="text"
                    required
                    onFocus={trackFormStart}
                    value={formData.name}
                    onChange={(e) => {
                      setFormData({ ...formData, name: e.target.value });
                      if (validationError) setValidationError(null);
                    }}
                    placeholder="أدخل اسمك الكامل"
                    className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-[#FF5E3A] transition-colors text-sm"
                  />
                </div>

                {/* 2. Phone Number (Required) */}
                <div>
                  <label className="block text-xs font-bold tracking-wider text-slate-300 mb-1">
                    رقم الهاتف / الواتساب *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => {
                      setFormData({ ...formData, phone: e.target.value });
                      if (validationError) setValidationError(null);
                    }}
                    placeholder="+966 50 000 0000"
                    dir="ltr"
                    className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-[#FF5E3A] transition-colors text-sm text-right"
                  />
                </div>

                {/* 3. Project Details (Required) */}
                <div>
                  <label className="block text-xs font-bold tracking-wider text-slate-300 mb-1">
                    تفاصيل مشروعك واحتياجاتك *
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={formData.message}
                    onChange={(e) => {
                      setFormData({ ...formData, message: e.target.value });
                      if (validationError) setValidationError(null);
                    }}
                    placeholder="اكتب نبذة مختصرة عن نوع الموقع والأهداف المطلوب تحقيقها..."
                    className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-[#FF5E3A] transition-colors resize-none text-sm"
                  />
                </div>

                {/* 4. Budget (Optional) */}
                <div>
                  <label className="block text-xs font-bold tracking-wider text-slate-400 mb-1">
                    الميزانية التقديرية (اختياري)
                  </label>
                  <select
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl bg-[#0F1D38] border border-white/10 text-slate-200 focus:outline-none focus:border-[#FF5E3A] transition-colors text-sm"
                  >
                    <option value="">حدد الميزانية المناسبة لمشروعك</option>
                    <option value="10k-20k">10,000 $ – 20,000 $</option>
                    <option value="20k-50k">20,000 $ – 50,000 $</option>
                    <option value="50k+">أكثر من 50,000 $</option>
                  </select>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#2A4073] to-[#FF5E3A] text-white font-bold text-center shadow-glow-accent hover:shadow-[0_0_35px_#FF5E3A] transition-all flex items-center justify-center gap-2 text-base mt-2"
                >
                  {isSubmitting ? (
                    <span>جاري إرسال الطلب...</span>
                  ) : (
                    <>
                      <span>{primaryCta}</span>
                      <ArrowLeft className="w-5 h-5" />
                    </>
                  )}
                </button>

                <p className="text-[11px] text-slate-400 text-center pt-1 flex items-center justify-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-[#FF5E3A]" /> بياناتك آمنة ومحمية 100%. لا نرسل رسائل مزعجة.
                </p>
              </form>
            </motion.div>
          </div>

          {/* 2. Persuasive Arabic Copy & Refined Feature Cards (Order 2 on mobile, order 1 on desktop) */}
          <div className="order-2 lg:order-1 lg:col-span-7 space-y-6 text-center lg:text-start">
            
            {/* Offer Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FF5E3A]/20 border border-[#FF5E3A]/40 text-[#FF5E3A] text-xs font-bold shadow-sm"
            >
              <Sparkles className="w-4 h-4" /> عرض حصري لحملات الإعلانات 2026
            </motion.div>

            {/* Refined Headline (Balanced line height & size) */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-2xl sm:text-4xl lg:text-5xl font-black text-white leading-[1.25] tracking-tight max-w-2xl mx-auto lg:mx-0"
            >
              {heroTitle}
            </motion.h1>

            {/* Refined Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl mx-auto lg:mx-0 font-normal"
            >
              {heroSubtitle}
            </motion.p>

            {/* Enhanced Feature Highlights Cards Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2 text-start max-w-2xl mx-auto lg:mx-0"
            >
              {highlights.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-[#091224]/80 border border-white/10 hover:border-[#FF5E3A]/40 transition-all shadow-sm"
                >
                  <div className="w-8 h-8 rounded-xl bg-[#FF5E3A]/15 flex items-center justify-center shrink-0 text-[#FF5E3A]">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-semibold text-slate-200 leading-snug">{item}</span>
                </div>
              ))}
            </motion.div>

          </div>

        </div>
      </section>

      {/* Social Proof & Testimonials Section */}
      {testimonials.length > 0 && (
        <section className="py-16 bg-[#091224] border-t border-white/10 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-2 mb-12">
              <span className="text-xs font-bold uppercase tracking-widest text-[#FF5E3A]">
                آراء عملائنا
              </span>
              <h2 className="text-3xl font-extrabold text-white">
                ثقة الشركات والعلامات التجارية الرائدة
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((item, idx) => (
                <div key={item._id || idx} className="p-6 rounded-3xl bg-[#0F1D38]/80 border border-white/10 space-y-4 text-start">
                  <div className="flex items-center gap-1">
                    {[...Array(item.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#FF5E3A] text-[#FF5E3A]" />
                    ))}
                  </div>
                  <p className="text-sm text-slate-200 leading-relaxed italic">
                    "{item.review?.ar || item.review?.en || item.review}"
                  </p>
                  <div className="pt-4 border-t border-white/10 flex items-center gap-3">
                    <img
                      src={item.avatar ? urlFor(item.avatar).width(80).url() : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb'}
                      alt={item.name?.ar || item.name?.en || item.name}
                      className="w-10 h-10 rounded-full object-cover border border-[#FF5E3A]"
                    />
                    <div>
                      <h4 className="text-xs font-bold text-white">{item.name?.ar || item.name?.en || item.name}</h4>
                      <p className="text-[11px] text-slate-400">{item.role?.ar || item.role?.en || item.role} — <span className="text-[#FF5E3A]">{item.company}</span></p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ Section */}
      {faqs.length > 0 && (
        <section className="py-16 bg-[#0F1D38] border-t border-white/10 relative overflow-hidden">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-2 mb-10">
              <span className="text-xs font-bold uppercase tracking-widest text-[#FF5E3A]">
                الأسئلة الشائعة
              </span>
              <h2 className="text-3xl font-extrabold text-white">
                إجابات على استفساراتك قبل البدء
              </h2>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, idx) => {
                const id = faq._id || `faq-${idx}`;
                const isOpen = openFaqId === id;
                return (
                  <div key={id} className="rounded-2xl bg-[#091224]/80 border border-white/10 overflow-hidden">
                    <button
                      onClick={() => setOpenFaqId(isOpen ? null : id)}
                      className="w-full p-5 text-start flex items-center justify-between gap-4 font-bold text-base text-white hover:text-[#FF5E3A] transition-colors"
                    >
                      <span>{faq.question?.ar || faq.question?.en || faq.question}</span>
                      <div className={`p-1.5 rounded-full ${isOpen ? 'bg-[#FF5E3A] text-[#FFF]' : 'bg-[#2A4073]/40 text-slate-300'}`}>
                        {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                      </div>
                    </button>
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="px-5 pb-5 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-white/5 pt-3 text-start"
                        >
                          {faq.answer?.ar || faq.answer?.en || faq.answer}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Sticky Mobile CTA Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 p-3.5 bg-[#0F1D38]/95 backdrop-blur-xl border-t border-white/10 z-50 shadow-2xl">
        <a
          href="#lead-form-hero"
          onClick={() => trackCtaClick('Sticky Mobile CTA', data?.pageName || slug)}
          className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#2A4073] to-[#FF5E3A] text-white font-bold text-center block shadow-glow-accent text-sm"
        >
          {primaryCta}
        </a>
      </div>

    </div>
  );
};
