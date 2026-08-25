import React from "react";
import { SearchIcon } from "./icons";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  leftIcon?: React.ReactNode;
  rightBadge?: React.ReactNode;
}

export function Input({
  leftIcon,
  rightBadge,
  className = "",
  type = "text",
  placeholder = "Search anything...",
  ...props
}: InputProps) {
  return (
    <div className={`relative flex items-center w-full ${className}`}>
      {leftIcon && (
        <div className="absolute left-3.5 flex items-center pointer-events-none text-neutral-500">
          {leftIcon}
        </div>
      )}
      <input
        type={type}
        placeholder={placeholder}
        className={`w-full h-[44px] bg-white text-neutral-900 placeholder:text-neutral-500 text-[14px] font-sans rounded-[12px] border border-neutral-200 focus:border-primary-400 focus:ring-1 focus:ring-primary-400 focus:outline-none transition-all duration-150 ${
          leftIcon ? "pl-11" : "pl-4"
        } ${rightBadge ? "pr-12" : "pr-4"}`}
        {...props}
      />
      {rightBadge && (
        <div className="absolute right-3 flex items-center pointer-events-none text-neutral-500">
          {rightBadge}
        </div>
      )}
    </div>
  );
}

export function SearchInput({
  className = "",
  placeholder = "Search anything...",
  shortcut = "⌘ K",
  ...props
}: InputProps & { shortcut?: string }) {
  return (
    <Input
      leftIcon={<SearchIcon size={18} className="text-neutral-500" />}
      rightBadge={
        shortcut ? (
          <span className="inline-flex items-center px-1.5 py-0.5 text-[11px] font-medium font-sans text-neutral-500 bg-neutral-100 border border-neutral-200 rounded-[6px]">
            {shortcut}
          </span>
        ) : null
      }
      placeholder={placeholder}
      className={className}
      {...props}
    />
  );
}
