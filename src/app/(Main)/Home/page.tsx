import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { syncClerkUserToDatabase } from '@/prisma-db';

import ArticleCard from "@/components/ArticleCard";
import fetchService from "@/utils/fetch";
import { Article } from "@/types/article";
import Title from "@/components/Title"; 
import FinishLine from "@/components/FinishLine";

export default async function HomePage() {
  const clerkUser = await currentUser();

  if (!clerkUser) {
    redirect('/sign-in');
  }


  try {
    const { user, isNewUser } = await syncClerkUserToDatabase(clerkUser);
    if (isNewUser) {
      console.log('🆕 New user synced:', user.email);
    }
  } catch (error) {
    console.error('❌ Error syncing user:', error);
    redirect('/error');
  }


  const result: Article[] = await fetchService.getTodayArticles(clerkUser!.id);
  console.log('result', result)

  return (
    <div className="flex flex-col items-center h-screen min-h-screen w-full max-w-[720px] mx-auto">
      <Title className="p-10">Today&apos;s news</Title>
      {result.map((news) => (
        <ArticleCard key={news.publicArticleId} item={news} />
      ))}
      <FinishLine className="w-full pt-10 pb-32" />
    </div>
  );
}
