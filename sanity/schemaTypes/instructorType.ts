import { defineField, defineType } from "sanity";
import { UserIcon } from "@sanity/icons";

export const instructorType = defineType({
  name: "instructor",
  title: "Instructor",
  type: "document",
  icon: UserIcon,
  fields: [
    defineField({
      name: "name",
      title: "Full Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "photo",
      title: "Photo",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "expertise",
      title: "Expertise",
      type: "string",
      description: "Primary specialty or title (e.g., 'Full-Stack Architecture & Cloud Systems')",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "bio",
      title: "Bio",
      type: "text",
      rows: 4,
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "expertise",
      media: "photo",
    },
  },
});
