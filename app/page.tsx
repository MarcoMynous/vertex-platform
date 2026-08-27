import { getCourses } from "@/sanity/lib/data";
import { HomePageClient } from "@/components/home/home-page-client";

export const revalidate = 60; // Revalidate cache every 60 seconds

export default async function HomePage() {
  const courses = await getCourses();

  return <HomePageClient courses={courses} />;
}
