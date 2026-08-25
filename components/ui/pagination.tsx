import React from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "./icons";

export interface PaginationProps extends React.HTMLAttributes<HTMLElement> {
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
}

export function Pagination({
  currentPage = 1,
  totalPages = 8,
  onPageChange,
  className = "",
  ...props
}: PaginationProps) {
  return (
    <nav
      aria-label="Pagination"
      className={`inline-flex items-center gap-1.5 font-sans text-[14px] font-medium text-neutral-700 select-none ${className}`}
      {...props}
    >
      {/* Previous Button */}
      <button
        onClick={() => onPageChange?.(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="w-8 h-8 rounded-[8px] flex items-center justify-center text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
        aria-label="Previous page"
      >
        <ChevronLeftIcon size={16} />
      </button>

      {/* Page 1 (Active) */}
      <button
        onClick={() => onPageChange?.(1)}
        className={`w-8 h-8 rounded-[8px] flex items-center justify-center font-semibold text-[14px] transition-colors cursor-pointer ${
          currentPage === 1
            ? "border border-primary-500 bg-white text-primary-500 shadow-xs"
            : "text-neutral-700 hover:bg-neutral-100"
        }`}
      >
        1
      </button>

      {/* Page 2 */}
      <button
        onClick={() => onPageChange?.(2)}
        className={`w-8 h-8 rounded-[8px] flex items-center justify-center font-medium text-[14px] transition-colors cursor-pointer ${
          currentPage === 2
            ? "border border-primary-500 bg-white text-primary-500 shadow-xs"
            : "text-neutral-700 hover:bg-neutral-100"
        }`}
      >
        2
      </button>

      {/* Page 3 */}
      <button
        onClick={() => onPageChange?.(3)}
        className={`w-8 h-8 rounded-[8px] flex items-center justify-center font-medium text-[14px] transition-colors cursor-pointer ${
          currentPage === 3
            ? "border border-primary-500 bg-white text-primary-500 shadow-xs"
            : "text-neutral-700 hover:bg-neutral-100"
        }`}
      >
        3
      </button>

      {/* Ellipsis */}
      <span className="w-8 h-8 flex items-center justify-center text-neutral-400 font-medium">
        ...
      </span>

      {/* Page 8 */}
      <button
        onClick={() => onPageChange?.(totalPages)}
        className={`w-8 h-8 rounded-[8px] flex items-center justify-center font-medium text-[14px] transition-colors cursor-pointer ${
          currentPage === totalPages
            ? "border border-primary-500 bg-white text-primary-500 shadow-xs"
            : "text-neutral-700 hover:bg-neutral-100"
        }`}
      >
        {totalPages}
      </button>

      {/* Next Button */}
      <button
        onClick={() => onPageChange?.(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="w-8 h-8 rounded-[8px] flex items-center justify-center text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
        aria-label="Next page"
      >
        <ChevronRightIcon size={16} />
      </button>
    </nav>
  );
}
