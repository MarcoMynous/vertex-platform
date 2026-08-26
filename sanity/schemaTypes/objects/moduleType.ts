import { defineArrayMember, defineField, defineType } from "sanity";
import { ProjectsIcon } from "@sanity/icons";

export const moduleType = defineType({
  name: "module",
  title: "Module",
  type: "object",
  icon: ProjectsIcon,
  fields: [
    defineField({
      name: "title",
      title: "Module Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "summary",
      title: "Summary",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "lessons",
      title: "Lessons",
      type: "array",
      description: "Ordered list of lessons belonging to this module.",
      of: [
        defineArrayMember({
          type: "reference",
          to: [{ type: "lesson" }],
        }),
      ],
      validation: (rule) => rule.required().min(1),
    }),
  ],
  preview: {
    select: {
      title: "title",
      lessons: "lessons",
    },
    prepare({ title, lessons }) {
      const count = Array.isArray(lessons) ? lessons.length : 0;
      return {
        title: title || "Untitled Module",
        subtitle: `${count} ${count === 1 ? "lesson" : "lessons"}`,
      };
    },
  },
});
