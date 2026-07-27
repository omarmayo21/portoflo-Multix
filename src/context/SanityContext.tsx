import React, { createContext, useContext, useEffect, useState } from 'react';
import { sanityClient, isSanityConfigured } from '../lib/sanity/client';
import {
  PROJECTS_QUERY,
  SERVICES_QUERY,
  TESTIMONIALS_QUERY,
  FAQS_QUERY,
  WEBSITE_CONTENT_QUERY,
  WEBSITE_SETTINGS_QUERY,
} from '../lib/sanity/queries';
import { initAnalytics } from '../utils/analytics';
import { captureUtmParameters } from '../utils/utmTracker';

interface SanityContextType {
  projects: any[];
  services: any[];
  testimonials: any[];
  faqs: any[];
  websiteContent: any;
  websiteSettings: any;
  loading: boolean;
}

const SanityContext = createContext<SanityContextType>({
  projects: [],
  services: [],
  testimonials: [],
  faqs: [],
  websiteContent: null,
  websiteSettings: null,
  loading: true,
});

export const SanityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>([]);
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [faqs, setFaqs] = useState<any[]>([]);
  const [websiteContent, setWebsiteContent] = useState<any>(null);
  const [websiteSettings, setWebsiteSettings] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Capture UTM parameters on page visit
    captureUtmParameters();

    async function loadData() {
      if (!isSanityConfigured()) {
        setLoading(false);
        return;
      }

      try {
        const [projRes, servRes, testRes, faqRes, contentRes, settingsRes] = await Promise.all([
          sanityClient.fetch(PROJECTS_QUERY),
          sanityClient.fetch(SERVICES_QUERY),
          sanityClient.fetch(TESTIMONIALS_QUERY),
          sanityClient.fetch(FAQS_QUERY),
          sanityClient.fetch(WEBSITE_CONTENT_QUERY),
          sanityClient.fetch(WEBSITE_SETTINGS_QUERY),
        ]);

        // Sanity is the single source of truth — no fallback data
        setProjects(projRes || []);
        setServices(servRes || []);
        setTestimonials(testRes || []);
        setFaqs(faqRes || []);
        if (contentRes) setWebsiteContent(contentRes);

        const effectivePixelId = settingsRes?.metaPixelId || '3969663239835262';
        setWebsiteSettings(settingsRes || { metaPixelId: effectivePixelId });

        // Initialize Meta Pixel, GA4, GTM dynamically from settings
        initAnalytics({
          metaPixelId: effectivePixelId,
          gaMeasurementId: settingsRes?.gaMeasurementId,
          gtmId: settingsRes?.gtmId,
        });
      } catch (err) {
        console.warn('Sanity fetch error:', err);
        initAnalytics({ metaPixelId: '3969663239835262' });
      } finally {
        setLoading(false);
      }
    }

    loadData();

    // Real-time live listener for instant Sanity Studio edits
    let subscription: any;
    if (isSanityConfigured()) {
      try {
        subscription = sanityClient
          .listen('*[_type in ["project", "service", "testimonial", "faq", "websiteContent", "websiteSettings", "category", "landingPage"]]')
          .subscribe(() => {
            loadData();
          });
      } catch (e) {
        console.warn('Real-time listener unavailable:', e);
      }
    }

    return () => {
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, []);

  return (
    <SanityContext.Provider
      value={{
        projects,
        services,
        testimonials,
        faqs,
        websiteContent,
        websiteSettings,
        loading,
      }}
    >
      {children}
    </SanityContext.Provider>
  );
};

export const useSanity = () => useContext(SanityContext);
