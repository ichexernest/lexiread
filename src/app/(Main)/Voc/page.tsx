import { Suspense } from 'react';
import VocListContainer from '@/components/VocListContainer';
import LearningDashBoard from '@/components/LearningDashBoard';
import { UserVocabulary } from '@/types';
import { getUserFullVocabularyList } from '@/prisma-db';
import Title from '@/components/Title';
//import { getVocsInitialData } from '@/services/vocService'; // 假設的服務端資料獲取方法

export default async function VocabularyPage() {
  // 在伺服器端獲取初始詞彙數據
  const initialVocs: UserVocabulary[] = await getUserFullVocabularyList(`user_111111111111`); // 假設的用戶ID，實際應根據當前用戶獲取
 
  return (
    <div className="flex flex-col items-center min-h-screen w-full max-w-[720px] mx-auto">
      <Title className="p-10">Saved Vocabularies</Title>
      <Suspense fallback={<div className="w-full h-24 bg-gray-100 animate-pulse rounded-md"></div>}>
        <LearningDashBoard />
      </Suspense>
      <VocListContainer initialVocs={initialVocs} />
    </div>
  );
}