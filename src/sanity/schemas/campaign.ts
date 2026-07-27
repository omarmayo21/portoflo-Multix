import { defineType, defineField } from 'sanity';

export const campaign = defineType({
  name: 'campaign',
  title: 'Advertising Campaigns',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Campaign Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'metaCampaignId',
      title: 'Meta / Google Campaign ID',
      type: 'string',
    }),
    defineField({
      name: 'landingPage',
      title: 'Target Landing Page',
      type: 'reference',
      to: [{ type: 'landingPage' }],
    }),
    defineField({
      name: 'offerName',
      title: 'Special Offer Name',
      type: 'string',
      description: 'e.g. 7-Day Fast Track Website, 20% Off E-commerce Build',
    }),
    defineField({
      name: 'primaryCtaText',
      title: 'Primary CTA Text',
      type: 'string',
      initialValue: 'Claim Your Free Consultation',
    }),
    defineField({
      name: 'status',
      title: 'Campaign Status',
      type: 'string',
      options: {
        list: [
          { title: 'Active', value: 'Active' },
          { title: 'Paused', value: 'Paused' },
          { title: 'Archived', value: 'Archived' },
        ],
      },
      initialValue: 'Active',
    }),
    defineField({
      name: 'notes',
      title: 'Internal Notes & Strategy',
      type: 'text',
      rows: 3,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'status',
    },
  },
});
