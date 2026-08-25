import React from "react";
import { ChevronDownIcon } from "./icons";

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options?: SelectOption[];
}

export function Select({
  options = [],
  className = "",
  children,
  ...props
}: SelectProps) {
  return (
    <div className={`relative inline-flex items-center w-full ${className}`}>
      <select
        className="w-full h-[44px] appearance-none bg-white text-neutral-900 text-[14px] font-sans rounded-[12px] border border-neutral-200 pl-4 pr-10 focus:border-primary-400 focus:ring-1 focus:ring-primary-400 focus:outline-none transition-all duration-150 cursor-pointer"
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
        {children}
      </select>
      <div className="absolute right-3.5 flex items-center pointer-events-none text-neutral-500">
        <ChevronDownIcon size={16} />
      </div>
    </div>
  );
}
