'use client'
import React from 'react';
import { useRouter } from 'next/navigation';
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
            <button onClick={handleLogin} className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto">
        Login
      </button>
      <button onClick={handleForget} className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto">
        Forget Password
      </button>
      <button onClick={handleRegister} className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto">
        Register
      </button>
        </div>
    );    
}