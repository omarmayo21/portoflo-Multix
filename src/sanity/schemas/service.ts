import { defineType, defineField } from 'sanity';

export const service = defineType({
  name: 'service',
  title: 'Services',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Service Title',
      type: 'localeString',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'localeText',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'iconName',
      title: 'Icon Name (Lucide Icon Key, e.g. Code2, Layout, Sparkles)',
      type: 'string',
      initialValue: 'Code2',
    }),
    defineField({
      name: 'features',
      title: 'Key Features / Deliverables',
      type: 'array',
      of: [{ type: 'localeString' }],
    }),
    defineField({
      name: 'displayOrder',
      title: 'Display Order',
      type: 'number',
      initialValue: 1,
    }),
    defineField({
      name: 'published',
      title: 'Published',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'title.en',
      subtitle: 'iconName',
    },
  },
});
