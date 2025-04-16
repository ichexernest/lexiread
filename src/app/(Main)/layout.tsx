
import MainFunctionBar from "@/components/MainFunctionBar";

export default function Layout({ children }: { children: React.ReactNode }) {

  return (
    <div className="relative flex justify-center items-start w-screen h-screen overflow-y-auto">
      <MainFunctionBar />
      {children}
    </div>
  );
}
