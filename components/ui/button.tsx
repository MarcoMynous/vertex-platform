import React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "tertiary" | "text";
  size?: "default" | "sm" | "lg";
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

export function Button({
  children,
  variant = "primary",
  size = "default",
  leftIcon,
  rightIcon,
  fullWidth = false,
  className = "",
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-medium font-sans rounded-[12px] transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-1 select-none";

  const sizeStyles = {
    sm: "h-[36px] px-[12px] text-[13px] gap-1.5",
    default: "h-[44px] px-[16px] text-[14px] gap-2",
    lg: "h-[48px] px-[20px] text-[15px] gap-2.5",
  }[size];

  const variantStyles = {
    primary: disabled
      ? "bg-primary-100 text-primary-300 cursor-not-allowed shadow-none"
      : "bg-primary-500 hover:bg-primary-400 active:bg-orange-600 text-white shadow-sm cursor-pointer",
    secondary: disabled
      ? "bg-neutral-50 border border-neutral-200 text-primary-200 cursor-not-allowed"
      : "bg-white border border-primary-300 hover:border-primary-500 hover:bg-primary-100/50 text-primary-500 active:bg-primary-100 cursor-pointer",
    tertiary: disabled
      ? "bg-white border border-neutral-200 text-neutral-300 cursor-not-allowed"
      : "bg-white border border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50 text-neutral-900 active:bg-neutral-100 cursor-pointer shadow-sm",
    text: disabled
      ? "bg-transparent text-primary-200 cursor-not-allowed"
      : "bg-transparent hover:text-primary-400 text-primary-500 active:text-orange-600 p-0 h-auto cursor-pointer",
  }[variant];

  const widthStyle = fullWidth ? "w-full" : "";

  return (
    <button
      disabled={disabled}
      className={`${baseStyles} ${sizeStyles} ${variantStyles} ${widthStyle} ${className}`}
      {...props}
    >
      {leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>}
      <span>{children}</span>
      {rightIcon && <span className="inline-flex shrink-0">{rightIcon}</span>}
    </button>
  );
}
