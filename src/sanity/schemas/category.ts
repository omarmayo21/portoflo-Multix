import { defineType, defineField } from 'sanity';

export const category = defineType({
  name: 'category',
  title: 'Project Categories',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Category Name',
      type: 'localeString',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title.en',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'localeText',
    }),
    defineField({
      name: 'color',
      title: 'Accent Badge Color (Hex or CSS)',
      type: 'string',
      initialValue: '#FF5E3A',
    }),
  ],
  preview: {
    select: {
      title: 'title.en',
      subtitle: 'slug.current',
    },
  },
});
