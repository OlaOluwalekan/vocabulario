'use client'

import WordCard from './WordCard'

const WordListClient = ({ words }: { words: any[] }) => {
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

export default WordListClient
