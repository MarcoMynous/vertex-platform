"use client";

import React, { useMemo, useState } from "react";
import {
  DockerIcon,
  NextJsIcon,
  OutcomeIcon,
  SearchIcon,
  StarOutlineIcon,
  TypeScriptIcon,
} from "@/components/ui/icons";
import { Navigation } from "@/components/ui/navigation";
import { CourseCard } from "@/components/ui/course-card";
import type { Category, CourseSummary } from "@/sanity/lib/types";

export interface AllCoursesViewProps {
  courses: CourseSummary[];
  categories: Category[];
}

function formatDuration(seconds?: number): string {
  if (!seconds || seconds <= 0) return "0m";
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  if (hours > 0) {
    return minutes > 0 ? `${hours}h ${minutes}m` : `${hours}h`;
  }
  return `${minutes}m`;
}

function capitalizeLevel(level?: string): string {
  if (!level) return "Beginner";
  return level.charAt(0).toUpperCase() + level.slice(1).toLowerCase();
}

/**
 * Returns a high-fidelity visual icon or badge for each course topic.
 */
function getCourseIcon(slug?: string): React.ReactNode {
  const s = (slug || "").toLowerCase();

  if (s.includes("nextjs") || s.includes("next-js") || s.includes("next")) {
    return <NextJsIcon size={48} />;
  }
  if (s.includes("docker") || s.includes("kubernetes") || s.includes("devops")) {
    return <DockerIcon size={48} />;
  }
  if (s.includes("typescript")) {
    return <TypeScriptIcon size={48} />;
  }
  if (s.includes("react")) {
    return (
      <div className="w-12 h-12 rounded-[12px] bg-[#0A192F] text-[#00D8FF] flex items-center justify-center shadow-xs">
        <OutcomeIcon name="layers" size={26} stroke="#00D8FF" />
      </div>
    );
  }
  if (s.includes("llm") || s.includes("ai-apps") || s.includes("building-ai")) {
    return (
      <div className="w-12 h-12 rounded-[12px] bg-gradient-to-br from-orange-500 to-amber-600 text-white flex items-center justify-center shadow-xs">
        <OutcomeIcon name="rocket" size={26} stroke="#FFFFFF" />
      </div>
    );
  }
  if (s.includes("retrieval") || s.includes("rag")) {
    return (
      <div className="w-12 h-12 rounded-[12px] bg-[#1E1B4B] text-[#818CF8] flex items-center justify-center shadow-xs">
        <OutcomeIcon name="workflow" size={26} stroke="#818CF8" />
      </div>
    );
  }
  if (s.includes("python")) {
    return (
      <div className="w-12 h-12 rounded-[12px] bg-[#1E293B] text-[#38BDF8] flex items-center justify-center shadow-xs">
        <OutcomeIcon name="code" size={26} stroke="#38BDF8" />
      </div>
    );
  }
  if (s.includes("postgres") || s.includes("sql") || s.includes("database")) {
    return (
      <div className="w-12 h-12 rounded-[12px] bg-[#0F172A] text-[#38BDF8] flex items-center justify-center shadow-xs">
        <OutcomeIcon name="database" size={26} stroke="#38BDF8" />
      </div>
    );
  }
  if (s.includes("security")) {
    return (
      <div className="w-12 h-12 rounded-[12px] bg-[#450A0A] text-[#F87171] flex items-center justify-center shadow-xs">
        <OutcomeIcon name="shield" size={26} stroke="#F87171" />
      </div>
    );
  }
  if (s.includes("system-design") || s.includes("architecture")) {
    return (
      <div className="w-12 h-12 rounded-[12px] bg-[#0F172A] text-[#F97316] flex items-center justify-center shadow-xs">
        <OutcomeIcon name="cloud" size={26} stroke="#F97316" />
      </div>
    );
  }

  return null;
}

