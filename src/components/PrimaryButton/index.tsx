import React from "react";

interface PrimaryButtonProps {
    children?: React.ReactNode;
    onClick?: () => void;
}

export default function PrimaryButton({
    children,
  onClick
}: PrimaryButtonProps) {


  return <button onClick={onClick} className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-content text-white gap-2 hover:bg-gray-800 dark:hover:bg-gray-300 font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto">
  {children}
</button>
}
