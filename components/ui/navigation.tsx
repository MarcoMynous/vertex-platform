import React from "react";
import Link from "next/link";
import { BellIcon, VertexLogo } from "./icons";

export interface NavItem {
  label: string;
  href: string;
  active?: boolean;
}

export interface NavigationProps extends React.HTMLAttributes<HTMLElement> {
  items?: NavItem[];
  brandName?: string;
  userAvatarUrl?: string;
  showUserControls?: boolean;
  onNotificationsClick?: () => void;
  onAvatarClick?: () => void;
  rightSlot?: React.ReactNode;
}

export function Navigation({
  items = [
    { label: "Courses", href: "#", active: true },
    { label: "My Learning", href: "#", active: false },
  ],
  brandName = "Vertex",
  userAvatarUrl = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=120&auto=format&fit=crop",
  showUserControls = true,
  onNotificationsClick,
  onAvatarClick,
  rightSlot,
  className = "",
  ...props
}: NavigationProps) {
  return (
    <nav
      className={`w-full flex items-center justify-between py-4 px-6 sm:px-10 bg-white/90 backdrop-blur-md border-b border-neutral-200/80 sticky top-0 z-40 ${className}`}
      {...props}
    >
      <div className="flex items-center gap-8 sm:gap-10">
        <Link href="/" className="flex items-center gap-2.5 group">
          <VertexLogo size={28} />
          <span className="text-[20px] font-bold tracking-tight text-neutral-900 font-sans group-hover:text-primary-500 transition-colors">
            {brandName}
          </span>
        </Link>

        <div className="flex items-center gap-6 text-[14px] font-medium font-sans">
          {items.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`transition-colors ${
                item.active
                  ? "text-neutral-900 font-semibold"
                  : "text-neutral-600 hover:text-neutral-900"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-4">
        {rightSlot ? (
          rightSlot
        ) : showUserControls ? (
          <>
            <button
              onClick={onNotificationsClick}
              className="w-9 h-9 flex items-center justify-center text-neutral-700 hover:text-neutral-900 hover:bg-neutral-100 rounded-full transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary-400"
              aria-label="Notifications"
            >
              <BellIcon size={20} />
            </button>

            <button
              onClick={onAvatarClick}
              className="relative w-9 h-9 rounded-full overflow-hidden border border-neutral-200 shadow-2xs hover:ring-2 hover:ring-primary-400 transition-all cursor-pointer focus:outline-none"
              aria-label="User profile"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={userAvatarUrl}
                alt="Learner avatar"
                className="w-full h-full object-cover"
              />
            </button>
          </>
        ) : null}
      </div>
    </nav>
  );
}
