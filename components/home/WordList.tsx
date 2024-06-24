'use server'

import React from 'react'

import { getWords } from '@/utils/actions/words'

const WordList = async () => {
  const words = await getWords()

  if (words.length === 0) {
    return <div>No words found</div>
  }

  return (
    <div>
      {words.map((word) => {
        return (
          <div key={word.id} className='border-t-2'>
            <p>{word.spanish}</p>
            <p>{word.english}</p>
          </div>
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
