import { defineType, defineField } from 'sanity';

export const websiteSettings = defineType({
  name: 'websiteSettings',
  title: 'Website Settings & Ads Configuration',
  type: 'document',
  fields: [
    defineField({
      name: 'websiteName',
      title: 'Website Name',
      type: 'string',
      initialValue: 'Multix Studio',
    }),
    defineField({
      name: 'logo',
      title: 'Website Logo',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'favicon',
      title: 'Favicon Image',
      type: 'image',
    }),
    defineField({
      name: 'metaPixelId',
      title: 'Meta Pixel ID (Facebook / Instagram Ads)',
      type: 'string',
      description: 'Used across website and landing pages for tracking PageView, ViewContent, Lead, etc.',
    }),
    defineField({
      name: 'gaMeasurementId',
      title: 'Google Analytics 4 Measurement ID (e.g. G-XXXXXXX)',
      type: 'string',
    }),
    defineField({
      name: 'gtmId',
      title: 'Google Tag Manager Container ID (e.g. GTM-XXXXXXX)',
      type: 'string',
    }),
    defineField({
      name: 'adminNotificationEmail',
      title: 'Admin Email for Lead Notifications',
      type: 'string',
      initialValue: 'leads@multix.studio',
    }),
    defineField({
      name: 'seoDefaultTitle',
      title: 'Default SEO Title',
      type: 'string',
      initialValue: 'Multix Studio | High Performance 3D & Modern Web Apps',
    }),
    defineField({
      name: 'seoDefaultDescription',
      title: 'Default Meta Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'ogImage',
      title: 'Default Open Graph Image',
      type: 'image',
    }),
  ],
  preview: {
    select: {
      title: 'websiteName',
      subtitle: 'metaPixelId',
    },
    prepare({ title, subtitle }) {
      return {
        title: title || 'Global Settings & Ads',
        subtitle: subtitle ? `Meta Pixel: ${subtitle}` : 'No Pixel configured',
      };
    },
  },
});
