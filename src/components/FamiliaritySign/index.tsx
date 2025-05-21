interface FamiliaritySignProps {
familiarity: number
}

export default function FamiliaritySign({familiarity }:FamiliaritySignProps) {
  const familiarityColor: Record<number, string> = {
    0: 'bg-red-200',
    1: 'bg-red-500',
    2: 'bg-yellow-500',
    3: 'bg-yellow-500',
    4: 'bg-yellow-500',
    5: 'bg-green-500',
  }
  return (
      <div className={`p-2 w-[8px] h-[8px] rounded-full ${familiarityColor[familiarity]}`}></div>
  );
}