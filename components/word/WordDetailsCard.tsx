'use client'

import { handleSpeak } from '@/utils/actions/speak'
import { deleteSpanishWord } from '@/utils/actions/words'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FaEdit, FaTrash } from 'react-icons/fa'
import { GiSpeaker } from 'react-icons/gi'
import MarkDown from 'react-markdown'

interface WordProps {
  spanish: string
  english: string[]
  partOfSpeech: string
  gender: string
  number?: string
  conjugations?: []
  usageNotes?: string
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
  usageNotes,
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
          {number && <span className='text-teal-600'>{number}</span>}
        </section>
        <p className='card-text'>{english}</p>

        {conjugations &&
          conjugations.map((conjugation: MyObject) => {
            const [property, value] = Object.entries(conjugation)[0]

            return (
              <article key={property}>
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

        <div>
          <MarkDown
            components={{
              a({ children, ...props }) {
                return (
                  <Link
                    href={props.href as string}
                    {...props}
                    className='text-primary underline'
                  >
                    {children}
                  </Link>
                )
              },
              code({ children, ...props }) {
                return (
                  <code
                    {...props}
                    className='bg-blue-200 px-1 rounded italic cursor-pointer'
                    onMouseOver={() => handleSpeak(children as string)}
                  >
                    {children}
                  </code>
                )
              },
            }}
          >
            {usageNotes}
          </MarkDown>
        </div>

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
