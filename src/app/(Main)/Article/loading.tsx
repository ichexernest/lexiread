import LoadingAnimation from "@/components/LoadingAnimation"


export default function Loading() {
  return (
    <div className="flex justify-center items-center w-screen h-screen overflow-hidden">
      <LoadingAnimation />
    </div>
  )
}
