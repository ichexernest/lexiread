'use client'
import React from 'react';
import { useRouter } from 'next/navigation';
import PrimaryButton from '@/components/PrimaryButton';
export default function Login() {
  const router = useRouter();
  const handleLogin = () => {
    router.push('/Home');
  };
  const handleForget = () => {
    router.push('/ForgotPassword');
  };
  const handleRegister = () => {
    router.push('/Register');
  };

  return (
    <div className="flex flex-col gap-2 items-center justify-center h-screen text-center">
      <h1 className="text-4xl font-bold mb-5">Login</h1>
      <PrimaryButton onClick={handleLogin}>Login</PrimaryButton>
      <PrimaryButton onClick={handleForget}>Forget Password</PrimaryButton>
      <PrimaryButton onClick={handleRegister} >Register</PrimaryButton>
    </div>
  );
}