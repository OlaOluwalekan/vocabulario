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
  return (
    <div className='flex gap-2 my-2 flex-wrap justify-center'>
      {partsOfSpeech.map((part) => {
        return (
          <div
            key={part.id}
            className='border border-primary px-2 text-sm rounded cursor-pointer'
          >
            <label htmlFor={part.value} className='cursor-pointer'>
              {part.name}
            </label>
            <input type='radio' name='pof' id={part.value} className='hidden' />
          </div>
        )
      })}
    </div>
  )
}

export default PartsOfSpeechOptions
