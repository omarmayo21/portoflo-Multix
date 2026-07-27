export interface SeoProps {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  ogImage?: string;
  noIndex?: boolean;
}

export function updateSeoMeta(seo: SeoProps) {
  if (typeof window === 'undefined') return;

  const defaultTitle = 'Multix Studio | High Performance 3D & Modern Web Apps';
  const defaultDesc = 'A premium digital agency specializing in 3D WebGL websites, high-converting Meta Ads landing pages, and bespoke React applications.';

  const title = seo.title || defaultTitle;
  const description = seo.description || defaultDesc;

  document.title = title;

  let metaDesc = document.querySelector('meta[name="description"]');
  if (!metaDesc) {
    metaDesc = document.createElement('meta');
    metaDesc.setAttribute('name', 'description');
    document.head.appendChild(metaDesc);
  }
  metaDesc.setAttribute('content', description);

  // Open Graph Title
  let ogTitle = document.querySelector('meta[property="og:title"]');
  if (!ogTitle) {
    ogTitle = document.createElement('meta');
    ogTitle.setAttribute('property', 'og:title');
    document.head.appendChild(ogTitle);
  }
  ogTitle.setAttribute('content', title);

  // Open Graph Description
  let ogDesc = document.querySelector('meta[property="og:description"]');
  if (!ogDesc) {
    ogDesc = document.createElement('meta');
    ogDesc.setAttribute('property', 'og:description');
    document.head.appendChild(ogDesc);
  }
  ogDesc.setAttribute('content', description);

  // Robots tag (for Preview Mode)
  let robotsTag = document.querySelector('meta[name="robots"]');
  if (seo.noIndex) {
    if (!robotsTag) {
      robotsTag = document.createElement('meta');
      robotsTag.setAttribute('name', 'robots');
      document.head.appendChild(robotsTag);
    }
    robotsTag.setAttribute('content', 'noindex, nofollow');
  } else if (robotsTag) {
    robotsTag.setAttribute('content', 'index, follow');
  }
}

export function injectStructuredData(schemaData: object) {
  if (typeof window === 'undefined') return;
  const existing = document.getElementById('json-ld-schema');
  if (existing) existing.remove();

  const script = document.createElement('script');
  script.id = 'json-ld-schema';
  script.type = 'application/ld+json';
  script.innerHTML = JSON.stringify(schemaData);
  document.head.appendChild(script);
}

export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Multix Studio',
    url: 'https://multix.studio',
    logo: 'https://multix.studio/logo.png',
    description: 'High performance 3D web development, digital agency, and Meta Ads campaign landing pages.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Dubai',
      addressCountry: 'UAE',
    },
    sameAs: [
      'https://github.com',
      'https://linkedin.com',
      'https://instagram.com',
    ],
  };
}
