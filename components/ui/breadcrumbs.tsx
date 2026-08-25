import React from "react";
import { ChevronRightIcon } from "./icons";

export interface BreadcrumbItem {
  label: string;
  href?: string;
  current?: boolean;
}

export interface BreadcrumbsProps extends React.HTMLAttributes<HTMLElement> {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items, className = "", ...props }: BreadcrumbsProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={`flex items-center text-[13px] font-sans font-medium text-neutral-500 flex-wrap gap-2 ${className}`}
      {...props}
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1 || item.current;
        return (
          <div key={item.label} className="flex items-center gap-2">
            {index > 0 && (
              <ChevronRightIcon size={14} className="text-neutral-400 shrink-0" />
            )}
            {isLast || !item.href ? (
              <span className="text-neutral-900 font-semibold truncate">
                {item.label}
              </span>
            ) : (
              <a
                href={item.href}
                className="hover:text-neutral-900 transition-colors truncate"
              >
                {item.label}
              </a>
            )}
          </div>
        );
      })}
    </nav>
  );
}
