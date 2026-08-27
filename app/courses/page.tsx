import type { Metadata } from "next";
import { getCategories, getCourses } from "@/sanity/lib/data";
import { AllCoursesView } from "@/components/course/all-courses-view";

export const revalidate = 60; // Revalidate every 60 seconds

export const metadata: Metadata = {
  title: "All Courses | Vertex",
  description:
    "Explore our full catalog of production-grade engineering courses with intelligent, timestamped video search.",
  openGraph: {
    title: "All Courses | Vertex",
    description:
      "Explore our full catalog of production-grade engineering courses with intelligent, timestamped video search.",
    type: "website",
  },
};

/**
 * All Courses Catalog Page (Server Component).
 */
export default async function AllCoursesPage() {
  const [courses, categories] = await Promise.all([
    getCourses(),
    getCategories(),
  ]);

  return <AllCoursesView courses={courses} categories={categories} />;
}
