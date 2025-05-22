
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import Title from "@/components/Title"; 
import SettingsClient from '@/components/SettingClient';

export default async function Settings() {
  const user = await currentUser();
  
  if (!user) {
    redirect('/sign-in');
  }

  // 準備用戶資料
  const userData = {
    id: user.id,
    fullName: user.fullName ?? undefined,
    imageUrl: user.imageUrl,
    emailAddresses: user.emailAddresses.map(email => ({
      id: email.id,
      emailAddress: email.emailAddress,
      verification: {
        status: email.verification?.status || null,
        strategy: email.verification?.strategy || null
      }
    })),
    externalAccounts: user.externalAccounts.map(account => ({
      id: account.id,
      provider: account.provider,
      emailAddress: account.emailAddress || null,
      username: account.username || null
    })),
    hasPassword: user.passwordEnabled || false
  };
  return(
          <div className="flex flex-col items-center h-screen min-h-screen w-full max-w-[720px] mx-auto">
            <Title className="p-10">Settings</Title>
            <SettingsClient userData={userData} />
          </div>
  );
}