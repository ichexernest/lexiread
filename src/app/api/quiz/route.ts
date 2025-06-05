import { NextRequest, NextResponse } from 'next/server'
import fetchService from '@/utils/fetch'

export async function POST(request: NextRequest) {
  try {
    const results = await request.json()
    console.log('QUIZ request body:', results)

    const updateResult = await fetchService.updateFamiliarity(results)

    const response = updateResult.success
      ? NextResponse.json({
          message: 'Quiz results processed successfully',
          processedCount: updateResult.processedCount
        })
      : NextResponse.json({
          error: updateResult.error || 'Failed to process quiz results'
        }, { status: 400 })

    // ✅ 在這裡設 cookie 才會有效
    response.cookies.set('quizComplete', 'yes', {
      path: '/',
      httpOnly: false,
      maxAge: 180, // 十分鐘
    })

    return response

  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json({
      error: 'Internal server error'
    }, { status: 500 })
  }
}
