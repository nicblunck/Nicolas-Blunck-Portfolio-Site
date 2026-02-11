import { defineField, defineType } from "sanity";

export const caseType = defineType({
  name: "case",
  title: "Case",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (Rule) => Rule.required() }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: "client", title: "Client", type: "string" }),
    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      initialValue: false,
    }),
    defineField({ name: "role", title: "Role", type: "string" }),
    defineField({
      name: "competencies",
      title: "Competencies",
      type: "array",
      of: [{ type: "reference", to: [{ type: "competency" }] }],
    }),
    defineField({
      name: "coverMedia",
      title: "Cover Media",
      type: "object",
      fields: [
        {
          name: "coverType",
          title: "Cover Type",
          type: "string",
          options: {
            list: [
              { title: "Image", value: "image" },
              { title: "Video", value: "video" },
              { title: "Link", value: "link" },
            ],
            layout: "radio",
          },
        },
        { name: "image", title: "Image", type: "image", options: { hotspot: true } },
        { name: "videoUrl", title: "Video URL", type: "url" },
        { name: "link", title: "Link URL", type: "url" },
      ],
    }),
    defineField({
      name: "intro",
      title: "Intro",
      type: "text",
      rows: 4,
    }),
    defineField({ name: "liveLink", title: "Live Link", type: "url" }),
    defineField({ name: "liveLinkLabel", title: "Live Link Label", type: "string" }),
    defineField({
      name: "content",
      title: "Content",
      type: "array",
      of: [
        defineField({
          name: "caseMetrics",
          title: "Metrics",
          type: "object",
          fields: [
            defineField({
              name: "metrics",
              title: "Metrics",
              type: "array",
              of: [
                defineField({
                  name: "metric",
                  title: "Metric",
                  type: "object",
                  fields: [
                    defineField({ name: "value", title: "Value", type: "string" }),
                    defineField({ name: "label", title: "Label", type: "string" }),
                  ],
                  preview: {
                    select: { title: "value", subtitle: "label" },
                    prepare: ({ title, subtitle }) => ({ title: title ?? "Metric", subtitle }),
                  },
                }),
              ],
            }),
          ],
          preview: {
            select: { title: "metrics.0.value", subtitle: "metrics.0.label" },
            prepare: ({ title, subtitle }) => ({ title: title ?? "Metrics", subtitle }),
          },
        }),
        defineField({
          name: "caseSection",
          title: "Section",
          type: "object",
          fields: [
            defineField({ name: "heading", title: "Heading", type: "string" }),
            defineField({ name: "body", title: "Body", type: "text", rows: 4 }),
            defineField({
              name: "gallery",
              title: "Gallery",
              type: "array",
              of: [{ type: "reference", to: [{ type: "caseMedia" }] }],
            }),
          ],
          preview: {
            select: { title: "heading", subtitle: "body" },
            prepare: ({ title, subtitle }) => ({ title: title ?? "Section", subtitle }),
          },
        }),
        defineField({
          name: "caseQuote",
          title: "Quote",
          type: "object",
          fields: [
            defineField({ name: "text", title: "Text", type: "text", rows: 3 }),
            defineField({ name: "author", title: "Author", type: "string" }),
            defineField({ name: "role", title: "Role", type: "string" }),
          ],
          preview: {
            select: { title: "text", subtitle: "author" },
            prepare: ({ title, subtitle }) => ({ title: title ?? "Quote", subtitle }),
          },
        }),
      ],
    }),
    defineField({
      name: "relatedCases",
      title: "Related Cases",
      type: "array",
      of: [{ type: "reference", to: [{ type: "case" }] }],
    }),
    defineField({
      name: "aspect",
      title: "Aspect",
      type: "string",
      options: {
        list: [
          { title: "9-16", value: "9-16" },
          { title: "3-4", value: "3-4" },
          { title: "1-1", value: "1-1" },
          { title: "3-2", value: "3-2" },
        ],
      },
    }),
  ],
});
