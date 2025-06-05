import { NextResponse } from 'next/server';
import fetchService from '@/utils/fetch'; // ⬅ 根據你的檔案位置調整

export async function GET() {
  try {
    const result = await fetchService.fetchAndSaveBBCArticles();

    return NextResponse.json({
      success: true,
      message: `共匯入 ${result.length} 篇 BBC 文章`,
    });
  } catch (error: unknown) {
    console.error('fetch-bbc 錯誤:', error);
    return NextResponse.json({ success: false, error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
  }
}