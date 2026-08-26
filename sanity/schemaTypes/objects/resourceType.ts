import { defineField, defineType } from "sanity";
import { LinkIcon } from "@sanity/icons";

export const resourceType = defineType({
  name: "resource",
  title: "Resource",
  type: "object",
  icon: LinkIcon,
  fields: [
    defineField({
      name: "type",
      title: "Resource Type",
      type: "string",
      options: {
        list: [
          { title: "External Link", value: "link" },
          { title: "GitHub Repository", value: "github" },
          { title: "PDF Document", value: "pdf" },
          { title: "Tool / Software", value: "tool" },
        ],
        layout: "radio",
      },
      initialValue: "link",
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
      type: "string",
    }),
    defineField({
      name: "url",
      title: "URL",
      type: "url",
      validation: (rule) =>
        rule.required().uri({
          scheme: ["http", "https"],
        }),
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "url",
    },
  },
});
