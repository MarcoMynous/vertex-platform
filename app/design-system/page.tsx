"use client";

import React, { useState } from "react";
import {
  VertexLogo,
  BellIcon,
  SearchIcon,
  PlayCircleIcon,
  FileTextIcon,
  BookmarkIcon,
  BarChartIcon,
  ClockIcon,
  UserIcon,
  ChevronRightIcon,
  ExternalLinkIcon,
  EyeIcon,
  GridIcon,
  TargetIcon,
  AccessibilityIcon,
} from "@/components/ui/icons";
import { Button } from "@/components/ui/button";
import { SearchInput } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { StatusIndicator } from "@/components/ui/status-indicator";
import { ProgressBar } from "@/components/ui/progress-bar";
import { CourseCard } from "@/components/ui/course-card";
import { LessonCard } from "@/components/ui/lesson-card";
import { ResourceCard } from "@/components/ui/resource-card";
import { Navigation } from "@/components/ui/navigation";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Pagination } from "@/components/ui/pagination";

export default function DesignSystemPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [selectedSort, setSelectedSort] = useState("most-relevant");

  return (
    <main className="min-h-screen bg-[#FAFAFC] text-neutral-900 py-12 px-4 sm:px-8 lg:px-14">
      <div className="max-w-[1360px] mx-auto bg-white rounded-[24px] border border-neutral-200 shadow-xl p-8 sm:p-12 lg:p-16 space-y-16">
        
        {/* ========================================================================= */}
        {/* HEADER SECTION: LOGO + TITLE + 01 COLORS                                  */}
        {/* ========================================================================= */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start border-b border-neutral-200 pb-12">
          {/* Brand Intro */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <VertexLogo size={34} />
              <span className="text-[24px] font-bold tracking-tight text-neutral-900 font-sans">
                Vertex
              </span>
            </div>

            <h1 className="text-[48px] sm:text-[54px] font-serif font-bold text-neutral-900 leading-[1.1] pt-2">
              Design System
            </h1>

            <p className="text-[15px] sm:text-[16px] text-neutral-700 leading-relaxed max-w-[440px] font-sans">
              A unified design language for Vertex learning platform. Clean, modern and
              focused on clarity, consistency and intuitive learning experiences.
            </p>

            <div className="pt-4 text-[11px] font-bold tracking-widest text-neutral-500 uppercase font-sans">
              VERSION 1.0 • MAY 2025
            </div>
          </div>

          {/* 01 COLORS */}
          <div className="lg:col-span-7 space-y-8">
            <div className="flex items-center gap-2">
              <span className="text-[12px] font-bold font-sans text-primary-500">01</span>
              <h2 className="text-[12px] font-bold font-sans uppercase tracking-wider text-neutral-900">
                COLORS
              </h2>
            </div>

            {/* Primary Colors */}
            <div className="space-y-2.5">
              <span className="text-[13px] font-semibold text-neutral-900 font-sans">
                Primary
              </span>
              <div className="grid grid-cols-5 gap-3">
                {[
                  { name: "Primary 500", hex: "#F97316", bg: "bg-[#F97316]" },
                  { name: "Primary 400", hex: "#FB923C", bg: "bg-[#FB923C]" },
                  { name: "Primary 300", hex: "#FDBA74", bg: "bg-[#FDBA74]" },
                  { name: "Primary 200", hex: "#FED7AA", bg: "bg-[#FED7AA]" },
                  { name: "Primary 100", hex: "#FFEEE5", bg: "bg-[#FFEEE5]" },
                ].map((c) => (
                  <div key={c.name} className="space-y-1.5">
                    <div className={`h-14 sm:h-16 w-full rounded-[10px] ${c.bg} border border-neutral-200/50 shadow-xs`} />
                    <div className="text-[11px] font-medium text-neutral-900 leading-tight">
                      {c.name}
                    </div>
                    <div className="text-[10px] text-neutral-500 font-mono">
                      {c.hex}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Neutral Colors */}
            <div className="space-y-2.5">
              <span className="text-[13px] font-semibold text-neutral-900 font-sans">
                Neutral
              </span>
              <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
                {[
                  { name: "Neutral 900", hex: "#0F172A", bg: "bg-[#0F172A]" },
                  { name: "Neutral 700", hex: "#334155", bg: "bg-[#334155]" },
                  { name: "Neutral 500", hex: "#64748B", bg: "bg-[#64748B]" },
                  { name: "Neutral 300", hex: "#CBD5E1", bg: "bg-[#CBD5E1]" },
                  { name: "Neutral 200", hex: "#E2E8F0", bg: "bg-[#E2E8F0]" },
                  { name: "Neutral 100", hex: "#F1F5F9", bg: "bg-[#F1F5F9]" },
                  { name: "Neutral 50", hex: "#FAFAFC", bg: "bg-[#FAFAFC]" },
                  { name: "White", hex: "#FFFFFF", bg: "bg-[#FFFFFF]" },
                ].map((c) => (
                  <div key={c.name} className="space-y-1.5">
                    <div className={`h-14 sm:h-16 w-full rounded-[10px] ${c.bg} border border-neutral-200 shadow-xs`} />
                    <div className="text-[11px] font-medium text-neutral-900 leading-tight truncate">
                      {c.name}
                    </div>
                    <div className="text-[10px] text-neutral-500 font-mono truncate">
                      {c.hex}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* ROW 2: 02 TYPOGRAPHY & 03 TYPE SCALE                                      */}
        {/* ========================================================================= */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start border-b border-neutral-200 pb-12">
          {/* 02 TYPOGRAPHY */}
          <div className="lg:col-span-5 space-y-8">
            <div className="flex items-center gap-2">
              <span className="text-[12px] font-bold font-sans text-primary-500">02</span>
              <h2 className="text-[12px] font-bold font-sans uppercase tracking-wider text-neutral-900">
                TYPOGRAPHY
              </h2>
            </div>

            <div className="space-y-8">
              {/* Playfair Display */}
              <div className="flex items-baseline gap-6">
                <span className="text-[64px] font-serif font-bold text-neutral-900 leading-none">
                  Ag
                </span>
                <div>
                  <h3 className="text-[20px] font-serif font-bold text-neutral-900">
                    Playfair Display
                  </h3>
                  <p className="text-[13px] text-neutral-500 mt-1 font-sans">
                    Elegant • Readable • Timeless
                  </p>
                </div>
              </div>

              {/* Inter */}
              <div className="flex items-baseline gap-6">
                <span className="text-[64px] font-sans font-bold text-neutral-900 leading-none">
                  Ag
                </span>
                <div>
                  <h3 className="text-[20px] font-sans font-semibold text-neutral-900">
                    Inter
                  </h3>
                  <p className="text-[13px] text-neutral-500 mt-1 font-sans">
                    Clean • Modern • Highly legible
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 03 TYPE SCALE */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2">
              <span className="text-[12px] font-bold font-sans text-primary-500">03</span>
              <h2 className="text-[12px] font-bold font-sans uppercase tracking-wider text-neutral-900">
                TYPE SCALE
              </h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left font-sans text-[13px]">
                <thead>
                  <tr className="text-neutral-500 text-[11px] font-medium uppercase tracking-wider border-b border-neutral-200">
                    <th className="pb-3 pr-4">Style</th>
                    <th className="pb-3 px-4">Font</th>
                    <th className="pb-3 px-4">Size / Line Height</th>
                    <th className="pb-3 px-4">Weight</th>
                    <th className="pb-3 pl-4">Use</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100 text-neutral-900">
                  {[
                    { style: "Display 1", font: "Playfair Display", size: "48 / 56", weight: "Bold", use: "Page titles", class: "font-serif font-bold text-[18px]" },
                    { style: "Display 2", font: "Playfair Display", size: "36 / 44", weight: "Bold", use: "Section titles", class: "font-serif font-bold text-[16px]" },
                    { style: "Heading 1", font: "Inter", size: "28 / 36", weight: "Semi Bold", use: "Card titles", class: "font-sans font-semibold text-[15px]" },
                    { style: "Heading 2", font: "Inter", size: "22 / 30", weight: "Semi Bold", use: "Sub section", class: "font-sans font-semibold text-[14px]" },
                    { style: "Heading 3", font: "Inter", size: "18 / 26", weight: "Medium", use: "Small titles", class: "font-sans font-medium text-[13px]" },
                    { style: "Body Large", font: "Inter", size: "16 / 24", weight: "Regular", use: "Body copy", class: "font-sans text-[13px]" },
                    { style: "Body", font: "Inter", size: "14 / 20", weight: "Regular", use: "Supporting text", class: "font-sans text-[13px]" },
                    { style: "Small", font: "Inter", size: "12 / 16", weight: "Regular", use: "Captions, meta", class: "font-sans text-[12px]" },
                  ].map((row) => (
                    <tr key={row.style} className="hover:bg-neutral-50/60 transition-colors">
                      <td className={`py-3.5 pr-4 ${row.class}`}>{row.style}</td>
                      <td className="py-3.5 px-4 text-neutral-700">{row.font}</td>
                      <td className="py-3.5 px-4 text-neutral-700 font-mono text-[12px]">{row.size}</td>
                      <td className="py-3.5 px-4 text-neutral-700">{row.weight}</td>
                      <td className="py-3.5 pl-4 text-neutral-500">{row.use}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* ROW 3: 04 SPACING SYSTEM & 05 RADIUS & SHADOWS                            */}
        {/* ========================================================================= */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start border-b border-neutral-200 pb-12">
          {/* 04 SPACING SYSTEM */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-[12px] font-bold font-sans text-primary-500">04</span>
                <h2 className="text-[12px] font-bold font-sans uppercase tracking-wider text-neutral-900">
                  SPACING SYSTEM
                </h2>
              </div>
              <span className="text-[12px] text-neutral-500 font-sans">
                Base unit: 4px
              </span>
            </div>

            <div className="flex items-end justify-between gap-2 overflow-x-auto pt-4 pb-2">
              {[
                { size: 4, rem: "0.25rem", height: "h-[8px]" },
                { size: 8, rem: "0.5rem", height: "h-[16px]" },
                { size: 12, rem: "0.75rem", height: "h-[24px]" },
                { size: 16, rem: "1rem", height: "h-[32px]" },
                { size: 24, rem: "1.5rem", height: "h-[44px]" },
                { size: 32, rem: "2rem", height: "h-[56px]" },
                { size: 40, rem: "2.5rem", height: "h-[68px]" },
                { size: 48, rem: "3rem", height: "h-[80px]" },
                { size: 64, rem: "4rem", height: "h-[96px]" },
              ].map((s) => (
                <div key={s.size} className="flex flex-col items-center gap-2">
                  <div
                    className={`w-9 ${s.height} bg-[#FED7AA] rounded-[4px] border border-[#FDBA74]/40`}
                  />
                  <span className="text-[12px] font-bold font-sans text-neutral-900">
                    {s.size}
                  </span>
                  <span className="text-[10px] text-neutral-500 font-sans">
                    ({s.rem})
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* 05 RADIUS & SHADOWS */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-2">
              <span className="text-[12px] font-bold font-sans text-primary-500">05</span>
              <h2 className="text-[12px] font-bold font-sans uppercase tracking-wider text-neutral-900">
                RADIUS & SHADOWS
              </h2>
            </div>

            {/* Radius row */}
            <div className="space-y-2">
              <span className="text-[13px] font-semibold text-neutral-900 font-sans">
                Radius
              </span>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 pt-1">
                {[
                  { name: "4px", label: "(xs)", radius: "rounded-[4px]" },
                  { name: "8px", label: "(sm)", radius: "rounded-[8px]" },
                  { name: "12px", label: "(md)", radius: "rounded-[12px]" },
                  { name: "16px", label: "(lg)", radius: "rounded-[16px]" },
                  { name: "24px", label: "(xl)", radius: "rounded-[24px]" },
                  { name: "Full", label: "(circle)", radius: "rounded-full" },
                ].map((r) => (
                  <div key={r.name} className="flex flex-col items-center gap-1.5">
                    <div
                      className={`w-14 h-14 bg-white border border-neutral-300 shadow-xs ${r.radius}`}
                    />
                    <div className="text-[11px] font-medium text-neutral-900 text-center leading-tight">
                      {r.name}
                      <span className="block text-[10px] text-neutral-500">{r.label}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Shadows row */}
            <div className="space-y-2 pt-2">
              <span className="text-[13px] font-semibold text-neutral-900 font-sans">
                Shadows
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-1">
                {[
                  { name: "Sm", code: "0 1px 2px 0\nrgba(15, 23, 42, 0.05)", shadow: "shadow-sm" },
                  { name: "Md", code: "0 4px 12px -2px\nrgba(15, 23, 42, 0.08)", shadow: "shadow-md" },
                  { name: "Lg", code: "0 12px 24px -4px\nrgba(15, 23, 42, 0.10)", shadow: "shadow-lg" },
                  { name: "Xl", code: "0 20px 40px -8px\nrgba(15, 23, 42, 0.12)", shadow: "shadow-xl" },
                ].map((s) => (
                  <div
                    key={s.name}
                    className={`bg-white border border-neutral-100 p-3 rounded-[12px] ${s.shadow} space-y-1`}
                  >
                    <div className="text-[12px] font-semibold text-neutral-900 font-sans">
                      {s.name}
                    </div>
                    <div className="text-[9px] text-neutral-500 font-mono whitespace-pre-line leading-relaxed">
                      {s.code}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* ROW 4: 06 ICONS, 07 BUTTONS, 08 INPUTS                                    */}
        {/* ========================================================================= */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start border-b border-neutral-200 pb-12">
          {/* 06 ICONS */}
          <div className="lg:col-span-3 space-y-6">
            <div className="flex items-center gap-2">
              <span className="text-[12px] font-bold font-sans text-primary-500">06</span>
              <h2 className="text-[12px] font-bold font-sans uppercase tracking-wider text-neutral-900">
                ICONS
              </h2>
            </div>

            <div className="space-y-4">
              <div>
                <span className="text-[12px] font-medium text-neutral-500 font-sans">
                  Outline Style
                </span>
                <div className="flex items-center justify-between gap-1 text-neutral-900 mt-2">
                  <BellIcon size={20} />
                  <SearchIcon size={20} />
                  <PlayCircleIcon size={20} />
                  <FileTextIcon size={20} />
                  <BookmarkIcon size={20} />
                  <BarChartIcon size={20} />
                  <ClockIcon size={20} />
                  <UserIcon size={20} />
                  <ChevronRightIcon size={20} />
                </div>
              </div>

              <div>
                <span className="text-[12px] font-medium text-neutral-500 font-sans">
                  Filled Style
                </span>
                <div className="flex items-center justify-between gap-1 text-neutral-900 mt-2">
                  <BellIcon size={20} filled={true} />
                  <SearchIcon size={20} filled={true} />
                  <PlayCircleIcon size={20} filled={true} />
                  <FileTextIcon size={20} filled={true} />
                  <BookmarkIcon size={20} filled={true} />
                  <BarChartIcon size={20} filled={true} />
                  <ClockIcon size={20} filled={true} />
                  <UserIcon size={20} filled={true} />
                  <ChevronRightIcon size={20} />
                </div>
              </div>

              <div className="pt-2 text-[12px] text-neutral-500 space-y-1 border-t border-neutral-100 font-sans">
                <span className="font-semibold text-neutral-900 block text-[13px]">
                  Icon Specs
                </span>
                <div>• 24x24px grid</div>
                <div>• 2px stroke width (outline)</div>
                <div>• Rounded line caps</div>
                <div>• Consistent optical balance</div>
              </div>
            </div>
          </div>

          {/* 07 BUTTONS */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-2">
              <span className="text-[12px] font-bold font-sans text-primary-500">07</span>
              <h2 className="text-[12px] font-bold font-sans uppercase tracking-wider text-neutral-900">
                BUTTONS
              </h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left font-sans text-[13px]">
                <thead>
                  <tr className="text-neutral-500 text-[11px] font-medium uppercase tracking-wider">
                    <th className="pb-3 pr-2"></th>
                    <th className="pb-3 px-2">Primary</th>
                    <th className="pb-3 px-2">Secondary</th>
                    <th className="pb-3 px-2">Tertiary</th>
                    <th className="pb-3 pl-2">Text</th>
                  </tr>
                </thead>
                <tbody className="space-y-3">
                  {/* Default Row */}
                  <tr>
                    <td className="py-2 pr-2 text-[12px] text-neutral-500 font-medium">Default</td>
                    <td className="py-2 px-2">
                      <Button variant="primary" size="sm">Get Started</Button>
                    </td>
                    <td className="py-2 px-2">
                      <Button variant="secondary" size="sm">Explore Courses</Button>
                    </td>
                    <td className="py-2 px-2">
                      <Button variant="tertiary" size="sm" rightIcon={<ExternalLinkIcon size={14} />}>View Lesson</Button>
                    </td>
                    <td className="py-2 pl-2">
                      <Button variant="text" size="sm" rightIcon={<PlayCircleIcon size={14} />}>Watch Video</Button>
                    </td>
                  </tr>

                  {/* Hover Row */}
                  <tr>
                    <td className="py-2 pr-2 text-[12px] text-neutral-500 font-medium">Hover</td>
                    <td className="py-2 px-2">
                      <Button variant="primary" size="sm" className="bg-primary-400">Get Started</Button>
                    </td>
                    <td className="py-2 px-2">
                      <Button variant="secondary" size="sm" className="border-primary-500 bg-[#FFEEE5]/60">Explore Courses</Button>
                    </td>
                    <td className="py-2 px-2">
                      <Button variant="tertiary" size="sm" className="border-neutral-300 bg-neutral-50" rightIcon={<ExternalLinkIcon size={14} />}>View Lesson</Button>
                    </td>
                    <td className="py-2 pl-2">
                      <Button variant="text" size="sm" className="text-primary-400" rightIcon={<PlayCircleIcon size={14} />}>Watch Video</Button>
                    </td>
                  </tr>

                  {/* Disabled Row */}
                  <tr>
                    <td className="py-2 pr-2 text-[12px] text-neutral-500 font-medium">Disabled</td>
                    <td className="py-2 px-2">
                      <Button variant="primary" size="sm" disabled>Get Started</Button>
                    </td>
                    <td className="py-2 px-2">
                      <Button variant="secondary" size="sm" disabled>Explore Courses</Button>
                    </td>
                    <td className="py-2 px-2">
                      <Button variant="tertiary" size="sm" disabled rightIcon={<ExternalLinkIcon size={14} />}>View Lesson</Button>
                    </td>
                    <td className="py-2 pl-2">
                      <Button variant="text" size="sm" disabled rightIcon={<PlayCircleIcon size={14} />}>Watch Video</Button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="pt-2 text-[12px] text-neutral-500 space-y-1 border-t border-neutral-100 font-sans">
              <span className="font-semibold text-neutral-900 block text-[13px]">
                Button Specs
              </span>
              <div>• Height: 44px (default)</div>
              <div>• Padding: 0 16px (lg), 0 12px (md)</div>
              <div>• Radius: 12px</div>
              <div>• Font: Inter Medium (14–16px)</div>
            </div>
          </div>

          {/* 08 INPUTS */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex items-center gap-2">
              <span className="text-[12px] font-bold font-sans text-primary-500">08</span>
              <h2 className="text-[12px] font-bold font-sans uppercase tracking-wider text-neutral-900">
                INPUTS
              </h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-[12px] font-medium text-neutral-700 font-sans mb-1.5">
                  Search / Text Input
                </label>
                <SearchInput
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  placeholder="Search anything..."
                />
              </div>

              <div>
                <label className="block text-[12px] font-medium text-neutral-700 font-sans mb-1.5">
                  Select
                </label>
                <Select
                  value={selectedSort}
                  onChange={(e) => setSelectedSort(e.target.value)}
                  options={[
                    { value: "most-relevant", label: "Most Relevant" },
                    { value: "newest", label: "Newest" },
                    { value: "popular", label: "Most Popular" },
                  ]}
                />
              </div>

              <div className="pt-2 text-[12px] text-neutral-500 space-y-1 border-t border-neutral-100 font-sans">
                <span className="font-semibold text-neutral-900 block text-[13px]">
                  Field Specs
                </span>
                <div>• Height: 44px</div>
                <div>• Radius: 12px</div>
                <div>• Border: 1px solid #E2E8F0</div>
                <div>• Padding: 0 16px</div>
                <div>• Focus: Border color #FB923C</div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* ROW 5: 09 BADGES, 10 STATUS, 11 PROGRESS BAR                              */}
        {/* ========================================================================= */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start border-b border-neutral-200 pb-12">
          {/* 09 BADGES / TAGS */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-[12px] font-bold font-sans text-primary-500">09</span>
              <h2 className="text-[12px] font-bold font-sans uppercase tracking-wider text-neutral-900">
                BADGES / TAGS
              </h2>
            </div>

            <div className="flex items-center gap-6 pt-2">
              <div className="space-y-1">
                <span className="text-[11px] text-neutral-500 font-medium block">Video</span>
                <Badge variant="video">VIDEO</Badge>
              </div>
              <div className="space-y-1">
                <span className="text-[11px] text-neutral-500 font-medium block">Lesson</span>
                <Badge variant="lesson">LESSON</Badge>
              </div>
              <div className="space-y-1">
                <span className="text-[11px] text-neutral-500 font-medium block">Popular</span>
                <Badge variant="popular">POPULAR</Badge>
              </div>
            </div>
          </div>

          {/* 10 STATUS / INDICATORS */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-[12px] font-bold font-sans text-primary-500">10</span>
              <h2 className="text-[12px] font-bold font-sans uppercase tracking-wider text-neutral-900">
                STATUS / INDICATORS
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-2">
              <StatusIndicator status="in-progress" />
              <StatusIndicator status="completed" />
              <StatusIndicator status="now-playing" />
              <StatusIndicator status="locked" />
            </div>
          </div>

          {/* 11 PROGRESS BAR */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-[12px] font-bold font-sans text-primary-500">11</span>
              <h2 className="text-[12px] font-bold font-sans uppercase tracking-wider text-neutral-900">
                PROGRESS BAR
              </h2>
            </div>

            <div className="pt-3">
              <ProgressBar value={35} />
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* ROW 6: 12 CARDS                                                           */}
        {/* ========================================================================= */}
        <section className="space-y-6 border-b border-neutral-200 pb-12">
          <div className="flex items-center gap-2">
            <span className="text-[12px] font-bold font-sans text-primary-500">12</span>
            <h2 className="text-[12px] font-bold font-sans uppercase tracking-wider text-neutral-900">
              CARDS
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
            {/* Course Card */}
            <div className="space-y-2 flex flex-col">
              <span className="text-[12px] text-neutral-500 font-sans font-medium">Course Card</span>
              <CourseCard
                className="flex-1"
                iconText="N"
                title="Next.js for Production"
                description="Build scalable, high-performance web applications with Next.js."
                level="Intermediate"
                duration="18h 24m"
                modulesCount="12 modules"
              />
            </div>

            {/* Lesson Card (Video) */}
            <div className="space-y-2 flex flex-col">
              <span className="text-[12px] text-neutral-500 font-sans font-medium">Lesson Card (Video)</span>
              <LessonCard
                className="flex-1"
                type="video"
                title="Data Fetching in Server Components"
                description="Learn how to fetch data on the server using async/await and Next.js best practices."
                meta="Lesson 5.1 • 12:45"
                actionLabel="Watch from 12:45"
              />
            </div>

            {/* Lesson Card (Lesson) */}
            <div className="space-y-2 flex flex-col">
              <span className="text-[12px] text-neutral-500 font-sans font-medium">Lesson Card (Lesson)</span>
              <LessonCard
                className="flex-1"
                type="lesson"
                title="Data Fetching & Caching"
                description="Explore different data fetching methods in Next.js and how to cache and revalidate data for optimal performance."
                meta="Module 5"
                actionLabel="View lesson"
              />
            </div>

            {/* Resource Card */}
            <div className="space-y-2 flex flex-col">
              <span className="text-[12px] text-neutral-500 font-sans font-medium">Resource Card</span>
              <ResourceCard
                className="flex-1"
                title="Caching and Revalidation Guide"
                description="Deep dive into Next.js caching strategies."
                format="PDF"
                size="1.2 MB"
              />
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* ROW 7: 13 NAVIGATION                                                      */}
        {/* ========================================================================= */}
        <section className="space-y-6 border-b border-neutral-200 pb-12">
          <div className="flex items-center gap-2">
            <span className="text-[12px] font-bold font-sans text-primary-500">13</span>
            <h2 className="text-[12px] font-bold font-sans uppercase tracking-wider text-neutral-900">
              NAVIGATION
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Top Navigation */}
            <div className="lg:col-span-5 bg-white border border-neutral-200 rounded-[12px] overflow-hidden shadow-xs">
              <Navigation
                className="border-b-0 py-3.5 px-5"
                items={[
                  { label: "Courses", href: "#", active: true },
                  { label: "My Learning", href: "#", active: false },
                ]}
              />
            </div>

            {/* Breadcrumbs */}
            <div className="lg:col-span-4 space-y-1">
              <span className="text-[11px] text-neutral-500 font-sans font-medium block">
                Breadcrumbs
              </span>
              <Breadcrumbs
                items={[
                  { label: "All Courses", href: "#" },
                  { label: "Next.js for Production", href: "#" },
                  { label: "Data Fetching & Caching", current: true },
                ]}
              />
            </div>

            {/* Pagination */}
            <div className="lg:col-span-3 space-y-1">
              <span className="text-[11px] text-neutral-500 font-sans font-medium block">
                Pagination
              </span>
              <Pagination
                currentPage={currentPage}
                totalPages={8}
                onPageChange={(page) => setCurrentPage(page)}
              />
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* ROW 8: 14 PRINCIPLES                                                      */}
        {/* ========================================================================= */}
        <section className="space-y-6">
          <div className="flex items-center gap-2">
            <span className="text-[12px] font-bold font-sans text-primary-500">14</span>
            <h2 className="text-[12px] font-bold font-sans uppercase tracking-wider text-neutral-900">
              PRINCIPLES
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <EyeIcon size={24} className="text-neutral-900" />,
                title: "Clarity First",
                description: "Every element should communicate clearly.",
              },
              {
                icon: <GridIcon size={24} className="text-neutral-900" />,
                title: "Consistency",
                description: "Use components and patterns consistently across the platform.",
              },
              {
                icon: <TargetIcon size={24} className="text-neutral-900" />,
                title: "Focus & Calm",
                description: "Remove noise and help learners focus on what matters.",
              },
              {
                icon: <AccessibilityIcon size={24} className="text-neutral-900" />,
                title: "Accessible",
                description: "Design with accessibility and inclusivity in mind.",
              },
            ].map((p) => (
              <div
                key={p.title}
                className="flex items-start gap-4 p-5 rounded-[16px] bg-neutral-50/70 border border-neutral-200/80"
              >
                <div className="shrink-0 p-2 bg-white rounded-[10px] border border-neutral-200 shadow-xs">
                  {p.icon}
                </div>
                <div>
                  <h3 className="text-[15px] font-semibold text-neutral-900 font-sans">
                    {p.title}
                  </h3>
                  <p className="text-[13px] text-neutral-500 font-sans mt-1 leading-relaxed">
                    {p.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </main>
  );
}