export function AllCoursesView({ courses, categories }: AllCoursesViewProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Build category list with course counts
  const categoryOptions = useMemo(() => {
    const counts: Record<string, number> = {};
    courses.forEach((c) => {
      if (c.category?.slug?.current) {
        counts[c.category.slug.current] = (counts[c.category.slug.current] || 0) + 1;
      }
    });

    return [
      { slug: "all", title: "All Courses", count: courses.length },
      ...categories.map((cat) => ({
        slug: cat.slug.current,
        title: cat.title,
        count: counts[cat.slug.current] || 0,
      })),
    ];
  }, [courses, categories]);

  // Filter courses based on selected category and search query
  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      // Category match
      if (
        selectedCategory !== "all" &&
        course.category?.slug?.current !== selectedCategory
      ) {
        return false;
      }

      // Query match
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const titleMatch = course.title.toLowerCase().includes(q);
        const summaryMatch = (course.summary || "").toLowerCase().includes(q);
        const instructorMatch = (course.instructor?.name || "")
          .toLowerCase()
          .includes(q);
        const categoryMatch = (course.category?.title || "")
          .toLowerCase()
          .includes(q);

        return titleMatch || summaryMatch || instructorMatch || categoryMatch;
      }

      return true;
    });
  }, [courses, selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-[#FAFAFC] text-neutral-900 relative overflow-hidden flex flex-col selection:bg-primary-100 selection:text-primary-500">
      {/* Subtle diagonal background texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, #0F172A 0, #0F172A 1px, transparent 0, transparent 24px)",
        }}
      />

      {/* Top Navigation */}
      <Navigation
        items={[
          { label: "Courses", href: "/courses", active: true },
          { label: "My Learning", href: "/my-learning", active: false },
        ]}
      />

      {/* Main Content */}
      <main className="relative z-10 flex-1 flex flex-col justify-between">
        <div className="max-w-[1240px] w-full mx-auto px-6 sm:px-8 pt-10 sm:pt-14 pb-20">
          
          {/* Header Section */}
          <div className="mb-10 text-center sm:text-left">
            {/* Pill Badge */}
            <div className="inline-flex items-center mb-4">
              <span className="bg-[#FFEEE5] border border-[#FED7AA] text-primary-500 px-3.5 py-1 rounded-full text-[11px] font-bold font-sans tracking-widest uppercase shadow-2xs">
                COURSE CATALOG
              </span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
              <div>
                <h1 className="text-[36px] sm:text-[44px] lg:text-[48px] font-serif font-bold text-neutral-900 tracking-tight leading-[1.12]">
                  All Courses
                </h1>
                <p className="text-[15px] sm:text-[17px] text-neutral-600 font-sans mt-3 max-w-2xl leading-relaxed">
                  Explore our complete library of production-grade engineering courses with intelligent, timestamped video search.
                </p>
              </div>

              {/* Quick Search Bar */}
              <div className="w-full sm:w-[320px] shrink-0">
                <div className="relative flex items-center bg-white border border-neutral-200 rounded-[12px] px-3.5 py-2.5 shadow-2xs hover:border-neutral-300 focus-within:border-primary-400 focus-within:ring-2 focus-within:ring-primary-400/20 transition-all">
                  <SearchIcon size={18} className="text-neutral-400 mr-2.5 shrink-0" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search courses..."
                    className="w-full bg-transparent text-[14px] font-sans text-neutral-900 placeholder:text-neutral-400 focus:outline-none"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="text-neutral-400 hover:text-neutral-600 text-xs px-1 font-mono cursor-pointer"
                      aria-label="Clear search"
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 sm:gap-2.5 overflow-x-auto pb-2 mt-8 no-scrollbar">
              {categoryOptions.map((cat) => {
                const isActive = selectedCategory === cat.slug;
                return (
                  <button
                    key={cat.slug}
                    onClick={() => setSelectedCategory(cat.slug)}
                    className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-[10px] text-[13px] font-medium font-sans whitespace-nowrap transition-all cursor-pointer ${
                      isActive
                        ? "bg-neutral-900 text-white shadow-xs"
                        : "bg-white border border-neutral-200 text-neutral-700 hover:bg-neutral-50 hover:border-neutral-300"
                    }`}
                  >
                    <span>{cat.title}</span>
                    <span
                      className={`text-[11px] px-1.5 py-0.5 rounded-full font-mono ${
                        isActive
                          ? "bg-neutral-700 text-white"
                          : "bg-neutral-100 text-neutral-500"
                      }`}
                    >
                      {cat.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Results Metadata Row */}
          <div className="flex items-center justify-between mb-6 text-[13px] font-sans text-neutral-500 border-b border-neutral-200/60 pb-3">
            <span>
              Showing <strong className="text-neutral-900">{filteredCourses.length}</strong> {filteredCourses.length === 1 ? "course" : "courses"}
            </span>

            {(selectedCategory !== "all" || searchQuery) && (
              <button
                onClick={() => {
                  setSelectedCategory("all");
                  setSearchQuery("");
                }}
                className="text-primary-500 hover:text-primary-600 font-medium transition-colors cursor-pointer"
              >
                Reset filters
              </button>
            )}
          </div>

          {/* Courses Grid */}
          {filteredCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course) => (
                <CourseCard
                  key={course._id}
                  href={`/courses/${course.slug.current}`}
                  icon={getCourseIcon(course.slug.current)}
                  title={course.title}
                  description={course.summary}
                  level={capitalizeLevel(course.level)}
                  duration={formatDuration(course.totalDuration)}
                  modulesCount={`${course.modulesCount || 4} modules`}
                />
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="bg-white border border-neutral-200 rounded-[16px] p-12 text-center max-w-md mx-auto my-12 shadow-2xs">
              <div className="w-12 h-12 rounded-full bg-neutral-100 text-neutral-400 flex items-center justify-center mx-auto mb-4">
                <SearchIcon size={22} />
              </div>
              <h3 className="text-[18px] font-serif font-bold text-neutral-900">
                No courses found
              </h3>
              <p className="text-[14px] text-neutral-500 font-sans mt-2">
                We couldn&apos;t find any courses matching your criteria. Try adjusting your search query or category filter.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory("all");
                  setSearchQuery("");
                }}
                className="mt-6 inline-flex items-center justify-center px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-[10px] text-[14px] font-medium font-sans transition-colors cursor-pointer"
              >
                View all courses
              </button>
            </div>
          )}

          {/* Footer Note / Banner */}
          <div className="mt-20 flex items-center justify-center gap-4 text-[14px] font-sans text-neutral-600">
            <div className="hidden sm:block h-[1px] bg-neutral-200 flex-1 max-w-[200px]" />
            <div className="flex items-center gap-2.5">
              <StarOutlineIcon size={18} className="text-primary-500" />
              <span>New courses and lessons added every week.</span>
            </div>
            <div className="hidden sm:block h-[1px] bg-neutral-200 flex-1 max-w-[200px]" />
          </div>
        </div>

        {/* ========================================================================= */}
        {/* BOTTOM AMBIENT PILLARS GRAPHIC                                            */}
        {/* ========================================================================= */}
        <div className="relative w-full h-[180px] sm:h-[220px] pointer-events-none mt-auto overflow-hidden">
          {/* Soft warm glow filter */}
          <div className="absolute inset-0 bg-gradient-to-t from-orange-200/50 via-orange-100/20 to-transparent" />
          
          {/* Abstract pillar columns rising from bottom */}
          <div className="absolute inset-x-0 bottom-0 flex items-end justify-center gap-2 sm:gap-4 px-4 opacity-40 blur-[1px]">
            <div className="w-16 sm:w-24 h-24 sm:h-32 bg-gradient-to-t from-[#F97316] via-[#FB923C] to-transparent rounded-t-lg" />
            <div className="w-16 sm:w-24 h-36 sm:h-48 bg-gradient-to-t from-[#F97316] via-[#FB923C] to-transparent rounded-t-lg" />
            <div className="w-16 sm:w-24 h-20 sm:h-28 bg-gradient-to-t from-[#F97316] via-[#FDBA74] to-transparent rounded-t-lg" />
            <div className="w-16 sm:w-24 h-44 sm:h-56 bg-gradient-to-t from-[#F97316] via-[#FB923C] to-transparent rounded-t-lg" />
            <div className="w-16 sm:w-24 h-28 sm:h-36 bg-gradient-to-t from-[#F97316] via-[#FDBA74] to-transparent rounded-t-lg" />
            <div className="w-16 sm:w-24 h-40 sm:h-52 bg-gradient-to-t from-[#F97316] via-[#FB923C] to-transparent rounded-t-lg" />
            <div className="w-16 sm:w-24 h-24 sm:h-32 bg-gradient-to-t from-[#F97316] via-[#FED7AA] to-transparent rounded-t-lg" />
            <div className="w-16 sm:w-24 h-32 sm:h-44 bg-gradient-to-t from-[#F97316] via-[#FB923C] to-transparent rounded-t-lg" />
          </div>
        </div>
      </main>
    </div>
  );
}
