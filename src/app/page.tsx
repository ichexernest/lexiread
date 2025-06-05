'use client'
import { SignInButton } from '@clerk/nextjs';
import PrimaryButton from '@/components/PrimaryButton';
//import { useRouter } from 'next/navigation';
export default function Start() {
  console.log('`Start` component rendered');
  //const router = useRouter();
  // const handleLogin = () => {
  //   router.push('/Home');
  // };
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-inter)]">
      <p className='text-4xl font-bold'>Lexiread</p>
      <SignInButton mode='modal' ><PrimaryButton>Login</PrimaryButton></SignInButton>
      {/* <PrimaryButton onClick={handleLogin}>Quick Pass</PrimaryButton> */}
    </div>
  );
}
