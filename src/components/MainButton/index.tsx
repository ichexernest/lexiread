import Link from "next/link";
import React from "react";

interface MainButtonProps {
  icon: React.ReactNode;
  hint: string;
  haveHint?: boolean;
  href?: string;
  onClick?: () => void;
}

export default function MainButton({
  icon,
  hint,
  haveHint = true,
  href,
  onClick,
}: MainButtonProps) {
  const ButtonContent = (
    <div className="relative group flex items-center justify-center">
      <div
        className="rounded-full w-[60px] h-[60px] shadow-xl bg-white/40 text-2xl flex justify-center items-center backdrop-blur-lg hover:bg-white/60"
        onClick={onClick}
      >
        {icon}
      </div>

      {haveHint && (
        <div
          className="absolute z-10 whitespace-nowrap text-xs px-2 py-1 rounded text-white bg-black 
          opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none
          top-full mt-2 left-1/2 -translate-x-1/2
          md:top-1/2 md:left-full md:ml-2 md:mt-0 md:-translate-x-0 md:-translate-y-1/2"
        >
          {hint}
        </div>
      )}
    </div>
  );

  return href ? <Link href={href}>{ButtonContent}</Link> : ButtonContent;
}
