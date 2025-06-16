import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import fetchService from '@/utils/fetch'


export async function GET(
  request: NextRequest 
) {
  try {
       // 獲取當前用戶認證信息
    const { userId } = await auth()
    
    // 檢查用戶是否已登入
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized - Please log in' },
        { status: 401 }
      )
    }
  const pageParam = request.nextUrl.searchParams.get('page')
    const page = Number(pageParam) || 1

    const vocs = await fetchService.getUserVocabularyPage(userId,page);
    
    if (!vocs) {
      return NextResponse.json(
        { error: 'Failed to get vocabulary data' },
        { status: 500 }
      );
    }



    return NextResponse.json(vocs);
  } catch (error) {
    console.error('Unexpected error in vocabulary API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
