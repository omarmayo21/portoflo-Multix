declare global {
  interface Window {
    fbq?: (...args: any[]) => void;
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

let activePixelId: string | null = null;

export function initAnalytics(settings: {
  metaPixelId?: string;
  gaMeasurementId?: string;
  gtmId?: string;
}) {
  if (typeof window === 'undefined') return;

  const pixelId = settings.metaPixelId || '3969663239835262';

  // 1. Initialize Meta Pixel dynamically from Sanity
  if (pixelId && pixelId !== activePixelId) {
    activePixelId = pixelId;

    if (!window.fbq) {
      (function (f: any, b: any, e: any, v: any, n?: any, t?: any, s?: any) {
        if (f.fbq) return;
        n = f.fbq = function () {
          n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
        };
        if (!f._fbq) f._fbq = n;
        n.push = n;
        n.loaded = !0;
        n.version = '2.0';
        n.queue = [];
        t = b.createElement(e);
        t.async = !0;
        t.src = v;
        s = b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t, s);
      })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
    }

    if (window.fbq) {
      window.fbq('init', pixelId);
      window.fbq('track', 'PageView');
    }
  }

  // 2. Initialize GA4
  if (settings.gaMeasurementId && !window.gtag) {
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${settings.gaMeasurementId}`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    window.gtag = function () {
      window.dataLayer?.push(arguments);
    };
    window.gtag('js', new Date());
    window.gtag('config', settings.gaMeasurementId);
  }

  // 3. Initialize GTM
  if (settings.gtmId && !document.getElementById('gtm-script')) {
    const gtmScript = document.createElement('script');
    gtmScript.id = 'gtm-script';
    gtmScript.innerHTML = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${settings.gtmId}');`;
    document.head.appendChild(gtmScript);
  }
}

export function trackPageView(url?: string) {
  if (typeof window === 'undefined') return;
  if (window.fbq) window.fbq('track', 'PageView');
  if (window.gtag) window.gtag('event', 'page_view', { page_path: url || window.location.pathname });
}

export function trackViewContent(contentName: string, category?: string) {
  if (typeof window === 'undefined') return;
  if (window.fbq) {
    window.fbq('track', 'ViewContent', {
      content_name: contentName,
      content_category: category || 'Landing Page',
    });
  }
  if (window.gtag) {
    window.gtag('event', 'view_content', {
      content_name: contentName,
      content_category: category,
    });
  }
}

export function trackLeadEvent(leadData?: { name?: string; service?: string; budget?: string }) {
  if (typeof window === 'undefined') return;
  if (window.fbq) {
    window.fbq('track', 'Lead', {
      content_name: leadData?.service || 'General Inquiry',
      value: leadData?.budget || 'Custom',
      currency: 'USD',
    });
  }
  if (window.gtag) {
    window.gtag('event', 'generate_lead', {
      service: leadData?.service,
      value: leadData?.budget,
    });
  }
}

export function trackCtaClick(ctaName: string, campaign?: string) {
  if (typeof window === 'undefined') return;
  if (window.fbq) {
    window.fbq('trackCustom', 'CtaClick', {
      cta_name: ctaName,
      campaign: campaign || 'Default',
    });
  }
  if (window.gtag) {
    window.gtag('event', 'cta_click', {
      cta_name: ctaName,
      campaign_name: campaign,
    });
  }
}

export function trackWhatsAppClick() {
  if (typeof window === 'undefined') return;
  if (window.fbq) window.fbq('trackCustom', 'WhatsAppContact');
  if (window.gtag) window.gtag('event', 'whatsapp_click');
}

export function trackPhoneClick() {
  if (typeof window === 'undefined') return;
  if (window.fbq) window.fbq('trackCustom', 'PhoneCallContact');
  if (window.gtag) window.gtag('event', 'phone_click');
}

export function trackFormStart() {
  if (typeof window === 'undefined') return;
  if (window.fbq) window.fbq('trackCustom', 'FormStarted');
  if (window.gtag) window.gtag('event', 'form_start');
}
