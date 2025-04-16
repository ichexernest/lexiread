'use client';

import { useRouter } from 'next/navigation';
import { FaArrowLeft } from "react-icons/fa";
import MainButton from '../MainButton';

export default function BackButton() {
  const router = useRouter();

  return (
    <div className="fixed top-3 left-0 right-0 flex justify-center items-center gap-4 p-4 md:left-0 md:flex-col md:right-auto">
      <MainButton icon={<FaArrowLeft />} hint="Back" haveHint={true} onClick={() => router.back()} />
    </div>
  );
}
