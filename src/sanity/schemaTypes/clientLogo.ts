import { defineField, defineType } from "sanity";

export const clientLogoType = defineType({
  name: "clientLogo",
  title: "Client Logo",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      options: {
        accept: "image/png,image/svg+xml",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "order",
      title: "Order",
      type: "number",
      description: "Lower numbers appear first.",
    }),
  ],
  preview: {
    select: {
      title: "name",
      media: "logo",
    },
  },
});
