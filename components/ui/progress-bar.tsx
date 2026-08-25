import React from "react";

export interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number; // 0 to 100
  showLabel?: boolean;
  label?: string;
}

export function ProgressBar({
  value,
  showLabel = true,
  label,
  className = "",
  ...props
}: ProgressBarProps) {
  const clampedValue = Math.min(100, Math.max(0, value));

  return (
    <div className={`flex items-center gap-4 w-full ${className}`} {...props}>
      <div className="relative flex-1 h-[8px] bg-neutral-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-primary-500 rounded-full transition-all duration-300 ease-out"
          style={{ width: `${clampedValue}%` }}
        />
      </div>
      {showLabel && (
        <span className="shrink-0 text-[13px] font-medium font-sans text-neutral-700">
          {label || `${clampedValue}% complete`}
        </span>
      )}
    </div>
  );
}
