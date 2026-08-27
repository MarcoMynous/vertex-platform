"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowRightIcon,
  DockerIcon,
  NextJsIcon,
  OutcomeIcon,
  SearchIcon,
  StarOutlineIcon,
  TypeScriptIcon,
} from "@/components/ui/icons";
import { Navigation } from "@/components/ui/navigation";
import { CourseCard } from "@/components/ui/course-card";
import { Button } from "@/components/ui/button";
import type { CourseSummary } from "@/sanity/lib/types";

export interface HomePageClientProps {
  courses: CourseSummary[];
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
function getCourseIcon(slug?: string, title?: string): React.ReactNode {
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

  const initial = title ? title.charAt(0).toUpperCase() : "V";
  return (
    <div className="w-12 h-12 rounded-[12px] bg-neutral-900 text-white flex items-center justify-center font-bold text-xl font-mono shadow-xs">
      {initial}
    </div>
  );
}

export function HomePageClient({ courses }: HomePageClientProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // In future search task this routes to search page
      console.log("Searching for:", searchQuery);
    }
  };

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
          { label: "Courses", href: "#courses", active: true },
          { label: "My Learning", href: "/my-learning", active: false },
        ]}
      />

      {/* Main Content */}
      <main className="relative z-10 flex-1 flex flex-col justify-between">
        
        {/* ========================================================================= */}
        {/* HERO SECTION                                                              */}
        {/* ========================================================================= */}
        <section className="pt-20 sm:pt-24 pb-16 px-6 sm:px-8 max-w-4xl mx-auto text-center">
          {/* Pill Badge */}
          <div className="inline-flex items-center mb-6">
            <span className="bg-[#FFEEE5] border border-[#FED7AA] text-primary-500 px-3.5 py-1 rounded-full text-[11px] font-bold font-sans tracking-widest uppercase shadow-2xs">
              INTELLIGENT LEARNING
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-[44px] sm:text-[60px] lg:text-[68px] font-serif font-bold text-neutral-900 leading-[1.08] tracking-tight">
            Search your learning
            <br />
            in plain English.
          </h1>

          {/* Subtitle */}
          <p className="text-[16px] sm:text-[18px] text-neutral-600 font-sans mt-5 max-w-xl mx-auto leading-relaxed">
            Vertex understands what you want to learn and finds the exact lessons across all your courses.
          </p>

          {/* Explore Courses CTA Button */}
          <div className="mt-8 flex justify-center">
            <Button
              variant="primary"
              size="lg"
              className="h-[48px] px-7 rounded-[12px] bg-[#F97316] hover:bg-[#EA580C] text-white shadow-sm hover:shadow-md transition-all font-medium text-[15px] gap-2"
              rightIcon={<ArrowRightIcon size={18} />}
              onClick={() => {
                document.getElementById("courses")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Explore Courses
            </Button>
          </div>

          {/* Centered Search Bar */}
          <form
            onSubmit={handleSearchSubmit}
            className="mt-10 max-w-[620px] mx-auto"
          >
            <div className="relative flex items-center bg-white border border-neutral-200 rounded-[16px] p-2.5 pl-4 shadow-sm hover:border-neutral-300 focus-within:border-primary-400 focus-within:ring-3 focus-within:ring-primary-400/20 transition-all duration-150">
              <SearchIcon size={20} className="text-neutral-400 mr-3 shrink-0" />
              
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Ask anything about your learning..."
                className="w-full bg-transparent text-[15px] font-sans text-neutral-900 placeholder:text-neutral-400 focus:outline-none"
              />

              <div className="shrink-0 ml-2">
                <span className="inline-flex items-center px-2.5 py-1 text-[11px] font-medium font-sans text-neutral-500 bg-neutral-100/90 border border-neutral-200 rounded-[8px] select-none">
                  ⌘ K
                </span>
              </div>
            </div>
          </form>
        </section>

        {/* ========================================================================= */}
        {/* ALL COURSES SECTION                                                       */}
        {/* ========================================================================= */}
        <section id="courses" className="max-w-[1240px] w-full mx-auto px-6 sm:px-8 pt-8 pb-16">
          {/* Section Header */}
          <div className="flex items-baseline justify-between mb-8">
            <h2 className="text-[28px] sm:text-[32px] font-serif font-bold text-neutral-900 tracking-tight">
              All Courses
            </h2>

            <Link
              href="/courses"
              className="inline-flex items-center gap-1.5 text-[14px] font-medium font-sans text-primary-500 hover:text-primary-400 transition-colors group"
            >
              <span>View all courses</span>
              <ArrowRightIcon
                size={16}
                className="group-hover:translate-x-0.5 transition-transform"
              />
            </Link>
          </div>

          {/* Dynamic Courses Grid (Featured 3 Courses) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.slice(0, 3).map((course) => {
              const courseSlug = course.slug?.current || "";
              const modulesCountText = `${course.modulesCount || 0} ${
                course.modulesCount === 1 ? "module" : "modules"
              }`;
              const durationText = formatDuration(course.totalDuration);
              const levelText = capitalizeLevel(course.level);

              return (
                <CourseCard
                  key={course._id}
                  href={`/courses/${courseSlug}`}
                  icon={getCourseIcon(courseSlug, course.title)}
                  title={course.title}
                  description={course.summary}
                  level={levelText}
                  duration={durationText}
                  modulesCount={modulesCountText}
                />
              );
            })}
          </div>

          {/* Footer Note / Banner */}
          <div className="mt-20 flex items-center justify-center gap-4 text-[14px] font-sans text-neutral-600">
            <div className="hidden sm:block h-[1px] bg-neutral-200 flex-1 max-w-[200px]" />
            <div className="flex items-center gap-2.5">
              <StarOutlineIcon size={18} className="text-primary-500" />
              <span>New courses and lessons added every week.</span>
            </div>
            <div className="hidden sm:block h-[1px] bg-neutral-200 flex-1 max-w-[200px]" />
          </div>
        </section>

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
