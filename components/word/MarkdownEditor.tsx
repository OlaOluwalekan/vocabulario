'use client'

import { useState } from 'react'
import Editor from 'react-simple-code-editor'
import Prism from '@/utils/prism'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store'
import { setNotes } from '@/features/generalSlice'

interface MarkdownEditorProps {
  initialValue?: string
  // onChange: (content: string) => void
}

const MarkdownEditor = ({ initialValue = '' }: MarkdownEditorProps) => {
  const { note } = useSelector((store: RootState) => store.general)
  const dispatch = useDispatch()
  const [content, setContent] = useState(initialValue)

  const handleEditorChange = (text: string) => {
    dispatch(setNotes(text))
    // setContent(text)
    // onChange(text)
  }

  return (
    <div className='h-[150px] w-full overflow-auto'>
      <Editor
        value={note}
        onValueChange={handleEditorChange}
        highlight={(text) =>
          Prism.highlight(text, Prism.languages.markdown, 'markdown')
        }
        padding={10}
        style={{
          fontFamily: '"Fira code", "Fira Mono", monospace',
        }}
        className='w-full bg-base-300 min-h-full rounded-md focus:border-0 focus:outline-0 text-base'
      />
    </div>
  )
}

export default MarkdownEditor
