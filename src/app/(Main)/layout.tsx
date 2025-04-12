'use client'
import MainFunctionBar from "@/components/MainFunctionBar";
//import { usePathname } from "next/navigation";
export default function Layout({ children }: { children: React.ReactNode }) {
  //const pathname:string = usePathname().split("/")[1];
  return (
    <div className="relative flex justify-center items-start w-screen h-screen overflow-y-auto">
      <MainFunctionBar />
      {/* <p className="text-6xl">{pathname}</p> */}
      {children}
    </div>
  );
}
