import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, CheckCircle2, ArrowLeft, Plus, Minus, Lock, AlertCircle, Palette, Zap, Smartphone, Settings, Code2, HeadphonesIcon, Star } from 'lucide-react';
import { sanityClient, urlFor } from '../lib/sanity/client';
import { LANDING_PAGE_BY_SLUG_QUERY, TESTIMONIALS_QUERY, FAQS_QUERY } from '../lib/sanity/queries';
import { submitLeadForm } from '../lib/sanity/submitLead';
import { trackViewContent, trackCtaClick, trackFormStart } from '../utils/analytics';
import { updateSeoMeta } from '../utils/seo';

declare let fbq: any;

interface LandingPageProps {
  slug: string;
}

const featureIcons = [Palette, Zap, Smartphone, Settings, Code2, HeadphonesIcon];

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
    async function fetchData() {
      try {
        const [pageRes, testRes, faqRes] = await Promise.all([
          sanityClient.fetch(LANDING_PAGE_BY_SLUG_QUERY, { slug }),
          sanityClient.fetch(TESTIMONIALS_QUERY),
          sanityClient.fetch(FAQS_QUERY),
        ]);

        if (pageRes) setData(pageRes);

        updateSeoMeta({
          title: pageRes?.seoTitle || 'موقع إلكتروني احترافي يليق بعلامتك التجارية | MULTIX Studio',
          description: pageRes?.seoDescription || 'نصمم ونطور مواقع إلكترونية احترافية مخصصة بالكامل تجمع بين التصميم العصري والأداء السريع.',
          canonicalUrl: pageRes?.canonicalUrl,
        });

        if (testRes?.length > 0) setTestimonials(testRes.slice(0, 3));
        if (faqRes?.length > 0) setFaqs(faqRes.slice(0, 5));

        trackViewContent(pageRes?.pageName || slug, 'Meta Ads Landing Page');
      } catch (err) {
        console.warn('Landing page fetch error:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [slug]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    if (!formData.name.trim()) return setValidationError('يرجى إدخال الاسم بالكامل.');
    if (!formData.phone.trim()) return setValidationError('يرجى إدخال رقم الهاتف.');
    if (!formData.message.trim()) return setValidationError('يرجى كتابة تفاصيل المشروع.');

    setIsSubmitting(true);
    trackCtaClick('Landing Page Form Submit', data?.pageName || slug);

    const result = await submitLeadForm({
      name: formData.name,
      phone: formData.phone,
      service: data?.pageName || `Campaign: ${slug}`,
      budget: formData.budget || 'غير محدد',
      message: formData.message,
      honeypot: formData.honeypot,
      ctaClicked: 'أرسل الطلب الآن',
    });

    setIsSubmitting(false);

    if (result.success) {
      // Fire standard Meta Pixel Lead event on successful submission
      if (typeof fbq !== 'undefined') {
        fbq('track', 'Lead');
      }

      // Also fire GA4 generate_lead event if Google Analytics is configured
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'generate_lead', {
          service_name: data?.pageName || `Campaign: ${slug}`,
        });
      }

      // Send email notifications via Resend API in background (keepalive ensures it completes during redirect)
      if (result.leadId) {
        fetch('/api/send-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            leadId: result.leadId,
            leadData: {
              fullName: formData.name,
              phone: formData.phone,
              email: `${formData.phone.replace(/[^0-9]/g, '')}@lead.multix.studio`,
              message: formData.message,
              projectType: data?.pageName || `Campaign: ${slug}`,
              submissionDate: new Date().toISOString(),
            }
          }),
          keepalive: true,
        }).catch((err) => console.warn('Email notification error:', err));
      }

      window.location.href = '/thank-you';
    } else {
      setValidationError('حدث خطأ أثناء الإرسال. يرجى المحاولة مرة أخرى.');
    }
  };

  const clearError = () => { if (validationError) setValidationError(null); };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0F1D38] flex items-center justify-center" dir="rtl">
        <div className="flex items-center gap-3 text-white">
          <div className="w-7 h-7 border-2 border-[#FF5E3A] border-t-transparent rounded-full animate-spin" />
          <span className="text-sm font-medium">جاري تحميل الصفحة...</span>
        </div>
      </div>
    );
  }

  const heroTitle = data?.heroTitle?.ar || 'موقع إلكتروني احترافي يليق بعلامتك التجارية';
  const heroSubtitle = data?.heroSubtitle?.ar || 'نصمم ونطور مواقع إلكترونية احترافية مخصصة بالكامل، تجمع بين التصميم العصري، الأداء السريع، وسهولة الاستخدام، لتساعدك على عرض خدماتك وبناء حضور قوي على الإنترنت.';
  const ctaText = data?.primaryCtaText?.ar || 'أرسل الطلب الآن';

  const features = [
    'تصميم مخصص بالكامل',
    'سرعة تحميل وأداء عالي',
    'متوافق مع جميع الأجهزة',
    'لوحة تحكم سهلة لإدارة المحتوى',
    'كود نظيف وقابل للتطوير',
    'دعم فني بعد التسليم',
  ];

  return (
    <div dir="rtl" className="min-h-screen bg-[#0F1D38] text-slate-100 selection:bg-[#FF5E3A] selection:text-white font-sans antialiased overflow-x-hidden">

      {/* ── Header ── */}
      <header className="py-4 px-4 sm:px-8 border-b border-white/10 bg-[#0F1D38]/90 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <a href="/" className="text-lg font-black tracking-wider text-white flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#2A4073] to-[#FF5E3A] p-[1px]">
              <div className="w-full h-full bg-[#0F1D38] rounded-[7px] flex items-center justify-center">
                <Sparkles className="w-3.5 h-3.5 text-[#FF5E3A]" />
              </div>
            </div>
            MULTIX<span className="text-[#FF5E3A]">.</span>
          </a>
          <a
            href="#lead-form"
            onClick={() => trackCtaClick('Header CTA', data?.pageName)}
            className="px-4 py-2 rounded-full bg-gradient-to-r from-[#2A4073] to-[#FF5E3A] text-white text-xs font-bold hover:shadow-[0_0_20px_#FF5E3A] transition-all"
          >
            {ctaText}
          </a>
        </div>
      </header>

      {/* ── Hero Section ── */}
      <section className="relative overflow-hidden">
        {/* Ambient Glow */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#2A4073]/20 rounded-full blur-[180px] pointer-events-none -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#FF5E3A]/10 rounded-full blur-[160px] pointer-events-none translate-y-1/4" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-8 sm:py-14 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">

            {/* ── Form Column (Mobile First: order-1) ── */}
            <div id="lead-form" className="order-1 lg:order-2 lg:col-span-5">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="rounded-3xl bg-gradient-to-b from-[#0F1D38] to-[#091224] border border-white/10 shadow-2xl overflow-hidden"
              >
                {/* Form Header Accent Bar */}
                <div className="h-1 bg-gradient-to-l from-[#2A4073] to-[#FF5E3A]" />

                <div className="p-6 sm:p-8 space-y-5">
                  <div className="space-y-1.5">
                    <h3 className="text-lg sm:text-xl font-bold text-white leading-snug">
                      اطلب عرض سعر وخطة تنفيذ لمشروعك
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      املأ البيانات وسنتواصل معك خلال أقل من 12 ساعة.
                    </p>
                  </div>

                  {validationError && (
                    <div className="p-3 rounded-xl bg-[#FF5E3A]/15 border border-[#FF5E3A]/30 text-[#FF5E3A] text-xs font-medium flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{validationError}</span>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-3">
                    <input type="text" name="honeypot" value={formData.honeypot} onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })} style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-400 mb-1">الاسم بالكامل *</label>
                      <input type="text" required onFocus={trackFormStart} value={formData.name} onChange={(e) => { setFormData({ ...formData, name: e.target.value }); clearError(); }} placeholder="أدخل اسمك الكامل" className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-[#FF5E3A]/60 focus:bg-white/[0.06] transition-all text-sm" />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-400 mb-1">رقم الهاتف *</label>
                      <input type="tel" required value={formData.phone} onChange={(e) => { setFormData({ ...formData, phone: e.target.value }); clearError(); }} placeholder="+201020047243" dir="ltr" className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-[#FF5E3A]/60 focus:bg-white/[0.06] transition-all text-sm text-right" />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-400 mb-1">تفاصيل المشروع *</label>
                      <textarea rows={3} required value={formData.message} onChange={(e) => { setFormData({ ...formData, message: e.target.value }); clearError(); }} placeholder="اكتب نبذة عن مشروعك واحتياجاتك..." className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-[#FF5E3A]/60 focus:bg-white/[0.06] transition-all resize-none text-sm" />
                    </div>

                    <button type="submit" disabled={isSubmitting} className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#2A4073] to-[#FF5E3A] text-white font-bold text-center hover:shadow-[0_0_30px_#FF5E3A] transition-all flex items-center justify-center gap-2 text-sm mt-2">
                      {isSubmitting ? 'جاري الإرسال...' : (
                        <>
                          <span>{ctaText}</span>
                          <ArrowLeft className="w-4 h-4" />
                        </>
                      )}
                    </button>

                    <p className="text-[10px] text-slate-500 text-center flex items-center justify-center gap-1">
                      <Lock className="w-3 h-3" /> بياناتك آمنة ولن تتم مشاركتها مع أي جهة.
                    </p>
                  </form>
                </div>
              </motion.div>
            </div>

            {/* ── Copy Column (Mobile: order-2, Desktop: order-1) ── */}
            <div className="order-2 lg:order-1 lg:col-span-7 space-y-8">

              {/* Badge */}
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FF5E3A]/15 border border-[#FF5E3A]/30 text-[#FF5E3A] text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5" /> عرض خاص لفترة محدودة
              </motion.div>

              {/* Headline */}
              <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.05 }} className="text-3xl sm:text-4xl lg:text-[2.75rem] font-black text-white leading-[1.2] max-w-xl">
                {heroTitle}
              </motion.h1>

              {/* Description */}
              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="text-slate-300/90 text-sm sm:text-base leading-[1.8] max-w-lg">
                {heroSubtitle}
              </motion.p>

              {/* Feature Cards */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.15 }} className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg">
                {features.map((label, idx) => {
                  const Icon = featureIcons[idx];
                  return (
                    <div key={idx} className="flex items-center gap-3.5 p-4 rounded-2xl bg-[#091224]/70 border border-white/[0.07] hover:border-[#FF5E3A]/30 transition-colors group">
                      <div className="w-9 h-9 rounded-xl bg-[#FF5E3A]/10 flex items-center justify-center shrink-0 group-hover:bg-[#FF5E3A]/20 transition-colors">
                        <Icon className="w-4 h-4 text-[#FF5E3A]" />
                      </div>
                      <span className="text-[13px] font-medium text-slate-200">{label}</span>
                    </div>
                  );
                })}
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      {testimonials.length > 0 && (
        <section className="py-16 bg-[#091224] border-t border-white/[0.06]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-2 mb-12">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#FF5E3A]">آراء عملائنا</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">ثقة الشركات والعلامات التجارية</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((item, idx) => (
                <div key={item._id || idx} className="p-5 rounded-2xl bg-[#0F1D38]/80 border border-white/[0.07] space-y-3 text-start">
                  <div className="flex items-center gap-0.5">
                    {[...Array(item.rating || 5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-[#FF5E3A] text-[#FF5E3A]" />)}
                  </div>
                  <p className="text-sm text-slate-200/90 leading-relaxed">"{item.review?.ar || item.review?.en || item.review}"</p>
                  <div className="pt-3 border-t border-white/[0.06] flex items-center gap-3">
                    <img src={item.avatar ? urlFor(item.avatar).width(80).url() : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb'} alt="" className="w-9 h-9 rounded-full object-cover border border-white/10" />
                    <div>
                      <h4 className="text-xs font-bold text-white">{item.name?.ar || item.name?.en || item.name}</h4>
                      <p className="text-[10px] text-slate-400">{item.role?.ar || item.role?.en || item.role} — <span className="text-[#FF5E3A]">{item.company}</span></p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── FAQ ── */}
      {faqs.length > 0 && (
        <section className="py-16 border-t border-white/[0.06]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-2 mb-10">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#FF5E3A]">الأسئلة الشائعة</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">إجابات على استفساراتك</h2>
            </div>
            <div className="space-y-3">
              {faqs.map((faq, idx) => {
                const id = faq._id || `faq-${idx}`;
                const isOpen = openFaqId === id;
                return (
                  <div key={id} className="rounded-2xl bg-[#091224]/70 border border-white/[0.07] overflow-hidden">
                    <button onClick={() => setOpenFaqId(isOpen ? null : id)} className="w-full p-4 sm:p-5 text-start flex items-center justify-between gap-3 font-semibold text-sm text-white hover:text-[#FF5E3A] transition-colors">
                      <span>{faq.question?.ar || faq.question?.en || faq.question}</span>
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${isOpen ? 'bg-[#FF5E3A] text-white' : 'bg-white/[0.06] text-slate-400'}`}>
                        {isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                      </div>
                    </button>
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="px-4 sm:px-5 pb-4 sm:pb-5 text-xs sm:text-sm text-slate-300/90 leading-relaxed border-t border-white/[0.04] pt-3">
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

    </div>
  );
};
