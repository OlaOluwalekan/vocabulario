'use client'

import { handleSpeak } from '@/utils/actions/speak'
import Link from 'next/link'
import { GiSpeaker } from 'react-icons/gi'

interface WordCardProps {
  spanish: string
  english: string
}

const WordCard = ({ spanish, english }: WordCardProps) => {
  return (
    <div className='card bg-base-100 w-full my-2 py-0 hover:shadow-xl hover:bg-base-200'>
      <div className='card-body py-2'>
        <section className='flex gap-3'>
          <Link href={`words/${spanish}`} className='card-title'>
            {spanish}
          </Link>
          <button className='text-xl' onClick={() => handleSpeak(spanish)}>
            <GiSpeaker />
          </button>
        </section>
        <p>{english}</p>
      </div>
    </div>
  )
}

export default WordCard
