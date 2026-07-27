export const PROJECTS_QUERY = `*[_type == "project" && publishStatus == "published"] | order(displayOrder asc) {
  _id,
  title,
  slug,
  shortDescription,
  fullDescription,
  year,
  technologies,
  mainImage,
  coverThumbnail,
  galleryImages,
  liveDemoUrl,
  githubUrl,
  featured,
  displayOrder,
  categoryRef-> {
    title,
    slug,
    color
  }
}`;

export const LANDING_PAGES_QUERY = `*[_type == "landingPage" && published == true] {
  _id,
  pageName,
  slug,
  heroTitle,
  heroSubtitle,
  heroImage,
  minimalNavigation,
  stickyMobileCta,
  primaryCtaText,
  features,
  benefits,
  testimonials[]-> {
    name,
    role,
    company,
    review,
    avatar,
    rating
  },
  faqs[]-> {
    question,
    answer
  },
  seoTitle,
  seoDescription,
  canonicalUrl,
  ogImage
}`;

export const LANDING_PAGE_BY_SLUG_QUERY = `*[_type == "landingPage" && slug.current == $slug && published == true][0] {
  _id,
  pageName,
  slug,
  heroTitle,
  heroSubtitle,
  heroImage,
  minimalNavigation,
  stickyMobileCta,
  primaryCtaText,
  features,
  benefits,
  testimonials[]-> {
    name,
    role,
    company,
    review,
    avatar,
    rating
  },
  faqs[]-> {
    question,
    answer
  },
  seoTitle,
  seoDescription,
  canonicalUrl,
  ogImage
}`;

export const SERVICES_QUERY = `*[_type == "service" && published == true] | order(displayOrder asc) {
  _id,
  title,
  description,
  iconName,
  features,
  displayOrder
}`;

export const TESTIMONIALS_QUERY = `*[_type == "testimonial" && published == true] | order(displayOrder asc) {
  _id,
  name,
  role,
  company,
  review,
  avatar,
  rating
}`;

export const FAQS_QUERY = `*[_type == "faq" && published == true] | order(displayOrder asc) {
  _id,
  question,
  answer,
  displayOrder
}`;

export const WEBSITE_CONTENT_QUERY = `*[_type == "websiteContent"][0] {
  heroBadge,
  heroTitle,
  heroSubtitle,
  aboutBadge,
  aboutTitle,
  aboutDescription,
  aboutYearsExperience,
  contactEmail,
  contactPhone,
  contactLocation,
  footerTagline,
  footerCopyright,
  socialLinks
}`;

export const WEBSITE_SETTINGS_QUERY = `*[_type == "websiteSettings"][0] {
  websiteName,
  logo,
  favicon,
  metaPixelId,
  gaMeasurementId,
  gtmId,
  adminNotificationEmail,
  seoDefaultTitle,
  seoDefaultDescription,
  ogImage
}`;

export const THANK_YOU_PAGE_QUERY = `*[_type == "thankYouPage"][0] {
  title,
  subtitle,
  ctaText,
  whatsappNumber
}`;
