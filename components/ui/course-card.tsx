import React from "react";
import { BarChartIcon, ClockIcon, LayersIcon } from "./icons";

export interface CourseCardProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode;
  iconText?: string;
  title: string;
  description: string;
  level?: string;
  duration?: string;
  modulesCount?: number | string;
}

export function CourseCard({
  icon,
  iconText = "N",
  title,
  description,
  level = "Intermediate",
  duration = "18h 24m",
  modulesCount = "12 modules",
  className = "",
  ...props
}: CourseCardProps) {
  return (
    <div
      className={`bg-white border border-neutral-200 rounded-[16px] p-6 shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col justify-between ${className}`}
      {...props}
    >
      <div>
        <div className="w-10 h-10 rounded-[10px] bg-neutral-900 text-white flex items-center justify-center font-bold text-lg font-mono mb-4 shadow-sm">
          {icon || iconText}
        </div>
        <h3 className="text-[18px] font-semibold text-neutral-900 font-sans tracking-tight">
          {title}
        </h3>
        <p className="text-[14px] text-neutral-500 font-sans mt-2 leading-relaxed">
          {description}
        </p>
      </div>

      <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center gap-4 text-[13px] text-neutral-500 font-sans">
        {level && (
          <div className="flex items-center gap-1.5">
            <BarChartIcon size={16} className="text-neutral-500" />
            <span>{level}</span>
          </div>
        )}
        {duration && (
          <div className="flex items-center gap-1.5">
            <ClockIcon size={16} className="text-neutral-500" />
            <span>{duration}</span>
          </div>
        )}
        {modulesCount && (
          <div className="flex items-center gap-1.5">
            <LayersIcon size={16} className="text-neutral-500" />
            <span>{typeof modulesCount === "number" ? `${modulesCount} modules` : modulesCount}</span>
          </div>
        )}
      </div>
    </div>
  );
}
