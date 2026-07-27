import { sanityClient, isSanityConfigured } from './client';
import { formatMetaCapiPayload, LeadPayload } from './metaCapi';
import { getStoredUtms, captureUtmParameters } from '../../utils/utmTracker';
import { trackLeadEvent } from '../../utils/analytics';

export interface FormSubmissionInput {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service?: string;
  budget?: string;
  message?: string;
  honeypot?: string; // Spam protection
  ctaClicked?: string;
}

export async function submitLeadForm(input: FormSubmissionInput): Promise<{ success: boolean; error?: string }> {
  // 1. Honeypot Spam Protection Check
  if (input.honeypot) {
    // Hidden honeypot field was filled by a bot -> silent rejection
    return { success: true };
  }

  // 2. Gather tracking info
  const utms = { ...getStoredUtms(), ...captureUtmParameters() };

  const leadData: LeadPayload = {
    fullName: input.name,
    email: input.email,
    phone: input.phone,
    company: input.company,
    projectType: input.service,
    budget: input.budget,
    message: input.message,
    firstLandingPage: utms.firstLandingPage,
    currentLandingPage: utms.currentLandingPage || (typeof window !== 'undefined' ? window.location.href : ''),
    referrer: utms.referrer,
    source: utms.source || 'Direct',
    campaignName: utms.utm_campaign,
    primaryCtaClicked: input.ctaClicked || 'Contact Form Submit',
    utmSource: utms.utm_source,
    utmMedium: utms.utm_medium,
    utmCampaign: utms.utm_campaign,
    utmContent: utms.utm_content,
    utmTerm: utms.utm_term,
    deviceType: utms.deviceType,
    browser: utms.browser,
  };

  // 3. Fire Meta Pixel & GA4 browser lead events
  trackLeadEvent({
    name: input.name,
    service: input.service,
    budget: input.budget,
  });

  // 4. Generate CAPI payload ready for server logs / webhooks
  const _capiPayload = formatMetaCapiPayload(leadData);

  // 5. Submit to Sanity (if write token is available in environment) or local storage fallback
  try {
    if (isSanityConfigured() && import.meta.env.VITE_SANITY_WRITE_TOKEN) {
      const writeClient = sanityClient.withConfig({
        token: import.meta.env.VITE_SANITY_WRITE_TOKEN,
      });

      await writeClient.create({
        _type: 'lead',
        ...leadData,
        submissionDate: new Date().toISOString(),
        status: 'New',
      });
    } else {
      // Offline / Local Development Fallback: Store lead in localStorage
      const existingLeads = JSON.parse(localStorage.getItem('multix_saved_leads') || '[]');
      existingLeads.unshift({
        ...leadData,
        _id: 'lead_' + Date.now(),
        submissionDate: new Date().toISOString(),
        status: 'New',
      });
      localStorage.setItem('multix_saved_leads', JSON.stringify(existingLeads));
    }

    return { success: true };
  } catch (err: any) {
    console.warn('Lead submission error (falling back to local cache):', err);
    // Fallback save locally
    const existingLeads = JSON.parse(localStorage.getItem('multix_saved_leads') || '[]');
    existingLeads.unshift({
      ...leadData,
      _id: 'lead_' + Date.now(),
      submissionDate: new Date().toISOString(),
      status: 'New',
    });
    localStorage.setItem('multix_saved_leads', JSON.stringify(existingLeads));

    return { success: true };
  }
}
