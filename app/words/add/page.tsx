import AddWordForm from '@/components/word/AddWordForm'
import React, { Suspense } from 'react'

const AddWordPage = () => {
  return (
    <div>
      <Suspense>
        <AddWordForm />
      </Suspense>
    </div>
  )
}

export default AddWordPage
