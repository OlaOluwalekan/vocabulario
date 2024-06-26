'use server'

import { revalidatePath } from 'next/cache'
import { db } from '../db'

export const getWords = async () => {
  const params = ''
  const words = await db.word.findMany()

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
  const partOfSpeech = pof.join(',')
  // const gender = formData.get('gender') as string
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
    const res = await db.word.create({
      data: {
        spanish,
        english,
        partOfSpeech,
        number,
        conjugations,
        synonyms: '',
        antonyms: '',
      },
    })
    revalidatePath('/')
    return { success: true, message: 'word added successfully', data: res }
  } catch (error: any) {
    return { success: false, message: error.message, data: null }
  }
  // console.log(spanish, english, partOfSpeech, gender, number, conjugations)
  // console.log(pof, partOfSpeech)

  return { success: false, message: 'error.message', data: null }
}

export const getSpanishWord = async (spanish: string) => {
  const word = await db.word.findFirst({
    where: {
      spanish,
    },
  })
  return word
}
