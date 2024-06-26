import WordDetailsCard from '@/components/word/WordDetailsCard'
import { getSpanishWord } from '@/utils/actions/words'

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

  return (
    <div>
      <WordDetailsCard {...word} />
    </div>
  )
}

export default WordPage
