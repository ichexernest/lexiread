import VocListContainer from '@/components/VocListContainer';
import LearningDashBoard from '@/components/LearningDashBoard';
import { Vocabulary } from '@/types';
import  fetchService  from '@/utils/fetch';
import { currentUser } from '@clerk/nextjs/server';
import Title from '@/components/Title';

export default async function VocabularyPage() {
    const clerkUser = await currentUser();
  const initialVocs: Vocabulary[] = await fetchService.getUserVocabularyPage(clerkUser!.id,1); 
  return (
    <div className="flex flex-col items-center min-h-screen w-full max-w-[720px] mx-auto">
      <Title className="p-10">Saved Vocabularies</Title>
      { initialVocs.length === 0 ? (
        <p className="text-center text-gray-500">No vocabulary saved yet. Start adding some!</p>
      ) : (
        <>
          <LearningDashBoard initialVocs={initialVocs}  />
          <VocListContainer initialVocs={initialVocs} />
        </>
      )}
    </div>
  );
}