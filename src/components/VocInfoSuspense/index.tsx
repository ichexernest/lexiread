'use client'

import React, { Suspense } from 'react'
import { FaTimes } from 'react-icons/fa'

interface WordInfoSuspenseProps {
  word: string;
  onClose: () => void;
  children: React.ReactNode;
}

export default function VocInfoSuspense({ word, onClose, children }: WordInfoSuspenseProps) {
  return (
    <div className="sticky bottom-4 mt-4 py-24 px-4 shadow-lg rounded-xl bg-white/40 backdrop-blur-lg w-full max-w-3xl mx-auto relative">
      <button className="absolute top-4 right-4" onClick={onClose} type="button">
        <FaTimes />
      </button>
      <Suspense fallback={<p className="text-gray-500">查詢「{word}」中...</p>}>
        {children}
      </Suspense>
    </div>
  );
}