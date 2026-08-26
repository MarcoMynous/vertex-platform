import { defineArrayMember, defineField, defineType } from "sanity";
import { PlayIcon } from "@sanity/icons";

export const lessonType = defineType({
  name: "lesson",
  title: "Lesson",
  type: "document",
  icon: PlayIcon,
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
      name: "videoUrl",
      title: "Video URL",
      type: "url",
      description: "Direct embed video URL (YouTube, Vimeo, or Bunny).",
      validation: (rule) =>
        rule.required().uri({
          scheme: ["http", "https"],
        }),
    }),
    defineField({
      name: "thumbnail",
      title: "Thumbnail / Poster Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "duration",
      title: "Duration (seconds)",
      type: "number",
      description: "Duration of the lesson video in seconds (e.g., 600 for 10m 00s).",
      validation: (rule) => rule.required().min(0),
    }),
    defineField({
      name: "freePreview",
      title: "Free Preview",
      type: "boolean",
      description: "Whether this lesson is accessible without enrollment as a preview.",
      initialValue: false,
    }),
    defineField({
      name: "studentCount",
      title: "Student Count",
      type: "number",
      description: "Learner / view count for display.",
      initialValue: 0,
      validation: (rule) => rule.min(0),
    }),
    defineField({
      name: "notes",
      title: "Notes (Portable Text)",
      type: "blockContent",
      description: "Rich text lesson notes and documentation.",
    }),
    defineField({
      name: "keyPoints",
      title: "Key Points (In this lesson you will...)",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      description: "Key takeaways and concepts taught in this lesson.",
    }),
    defineField({
      name: "proTip",
      title: "Pro Tip",
      type: "text",
      rows: 3,
      description: "Optional pro tip or best practice highlight for this lesson.",
    }),
    defineField({
      name: "resources",
      title: "Resources",
      type: "array",
      of: [defineArrayMember({ type: "resource" })],
      description: "Reference links, repositories, and materials for this lesson.",
    }),
  ],
  preview: {
    select: {
      title: "title",
      duration: "duration",
      freePreview: "freePreview",
      media: "thumbnail",
    },
    prepare({ title, duration, freePreview, media }) {
      const minutes = typeof duration === "number" ? Math.floor(duration / 60) : 0;
      const seconds = typeof duration === "number" ? duration % 60 : 0;
      const formattedDuration = `${minutes}m ${seconds.toString().padStart(2, "0")}s`;
      const badge = freePreview ? " [Free Preview]" : "";
      return {
        title: title || "Untitled Lesson",
        subtitle: `${formattedDuration}${badge}`,
        media,
      };
    },
  },
});
