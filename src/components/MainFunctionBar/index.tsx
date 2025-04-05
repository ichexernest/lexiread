import { FaAmilia , FaNewspaper } from "react-icons/fa6";
import { AiFillHome } from "react-icons/ai";

export default function MainFunctionBar() {
  
  return (
    <div className="absolute fixed bottom-3 left-0 right-0 flex flex-row justify-center items-center gap-4 p-4 md:left-0 md:flex-col md:right-auto">
    <button className="rounded-full w-[60px] h-[60px] shadow-xl bg-white/40 text-2xl flex justify-center items-center backdrop-blur-lg hover:bg-white/60"><FaAmilia/></button>
    <button className="rounded-full w-[60px] h-[60px] shadow-xl bg-white/40 text-2xl flex justify-center items-center backdrop-blur-lg hover:bg-white/60"><AiFillHome/></button>
    <button className="rounded-full w-[60px] h-[60px] shadow-xl bg-white/40 text-2xl flex justify-center items-center backdrop-blur-lg hover:bg-white/60"><FaNewspaper/></button>
  </div>
  );
}