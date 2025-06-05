import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { syncClerkUserToDatabase } from '@/prisma-db';

export default async function SSOCallback() {
  const clerkUser = await currentUser();

  if (!clerkUser) {
    redirect('/sign-in');
  }

  // 同步用戶
  try {
    const { user, isNewUser } = await syncClerkUserToDatabase(clerkUser);

    if (isNewUser) {
      console.log('New user synced:', user.email);
    }
  } catch (error) {
    console.error('Error syncing user:', error);
    // 可導向錯誤頁或提示
    redirect('/error');
  }

  // ❗ 正確方式是 return redirect (但這是個特殊用途 hook，會立即跳轉)
  redirect('/Home');
}