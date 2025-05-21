
interface FinishLineProps {
className?: string
}
export default function FinishLine({ className }: FinishLineProps) {
    return (
        <div className={`flex justify-center items-center ${className}`}>
          <p className="text-sm font-bold">Lexiread</p>
        </div>
    );
  }