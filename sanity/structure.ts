import type { StructureResolver } from "sanity/structure";
import { BookIcon, PlayIcon, TagIcon, UserIcon } from "@sanity/icons";
import { apiVersion } from "./env";

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Courses")
        .icon(BookIcon)
        .child(
          S.documentList()
            .title("Courses")
            .apiVersion(apiVersion)
            .filter('_type == "course"')
            .defaultOrdering([{ field: "title", direction: "asc" }])
        ),
      S.listItem()
        .title("Lessons")
        .icon(PlayIcon)
        .child(
          S.documentList()
            .title("Lessons")
            .apiVersion(apiVersion)
            .filter('_type == "lesson"')
            .defaultOrdering([{ field: "title", direction: "asc" }])
        ),
      S.divider(),
      S.listItem()
        .title("Instructors")
        .icon(UserIcon)
        .child(
          S.documentList()
            .title("Instructors")
            .apiVersion(apiVersion)
            .filter('_type == "instructor"')
            .defaultOrdering([{ field: "name", direction: "asc" }])
        ),
      S.listItem()
        .title("Categories")
        .icon(TagIcon)
        .child(
          S.documentList()
            .title("Categories")
            .apiVersion(apiVersion)
            .filter('_type == "category"')
            .defaultOrdering([{ field: "title", direction: "asc" }])
        ),
    ]);
