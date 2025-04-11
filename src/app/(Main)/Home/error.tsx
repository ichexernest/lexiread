'use client'
import { useRouter } from "next/navigation";
import { startTransition } from "react";
export default function ErrorBoundary({ error , reset }: { error: Error; reset: () => void }) {   
    const router = useRouter();
    const reload = () => { 
        startTransition(() => {
            router.refresh()
            reset()
        })
    }
    return (    
        <div className="flex flex-col items-center justify-center h-screen text-center">    
            <h1 className="text-4xl font-bold">Something went wrong </h1>
            <p className="mt-4 text-lg">{error.message}, Please try again later</p>
            <button className="mt-4 px-4 py-2 text-white bg-blue-500 rounded" onClick={reload}>Try again</button>
        </div>
    );
}

