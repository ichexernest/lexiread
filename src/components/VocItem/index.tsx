import { Vocabulary } from "@/types";
import FamiliaritySign from "../FamiliaritySign";

interface VocItemProps {item: Vocabulary, handleClick: () => void}

export default function VocItem({item, handleClick}: VocItemProps) {
  return (
  <div onClick={handleClick} className="flex items-center justify-between py-5 w-full border-b border-primary-hover gap-2 px-3 hover:bg-primary-hover cursor-pointer">
    
    <div className="flex items-center justify-start py-5 gap-2">

    <p className="font-bold"><span className="text-xl font-bold">{item.word}</span></p>
      </div>
      <FamiliaritySign familiarity={item.familiarity!} />
      </div>
  );
}