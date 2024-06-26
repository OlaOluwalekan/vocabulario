'use client'

import { addWord, getSpanishWord } from '@/utils/actions/words'
import InputWithLabel from '../ui/inputs/InputWithLabel'
import PartsOfSpeechOptions from './PartsOfSpeechOptions'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store'
import { useEffect, useRef, useState, useTransition } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { setSelectedPOF } from '@/features/generalSlice'
import GenderSelect from './GenderSelect'

interface wordProps {
  spanish: string
  english: string
  partOfSpeech: string
  gender: string | null
  number: string | null
  conjugations: any
}

const AddWordForm = () => {
  const { selectedPOF, selectedGender } = useSelector(
    (store: RootState) => store.general
  )
  const [isPending, startTransition] = useTransition()
  const formRef = useRef<HTMLFormElement>(null)
  const router = useRouter()
  const searchParams = useSearchParams()
  const edit = searchParams.get('edit') || undefined
  const dispatch = useDispatch()
  const [word, setWord] = useState<wordProps>({
    spanish: '',
    english: '',
    partOfSpeech: '',
    gender: '',
    number: '',
    conjugations: [],
  })

  // console.log(edit)

  const handleSubmit = (formData: FormData) => {
    startTransition(() => {
      addWord(formData, selectedPOF, selectedGender, edit).then((res) => {
        if (res.success) {
          if (formRef.current) {
            formRef.current.reset()
            dispatch(setSelectedPOF([]))
          }
          // if (edit) {
          //   router.push(`/words/${res.data?.spanish}`)
          // } else {
          //   router.push('/')
          // }
        }
      })
    })
  }

  useEffect(() => {
    if (edit) {
      getSpanishWord(edit).then((res) => {
        // console.log(res)
        if (res) {
          const {
            spanish,
            english,
            partOfSpeech,
            gender,
            number,
            conjugations,
          } = res
          setWord({
            spanish,
            english,
            partOfSpeech,
            gender,
            number,
            conjugations,
          })
        }
      })
    }
  }, [])

  // useEffect(() => {
  //   dispatch(setSelectedPOF(word.partOfSpeech.split(',')))
  //   // console.log(word.english.join(','))
  // }, [word])

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
        // value={edit && word.spanish}
        // handleChange={(e: any) => setWord({ ...word, spanish: e.target.value })}
      />
      <InputWithLabel
        type='text'
        placeholder='Enter the English translation'
        label='English word'
        name='english'
        // value={edit && word.english}
        // handleChange={(e: any) => setWord({ ...word, english: e.target.value })}
      />
      <div>Part of Speech</div>
      <PartsOfSpeechOptions />
      <div>Gender</div>
      <GenderSelect />
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
        {edit
          ? isPending
            ? 'Updating...'
            : 'Update'
          : isPending
          ? 'Adding...'
          : 'Add'}
      </button>
    </form>
  )
}

export default AddWordForm
