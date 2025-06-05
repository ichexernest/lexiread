import { Vocabulary } from '@/types';
import fetchService from '@/utils/fetch';
import QuizBoard from '@/components/QuizBoard';
import { currentUser } from '@clerk/nextjs/server';

export default async function QuizPage() {
  const clerkUser = await currentUser();
  const initialQuiz: Vocabulary[] = await fetchService.getQuizVocabularyList(clerkUser!.id); 
  console.log('initialQuiz', initialQuiz)

  return (
    <div className="flex flex-col items-center min-h-screen w-full max-w-[720px] mx-auto">
      <h1 className="text-3xl text-black p-10">Quiz</h1>
      <QuizBoard items={initialQuiz}/>
    </div>
  );
}