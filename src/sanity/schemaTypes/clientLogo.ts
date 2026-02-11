import { defineField, defineType } from "sanity";

export const clientLogo = defineType({
  name: "clientLogo",
  title: "Client Logo",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string", validation: (Rule) => Rule.required() }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      options: { hotspot: true },
    }),
  ],
});
