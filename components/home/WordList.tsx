'use server'

import { getWords } from '@/utils/actions/words'

const WordList = async () => {
  const words = await getWords()

  if (words.length === 0) {
    return <div>No words found</div>
  }

  return <div>WordList</div>
}

export default WordList
