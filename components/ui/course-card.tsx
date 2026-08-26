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
  href?: string;
}

export function CourseCard({
  icon,
  iconText = "N",
  title,
  description,
  level = "Intermediate",
  duration = "18h 24m",
  modulesCount = "12 modules",
  href = "#",
  className = "",
  ...props
}: CourseCardProps) {
  const content = (
    <div
      className={`bg-white border border-neutral-200 rounded-[16px] p-6 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between group h-full ${className}`}
      {...props}
    >
      <div>
        <div className="mb-4">
          {icon ? (
            <div className="shrink-0">{icon}</div>
          ) : (
            <div className="w-12 h-12 rounded-[12px] bg-neutral-900 text-white flex items-center justify-center font-bold text-xl font-mono shadow-xs">
              {iconText}
            </div>
          )}
        </div>
        <h3 className="text-[20px] font-serif font-bold text-neutral-900 tracking-tight group-hover:text-primary-500 transition-colors">
          {title}
        </h3>
        <p className="text-[14px] text-neutral-500 font-sans mt-2.5 leading-relaxed line-clamp-2">
          {description}
        </p>
      </div>

      <div className="mt-8 pt-4 border-t border-neutral-100 flex items-center gap-4 text-[13px] text-neutral-500 font-sans">
        {level && (
          <div className="flex items-center gap-1.5">
            <BarChartIcon size={16} className="text-neutral-400" />
            <span>{level}</span>
          </div>
        )}
        {duration && (
          <div className="flex items-center gap-1.5">
            <ClockIcon size={16} className="text-neutral-400" />
            <span>{duration}</span>
          </div>
        )}
        {modulesCount && (
          <div className="flex items-center gap-1.5">
            <LayersIcon size={16} className="text-neutral-400" />
            <span>
              {typeof modulesCount === "number"
                ? `${modulesCount} modules`
                : modulesCount}
            </span>
          </div>
        )}
      </div>
    </div>
  );

  if (href) {
    return (
      <a href={href} className="block h-full no-underline">
        {content}
      </a>
    );
  }

  return content;
}
