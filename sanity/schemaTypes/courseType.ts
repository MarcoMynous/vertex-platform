import { defineArrayMember, defineField, defineType } from "sanity";
import { BookIcon } from "@sanity/icons";

export const courseType = defineType({
  name: "course",
  title: "Course",
  type: "document",
  icon: BookIcon,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "summary",
      title: "Summary / Marketing Description",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "level",
      title: "Difficulty Level",
      type: "string",
      options: {
        list: [
          { title: "Beginner", value: "beginner" },
          { title: "Intermediate", value: "intermediate" },
          { title: "Advanced", value: "advanced" },
        ],
        layout: "radio",
      },
      initialValue: "beginner",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "price",
      title: "Price ($)",
      type: "number",
      description: "Course price in USD (0 for free).",
      initialValue: 0,
      validation: (rule) => rule.required().min(0),
    }),
    defineField({
      name: "popular",
      title: "Popular / Featured Flag",
      type: "boolean",
      description: "Highlight this course as popular in the catalog.",
      initialValue: false,
    }),
    defineField({
      name: "studentCount",
      title: "Student Count",
      type: "number",
      description: "Enrolled student count for display.",
      initialValue: 0,
      validation: (rule) => rule.min(0),
    }),
    defineField({
      name: "instructor",
      title: "Instructor",
      type: "reference",
      to: [{ type: "instructor" }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "reference",
      to: [{ type: "category" }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "learningOutcomes",
      title: "What You'll Learn (Learning Outcomes)",
      type: "array",
      of: [defineArrayMember({ type: "learningOutcome" })],
      description: "Short list of key learning outcomes shown on the course details page.",
    }),
    defineField({
      name: "modules",
      title: "Course Modules",
      type: "array",
      of: [defineArrayMember({ type: "module" })],
      description: "Ordered list of modules containing lesson references.",
      validation: (rule) => rule.required().min(1),
    }),
  ],
  preview: {
    select: {
      title: "title",
      level: "level",
      instructor: "instructor.name",
      media: "coverImage",
    },
    prepare({ title, level, instructor, media }) {
      const subtitle = [instructor, level].filter(Boolean).join(" • ");
      return {
        title: title || "Untitled Course",
        subtitle,
        media,
      };
    },
  },
});
