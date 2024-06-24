import { it, expect, describe } from 'vitest'
import '@testing-library/jest-dom/vitest'
import { render, screen } from '@testing-library/react'
import WordList, { WordListComponent } from '@/components/home/WordList'
import React from 'react'

describe('Word List', () => {
  it('should render no word found if words array is empty', () => {
    const words: any[] = []
    render(<WordListComponent words={words} />)

    const div = screen.getByText(/no word/i)
    expect(div).toBeInTheDocument()
  })
})
