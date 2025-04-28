export default function Title({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
<p className={`text-3xl text-black font-bold ${className}`}>{children}</p>
  );
}