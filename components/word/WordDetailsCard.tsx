'use client'

import { handleSpeak } from '@/utils/actions/speak'
import Link from 'next/link'
import { FaEdit } from 'react-icons/fa'
import { GiSpeaker } from 'react-icons/gi'

interface WordProps {
  spanish: string
  english: string[]
  partOfSpeech: string
  gender: string
  number?: string
}

const WordDetailsCard = ({
  spanish,
  english,
  partOfSpeech,
  gender,
  number,
}: WordProps) => {
  return (
    <div className='card bg-base-100 w-[90%] max-w-[600px] mx-auto mt-10 shadow-xl'>
      <div className='card-body'>
        <section className='flex gap-4 items-center'>
          <h1 className='card-title text-3xl'>{spanish}</h1>
          <button
            className='text-2xl hover:text-primary'
            onClick={() => handleSpeak(spanish)}
          >
            <GiSpeaker />
          </button>
        </section>
        <section className='text-sm italic flex gap-3'>
          <span className='text-red-600'>{partOfSpeech}</span>
          <span className='text-blue-700'>{gender}</span>
        </section>
        <p className='card-text'>{english.join(', ')}</p>

        {number && <p className='card-text'>{number}</p>}

        <article className='flex justify-end'>
          <Link href={`/words/add?edit=${spanish}`}>
            <FaEdit />
          </Link>
        </article>
      </div>
    </div>
  )
}

export default WordDetailsCard
