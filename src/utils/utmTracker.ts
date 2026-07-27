export interface UtmParams {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  firstLandingPage?: string;
  currentLandingPage?: string;
  referrer?: string;
  source?: string;
  deviceType?: string;
  browser?: string;
}

export function detectDeviceType(): string {
  if (typeof window === 'undefined') return 'Desktop';
  const ua = navigator.userAgent;
  if (/mobile/i.test(ua)) return 'Mobile';
  if (/ipad|tablet/i.test(ua)) return 'Tablet';
  return 'Desktop';
}

export function detectBrowser(): string {
  if (typeof window === 'undefined') return 'Unknown';
  const ua = navigator.userAgent;
  if (ua.includes('Chrome') && !ua.includes('Edg')) return 'Chrome';
  if (ua.includes('Safari') && !ua.includes('Chrome')) return 'Safari';
  if (ua.includes('Firefox')) return 'Firefox';
  if (ua.includes('Edg')) return 'Edge';
  return 'Browser';
}

export function detectLeadSource(utmSource?: string, referrer?: string): string {
  const src = (utmSource || '').toLowerCase();
  const ref = (referrer || '').toLowerCase();

  if (src.includes('facebook') || ref.includes('facebook.com')) return 'Facebook Ads';
  if (src.includes('instagram') || ref.includes('instagram.com')) return 'Instagram Ads';
  if (src.includes('google') || src.includes('gclid') || ref.includes('google.')) return 'Google Ads';
  if (ref && !ref.includes(window.location.hostname)) return 'Referral';
  if (ref.includes('google') || ref.includes('bing') || ref.includes('yahoo')) return 'Organic Search';
  return 'Direct';
}

export function captureUtmParameters(): UtmParams {
  if (typeof window === 'undefined') return {};

  const urlParams = new URLSearchParams(window.location.search);
  const utm_source = urlParams.get('utm_source') || undefined;
  const utm_medium = urlParams.get('utm_medium') || undefined;
  const utm_campaign = urlParams.get('utm_campaign') || undefined;
  const utm_content = urlParams.get('utm_content') || undefined;
  const utm_term = urlParams.get('utm_term') || undefined;

  const currentLandingPage = window.location.href;
  const referrer = document.referrer || undefined;

  // Retrieve or set first landing page in sessionStorage
  let firstLandingPage = sessionStorage.getItem('first_landing_page');
  if (!firstLandingPage) {
    firstLandingPage = currentLandingPage;
    sessionStorage.setItem('first_landing_page', firstLandingPage);
  }

  const deviceType = detectDeviceType();
  const browser = detectBrowser();
  const source = detectLeadSource(utm_source, referrer);

  const captured: UtmParams = {
    utm_source,
    utm_medium,
    utm_campaign,
    utm_content,
    utm_term,
    firstLandingPage,
    currentLandingPage,
    referrer,
    source,
    deviceType,
    browser,
  };

  // Cache in localStorage to retain across navigation sessions
  if (utm_source || utm_campaign) {
    localStorage.setItem('multix_utm_params', JSON.stringify(captured));
  }

  return captured;
}

export function getStoredUtms(): UtmParams {
  if (typeof window === 'undefined') return {};
  try {
    const cached = localStorage.getItem('multix_utm_params');
    return cached ? JSON.parse(cached) : {};
  } catch {
    return {};
  }
}
