import React from "react";
import { VertexLogo } from "./icons";

export interface NavItem {
  label: string;
  href: string;
  active?: boolean;
}

export interface NavigationProps extends React.HTMLAttributes<HTMLElement> {
  items?: NavItem[];
  brandName?: string;
  rightSlot?: React.ReactNode;
}

export function Navigation({
  items = [
    { label: "Courses", href: "#", active: true },
    { label: "My Learning", href: "#", active: false },
  ],
  brandName = "Vertex",
  rightSlot,
  className = "",
  ...props
}: NavigationProps) {
  return (
    <nav
      className={`w-full flex items-center justify-between py-4 px-6 bg-white border-b border-neutral-200 ${className}`}
      {...props}
    >
      <div className="flex items-center gap-8">
        <a href="#" className="flex items-center gap-2.5 group">
          <VertexLogo size={28} />
          <span className="text-[20px] font-bold tracking-tight text-neutral-900 font-sans group-hover:text-primary-500 transition-colors">
            {brandName}
          </span>
        </a>

        <div className="flex items-center gap-6 text-[14px] font-medium font-sans">
          {items.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={`transition-colors ${
                item.active
                  ? "text-primary-500 font-semibold"
                  : "text-neutral-700 hover:text-neutral-900"
              }`}
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>

      {rightSlot && <div className="flex items-center gap-3">{rightSlot}</div>}
    </nav>
  );
}
