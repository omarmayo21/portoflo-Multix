export interface LeadPayload {
  fullName: string;
  email: string;
  phone?: string;
  company?: string;
  projectType?: string;
  budget?: string;
  message?: string;
  firstLandingPage?: string;
  currentLandingPage?: string;
  referrer?: string;
  source?: string;
  campaignName?: string;
  primaryCtaClicked?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  utmTerm?: string;
  deviceType?: string;
  browser?: string;
}

export function formatMetaCapiPayload(lead: LeadPayload) {
  const eventTime = Math.floor(Date.now() / 1000);

  return {
    data: [
      {
        event_name: 'Lead',
        event_time: eventTime,
        action_source: 'website',
        event_source_url: lead.currentLandingPage || (typeof window !== 'undefined' ? window.location.href : ''),
        user_data: {
          fn: lead.fullName.toLowerCase().trim(),
          email: lead.email.toLowerCase().trim(),
          ph: lead.phone ? lead.phone.replace(/[^0-9]/g, '') : undefined,
          client_user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : undefined,
        },
        custom_data: {
          lead_source: lead.source || 'Direct',
          campaign_name: lead.campaignName,
          project_type: lead.projectType,
          budget: lead.budget,
          utm_source: lead.utmSource,
          utm_medium: lead.utmMedium,
          utm_campaign: lead.utmCampaign,
        },
      },
    ],
  };
}
