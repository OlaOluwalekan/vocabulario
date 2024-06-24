'use client'

import { addWord } from '@/utils/actions/words'
import InputWithLabel from '../ui/inputs/InputWithLabel'
import PartsOfSpeechOptions from './PartsOfSpeechOptions'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import { useRef, useTransition } from 'react'
import { useRouter } from 'next/navigation'

const AddWordForm = () => {
  const { selectedPOF } = useSelector((store: RootState) => store.general)
  const [isPending, startTransition] = useTransition()
  const formRef = useRef<HTMLFormElement>(null)
  const router = useRouter()

  const handleSubmit = (formData: FormData) => {
    startTransition(() => {
      addWord(formData, selectedPOF).then((res) => {
        if (res.success) {
          if (formRef.current) {
            formRef.current.reset()
          }
          router.push('/')
        }
        // console.log('success')
      })
    })
  }

  return (
    <form
      className='card shadow-xl w-96 mx-auto bg-base-200 mt-3 flex flex-col items-center justify-center px-3 py-5'
      action={handleSubmit}
      ref={formRef}
    >
      <InputWithLabel
        type='text'
        placeholder='Enter the Spanish word'
        label='Spanish word'
        name='spanish'
      />
      <InputWithLabel
        type='text'
        placeholder='Enter the English translation'
        label='English word'
        name='english'
      />
      <div>Part of Speech</div>
      <PartsOfSpeechOptions />
      <div>Gender</div>
      <div>
        <input
          type='radio'
          name='gender'
          id='masculine'
          value='masculine'
          className='mr-1'
        />
        <label htmlFor='masculine' className='mr-2'>
          Masculine
        </label>
        <input
          type='radio'
          name='gender'
          id='feminine'
          value='feminine'
          className='mr-1'
        />
        <label htmlFor='feminine'>Feminine</label>
      </div>
      <InputWithLabel
        type='text'
        placeholder='Enter singular/plural of the spanish word'
        label='Number (Optional)'
        name='number'
      />
      <InputWithLabel
        type='text'
        placeholder='Enter tenses for verbs'
        label='Conjugation (Optional)'
        name='conjugation'
      />
      <button
        type='submit'
        className='btn btn-wide btn-primary my-2'
        disabled={isPending}
      >
        {isPending ? 'Adding...' : 'Add Word'}
      </button>
    </form>
  )
}

export default AddWordForm
