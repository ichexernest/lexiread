// app/sso-callback/page.tsx
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { syncClerkUserToDatabase } from '@/prisma-db';

export default async function SSOCallback() {
  const clerkUser = await currentUser();
  
  if (!clerkUser) {
    redirect('/sign-in');
  }

  try {
    // 同步用戶到資料庫
    const { user, isNewUser } = await syncClerkUserToDatabase(clerkUser);
    
    if (isNewUser) {
      console.log('New user synced:', user.email);
      // 可以在這裡做一些新用戶的初始化設定
    }
    
  } catch (error) {
    console.error('Error syncing user:', error);
  }

  // 重導向到主頁面
  redirect('/Home');
}

// Loading 組件
export function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p>Setting up your account...</p>
      </div>
    </div>
  );
}