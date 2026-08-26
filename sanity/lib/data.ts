import { serverClient } from "./server-client";
import {
  COURSES_QUERY,
  POPULAR_COURSES_QUERY,
  COURSE_BY_SLUG_QUERY,
  LESSON_BY_SLUG_QUERY,
  INSTRUCTORS_QUERY,
  INSTRUCTOR_BY_SLUG_QUERY,
  CATEGORIES_QUERY,
  CATEGORY_BY_SLUG_QUERY,
} from "./queries";
import type {
  Course,
  CourseSummary,
  Instructor,
  Category,
  Lesson,
  LessonWithContext,
} from "./types";

/**
 * Get all courses for the catalog.
 */
export async function getCourses(): Promise<CourseSummary[]> {
  try {
    return await serverClient.fetch<CourseSummary[]>(COURSES_QUERY);
  } catch (error) {
    console.error("Error fetching courses:", error);
    return [];
  }
}

/**
 * Get popular / featured courses.
 */
export async function getPopularCourses(): Promise<CourseSummary[]> {
  try {
    return await serverClient.fetch<CourseSummary[]>(POPULAR_COURSES_QUERY);
  } catch (error) {
    console.error("Error fetching popular courses:", error);
    return [];
  }
}

/**
 * Get a course by its slug.
 */
export async function getCourseBySlug(slug: string): Promise<Course | null> {
  try {
    return await serverClient.fetch<Course | null>(COURSE_BY_SLUG_QUERY, {
      slug,
    });
  } catch (error) {
    console.error(`Error fetching course for slug "${slug}":`, error);
    return null;
  }
}

interface RawLessonQueryResult extends Lesson {
  course?: {
    _id: string;
    title: string;
    slug: { _type: "slug"; current: string };
    modules?: {
      _key?: string;
      title: string;
      lessons?: {
        _id: string;
        title: string;
        slug: { _type: "slug"; current: string };
        duration: number;
        freePreview?: boolean;
      }[];
    }[];
  } | null;
}

/**
 * Get a lesson by its slug, complete with parent course and navigation context.
 */
export async function getLessonBySlug(
  slug: string
): Promise<LessonWithContext | null> {
  try {
    const rawLesson = await serverClient.fetch<RawLessonQueryResult | null>(
      LESSON_BY_SLUG_QUERY,
      { slug }
    );

    if (!rawLesson) {
      return null;
    }

    // Compute module indices and prev/next lesson links if parent course exists
    let moduleIndex = 0;
    let moduleTitle = "";
    let lessonIndex = 0;
    let prevLesson: { title: string; slug: { _type: "slug"; current: string } } | null = null;
    let nextLesson: { title: string; slug: { _type: "slug"; current: string } } | null = null;

    if (rawLesson.course && Array.isArray(rawLesson.course.modules)) {
      const flattenedLessons: {
        _id: string;
        title: string;
        slug: { _type: "slug"; current: string };
        moduleIdx: number;
        moduleName: string;
      }[] = [];

      rawLesson.course.modules.forEach((mod, mIdx) => {
        if (Array.isArray(mod.lessons)) {
          mod.lessons.forEach((l) => {
            if (l && l.slug) {
              flattenedLessons.push({
                _id: l._id,
                title: l.title,
                slug: l.slug,
                moduleIdx: mIdx,
                moduleName: mod.title,
              });
            }
          });
        }
      });

      const currentIdx = flattenedLessons.findIndex(
        (l) => l.slug.current === slug || l._id === rawLesson._id
      );

      if (currentIdx !== -1) {
        lessonIndex = currentIdx;
        moduleIndex = flattenedLessons[currentIdx].moduleIdx;
        moduleTitle = flattenedLessons[currentIdx].moduleName;

        if (currentIdx > 0) {
          prevLesson = {
            title: flattenedLessons[currentIdx - 1].title,
            slug: flattenedLessons[currentIdx - 1].slug,
          };
        }

        if (currentIdx < flattenedLessons.length - 1) {
          nextLesson = {
            title: flattenedLessons[currentIdx + 1].title,
            slug: flattenedLessons[currentIdx + 1].slug,
          };
        }
      }
    }

    return {
      ...rawLesson,
      moduleIndex,
      moduleTitle,
      lessonIndex,
      prevLesson,
      nextLesson,
    };
  } catch (error) {
    console.error(`Error fetching lesson for slug "${slug}":`, error);
    return null;
  }
}

/**
 * Get all instructors.
 */
export async function getInstructors(): Promise<Instructor[]> {
  try {
    return await serverClient.fetch<Instructor[]>(INSTRUCTORS_QUERY);
  } catch (error) {
    console.error("Error fetching instructors:", error);
    return [];
  }
}

/**
 * Get instructor by slug.
 */
export async function getInstructorBySlug(
  slug: string
): Promise<(Instructor & { courses?: CourseSummary[] }) | null> {
  try {
    return await serverClient.fetch<
      (Instructor & { courses?: CourseSummary[] }) | null
    >(INSTRUCTOR_BY_SLUG_QUERY, { slug });
  } catch (error) {
    console.error(`Error fetching instructor for slug "${slug}":`, error);
    return null;
  }
}

/**
 * Get all categories.
 */
export async function getCategories(): Promise<Category[]> {
  try {
    return await serverClient.fetch<Category[]>(CATEGORIES_QUERY);
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

/**
 * Get category by slug with associated courses.
 */
export async function getCategoryBySlug(
  slug: string
): Promise<(Category & { courses?: CourseSummary[] }) | null> {
  try {
    return await serverClient.fetch<
      (Category & { courses?: CourseSummary[] }) | null
    >(CATEGORY_BY_SLUG_QUERY, { slug });
  } catch (error) {
    console.error(`Error fetching category for slug "${slug}":`, error);
    return null;
  }
}
