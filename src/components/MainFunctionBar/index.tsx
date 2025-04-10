'use client'
import { FaAmilia , FaNewspaper } from "react-icons/fa6";
import { AiFillHome } from "react-icons/ai";
import { FaDoorOpen } from "react-icons/fa";
import { useRouter } from 'next/navigation';

const RoundButton = ({ icon, hint, handleClick }: { icon: React.ReactNode, hint: string, handleClick: () => void }) => (
  <button onClick={handleClick} className="rounded-full w-[60px] h-[60px] shadow-xl bg-white/40 text-2xl flex justify-center items-center backdrop-blur-lg hover:bg-white/60">
    {icon}
  </button>
);

export default function MainFunctionBar() {

  const router = useRouter();
  
  
  return (
    <div className="absolute fixed bottom-3 left-0 right-0 flex flex-row justify-center items-center gap-4 p-4 md:left-0 md:flex-col md:right-auto">
    <RoundButton icon={<FaAmilia />} hint="Vocaularies" handleClick={() => router.push(`/Voc`)}/>
    <RoundButton icon={<AiFillHome />} hint="Home" handleClick={() => router.push(`/Home`)}/>
    <RoundButton icon={<FaNewspaper />} hint="Articles" handleClick={() => router.push(`/Article`)}/>
    <RoundButton icon={<FaDoorOpen />} hint="Logout" handleClick={() => router.push(`/`)}/>
  </div>
  );
}