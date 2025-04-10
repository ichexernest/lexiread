'use client';

import { useRouter } from 'next/navigation';
import { FaArrowLeft } from "react-icons/fa";

export default function BackButton() {
  const router = useRouter();

  return (
    <div className="absolute fixed top-3 left-0 right-0 flex flex-row justify-center items-center gap-4 p-4 md:left-0 md:flex-col md:right-auto">
    <button  onClick={() => router.back()} className="rounded-full w-[60px] h-[60px] shadow-xl bg-white/40 text-2xl flex justify-center items-center backdrop-blur-lg hover:bg-white/60"><FaArrowLeft/></button>
  </div>
  );
}