'use server'

import { revalidatePath } from 'next/cache'
import { db } from '../db'

export const getWords = async (q: string, lang: string) => {
  let language = lang

  if (!lang) {
    language = 'spanish'
  }

  const words = await db.word.findMany({
    where: {
      [language]: {
        contains: q,
        mode: 'insensitive',
      },
    },
    orderBy: {
      spanish: 'desc',
    },
  })

  return words
}

export const addWord = async (
  formData: FormData,
  pof: string[],
  gender: string,
  edit?: string
) => {
  const spanish = formData.get('spanish') as string
  const english = formData.get('english') as string
  let partOfSpeech: string | string[] = pof.filter((item) => {
    return item !== ''
  })
  partOfSpeech = partOfSpeech.join(',')
  const number = formData.get('number') as string
  const conjugal = formData.get('conjugation') as string

  let conjugations: { [key: string]: string }[] = []

  if (conjugal) {
    const newConjugation = conjugal.split(',')
    conjugations = newConjugation.map((item) => {
      const newItem = item.split(':')
      const newObj: { [key: string]: string } = {}
      newObj[newItem[0]] = newItem[1]
      return newObj
    })
  }

  try {
    if (edit) {
      const res = await db.word.update({
        where: {
          spanish: edit,
        },
        data: {
          spanish,
          english,
          partOfSpeech,
          gender,
          number,
          conjugations,
        },
      })
      revalidatePath('/')
      return { success: true, message: 'word updated successfully', data: res }
    }
    const existingWord = await getSpanishWord(spanish)
    if (existingWord) {
      console.log('WORD ALREADY EXIST')

      return {
        success: false,
        message: 'word already in vocabulary',
        data: existingWord,
      }
    }
    const res = await db.word.create({
      data: {
        spanish,
        english,
        partOfSpeech,
        gender,
        number,
        conjugations,
        synonyms: '',
        antonyms: '',
      },
    })
    revalidatePath('/')
    return { success: true, message: 'word added successfully', data: res }
    console.log(
      'SPANISH',
      spanish,
      'ENGLISH',
      english,
      'POF',
      partOfSpeech,
      'GENDER',
      gender
      // number,
      // conjugations
    )
  } catch (error: any) {
    return { success: false, message: error.message, data: null }
  }

  // console.log(pof, partOfSpeech)

  return { success: false, message: 'error.message', data: null }
}

export const getSpanishWord = async (spanish: string) => {
  const word = await db.word.findUnique({
    where: {
      spanish,
    },
  })
  return word
}
