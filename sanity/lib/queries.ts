import { defineQuery } from "next-sanity";

/**
 * Fetch all courses for the catalog / home page with summary metadata.
 */
export const COURSES_QUERY = defineQuery(`
  *[_type == "course"] | order(_createdAt desc) {
    _id,
    _type,
    title,
    slug,
    summary,
    coverImage,
    level,
    price,
    popular,
    studentCount,
    instructor->{
      _id,
      _type,
      name,
      slug,
      photo,
      expertise
    },
    category->{
      _id,
      _type,
      title,
      slug
    },
    "modulesCount": count(modules),
    "lessonsCount": count(modules[].lessons[]),
    "totalDuration": coalesce(math::sum(modules[].lessons[]->duration), 0)
  }
`);

/**
 * Fetch featured/popular courses.
 */
export const POPULAR_COURSES_QUERY = defineQuery(`
  *[_type == "course" && popular == true] | order(_createdAt desc)[0...6] {
    _id,
    _type,
    title,
    slug,
    summary,
    coverImage,
    level,
    price,
    popular,
    studentCount,
    instructor->{
      _id,
      _type,
      name,
      slug,
      photo,
      expertise
    },
    category->{
      _id,
      _type,
      title,
      slug
    },
    "modulesCount": count(modules),
    "lessonsCount": count(modules[].lessons[]),
    "totalDuration": coalesce(math::sum(modules[].lessons[]->duration), 0)
  }
`);

/**
 * Fetch single course detail by slug, including full module structure and lesson references.
 */
export const COURSE_BY_SLUG_QUERY = defineQuery(`
  *[_type == "course" && slug.current == $slug][0] {
    _id,
    _type,
    title,
    slug,
    summary,
    coverImage,
    level,
    price,
    popular,
    studentCount,
    instructor->{
      _id,
      _type,
      name,
      slug,
      photo,
      expertise,
      bio
    },
    category->{
      _id,
      _type,
      title,
      slug,
      description
    },
    learningOutcomes[]{
      _key,
      icon,
      title,
      description
    },
    modules[]{
      _key,
      title,
      summary,
      lessons[]->{
        _id,
        _type,
        title,
        slug,
        duration,
        freePreview,
        studentCount
      }
    },
    "lessonsCount": count(modules[].lessons[]),
    "totalDuration": coalesce(math::sum(modules[].lessons[]->duration), 0)
  }
`);

/**
 * Fetch single lesson detail by slug, plus its reverse-referenced parent course and siblings.
 */
export const LESSON_BY_SLUG_QUERY = defineQuery(`
  *[_type == "lesson" && slug.current == $slug][0] {
    _id,
    _type,
    title,
    slug,
    videoUrl,
    thumbnail,
    duration,
    freePreview,
    studentCount,
    notes,
    keyPoints,
    proTip,
    resources[]{
      _key,
      type,
      title,
      description,
      url
    },
    "course": *[_type == "course" && references(^._id)][0] {
      _id,
      title,
      slug,
      modules[]{
        _key,
        title,
        lessons[]->{
          _id,
          title,
          slug,
          duration,
          freePreview
        }
      }
    }
  }
`);

/**
 * Fetch all instructors.
 */
export const INSTRUCTORS_QUERY = defineQuery(`
  *[_type == "instructor"] | order(name asc) {
    _id,
    _type,
    name,
    slug,
    photo,
    expertise,
    bio
  }
`);

/**
 * Fetch single instructor by slug, along with their authored courses.
 */
export const INSTRUCTOR_BY_SLUG_QUERY = defineQuery(`
  *[_type == "instructor" && slug.current == $slug][0] {
    _id,
    _type,
    name,
    slug,
    photo,
    expertise,
    bio,
    "courses": *[_type == "course" && instructor._ref == ^._id] | order(_createdAt desc) {
      _id,
      title,
      slug,
      summary,
      coverImage,
      level,
      price,
      "modulesCount": count(modules),
      "lessonsCount": count(modules[].lessons[]),
      "totalDuration": coalesce(math::sum(modules[].lessons[]->duration), 0)
    }
  }
`);

/**
 * Fetch all categories.
 */
export const CATEGORIES_QUERY = defineQuery(`
  *[_type == "category"] | order(title asc) {
    _id,
    _type,
    title,
    slug,
    description,
    "coursesCount": count(*[_type == "course" && category._ref == ^._id])
  }
`);

/**
 * Fetch single category by slug and its courses.
 */
export const CATEGORY_BY_SLUG_QUERY = defineQuery(`
  *[_type == "category" && slug.current == $slug][0] {
    _id,
    _type,
    title,
    slug,
    description,
    "courses": *[_type == "course" && category._ref == ^._id] | order(_createdAt desc) {
      _id,
      title,
      slug,
      summary,
      coverImage,
      level,
      price,
      popular,
      instructor->{
        name,
        slug,
        photo
      },
      "modulesCount": count(modules),
      "lessonsCount": count(modules[].lessons[]),
      "totalDuration": coalesce(math::sum(modules[].lessons[]->duration), 0)
    }
  }
`);
