'use client'
import { useEffect,  useState } from 'react'

interface ProgressCircleProps {
  total: number,
  count: number
}

export default function ProgressCircle({ total, count }: ProgressCircleProps) {
  const percent = total > 0 ? (count / total) * 100 : 0;

  const radius = 54
  const stroke = 8
  const normalizedRadius = radius - stroke / 2
  const circumference = 2 * Math.PI * normalizedRadius

  const [animatedPercent, setAnimatedPercent] = useState(0)

  // 🔄 動畫控制：從 0 到指定 percent
  useEffect(() => {
    const duration = 1000 // 動畫總長 1 秒
    const startTime = performance.now()

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      const current = Math.round(progress * percent)
      setAnimatedPercent(current)
      if (progress < 1) requestAnimationFrame(animate)
    }

    requestAnimationFrame(animate)
  }, [percent])

  const strokeDashoffset = circumference * (1 - animatedPercent / 100)

  return (
    <div className="w-[120px] h-[120px] relative">
      <svg height="120" width="120">
        {/* 背景圓圈 */}
        <circle
          stroke="#e5e7eb"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx="60"
          cy="60"
        />
        {/* 進度圓圈 */}
        <circle
          stroke="#10b981"
          fill="transparent"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          r={normalizedRadius}
          cx="60"
          cy="60"
          transform="rotate(-90 60 60)"
          style={{
            transition: 'stroke-dashoffset 0.3s ease-out',
          }}
        />
      </svg>
      {/* 百分比數字 */}
      <div className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-gray-800">
        {animatedPercent}%
      </div>
    </div>
  )
}