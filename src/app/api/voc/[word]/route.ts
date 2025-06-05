import { addVocabularyToPublic, findVocabularyWithUserProgress } from '@/prisma-db'
import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import fetchService from '@/utils/fetch'


export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ word: string }> }
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
    const { word } = await params;
    const decodedWord = decodeURIComponent(word).toLowerCase().trim();
    
    // 基本輸入驗證
    if (!decodedWord || decodedWord.length === 0) {
      return NextResponse.json(
        { error: 'Word parameter is required' },
        { status: 400 }
      );
    }

    if (decodedWord.length > 50) {
      return NextResponse.json(
        { error: 'Word too long' },
        { status: 400 }
      );
    }

    console.log('Searching for word:', decodedWord);

    // 先檢查是否已存在於資料庫
    const existingVoc = await findVocabularyWithUserProgress(decodedWord,userId);
    
    if (existingVoc) {
      console.log('Found existing vocabulary in database');
      return NextResponse.json(existingVoc);
    }

    // 不存在則從 GPT 獲取
    console.log('Fetching from GPT...');
    const vocFromGPT = await fetchService.getVocabularyFromGPT(decodedWord);
    
    if (!vocFromGPT) {
      return NextResponse.json(
        { error: 'Failed to generate vocabulary data' },
        { status: 500 }
      );
    }

    // 保存到資料庫
    const saveSuccess = await addVocabularyToPublic(vocFromGPT);
    
    if (!saveSuccess) {
      console.error('Failed to save vocabulary to database');
      // 即使保存失敗，仍然返回數據給用戶
    }

    return NextResponse.json(vocFromGPT);
  } catch (error) {
    console.error('Unexpected error in vocabulary API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
