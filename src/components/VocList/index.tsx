'use client';

import VocItem from '@/components/VocItem';
import { Vocabulary as VocItemType } from '@/types'; // 假設的類型定義

interface VocListProps {
  vocs: VocItemType[];
  onItemClick: (word: string) => void;
}

export default function VocList({ vocs, onItemClick }: VocListProps) {
  return (
    <div className="w-full">
      {vocs.map((voc) => (
        <VocItem 
          key={voc.id}
          item={voc}
          handleClick={() => onItemClick(voc.vocabulary)}
        />
      ))}
    </div>
  );
}