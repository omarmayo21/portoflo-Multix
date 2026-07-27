import { defineType, defineField } from 'sanity';

export const thankYouPage = defineType({
  name: 'thankYouPage',
  title: 'Thank You Page Settings (/thank-you)',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Success Headline',
      type: 'localeString',
    }),
    defineField({
      name: 'subtitle',
      title: 'Success Message / Next Steps',
      type: 'localeText',
    }),
    defineField({
      name: 'ctaText',
      title: 'Return Button Text',
      type: 'localeString',
    }),
    defineField({
      name: 'whatsappNumber',
      title: 'WhatsApp Contact Direct Number',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      title: 'title.en',
    },
  },
});
