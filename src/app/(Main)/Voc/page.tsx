import { Suspense } from 'react';
import VocListContainer from '@/components/VocListContainer';
import LearningDashBoard from '@/components/LearningDashBoard';
import { Vocabulary } from '@/types';
//import { getVocsInitialData } from '@/services/vocService'; // 假設的服務端資料獲取方法

export default async function VocabularyPage() {
  // 在伺服器端獲取初始詞彙數據
  //const initialVocs = await getVocsInitialData();
  const initialVocs: Vocabulary[] = [
    {
      "id": "63cf470d",
      "vocabulary": "umbrella",
      "addDate": "2023-09-13",
      "meaning": "a device for protection from rain",
      "localizeMeaning": "(n.) 雨傘",
      "example": "She opened her umbrella during the downpour.",
      "familiarity": 3,
      "saved": true
    },
    {
      "id": "43fc2acb",
      "vocabulary": "eagle",
      "addDate": "2023-01-29",
      "meaning": "a large bird of prey",
      "localizeMeaning": "(n.) 老鷹",
      "example": "The eagle soared high above.",
      "familiarity": 1,
      "saved": true
    },
  ]
  
  return (
    <div className="flex flex-col items-center min-h-screen w-full max-w-[720px] mx-auto">
      <h1 className="text-3xl text-black p-10">Saved Vocabularies</h1>
      
      <Suspense fallback={<div className="w-full h-24 bg-gray-100 animate-pulse rounded-md"></div>}>
        <LearningDashBoard />
      </Suspense>
      
      <VocListContainer initialVocs={initialVocs} />
    </div>
  );
}