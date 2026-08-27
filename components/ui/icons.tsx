import React from "react";

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
  className?: string;
  filled?: boolean;
}

export function VertexLogo({ size = 28, className = "", ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path
        d="M6 7L16 25L26 7H20L16 15L12 7H6Z"
        fill="#F97316"
      />
      <path
        d="M16 25L12 7H6L16 25Z"
        fill="#FB923C"
      />
    </svg>
  );
}

export function BellIcon({ size = 24, className = "", filled = false, ...props }: IconProps) {
  if (filled) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="#0F172A" className={className} {...props}>
        <path d="M12 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 005 13v1a1 1 0 001 1h12a1 1 0 001-1v-1a1 1 0 00-.293-.707L18 11.586V8a6 6 0 00-6-6zm0 19a3 3 0 002.83-2H9.17A3 3 0 0012 21z" />
      </svg>
    );
  }
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
  );
}

export function SearchIcon({ size = 24, className = "", filled = false, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth={filled ? "1" : "2"}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <circle cx="11" cy="11" r="8" fill={filled ? "currentColor" : "none"} />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

export function PlayCircleIcon({ size = 24, className = "", filled = false, ...props }: IconProps) {
  if (filled) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
        <circle cx="12" cy="12" r="10" />
        <polygon points="10 8 16 12 10 16 10 8" fill="#FFFFFF" />
      </svg>
    );
  }
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <circle cx="12" cy="12" r="10" />
      <polygon points="10 8 16 12 10 16 10 8" fill="currentColor" />
    </svg>
  );
}

export function FileTextIcon({ size = 24, className = "", filled = false, ...props }: IconProps) {
  if (filled) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" fill="#E2E8F0" />
        <line x1="16" y1="13" x2="8" y2="13" stroke="#FFFFFF" strokeWidth="2" />
        <line x1="16" y1="17" x2="8" y2="17" stroke="#FFFFFF" strokeWidth="2" />
        <polyline points="10 9 9 9 8 9" stroke="#FFFFFF" strokeWidth="2" />
      </svg>
    );
  }
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  );
}

export function BookmarkIcon({ size = 24, className = "", filled = false, ...props }: IconProps) {
  if (filled) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
      </svg>
    );
  }
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
    </svg>
  );
}

export function BarChartIcon({ size = 24, className = "", filled = false, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <line x1="18" y1="20" x2="18" y2="10" strokeWidth={filled ? "3" : "2"} />
      <line x1="12" y1="20" x2="12" y2="4" strokeWidth={filled ? "3" : "2"} />
      <line x1="6" y1="20" x2="6" y2="14" strokeWidth={filled ? "3" : "2"} />
    </svg>
  );
}

export function ClockIcon({ size = 24, className = "", filled = false, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <circle cx="12" cy="12" r="10" fill={filled ? "currentColor" : "none"} />
      <polyline points="12 6 12 12 16 14" stroke={filled ? "#FFFFFF" : "currentColor"} />
    </svg>
  );
}

export function UserIcon({ size = 24, className = "", filled = false, ...props }: IconProps) {
  if (filled) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    );
  }
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

