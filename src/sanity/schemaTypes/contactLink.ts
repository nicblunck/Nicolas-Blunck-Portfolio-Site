import { defineField, defineType } from "sanity";

export const contactLink = defineType({
  name: "contactLink",
  title: "Contact Link",
  type: "document",
  fields: [
    defineField({ name: "label", title: "Label", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "url", title: "URL", type: "url", validation: (Rule) => Rule.required() }),
    defineField({ name: "emoji", title: "Emoji", type: "string" }),
  ],
});
