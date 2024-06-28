import WordDetailsCard from '@/components/word/WordDetailsCard'
import { getSpanishWord } from '@/utils/actions/words'
import Link from 'next/link'

interface paramProps {
  word: string
}

interface WordProps {
  id: string
  spanish: string
  english: string[]
  partOfSpeech: string
  gender?: string
  number?: string
  conjugations?: []
  synonyms: []
  antonyms: []
  pronunciation?: string | null
  usageNotes?: string | null
  createdAt: string
  updatedAt: string
}

const WordPage = async ({ params }: { params: paramProps }) => {
  // console.log('PARAMS: ', decodeURIComponent(params.word))
  const word: any = await getSpanishWord(decodeURIComponent(params.word))

  // console.log(word)
  if (!word) {
    return (
      <div className='w-full h-[calc(100vh-100px)] flex flex-col justify-center items-center gap-3'>
        <p>Word does not exist in the database</p>
        <Link
          href='/'
          className='bg-primary text-primary-content px-5 py-3 rounded'
        >
          Go back Home
        </Link>
      </div>
    )
  }

  return (
    <div>
      <WordDetailsCard {...word} />
      {/* test */}
    </div>
  )
}

export default WordPage
