'use server'

import React from 'react'

import { getWords } from '@/utils/actions/words'
import WordCard from './WordCard'

const WordList = async () => {
  const words = await getWords()

  if (words.length === 0) {
    return <div>No words found</div>
  }

  return (
    <div>
      {words.map((word) => {
        return (
          <WordCard
            key={word.id}
            spanish={word.spanish}
            english={word.english}
          />
        )
      })}
    </div>
  )
}

export const WordListComponent = ({ words }: { words: any[] }) => {
  if (words.length === 0) {
    return <div>No words found</div>
  }

  return <div>WordList</div>
}

export default WordList
