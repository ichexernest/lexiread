import PrimaryButton from '@/components/PrimaryButton';
import { UserProfile } from '@clerk/nextjs';
import { SignOutButton } from '@clerk/nextjs';
export default function Setting() {

  return (
    <div className="flex flex-col gap-2 items-center justify-center h-screen text-center">
      <h1 className="text-4xl font-bold mb-5">Settings</h1>
      <UserProfile path='/Setting' />
      <SignOutButton><PrimaryButton>Logout</PrimaryButton></SignOutButton>
    </div>
  );
}