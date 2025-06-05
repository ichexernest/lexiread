import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import ClearQuizCookie from '@/components/ClearQuizCookie'
import Link from 'next/link'
import PrimaryButton from '@/components/PrimaryButton'

export default async function ResultPage({ searchParams }: { searchParams: Promise<{ words?: string }> }) {
  const { words } = await searchParams
  const wordlist = (words ?? '').split(',').filter(Boolean)

const cookie = (await cookies()).get('quizComplete')?.value
if (!cookie) {
  redirect('/Home')
}


  return (
    <div className="flex flex-col items-center h-screen max-w-[720px]">
      <p className="text-3xl text-black p-10">🎉 Quiz complete!</p>
      <ClearQuizCookie />
      <div className="flex flex-col justify-center items-center w-full pt-10 pb-32">
        <p className="my-5 text-3xl">{wordlist.length} words you have improved.</p>
        <p className="my-2">Words you&apos;ve learned：</p>
        <div className='flex flex-wrap justify-center gap-2 mt-2'>
          {wordlist.map((word, idx) => (
            <p key={idx} className="text-lg text-gray-800">{word}{idx < wordlist.length - 1 && ', '}</p>
          ))}
        </div>
        <Link href="/Voc" className="mt-6"><PrimaryButton>Back</PrimaryButton></Link>
      </div>
    </div>
  )
}