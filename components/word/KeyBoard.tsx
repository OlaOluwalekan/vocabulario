import { MouseEvent } from 'react'
import useFocusedInput from './Focused'

const keys = ['ñ', 'á', 'é', 'í', 'ó', 'ú', 'ü']

const KeyBoard = () => {
  const focusedInput = useFocusedInput()
  //   console.log(focusedInput)

  const handleCharacterClick = (char: string) => {
    if (focusedInput) {
      // console.log(char, focusedInput?.name)
      focusedInput.value = focusedInput.value + char
      focusedInput.focus()
    }
  }

  const handleMouseDown = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
  }

  return (
    <div className='absolute right-[-60px] top-0 flex flex-col w-[50px] bg-base-300 gap-2 justify-center items-center py-2 rounded-md'>
      {keys.map((key) => {
        return (
          <button
            key={key}
            className='text-primary-content bg-primary w-[40px] aspect-square rounded-md hover:bg-slate-600'
            onClick={() => handleCharacterClick(key)}
            onMouseDown={handleMouseDown}
            type='button'
          >
            {key}
          </button>
        )
      })}
    </div>
  )
}

export default KeyBoard
