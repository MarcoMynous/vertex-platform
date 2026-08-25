import React from "react";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "video" | "lesson" | "popular" | "neutral";
  children: React.ReactNode;
}

export function Badge({
  variant = "video",
  children,
  className = "",
  ...props
}: BadgeProps) {
  const variantStyles = {
    video: "bg-[#FFEEE5] text-primary-500 border border-primary-200/50",
    lesson: "bg-[#EFF6FF] text-[#2563EB] border border-blue-200/50",
    popular: "bg-[#FFF7ED] text-[#EA580C] border border-orange-200/60",
    neutral: "bg-neutral-100 text-neutral-700 border border-neutral-200",
  }[variant];

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-[6px] text-[11px] font-bold font-sans tracking-wider uppercase ${variantStyles} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}
