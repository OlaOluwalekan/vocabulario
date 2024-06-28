'use client'

import { handleSpeak } from '@/utils/actions/speak'
import { deleteSpanishWord } from '@/utils/actions/words'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FaEdit, FaTrash } from 'react-icons/fa'
import { GiSpeaker } from 'react-icons/gi'

interface WordProps {
  spanish: string
  english: string[]
  partOfSpeech: string
  gender: string
  number?: string
  conjugations?: []
}

interface MyObject {
  [key: string]: string
}

const WordDetailsCard = ({
  spanish,
  english,
  partOfSpeech,
  gender,
  number,
  conjugations,
}: WordProps) => {
  const router = useRouter()

  const handleDelete = async () => {
    await deleteSpanishWord(spanish)
    router.push('/')
  }

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
        <p className='card-text'>{english}</p>

        {number && <p className='card-text'>{number}</p>}

        {conjugations &&
          conjugations.map((conjugation: MyObject) => {
            const [property, value] = Object.entries(conjugation)[0]

            return (
              <article>
                <span>{property}: </span>{' '}
                <Link
                  href={`/words/${value}`}
                  className='underline text-primary'
                >
                  {value}
                </Link>
              </article>
            )
          })}

        <article className='flex justify-end gap-5'>
          <Link href={`/words/add?edit=${spanish}`} title='Edit word'>
            <FaEdit />
          </Link>
          <button
            className='text-red-600'
            title='Delete word'
            onClick={handleDelete}
          >
            <FaTrash />
          </button>
        </article>
      </div>
    </div>
  )
}

export default WordDetailsCard
