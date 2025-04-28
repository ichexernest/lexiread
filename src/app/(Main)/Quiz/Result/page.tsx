import { notFound } from 'next/navigation'
import Link from 'next/link'
import { cookies } from 'next/headers'

export default async function ResultPage({ searchParams }:  { searchParams: Promise<{ words?: string }> }) {
  const {words} = await searchParams
  const wordlist = (words ?? '').split(',').filter(Boolean)
  const cookie = (await cookies()).get('quizComplete')?.value

  console.log(`cookie: ${cookie}`)

  if (!cookie || wordlist.length === 0) {
    return notFound()
  }


  if (wordlist.length === 0) return notFound()


  return (
    <div className="flex flex-col items-center h-screen max-w-[720px]">
    <p className="text-3xl text-black p-10">🎉 Quiz complete!</p>

    
    <div className="flex flex-col justify-center items-center w-full pt-10 pb-32">
    <p className="my-5 text-3xl">{wordlist.length} words you have improved.</p>
    <p className="my-2">Words you've learned：</p>
    <div className='flex'>
    {wordlist.map((word, idx) => (
          <p key={idx}>{word}{idx < wordlist.length-1 && ', '}</p>
        ))}
    </div>
    <Link
    href="/Voc"
    className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
  >
    Back
  </Link>
    </div>
  </div>

  )
}
