"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ChevronDownIcon,
  PlayCircleIcon,
} from "@/components/ui/icons";
import type { Module, LessonSummary } from "@/sanity/lib/types";

export interface CourseModulesAccordionProps {
  modules: Module<LessonSummary>[];
  courseSlug: string;
  className?: string;
  defaultExpandedIndex?: number;
}

function formatDuration(seconds: number): string {
  if (!seconds || seconds <= 0) return "0m";
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  if (hours > 0) {
    return minutes > 0 ? `${hours}h ${minutes}m` : `${hours}h`;
  }
  if (minutes > 0) {
    return `${minutes}m`;
  }
  return `${remainingSeconds}s`;
}

function formatLessonDuration(seconds: number): string {
  if (!seconds || seconds <= 0) return "0:00";
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}m ${remainingSeconds.toString().padStart(2, "0")}s`;
}

export function CourseModulesAccordion({
  modules,
  courseSlug,
  className = "",
  defaultExpandedIndex = 0,
}: CourseModulesAccordionProps) {
  // State for which modules are expanded
  const [expandedIndices, setExpandedIndices] = useState<Set<number>>(
    new Set([defaultExpandedIndex])
  );

  // For long courses with > 6 modules, initially show up to 6 unless expanded
  const [showAllModules, setShowAllModules] = useState(false);
  const initialVisibleCount = 6;
  const hasMoreModules = modules.length > initialVisibleCount;
  const visibleModules =
    hasMoreModules && !showAllModules
      ? modules.slice(0, initialVisibleCount)
      : modules;

  const toggleModule = (index: number) => {
    setExpandedIndices((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  return (
    <div className={`space-y-3 ${className}`}>
      {visibleModules.map((mod, index) => {
        const isExpanded = expandedIndices.has(index);
        const moduleNumber = index + 1;
        const lessons = mod.lessons || [];
        const moduleDuration = lessons.reduce(
          (sum, l) => sum + (l?.duration || 0),
          0
        );

        return (
          <div
            key={mod._key || `module-${index}`}
            className="bg-white border border-neutral-200 rounded-[16px] overflow-hidden shadow-2xs transition-all duration-150"
          >
            {/* Module Accordion Header */}
            <button
              type="button"
              onClick={() => toggleModule(index)}
              className="w-full flex items-center justify-between p-4 sm:p-5 text-left hover:bg-neutral-50/70 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/20"
              aria-expanded={isExpanded}
            >
              <div className="flex items-center gap-3.5 sm:gap-4 flex-1 min-w-0 pr-4">
                {/* Number Circle Badge */}
                <div className="w-8 h-8 rounded-full bg-neutral-100 border border-neutral-200 flex items-center justify-center text-[13px] font-bold font-sans text-neutral-700 shrink-0">
                  {moduleNumber}
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="font-sans font-semibold text-[15px] text-neutral-900 truncate">
                    {mod.title}
                  </h3>
                  {mod.summary && (
                    <p className="font-sans text-[13px] text-neutral-500 line-clamp-1 mt-0.5">
                      {mod.summary}
                    </p>
                  )}
                </div>
              </div>

              {/* Module Metadata & Chevron */}
              <div className="flex items-center gap-3 shrink-0">
                <span className="text-[13px] font-sans font-medium text-neutral-500">
                  {formatDuration(moduleDuration)}
                </span>
                <ChevronDownIcon
                  size={18}
                  className={`text-neutral-400 transition-transform duration-200 ${
                    isExpanded ? "rotate-180 text-neutral-700" : ""
                  }`}
                />
              </div>
            </button>

            {/* Expandable Lessons List */}
            {isExpanded && (
              <div className="border-t border-neutral-100 bg-[#FAFAFC]/60 divide-y divide-neutral-100">
                {lessons.length === 0 ? (
                  <div className="p-4 text-[13px] text-neutral-400 font-sans text-center">
                    No lessons in this module yet.
                  </div>
                ) : (
                  lessons.map((lesson, lIdx) => {
                    const lessonSlug = lesson?.slug?.current || "";
                    const lessonNumber = `${moduleNumber}.${lIdx + 1}`;

                    return (
                      <Link
                        key={lesson?._id || `lesson-${lIdx}`}
                        href={`/courses/${courseSlug}/lessons/${lessonSlug}`}
                        className="flex items-center justify-between px-5 py-3 sm:py-3.5 hover:bg-white transition-colors group text-decoration-none"
                      >
                        <div className="flex items-center gap-3 min-w-0 pr-4">
                          <PlayCircleIcon
                            size={18}
                            className="text-neutral-400 group-hover:text-primary-500 transition-colors shrink-0"
                          />
                          <div className="flex items-center flex-wrap gap-2 min-w-0">
                            <span className="text-[13px] sm:text-[14px] font-sans font-medium text-neutral-800 group-hover:text-neutral-900 transition-colors truncate">
                              <span className="text-neutral-400 mr-1.5 font-normal">
                                {lessonNumber}
                              </span>
                              {lesson?.title}
                            </span>
                            {lesson?.freePreview && (
                              <span className="inline-flex items-center px-2 py-0.5 rounded-[5px] text-[10px] font-bold font-sans tracking-wide uppercase bg-[#EFF6FF] text-[#2563EB] border border-blue-200/50 select-none">
                                Free Preview
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="shrink-0 text-right">
                          <span className="text-[12px] font-sans text-neutral-500 tabular-nums">
                            {formatLessonDuration(lesson?.duration || 0)}
                          </span>
                        </div>
                      </Link>
                    );
                  })
                )}
              </div>
            )}
          </div>
        );
      })}

      {/* Show all modules toggle for courses with > 6 modules */}
      {hasMoreModules && (
        <div className="pt-2 flex justify-center">
          <button
            type="button"
            onClick={() => setShowAllModules((prev) => !prev)}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-neutral-200 hover:border-neutral-300 rounded-[12px] text-[13px] font-sans font-medium text-neutral-700 shadow-2xs hover:shadow-xs transition-all"
          >
            <span>
              {showAllModules
                ? "Show fewer modules"
                : `Show all ${modules.length} modules`}
            </span>
            <ChevronDownIcon
              size={16}
              className={`transition-transform duration-200 ${
                showAllModules ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>
      )}
    </div>
  );
}
