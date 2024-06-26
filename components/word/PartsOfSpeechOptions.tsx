'use client'

import { setSelectedPOF } from '@/features/generalSlice'
import { RootState } from '@/store'
import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const partsOfSpeech = [
  { id: 1, name: 'noun', value: 'noun' },
  { id: 2, name: 'pro', value: 'pronoun' },
  { id: 3, name: 'v', value: 'verb' },
  { id: 4, name: 'adj', value: 'adjective' },
  { id: 5, name: 'adv', value: 'adverb' },
  { id: 6, name: 'prep', value: 'preposition' },
  { id: 7, name: 'int', value: 'interjection' },
  { id: 8, name: 'conj', value: 'conjunction' },
  { id: 9, name: 'art', value: 'article' },
]

const PartsOfSpeechOptions = () => {
  const { selectedPOF } = useSelector((store: RootState) => store.general)
  const dispatch = useDispatch()

  const handleChange = (e: any) => {
    if (e.target.checked) {
      dispatch(setSelectedPOF([...selectedPOF, e.target.value]))
    } else {
      const newSelected = selectedPOF.filter((item) => item !== e.target.value)
      dispatch(setSelectedPOF(newSelected))
    }
  }

  useEffect(() => {
    console.log(selectedPOF)
  }, [selectedPOF])

  return (
    <div className='flex gap-2 my-2 flex-wrap justify-center'>
      {partsOfSpeech.map((part) => {
        return (
          <div
            key={part.id}
            className='border border-primary text-sm rounded cursor-pointer'
          >
            <label
              htmlFor={part.value}
              className={clsx(
                'cursor-pointer block w-full px-2',
                selectedPOF.includes(part.value) &&
                  'bg-primary text-primary-content'
              )}
            >
              {part.name}
            </label>
            <input
              type='checkbox'
              name='pof'
              id={part.value}
              // className='hidden'
              value={part.value}
              onChange={handleChange}
              checked={selectedPOF.includes(part.value)}
            />
          </div>
        )
      })}
    </div>
  )
}

export default PartsOfSpeechOptions
