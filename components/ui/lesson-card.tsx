import React from "react";
import { Badge } from "./badge";
import { ExternalLinkIcon, PlayCircleIcon } from "./icons";

export interface LessonCardProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: "video" | "lesson";
  title: string;
  description: string;
  meta: string; // e.g. "Lesson 5.1 • 12:45" or "Module 5"
  actionLabel?: string;
  onActionClick?: () => void;
}

export function LessonCard({
  type = "video",
  title,
  description,
  meta,
  actionLabel,
  onActionClick,
  className = "",
  ...props
}: LessonCardProps) {
  const isVideo = type === "video";
  const defaultAction = isVideo ? "Watch from 12:45" : "View lesson";
  const label = actionLabel || defaultAction;

  return (
    <div
      className={`bg-white border border-neutral-200 rounded-[16px] p-6 shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col justify-between ${className}`}
      {...props}
    >
      <div>
        <div>
          {isVideo ? (
            <Badge variant="video">VIDEO</Badge>
          ) : (
            <Badge variant="lesson">LESSON</Badge>
          )}
        </div>
        <h3 className="text-[16px] font-semibold text-neutral-900 font-sans mt-3.5 tracking-tight">
          {title}
        </h3>
        <p className="text-[13px] text-neutral-500 font-sans mt-2 leading-relaxed">
          {description}
        </p>
      </div>

      <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center justify-between text-[13px] font-sans">
        <span className="text-neutral-500 font-medium">{meta}</span>
        <button
          onClick={onActionClick}
          className="inline-flex items-center gap-1.5 text-primary-500 hover:text-primary-400 font-medium text-[13px] transition-colors cursor-pointer focus:outline-none"
        >
          {isVideo ? (
            <>
              <PlayCircleIcon size={16} />
              <span>{label}</span>
            </>
          ) : (
            <>
              <span>{label}</span>
              <ExternalLinkIcon size={14} />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
