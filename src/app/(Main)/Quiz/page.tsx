import { UserVocabulary } from '@/types';
import { getUserFullVocabularyList } from '@/prisma-db';
import QuizBoard from '@/components/QuizBoard';

export default async function QuizPage() {

  const initialQuiz: UserVocabulary[] = await getUserFullVocabularyList(`user_111111111111`); // 假設的用戶ID，實際應根據當前用戶獲取

  return (
    <div className="flex flex-col items-center min-h-screen w-full max-w-[720px] mx-auto">
      <h1 className="text-3xl text-black p-10">Quiz</h1>
      <QuizBoard items={initialQuiz}/>
    </div>
  );
}