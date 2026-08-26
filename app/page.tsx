"use client";

import React, { useState } from "react";
import {
  ArrowRightIcon,
  DockerIcon,
  NextJsIcon,
  SearchIcon,
  StarOutlineIcon,
  TypeScriptIcon,
} from "@/components/ui/icons";
import { Navigation } from "@/components/ui/navigation";
import { CourseCard } from "@/components/ui/course-card";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // In future step this routes to search page
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
          { label: "My Learning", href: "#learning", active: false },
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

            <a
              href="#courses"
              className="inline-flex items-center gap-1.5 text-[14px] font-medium font-sans text-primary-500 hover:text-primary-400 transition-colors group"
            >
              <span>View all courses</span>
              <ArrowRightIcon
                size={16}
                className="group-hover:translate-x-0.5 transition-transform"
              />
            </a>
          </div>

          {/* 3 Courses Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card 1: Next.js for Production */}
            <CourseCard
              icon={<NextJsIcon size={48} />}
              title="Next.js for Production"
              description="Build scalable, high-performance web applications with Next.js."
              level="Intermediate"
              duration="18h 24m"
              modulesCount="12 modules"
            />

            {/* Card 2: Docker Essentials */}
            <CourseCard
              icon={<DockerIcon size={48} />}
              title="Docker Essentials"
              description="Containerize applications and streamline your development workflow."
              level="Beginner"
              duration="10h 12m"
              modulesCount="8 modules"
            />

            {/* Card 3: TypeScript Deep Dive */}
            <CourseCard
              icon={<TypeScriptIcon size={48} />}
              title="TypeScript Deep Dive"
              description="Go beyond the basics and write safer, more expressive code."
              level="Intermediate"
              duration="14h 36m"
              modulesCount="10 modules"
            />
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
