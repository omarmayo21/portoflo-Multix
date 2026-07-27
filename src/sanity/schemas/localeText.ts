import { defineType, defineField } from 'sanity';

export const localeText = defineType({
  name: 'localeText',
  title: 'Localized Text (EN / AR)',
  type: 'object',
  fields: [
    defineField({
      name: 'en',
      title: 'English',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'ar',
      title: 'Arabic',
      type: 'text',
      rows: 4,
    }),
  ],
});
