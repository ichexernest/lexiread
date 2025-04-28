import { UserVocabulary } from "@/types";

export default function VocItem({item, handleClick}:{item: UserVocabulary, handleClick: () => void}) {
  const familiarityColor: Record<number, string> = {
    0: 'bg-red-200',
    1: 'bg-red-500',
    2: 'bg-yellow-500',
    3: 'bg-yellow-500',
    4: 'bg-yellow-500',
    5: 'bg-green-500',
  }
  return (
  <div onClick={handleClick} className="flex items-center justify-between py-5 w-full border-b border-[#dcccba] gap-2 px-3 hover:bg-[#dcccba]">
    
    <div className="flex items-center justify-start py-5gap-2">

    <p className="font-bold"><span className="text-xl font-bold">{item.word}</span></p>
    <p className="font-bold"><span className="text-sm">{item.localDefinition}</span></p>
      </div>
      <div className={`p-2 rounded-full ${familiarityColor[item.familiarity]}`}></div>
      </div>
  );
}