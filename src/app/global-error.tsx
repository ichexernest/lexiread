'use client';
export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <html>
      <head>
        <title>Something went wrong!</title>
      </head>
      <body className="flex flex-col items-center justify-center min-h-screen p-24 text-center">
        <h2 className="text-2xl font-bold">Something went GLOBAL wrong!</h2>
        <p className="mt-4 text-lg">{error.message}</p>
        <button
          onClick={() => reset()}
          className="mt-8 px-4 py-2 bg-blue-600 text-white rounded"
        >
          Try Again
        </button>
      </body>
    </html>
  );
}