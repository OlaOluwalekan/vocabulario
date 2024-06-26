'use server'

import React from 'react'

import { getWords } from '@/utils/actions/words'
import WordCard from './WordCard'
import WordListClient from './WordListClient'

interface searchParams {
  q: string
  language: string
}

const WordList = async ({ q, language }: searchParams) => {
  // console.log(q)

  const words = await getWords(q, language)

  if (words.length === 0) {
    return <div>No words found</div>
  }

  return <WordListClient words={words} />
}

export const WordListComponent = ({ words }: { words: any[] }) => {
  if (words.length === 0) {
    return <div>No words found</div>
  }

  return <div>WordList</div>
}

export default WordList
