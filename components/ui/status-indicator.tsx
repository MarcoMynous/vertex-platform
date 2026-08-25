import React from "react";
import { CheckCircleIcon, LoaderCircleIcon, LockIcon, PlayCircleIcon } from "./icons";

export type StatusType = "in-progress" | "completed" | "now-playing" | "locked";

export interface StatusIndicatorProps extends React.HTMLAttributes<HTMLDivElement> {
  status: StatusType;
  label?: string;
  showLabel?: boolean;
}

export function StatusIndicator({
  status,
  label,
  showLabel = true,
  className = "",
  ...props
}: StatusIndicatorProps) {
  const config = {
    "in-progress": {
      defaultLabel: "In Progress",
      icon: <LoaderCircleIcon size={18} className="text-primary-500 animate-spin-slow" />,
      textColor: "text-neutral-900",
    },
    completed: {
      defaultLabel: "Completed",
      icon: <CheckCircleIcon size={18} className="text-emerald-600" />,
      textColor: "text-neutral-900",
    },
    "now-playing": {
      defaultLabel: "Now Playing",
      icon: <PlayCircleIcon size={18} className="text-primary-500" filled={true} />,
      textColor: "text-neutral-900",
    },
    locked: {
      defaultLabel: "Locked",
      icon: <LockIcon size={18} className="text-neutral-700" />,
      textColor: "text-neutral-900",
    },
  }[status];

  const displayLabel = label || config.defaultLabel;

  return (
    <div
      className={`inline-flex items-center gap-2 text-[14px] font-medium font-sans ${config.textColor} ${className}`}
      {...props}
    >
      <span className="inline-flex shrink-0">{config.icon}</span>
      {showLabel && <span>{displayLabel}</span>}
    </div>
  );
}
