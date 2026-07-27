import { defineType, defineField } from 'sanity';

export const landingPage = defineType({
  name: 'landingPage',
  title: 'Campaign Landing Pages',
  type: 'document',
  fields: [
    defineField({
      name: 'pageName',
      title: 'Page Internal Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug (/landing/:slug)',
      type: 'slug',
      options: {
        source: 'pageName',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'campaignRef',
      title: 'Associated Campaign (Optional)',
      type: 'reference',
      to: [{ type: 'campaign' }],
    }),
    defineField({
      name: 'minimalNavigation',
      title: 'Minimal Navigation (Remove Distractions for High Conversion)',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'stickyMobileCta',
      title: 'Sticky CTA Button on Mobile',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'heroTitle',
      title: 'Hero Headline',
      type: 'localeString',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Hero Subtitle',
      type: 'localeText',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image / Mockup',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'primaryCtaText',
      title: 'Primary Form Button Text',
      type: 'localeString',
    }),
    defineField({
      name: 'features',
      title: 'Key Features / Highlights',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'Feature Title', type: 'localeString' }),
            defineField({ name: 'description', title: 'Feature Description', type: 'localeText' }),
            defineField({ name: 'icon', title: 'Icon Name (Lucide icon key)', type: 'string' }),
          ],
        },
      ],
    }),
    defineField({
      name: 'benefits',
      title: 'Value Proposition & Benefits',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'Benefit Headline', type: 'localeString' }),
            defineField({ name: 'detail', title: 'Detail', type: 'localeText' }),
          ],
        },
      ],
    }),
    defineField({
      name: 'testimonials',
      title: 'Featured Testimonials',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'testimonial' }] }],
    }),
    defineField({
      name: 'faqs',
      title: 'Featured FAQ Items',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'faq' }] }],
    }),
    defineField({
      name: 'seoTitle',
      title: 'SEO Title Tag',
      type: 'string',
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO Meta Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'canonicalUrl',
      title: 'Canonical URL',
      type: 'url',
    }),
    defineField({
      name: 'ogImage',
      title: 'Open Graph Image (Social Sharing)',
      type: 'image',
    }),
    defineField({
      name: 'published',
      title: 'Publish Status (Live on website)',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'pageName',
      subtitle: 'slug.current',
      media: 'heroImage',
    },
  },
});
