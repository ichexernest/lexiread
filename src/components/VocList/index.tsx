'use client';

import VocItem from '@/components/VocItem';
import { Vocabulary  } from '@/types'; // 假設的類型定義

interface VocListProps {
  vocs: Vocabulary[];
  onItemClick: (word: string) => void;
}

export default function VocList({ vocs, onItemClick }: VocListProps) {
  return (
    <div className="w-full">
      {vocs.map((voc) => (
        <VocItem 
          key={voc.publicVocabularyId}
          item={voc}
          handleClick={() => onItemClick(voc.word)}
        />
      ))}
    </div>
  );
}