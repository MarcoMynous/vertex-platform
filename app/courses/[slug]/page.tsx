import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getCourseBySlug, getCourses } from "@/sanity/lib/data";
import { CourseDetailView } from "@/components/course/course-detail-view";

interface CoursePageProps {
  params: Promise<{
    slug: string;
  }>;
}

/**
 * Pre-generate static paths for all published courses at build time.
 */
export async function generateStaticParams() {
  const courses = await getCourses();
  return courses
    .filter((c) => Boolean(c?.slug?.current))
    .map((c) => ({
      slug: c.slug.current,
    }));
}

/**
 * Generate SEO metadata for the course detail page.
 */
export async function generateMetadata({
  params,
}: CoursePageProps): Promise<Metadata> {
  const { slug } = await params;
  const course = await getCourseBySlug(slug);

  if (!course) {
    return {
      title: "Course Not Found | Vertex",
      description: "The requested course could not be found.",
    };
  }

  return {
    title: `${course.title} | Vertex`,
    description:
      course.summary || `Learn ${course.title} with interactive video search on Vertex.`,
    openGraph: {
      title: `${course.title} | Vertex`,
      description: course.summary,
      type: "website",
    },
  };
}

/**
 * Course Detail Page (Server Component).
 */
export default async function CoursePage({ params }: CoursePageProps) {
  const { slug } = await params;
  const course = await getCourseBySlug(slug);

  if (!course) {
    notFound();
  }

  return <CourseDetailView course={course} />;
}
