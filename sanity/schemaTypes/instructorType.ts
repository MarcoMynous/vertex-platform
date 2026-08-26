import { defineArrayMember, defineField, defineType } from "sanity";
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
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      description: "Areas of expertise (e.g. ['React', 'Next.js', 'Web performance'])",
    }),
    defineField({
      name: "bio",
      title: "Bio",
      type: "blockContent",
      description: "Instructor biography notes / rich text.",
    }),
  ],
  preview: {
    select: {
      title: "name",
      expertise: "expertise",
      media: "photo",
    },
    prepare({ title, expertise, media }) {
      const subtitle = Array.isArray(expertise)
        ? expertise.join(", ")
        : typeof expertise === "string"
        ? expertise
        : "";
      return {
        title: title || "Untitled Instructor",
        subtitle,
        media,
      };
    },
  },
});
