import { useEffect, useState } from 'react'

const useFocusedInput = () => {
  const [focused, setFocused] = useState<HTMLInputElement | null>(null)

  useEffect(() => {
    const handleFocused = (e: FocusEvent) => {
      //   console.log('TARGET: ', e.target)
      //   setFocused(e.target as EventTarget & HTMLInputElement)

      if (e.target instanceof HTMLInputElement && e.target.type === 'text') {
        setFocused(e.target)
      }
      // else if (e.target instanceof HTMLButtonElement) {

      // }
    }

    const handleBlurred = (event: FocusEvent) => {
      if (event.target instanceof HTMLInputElement) {
        setFocused(null)
      }
    }

    document.addEventListener('focusin', handleFocused)
    document.addEventListener('focusout', handleBlurred)

    return () => {
      document.removeEventListener('focusin', handleFocused)
      document.removeEventListener('focusout', handleBlurred)
    }
  }, [])

  return focused
}

export default useFocusedInput
