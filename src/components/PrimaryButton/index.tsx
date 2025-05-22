import React from "react";

interface PrimaryButtonProps {
  children?: React.ReactNode;
  onClick?: () => void;
  size?: "sm" | "md";
}

export default function PrimaryButton({
  children,
  onClick,
  size = "sm",
}: PrimaryButtonProps) {

    const sizeStyles = {
    sm: "h-9 px-4 text-sm",
    md: "h-12 px-6 text-base",
  };


  return (
    <button
      onClick={onClick}
      className={`group relative overflow-hidden inline-flex items-center justify-center rounded-full bg-neutral-950 font-medium text-neutral-50 shadow-lg shadow-neutral-500/20 transition active:scale-95 ${sizeStyles[size]}`}
    >
      <span className="absolute h-0 w-0 rounded-full bg-neutral-700 transition-all duration-300 group-hover:h-56 group-hover:w-32" />
      <div className="relative">{children}</div>
    </button>
  );}