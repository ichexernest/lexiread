import { FaTimes } from "react-icons/fa";


export default function VocCard({selectedWord, onClose}:{selectedWord: string, onClose: () => void}) {
  
  return (
    <div className="sticky bottom-4 mt-4 py-24 px-4 shadow-lg rounded-xl bg-white/40 backdrop-blur-lg w-[720px] mx-auto">
    <button className="absolute top-4 right-4" onClick={onClose} type="button"><FaTimes /></button>
    <p className="font-bold">選中的單字: <span className="text-blue-600">{selectedWord}</span></p>
  </div>
  );
}