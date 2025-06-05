interface FamiliaritySignProps {
familiarity: number
}

export default function FamiliaritySign({familiarity }:FamiliaritySignProps) {
  const familiarityColor: Record<number, string> = {
    0: 'bg-red-300',
    1: 'bg-yellow-500',
    2: 'bg-yellow-500',
    3: 'bg-green-500',
    4: 'bg-blue-400',
  }
  return (
      <div className={`p-2 w-[8px] h-[8px] rounded-full ${familiarityColor[familiarity]}`}></div>
  );
}