import { defineField, defineType } from "sanity";

export const competency = defineType({
  name: "competency",
  title: "Competency",
  type: "document",
  fields: [
    defineField({
      name: "key",
      title: "Key",
      type: "slug",
      validation: (Rule) => Rule.required(),
      options: {
        source: "label",
        maxLength: 64,
        slugify: (input) =>
          input
            .toString()
            .toLowerCase()
            .trim()
            .replace(/&/g, " and ")
            .replace(/[^a-z0-9\s-]/g, "")
            .replace(/\s+/g, "-")
            .replace(/-+/g, "-"),
      },
      description: "Auto-generated from the label.",
    }),
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "emoji",
      title: "Emoji",
      type: "string",
    }),
    defineField({
      name: "bg",
      title: "Background Color",
      type: "color",
      options: { disableAlpha: true },
    }),
  ],
  preview: {
    select: { title: "label", subtitle: "key.current" },
  },
});
