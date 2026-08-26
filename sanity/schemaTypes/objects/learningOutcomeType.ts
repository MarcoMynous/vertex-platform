import { defineField, defineType } from "sanity";
import { CheckmarkCircleIcon } from "@sanity/icons";

export const learningOutcomeType = defineType({
  name: "learningOutcome",
  title: "Learning Outcome",
  type: "object",
  icon: CheckmarkCircleIcon,
  fields: [
    defineField({
      name: "icon",
      title: "Icon Identifier",
      type: "string",
      description: "Identifier for the outcome icon (e.g. 'code', 'database', 'shield', 'server', 'sparkles')",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "description",
    },
  },
});
