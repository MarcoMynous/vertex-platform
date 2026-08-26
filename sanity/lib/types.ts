import type { PortableTextBlock } from "@portabletext/react";
import type { SanityImageSource } from "@sanity/image-url";

export interface SanitySlug {
  _type: "slug";
  current: string;
}

export interface SanityImageReference {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
  hotspot?: {
    x: number;
    y: number;
    height: number;
    width: number;
  };
  crop?: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
}

export interface Category {
  _id: string;
  _type: "category";
  title: string;
  slug: SanitySlug;
  description?: string;
}

export interface Instructor {
  _id: string;
  _type: "instructor";
  name: string;
  slug: SanitySlug;
  photo: SanityImageSource;
  expertise: string[] | string;
  bio: PortableTextBlock[] | string;
}

export interface LearningOutcome {
  _key?: string;
  icon: string;
  title: string;
  description: string;
}

export interface LessonResource {
  _key?: string;
  type: "link" | "github" | "pdf" | "tool";
  title: string;
  description?: string;
  url: string;
}

export interface LessonSummary {
  _id: string;
  _type: "lesson";
  title: string;
  slug: SanitySlug;
  duration: number; // in seconds
  freePreview?: boolean;
  studentCount?: number;
}

export interface Lesson extends LessonSummary {
  videoUrl: string;
  thumbnail?: SanityImageSource;
  notes?: PortableTextBlock[];
  keyPoints?: string[];
  proTip?: string;
  resources?: LessonResource[];
}

export interface Module<TLesson = LessonSummary> {
  _key?: string;
  title: string;
  summary?: string;
  lessons: TLesson[];
}

export interface CourseSummary {
  _id: string;
  _type: "course";
  title: string;
  slug: SanitySlug;
  summary: string;
  coverImage: SanityImageSource;
  level: "beginner" | "intermediate" | "advanced" | "Beginner" | "Intermediate" | "Advanced";
  price: number;
  popular?: boolean;
  studentCount?: number;
  instructor?: Instructor;
  category?: Category;
  modulesCount: number;
  lessonsCount: number;
  totalDuration: number; // in seconds
}

export interface Course {
  _id: string;
  _type: "course";
  title: string;
  slug: SanitySlug;
  summary: string;
  coverImage: SanityImageSource;
  level: "beginner" | "intermediate" | "advanced" | "Beginner" | "Intermediate" | "Advanced";
  price: number;
  popular?: boolean;
  studentCount?: number;
  instructor: Instructor;
  category: Category;
  learningOutcomes?: LearningOutcome[];
  modules: Module<LessonSummary>[];
  totalDuration?: number;
  lessonsCount?: number;
}

export interface LessonWithContext extends Lesson {
  course?: {
    _id: string;
    title: string;
    slug: SanitySlug;
    modules?: {
      _key?: string;
      title: string;
      lessons?: {
        _id: string;
        title: string;
        slug: SanitySlug;
        duration: number;
        freePreview?: boolean;
      }[];
    }[];
  } | null;
  moduleIndex?: number;
  moduleTitle?: string;
  lessonIndex?: number;
  prevLesson?: {
    title: string;
    slug: SanitySlug;
  } | null;
  nextLesson?: {
    title: string;
    slug: SanitySlug;
  } | null;
}
