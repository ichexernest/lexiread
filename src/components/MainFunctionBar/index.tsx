'use client'
import { FaAmilia , FaNewspaper } from "react-icons/fa6";
import { AiFillHome } from "react-icons/ai";
import { FaDoorOpen } from "react-icons/fa";
import Link from "next/link";
import { usePathname } from "next/navigation";

const RoundButton = ({ icon, hint }: { icon: React.ReactNode, hint: string }) => (
  <button className="rounded-full w-[60px] h-[60px] shadow-xl bg-white/40 text-2xl flex justify-center items-center backdrop-blur-lg hover:bg-white/60">
    {icon}
  </button>
);

export default function MainFunctionBar() {
  const link = [
    {href:"/Home", icon:<AiFillHome />, hint:"Home"},
    {href:"/Voc", icon:<FaAmilia />, hint:"Vocaularies"},
    {href:"/Article", icon:<FaNewspaper />, hint:"Articles"},
    {href:"/Login", icon:<FaDoorOpen />, hint:"Logout"}
  ];
  const pathname:string = usePathname();
  return (
    <div className="absolute fixed bottom-3 left-0 right-0 flex flex-row justify-center items-center gap-4 p-4 md:left-0 md:flex-col md:right-auto">
      {link.map((item) => {
        const isActive = pathname === item.href || (pathname.startsWith(item.href));
        if (isActive) return null;
        return (
          <Link href={item.href} key={item.href}>
            <RoundButton icon={item.icon} hint={item.hint} />
          </Link>
        );})}
  </div>
  );
}