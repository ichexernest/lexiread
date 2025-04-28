// app/api/set-quiz-cookie/route.ts
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST() {
    const cookieStore = await cookies()
    cookieStore.set('quizComplete', 'true', { httpOnly: true, maxAge: 60 * 3 });
  return NextResponse.json({ success: true })
}
