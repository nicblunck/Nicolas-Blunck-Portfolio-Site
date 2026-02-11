import { defineField, defineType } from "sanity";

export const caseMedia = defineType({
  name: "caseMedia",
  title: "Case Media",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "mediaType",
      title: "Media Type",
      type: "string",
      options: {
        list: [
          { title: "Image", value: "image" },
          { title: "Video", value: "video" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      hidden: ({ parent }) => parent?.mediaType !== "image",
      validation: (Rule) =>
        Rule.custom((value, context) => {
          if (context.parent?.mediaType === "image" && !value) {
            return "Image is required.";
          }
          return true;
        }),
    }),
    defineField({
      name: "video",
      title: "Video",
      type: "file",
      hidden: ({ parent }) => parent?.mediaType !== "video",
      validation: (Rule) =>
        Rule.custom((value, context) => {
          if (context.parent?.mediaType === "video" && !value) {
            return "Video file is required.";
          }
          return true;
        }),
    }),
    defineField({
      name: "alt",
      title: "Alt Text",
      type: "string",
      hidden: ({ parent }) => parent?.mediaType !== "image",
      validation: (Rule) =>
        Rule.custom((value, context) => {
          if (context.parent?.mediaType === "image" && !value) {
            return "Alt text is required.";
          }
          return true;
        }),
    }),
  ],
  preview: {
    select: { title: "title", media: "image" },
    prepare: ({ title, media }) => ({ title: title ?? "Case Media", media }),
  },
});
