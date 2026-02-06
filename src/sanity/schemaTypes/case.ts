import { defineField, defineType } from 'sanity'

export const caseType = defineType({
  name: 'case',
  title: 'Case',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'client',
      title: 'Client',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'aspect',
      title: 'Card Aspect Ratio',
      type: 'string',
      options: {
        list: [
          { title: '9:16', value: '9-16' },
          { title: '3:4', value: '3-4' },
          { title: '1:1', value: '1-1' },
          { title: '3:2', value: '3-2' },
        ],
      },
      initialValue: '3-2',
    }),
    defineField({
      name: 'competencies',
      title: 'Competencies',
      type: 'object',
      fields: [
        defineField({ name: 'artDirection', title: 'Art Direction', type: 'boolean' }),
        defineField({ name: 'ui', title: 'UI', type: 'boolean' }),
        defineField({ name: 'ux', title: 'UX', type: 'boolean' }),
        defineField({ name: 'motion', title: 'Motion', type: 'boolean' }),
        defineField({ name: 'illustration', title: 'Illustration', type: 'boolean' }),
        defineField({ name: 'branding', title: 'Branding', type: 'boolean' }),
      ],
    }),
    defineField({
      name: 'coverMedia',
      title: 'Cover Media',
      type: 'object',
      fields: [
        defineField({
          name: 'coverType',
          title: 'Cover Type',
          type: 'string',
          options: {
            list: [
              { title: 'Image', value: 'image' },
              { title: 'Video', value: 'video' },
              { title: 'Link', value: 'link' },
            ],
            layout: 'radio',
          },
          initialValue: 'image',
        }),
        defineField({
          name: 'image',
          title: 'Cover Image',
          type: 'image',
          options: { hotspot: true },
          hidden: ({ parent }) => parent?.coverType !== 'image',
        }),
        defineField({
          name: 'video',
          title: 'Cover Video',
          type: 'file',
          options: { accept: 'video/*' },
          hidden: ({ parent }) => parent?.coverType !== 'video',
        }),
        defineField({
          name: 'link',
          title: 'Cover Link (Image URL)',
          type: 'url',
          description: 'Use for external image URLs.',
          validation: (Rule) => Rule.uri({ scheme: ['http', 'https'] }),
          hidden: ({ parent }) => parent?.coverType !== 'link',
        }),
      ],
    }),
    defineField({
      name: 'role',
      title: 'Role',
      type: 'string',
      description: 'Your role on this project.',
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'Lower numbers appear first.',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
    }),
    defineField({
      name: 'featured',
      title: 'Featured on Landing',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'content',
      title: 'Case Study Content',
      type: 'array',
      of: [
        { type: 'block' },
        {
          type: 'image',
          options: { hotspot: true },
        },
        {
          type: 'file',
          name: 'video',
          title: 'Video',
          options: {
            accept: 'video/*',
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'client',
      media: 'coverImage',
    },
  },
})
