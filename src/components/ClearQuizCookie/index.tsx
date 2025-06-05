'use client'
import { useEffect } from 'react'

export default function ClearQuizCookie() {
  useEffect(() => {
    document.cookie = 'quizComplete=; Max-Age=0; path=/';
  }, [])

  return null
}