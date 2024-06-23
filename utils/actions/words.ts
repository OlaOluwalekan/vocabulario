'use server'

import { db } from '../db'

export const getWords = async () => {
  const params = ''
  const words = await db.word.findMany({
    where: {
      spanish: params,
    },
  })

  return words
  //   console.log('WORDS: ', words)
}
