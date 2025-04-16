'use client'

interface ClickableWordProps {
  word: string;
  onClick: (word: string) => void;
}

export default function ClickableWord({ word, onClick }: ClickableWordProps) {
  return (
    <span
      className="inline-block cursor-pointer hover:bg-blue-100 px-0.5 rounded transition-colors"
      onClick={() => onClick(word)}
    >
      {word}
    </span>
  )
}