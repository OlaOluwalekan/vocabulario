'use client'

import { addWord, getSpanishWord } from '@/utils/actions/words'
import InputWithLabel from '../ui/inputs/InputWithLabel'
import PartsOfSpeechOptions from './PartsOfSpeechOptions'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store'
import { useEffect, useRef, useState, useTransition } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import {
  setNotes,
  setSelectedGender,
  setSelectedPOF,
} from '@/features/generalSlice'
import GenderSelect from './GenderSelect'
import MarkdownEditor from './MarkdownEditor'
import KeyBoard from './KeyBoard'

interface wordProps {
  spanish: string
  english: string
  partOfSpeech: string
  gender: string | null
  number: string | null
  conjugations: string
  // usageNotes?: string
}

const AddWordForm = () => {
  const {
    selectedPOF,
    selectedGender,
    note: usageNotes,
  } = useSelector((store: RootState) => store.general)
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
    conjugations: '',
    // usageNotes: ""
  })
  // const [usageNotes, setUsageNotes] = useState('')

  // console.log(edit)

  const handleSubmit = (formData: FormData) => {
    startTransition(() => {
      addWord(formData, selectedPOF, selectedGender, edit, usageNotes).then(
        (res) => {
          if (res.success) {
            if (formRef.current) {
              formRef.current.reset()
              dispatch(setSelectedPOF([]))
              dispatch(setSelectedGender('neuter'))
            }
            if (edit) {
              router.push(`/words/${res.data?.spanish}`)
            } else {
              router.push('/')
            }
          }
        }
      )
    })
  }

  useEffect(() => {
    if (edit) {
      getSpanishWord(edit).then((res) => {
        // console.log(res?.conjugations)
        let formattedConjugation: string = ''
        if (res) {
          if (res.conjugations) {
            const newConjugations = res.conjugations as Array<{}>
            const newConj = newConjugations.map((conj) => {
              const test = Object.entries(conj)[0]
              return `${test[0]}:${test[1]}`
            })
            formattedConjugation = newConj.join(',')
            // console.log('NEW: ', newConj.join(','))
          }

          const {
            spanish,
            english,
            partOfSpeech,
            gender,
            number,
            usageNotes: note,
          } = res
          setWord({
            spanish,
            english,
            partOfSpeech,
            gender,
            number,
            conjugations: formattedConjugation,
          })
          if (note) {
            dispatch(setNotes(note))
          }
        }
      })
    }
  }, [])

  useEffect(() => {
    console.log(usageNotes)
  }, [usageNotes])

  useEffect(() => {
    dispatch(setSelectedPOF(word.partOfSpeech.split(',')))
    dispatch(setSelectedGender(word.gender))
    // console.log(word.english.join(','))
  }, [word])

  return (
    <form
      className='card shadow-xl w-96 mx-auto bg-base-200 mt-3 flex flex-col items-center justify-center px-3 py-5 relative'
      action={handleSubmit}
      ref={formRef}
    >
      <InputWithLabel
        type='text'
        placeholder='Enter the Spanish word'
        label='Spanish word'
        name='spanish'
        value={edit && word.spanish}
        handleChange={(e: any) => setWord({ ...word, spanish: e.target.value })}
      />
      <InputWithLabel
        type='text'
        placeholder='Enter the English translation'
        label='English word'
        name='english'
        value={edit && word.english}
        handleChange={(e: any) => setWord({ ...word, english: e.target.value })}
      />
      <div>Part of Speech</div>
      <PartsOfSpeechOptions />
      <div>Gender</div>
      <GenderSelect />
      <MarkdownEditor initialValue={usageNotes} />
      <InputWithLabel
        type='text'
        placeholder='Enter singular/plural of the spanish word'
        label='Number (Optional)'
        name='number'
        value={edit && (word.number as string)}
        handleChange={(e: any) => setWord({ ...word, number: e.target.value })}
      />
      <InputWithLabel
        type='text'
        placeholder='Enter tenses for verbs'
        label='Conjugation (Optional)'
        name='conjugation'
        value={edit && word.conjugations}
        handleChange={(e: any) =>
          setWord({ ...word, conjugations: e.target.value })
        }
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
      <KeyBoard />
    </form>
  )
}

export default AddWordForm
