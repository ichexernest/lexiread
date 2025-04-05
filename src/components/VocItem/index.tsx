import { Vocabulary } from "@/types";

export default function VocItem({item}:{item: Vocabulary}) {
  const familiarityColor: Record<number, string> = {
    1: 'bg-green-500',
    2: 'bg-yellow-500',
    3: 'bg-red-500',
  }
  return (
  <div className="flex items-center justify-between py-5 w-full border-b gap-2">
    
    <div className="flex items-center justify-start py-5gap-2">

    <p className="font-bold"><span className="text-xl font-bold">{item.vocabulary}</span></p>
    <p className="font-bold"><span className="text-sm">{item.localizeMeaning}</span></p>
      </div>
      <div className={`p-2 rounded-full ${familiarityColor[item.familiarity]}`}></div>

      </div>
  );
}