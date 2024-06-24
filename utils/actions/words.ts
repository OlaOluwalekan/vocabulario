'use server'

import { revalidatePath } from 'next/cache'
import { db } from '../db'

export const getWords = async () => {
  const params = ''
  const words = await db.word.findMany()

  // console.log(words)

  return words
}

export const addWord = async (formData: FormData, pof: string[]) => {
  const spanish = formData.get('spanish') as string
  const english = (formData.get('english') as string).split(',')
  const partOfSpeech = pof.join(',')
  const gender = formData.get('gender') as string
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
    await db.word.create({
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
    return { success: true, message: 'word added successfully' }
  } catch (error: any) {
    return { success: false, message: error.message }
  }

  // console.log(
  //   'FORM DATA: ',
  //   english,
  //   spanish,
  //   partOfSpeech,
  //   gender,
  //   number,
  //   conjugations
  // )
}
