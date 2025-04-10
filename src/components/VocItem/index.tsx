import { Vocabulary } from "@/types";

export default function VocItem({item, handleClick}:{item: Vocabulary, handleClick: () => void}) {
  const familiarityColor: Record<number, string> = {
    1: 'bg-green-500',
    2: 'bg-yellow-500',
    3: 'bg-red-500',
  }
  return (
  <div onClick={handleClick} className="flex items-center justify-between py-5 w-full border-b border-[#dcccba] gap-2 px-3 hover:bg-[#dcccba]">
    
    <div className="flex items-center justify-start py-5gap-2">

    <p className="font-bold"><span className="text-xl font-bold">{item.vocabulary}</span></p>
    <p className="font-bold"><span className="text-sm">{item.localizeMeaning}</span></p>
      </div>
      <div className={`p-2 rounded-full ${familiarityColor[item.familiarity]}`}></div>

      </div>
  );
}