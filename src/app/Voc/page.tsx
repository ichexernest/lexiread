'use client';
import { useState, useEffect, useRef, useCallback } from "react";
import VocItem from "@/components/VocItem";
import VocCard from "@/components/VocCard";
import MainFunctionBar from "@/components/MainFunctionBar";
import { useVocs } from "@/hooks/useVocs";
import { FaSpinner } from "react-icons/fa";
import LearningDashBoard from "@/components/LearningDashBoard";

export default function VocPage() {
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const { data: vocs, loading, loadMore, hasMore } = useVocs();
  const observerRef = useRef<HTMLDivElement>(null);

  // IntersectionObserver → 當元素出現在畫面中就觸發 loadMore()
  useEffect(() => {
    if (!hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      {
        rootMargin: "200px", // 提前觸發
      }
    );

    if (observerRef.current) observer.observe(observerRef.current);

    return () => {
      if (observerRef.current) observer.unobserve(observerRef.current);
    };
  }, [observerRef.current, hasMore, loadMore]);

  return (
    <div className="relative flex justify-center items-start w-screen h-screen overflow-y-auto">
      <MainFunctionBar />
      <div className="flex flex-col items-center h-screen w-[720px]">
        <p className="text-3xl text-black p-10">Saved Vocabularies</p>
        <LearningDashBoard /> 

        {vocs?.map((voc) => (
          <VocItem key={voc.id} item={voc} handleClick={() => setSelectedWord(voc.vocabulary)} />
        ))}

        {loading && <div>
          <FaSpinner className="animate-spin text-4xl my-5 text-gray-500" />
          </div>}
        {selectedWord && (
          <VocCard selectedWord={selectedWord} onClose={() => setSelectedWord(null)} />
        )}

        <div ref={observerRef} className="h-12" />
        {!hasMore && (
          <div className="flex justify-center items-center w-full pt-10 pb-32">
            <p className="text-lg">That&apos;s all</p>
          </div>
        )}
      </div>
    </div>
  );
}
