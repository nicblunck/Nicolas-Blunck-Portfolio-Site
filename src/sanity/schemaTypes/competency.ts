import { defineField, defineType } from "sanity";
import { slugify } from "@/lib/slug";

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
        slugify: (input) => slugify(input),
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
