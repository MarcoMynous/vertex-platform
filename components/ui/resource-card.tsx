import React from "react";
import { ExternalLinkIcon, FileTextIcon } from "./icons";

export interface ResourceCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description: string;
  format?: string;
  size?: string;
  fileUrl?: string;
  onOpen?: () => void;
}

export function ResourceCard({
  title,
  description,
  format = "PDF",
  size = "1.2 MB",
  fileUrl,
  onOpen,
  className = "",
  ...props
}: ResourceCardProps) {
  return (
    <div
      className={`bg-white border border-neutral-200 rounded-[16px] p-6 shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col justify-between ${className}`}
      {...props}
    >
      <div>
        <div className="text-neutral-900 mb-3">
          <FileTextIcon size={28} />
        </div>
        <h3 className="text-[16px] font-semibold text-neutral-900 font-sans tracking-tight">
          {title}
        </h3>
        <p className="text-[13px] text-neutral-500 font-sans mt-2 leading-relaxed">
          {description}
        </p>
      </div>

      <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center justify-between text-[13px] font-sans">
        <span className="text-neutral-500 font-medium">{`${format} • ${size}`}</span>
        {fileUrl ? (
          <a
            href={fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-500 hover:text-primary-400 p-1 rounded transition-colors cursor-pointer focus:outline-none"
            aria-label="Open resource"
          >
            <ExternalLinkIcon size={16} />
          </a>
        ) : (
          <button
            onClick={onOpen}
            className="text-primary-500 hover:text-primary-400 p-1 rounded transition-colors cursor-pointer focus:outline-none"
            aria-label="Open resource"
          >
            <ExternalLinkIcon size={16} />
          </button>
        )}
      </div>
    </div>
  );
}
