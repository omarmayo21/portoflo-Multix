import { defineType, defineField } from 'sanity';

export const websiteContent = defineType({
  name: 'websiteContent',
  title: 'Website Page Content',
  type: 'document',
  fields: [
    defineField({
      name: 'heroBadge',
      title: 'Hero Badge Text',
      type: 'localeString',
    }),
    defineField({
      name: 'heroTitle',
      title: 'Hero Title (Headline)',
      type: 'localeString',
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Hero Subtitle',
      type: 'localeText',
    }),
    defineField({
      name: 'aboutBadge',
      title: 'About Section Badge',
      type: 'localeString',
    }),
    defineField({
      name: 'aboutTitle',
      title: 'About Section Title',
      type: 'localeString',
    }),
    defineField({
      name: 'aboutDescription',
      title: 'About Section Text',
      type: 'localeText',
    }),
    defineField({
      name: 'aboutYearsExperience',
      title: 'Years of Experience Stat',
      type: 'string',
      initialValue: '8+',
    }),
    defineField({
      name: 'contactEmail',
      title: 'Contact Email',
      type: 'string',
      initialValue: 'hello@multix.studio',
    }),
    defineField({
      name: 'contactPhone',
      title: 'Contact Phone / WhatsApp',
      type: 'string',
      initialValue: '+971 50 123 4567',
    }),
    defineField({
      name: 'contactLocation',
      title: 'Office Location',
      type: 'localeString',
    }),
    defineField({
      name: 'footerTagline',
      title: 'Footer Tagline',
      type: 'localeString',
    }),
    defineField({
      name: 'footerCopyright',
      title: 'Footer Copyright Notice',
      type: 'string',
      initialValue: '© 2026 Multix Studio. All Rights Reserved.',
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Media Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'platform', title: 'Platform Name', type: 'string' }),
            defineField({ name: 'url', title: 'URL', type: 'url' }),
            defineField({ name: 'icon', title: 'Icon Name', type: 'string' }),
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'heroTitle.en',
    },
    prepare({ title }) {
      return {
        title: title || 'Website Section Content',
      };
    },
  },
});
