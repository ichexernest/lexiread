
interface TitleProps {
children: React.ReactNode, 
className?: string 
}
export default function Title({ children, className }: TitleProps) {
  return (
<p className={`text-3xl text-black font-bold ${className}`}>{children}</p>
  );
}