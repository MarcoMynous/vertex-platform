"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRightIcon,
  BarChartIcon,
  BookmarkIcon,
  ClockIcon,
  LayersIcon,
  OutcomeIcon,
  UserIcon,
} from "@/components/ui/icons";
import { Navigation } from "@/components/ui/navigation";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Button } from "@/components/ui/button";
import { CourseModulesAccordion } from "./course-modules-accordion";
import { urlFor } from "@/sanity/lib/image";
import type { Course } from "@/sanity/lib/types";

export interface CourseDetailViewProps {
  course: Course;
}

function formatTotalDuration(seconds: number): string {
  if (!seconds || seconds <= 0) return "0m";
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  if (hours > 0) {
    return minutes > 0 ? `${hours}h ${minutes}m` : `${hours}h`;
  }
  return `${minutes}m`;
}

function formatStudentCount(count?: number): string {
  if (!count || count <= 0) return "0 students";
  if (count >= 1000) {
    const formatted = (count / 1000).toFixed(1).replace(/\.0$/, "");
    return `${formatted}k students`;
  }
  return `${count} students`;
}

function capitalizeLevel(level?: string): string {
  if (!level) return "Beginner";
  return level.charAt(0).toUpperCase() + level.slice(1).toLowerCase();
}

export function CourseDetailView({ course }: CourseDetailViewProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);

  // Compute first lesson link for "Continue Learning" / "Start Course" CTA
  const firstModule = course.modules?.[0];
  const firstLesson = firstModule?.lessons?.[0];
  const firstLessonSlug = firstLesson?.slug?.current;
  const continueHref = firstLessonSlug
    ? `/courses/${course.slug.current}/lessons/${firstLessonSlug}`
    : "#content";

  // Calculate total modules and total duration if not already aggregated
  const totalModulesCount = course.modules?.length || 0;
  const totalDurationSeconds =
    course.totalDuration ||
    course.modules?.reduce(
      (acc, m) =>
        acc +
        (m.lessons?.reduce((lAcc, l) => lAcc + (l?.duration || 0), 0) || 0),
      0
    ) ||
    0;

  // Resolve cover image URL safely
  let coverImageUrl = "";
  try {
    if (course.coverImage) {
      coverImageUrl = urlFor(course.coverImage).width(800).height(800).url();
    }
  } catch {
    // Fallback if image builder fails
  }

  // Placeholder progress calculation (can be wired to Clerk progress state)
  const progressPercent = 35;

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
          { label: "Courses", href: "/", active: true },
          { label: "My Learning", href: "/my-learning", active: false },
        ]}
      />

      {/* Main Content Area */}
      <main className="relative z-10 flex-1 max-w-[1040px] w-full mx-auto px-6 sm:px-8 pt-6 pb-28">
        
        {/* ========================================================================= */}
        {/* BREADCRUMBS                                                               */}
        {/* ========================================================================= */}
        <div className="mb-6">
          <Breadcrumbs
            items={[
              { label: "All Courses", href: "/" },
              { label: course.title, current: true },
            ]}
          />
        </div>

        {/* ========================================================================= */}
        {/* HERO SECTION                                                              */}
        {/* ========================================================================= */}
        <section className="flex flex-col md:flex-row gap-8 lg:gap-12 items-start pt-2 pb-6">
          
          {/* Left Column: Course Cover Image */}
          <div className="w-full sm:w-[300px] md:w-[320px] shrink-0 aspect-square rounded-[24px] overflow-hidden bg-neutral-950 border border-neutral-200/80 shadow-md relative group">
            {coverImageUrl ? (
              <Image
                src={coverImageUrl}
                alt={course.title}
                fill
                priority
                sizes="(max-width: 640px) 100vw, 320px"
                className="object-cover group-hover:scale-102 transition-transform duration-300"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-neutral-900 via-neutral-950 to-black text-white p-6 text-center">
                <span className="font-mono text-6xl font-black text-primary-500 mb-2">
                  {course.title.charAt(0)}
                </span>
                <span className="text-xs text-neutral-400 font-sans uppercase tracking-widest">
                  {course.category?.title || "Vertex"}
                </span>
              </div>
            )}
          </div>

          {/* Right Column: Course Info & Metadata */}
          <div className="flex-1 min-w-0 flex flex-col justify-center">
            
            {/* Popular Pill Badge */}
            {course.popular && (
              <div className="mb-3">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-[6px] text-[11px] font-bold font-sans tracking-wider uppercase bg-[#FFEEE5] text-[#F97316] border border-[#FED7AA]/60 shadow-2xs select-none">
                  POPULAR
                </span>
              </div>
            )}

            {/* Course Title */}
            <h1 className="text-[32px] sm:text-[40px] lg:text-[44px] font-serif font-bold text-neutral-900 leading-[1.15] tracking-tight">
              {course.title}
            </h1>

            {/* Course Summary */}
            <p className="text-[15px] sm:text-[16px] text-neutral-600 font-sans mt-3 sm:mt-4 leading-relaxed max-w-xl">
              {course.summary}
            </p>

            {/* Metadata Row */}
            <div className="flex flex-wrap items-center gap-y-2.5 gap-x-6 text-[13px] sm:text-[14px] text-neutral-600 font-sans font-medium mt-6 pt-2">
              {/* Level */}
              <div className="flex items-center gap-1.5">
                <BarChartIcon size={16} className="text-neutral-400 shrink-0" />
                <span>{capitalizeLevel(course.level)}</span>
              </div>

              {/* Total Duration */}
              <div className="flex items-center gap-1.5">
                <ClockIcon size={16} className="text-neutral-400 shrink-0" />
                <span>{formatTotalDuration(totalDurationSeconds)}</span>
              </div>

              {/* Modules Count */}
              <div className="flex items-center gap-1.5">
                <LayersIcon size={16} className="text-neutral-400 shrink-0" />
                <span>{totalModulesCount} {totalModulesCount === 1 ? "module" : "modules"}</span>
              </div>

              {/* Student Count */}
              <div className="flex items-center gap-1.5">
                <UserIcon size={16} className="text-neutral-400 shrink-0" />
                <span>{formatStudentCount(course.studentCount)}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-3.5">
              <Link href={continueHref}>
                <Button
                  variant="primary"
                  size="lg"
                  className="h-[48px] px-7 rounded-[12px] bg-[#F97316] hover:bg-[#EA580C] text-white shadow-sm hover:shadow-md transition-all font-medium text-[15px] gap-2"
                  rightIcon={<ArrowRightIcon size={18} />}
                >
                  Continue Learning
                </Button>
              </Link>

              <Button
                variant="secondary"
                size="lg"
                onClick={() => setIsBookmarked((prev) => !prev)}
                className={`h-[48px] px-5 rounded-[12px] bg-white border border-neutral-200 hover:border-neutral-300 text-neutral-800 font-medium text-[14px] shadow-2xs transition-all gap-2 ${
                  isBookmarked ? "border-primary-300 text-primary-600 bg-primary-50/40" : ""
                }`}
                leftIcon={
                  <BookmarkIcon
                    size={18}
                    filled={isBookmarked}
                    className={isBookmarked ? "text-primary-500" : "text-neutral-500"}
                  />
                }
              >
                {isBookmarked ? "Bookmarked" : "Bookmark"}
              </Button>
            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* WHAT YOU'LL LEARN SECTION                                                 */}
        {/* ========================================================================= */}
        {course.learningOutcomes && course.learningOutcomes.length > 0 && (
          <section className="bg-white border border-neutral-200 rounded-[20px] p-6 sm:p-8 shadow-2xs mt-8 sm:mt-12">
            <h2 className="text-[22px] sm:text-[24px] font-serif font-bold text-neutral-900 mb-6">
              What you’ll learn
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {course.learningOutcomes.map((outcome, idx) => (
                <div
                  key={outcome._key || `outcome-${idx}`}
                  className="bg-[#FAFAFC] border border-neutral-200/80 rounded-[16px] p-5 flex items-start gap-4 hover:border-neutral-300 transition-colors"
                >
                  {/* Outline Icon */}
                  <div className="shrink-0 mt-0.5 text-primary-500">
                    <OutcomeIcon
                      name={outcome.icon}
                      size={28}
                      stroke="#EA580C"
                    />
                  </div>

                  {/* Outcome Title & Description */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-sans font-semibold text-[15px] text-neutral-900 mb-1">
                      {outcome.title}
                    </h3>
                    <p className="font-sans text-[13px] text-neutral-600 leading-relaxed">
                      {outcome.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ========================================================================= */}
        {/* COURSE CONTENT (MODULES ACCORDION)                                        */}
        {/* ========================================================================= */}
        <section id="content" className="mt-12 sm:mt-16">
          <div className="flex items-baseline justify-between mb-6">
            <h2 className="text-[22px] sm:text-[24px] font-serif font-bold text-neutral-900 tracking-tight">
              Course Content
            </h2>
            <span className="text-[13px] sm:text-[14px] text-neutral-500 font-sans font-medium">
              {totalModulesCount} {totalModulesCount === 1 ? "module" : "modules"} • {formatTotalDuration(totalDurationSeconds)}
            </span>
          </div>

          <CourseModulesAccordion
            modules={course.modules || []}
            courseSlug={course.slug.current}
            defaultExpandedIndex={0}
          />
        </section>

      </main>

      {/* ========================================================================= */}
      {/* BOTTOM STICKY PROGRESS BAR CARD                                           */}
      {/* ========================================================================= */}
      <div className="fixed bottom-0 inset-x-0 z-30 pointer-events-none p-4 sm:p-6 flex justify-center">
        <div className="w-full max-w-[1040px] bg-white/95 backdrop-blur-md border border-neutral-200 rounded-[16px] p-4 sm:px-6 sm:py-4 shadow-lg pointer-events-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Left / Center Progress Info */}
          <div className="flex items-center gap-4 sm:gap-6 w-full sm:w-auto flex-1 min-w-0">
            <div className="shrink-0">
              <span className="block text-[11px] font-bold font-sans uppercase tracking-wider text-neutral-400">
                Your Progress
              </span>
              <span className="text-[14px] font-bold font-sans text-neutral-900">
                {progressPercent}% complete
              </span>
            </div>

            {/* Progress bar track */}
            <div className="flex-1 max-w-[380px] h-[8px] bg-neutral-100 border border-neutral-200/60 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#F97316] rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Right Action CTA */}
          <div className="shrink-0 w-full sm:w-auto">
            <Link href={continueHref} className="block w-full sm:w-auto">
              <Button
                variant="primary"
                size="default"
                className="w-full sm:w-auto h-[42px] px-6 rounded-[10px] bg-[#F97316] hover:bg-[#EA580C] text-white font-medium text-[14px] shadow-sm gap-2"
                rightIcon={<ArrowRightIcon size={16} />}
              >
                Continue Learning
              </Button>
            </Link>
          </div>

        </div>
      </div>

      {/* ========================================================================= */}
      {/* BOTTOM AMBIENT PILLARS GRAPHIC                                            */}
      {/* ========================================================================= */}
      <div className="relative w-full h-[180px] sm:h-[220px] pointer-events-none mt-auto overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-orange-200/50 via-orange-100/20 to-transparent" />
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

    </div>
  );
}
