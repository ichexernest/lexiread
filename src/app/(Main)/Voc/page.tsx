import VocListContainer from '@/components/VocListContainer';
import LearningDashBoard from '@/components/LearningDashBoard';
import { UserVocabulary } from '@/types';
import { getUserFullVocabularyList } from '@/prisma-db';
import { currentUser } from '@clerk/nextjs/server';
import Title from '@/components/Title';
//import { getVocsInitialData } from '@/services/vocService'; // 假設的服務端資料獲取方法

export default async function VocabularyPage() {
    const clerkUser = await currentUser();
  const initialVocs: UserVocabulary[] = await getUserFullVocabularyList(clerkUser!.id); 
  return (
    <div className="flex flex-col items-center min-h-screen w-full max-w-[720px] mx-auto">
      <Title className="p-10">Saved Vocabularies</Title>
      { initialVocs.length === 0 ? (
        <p className="text-center text-gray-500">No vocabularies saved yet. Start adding some!</p>
      ) : (
        <>
          <LearningDashBoard initialVocs={initialVocs}  />
          <VocListContainer initialVocs={initialVocs} />
        </>
      )}
    </div>
  );
}