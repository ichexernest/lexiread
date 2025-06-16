'use client'

import React from 'react'
import { FaTimes } from 'react-icons/fa'
import VocInfo from "@/components/VocInfo"

interface VocCardProps {
  word: string;
  onClose: () => void;
}

export default function VocCard({ word, onClose }: VocCardProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 flex justify-center">
      <div className="py-6 px-6 shadow-lg rounded-t-xl bg-white/70 backdrop-blur-lg w-full max-w-3xl mx-auto relative">
        <button 
          className="absolute top-4 right-4" 
          onClick={onClose} 
          type="button"
          aria-label="Close vocabulary information"
        >
          <FaTimes />
        </button>
          <VocInfo word={word} />
      </div>
    </div>
  );
}