export function ChevronRightIcon({ size = 24, className = "", ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

export function ChevronLeftIcon({ size = 24, className = "", ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}

export function ChevronDownIcon({ size = 24, className = "", ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

export function ArrowRightIcon({ size = 20, className = "", ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

export function ExternalLinkIcon({ size = 20, className = "", ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

export function StarOutlineIcon({ size = 20, className = "", ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

export function DockerIcon({ size = 48, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M45.5 24.5C44.3 20.8 40.5 19.8 38.3 20.2C36.8 17.9 33.7 17.2 31.5 17.6V20.5H28.5V17.5H25.5V20.5H22.5V17.5H19.5V20.5H16.5V23.5H13.5V20.5H10.5V23.5H7.5V26.5C7.5 32.5 12.5 36.5 20.5 36.5C29.5 36.5 38.5 34.5 41.5 27.5C43.5 27.8 45.8 26.8 45.5 24.5Z"
        fill="#2496ED"
      />
      <rect x="19.5" y="17.5" width="2.5" height="2.5" fill="#E1F5FE" />
      <rect x="22.5" y="17.5" width="2.5" height="2.5" fill="#E1F5FE" />
      <rect x="25.5" y="17.5" width="2.5" height="2.5" fill="#E1F5FE" />
      <rect x="13.5" y="20.5" width="2.5" height="2.5" fill="#E1F5FE" />
      <rect x="16.5" y="20.5" width="2.5" height="2.5" fill="#E1F5FE" />
      <rect x="19.5" y="20.5" width="2.5" height="2.5" fill="#E1F5FE" />
      <rect x="22.5" y="20.5" width="2.5" height="2.5" fill="#E1F5FE" />
      <rect x="25.5" y="20.5" width="2.5" height="2.5" fill="#E1F5FE" />
      <rect x="28.5" y="20.5" width="2.5" height="2.5" fill="#E1F5FE" />
      <circle cx="15.5" cy="27.5" r="1" fill="#0D47A1" />
    </svg>
  );
}

export function TypeScriptIcon({ size = 48, className = "" }: { size?: number; className?: string }) {
  return (
    <div
      className={`rounded-[12px] bg-[#3178C6] text-white flex items-center justify-center font-bold font-mono shadow-xs select-none ${className}`}
      style={{ width: size, height: size, fontSize: size * 0.42 }}
    >
      TS
    </div>
  );
}

export function NextJsIcon({ size = 48, className = "" }: { size?: number; className?: string }) {
  return (
    <div
      className={`rounded-[12px] bg-neutral-900 text-white flex items-center justify-center font-bold font-mono shadow-xs select-none ${className}`}
      style={{ width: size, height: size, fontSize: size * 0.46 }}
    >
      N
    </div>
  );
}

export function CheckCircleIcon({ size = 20, className = "", ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}

export function LoaderCircleIcon({ size = 20, className = "", ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  );
}

export function LockIcon({ size = 20, className = "", ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

export function LayersIcon({ size = 20, className = "", ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </svg>
  );
}

export function EyeIcon({ size = 24, className = "", ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

export function GridIcon({ size = 24, className = "", ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
    </svg>
  );
}

export function TargetIcon({ size = 24, className = "", ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  );
}

export function AccessibilityIcon({ size = 24, className = "", ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <circle cx="12" cy="4" r="2" />
      <path d="M4 8h16" />
      <path d="M12 8v8" />
      <path d="M8 20l4-4 4 4" />
    </svg>
  );
}

export function OutcomeIcon({
  name,
  size = 28,
  className = "",
  stroke = "#EA580C",
  ...props
}: IconProps & { name?: string; stroke?: string }) {
  const iconProps = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke,
    strokeWidth: "1.75",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className,
    ...props,
  };

  switch (name?.toLowerCase()) {
    case "layers":
      return (
        <svg {...iconProps}>
          <path d="M12 2L2 7l10 5 10-5-10-5z" />
          <path d="M2 17l10 5 10-5" />
          <path d="M2 12l10 5 10-5" />
        </svg>
      );
    case "gauge":
    case "speedometer":
    case "performance":
      return (
        <svg {...iconProps}>
          <path d="M12 14v-4" />
          <path d="M3.34 18a10 10 0 1 1 17.32 0" />
          <path d="M4 14h2" />
          <path d="M18 14h2" />
          <path d="M6.34 8.34l1.42 1.42" />
          <path d="M16.24 9.76l1.42-1.42" />
        </svg>
      );
    case "database":
    case "caching":
    case "data":
      return (
        <svg {...iconProps}>
          <ellipse cx="12" cy="5" rx="9" ry="3" />
          <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
          <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
        </svg>
      );
    case "cloud":
    case "deployment":
    case "scaling":
      return (
        <svg {...iconProps}>
          <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
        </svg>
      );
    case "workflow":
      return (
        <svg {...iconProps}>
          <rect x="3" y="3" width="6" height="6" rx="1.5" />
          <rect x="15" y="15" width="6" height="6" rx="1.5" />
          <path d="M9 6h6a3 3 0 0 1 3 3v6" />
          <path d="M15 9l3-3 3 3" />
        </svg>
      );
    case "rocket":
      return (
        <svg {...iconProps}>
          <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
          <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
          <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
          <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
        </svg>
      );
    case "shield":
    case "security":
      return (
        <svg {...iconProps}>
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="M9 12l2 2 4-4" />
        </svg>
      );
    case "puzzle":
      return (
        <svg {...iconProps}>
          <path d="M19.439 7.85c-.049-.322.059-.648.289-.878l1.568-1.568a2.406 2.406 0 0 0-3.402-3.402l-1.568 1.568a.995.995 0 0 1-.878.29c-.495-.074-1.004-.074-1.498 0a.995.995 0 0 1-.878-.29L11.504 2.002a2.406 2.406 0 0 0-3.402 3.402l1.568 1.568c.23.23.338.556.29.878a10.89 10.89 0 0 0 0 1.498.995.995 0 0 1-.29.878L8.102 11.794a2.406 2.406 0 0 0 3.402 3.402l1.568-1.568c.23-.23.556-.338.878-.29.494.074 1.003.074 1.498 0 .322.048.648-.06.878-.29l1.568 1.568a2.406 2.406 0 0 0 3.402-3.402l-1.568-1.568a.995.995 0 0 1-.29-.878c.074-.495.074-1.004 0-1.498z" />
        </svg>
      );
    case "code":
    default:
      return (
        <svg {...iconProps}>
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      );
  }
}
