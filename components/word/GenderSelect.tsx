'use client'

import { setSelectedGender } from '@/features/generalSlice'
import { RootState } from '@/store'
import { useDispatch, useSelector } from 'react-redux'

const genderList = [
  { id: 1, name: 'Masculine', value: 'masculine' },
  { id: 2, name: 'Feminine', value: 'feminine' },
  { id: 3, name: 'Neuter', value: 'neuter' },
]

const GenderSelect = () => {
  const { selectedGender } = useSelector((store: RootState) => store.general)
  const dispatch = useDispatch()

  return (
    <div className='flex gap-2'>
      {genderList.map((gender) => {
        return (
          <article key={gender.id} className='flex gap-1'>
            <input
              type='radio'
              name='gender'
              id={gender.value}
              value={gender.value}
              checked={selectedGender === gender.value}
              onChange={() => dispatch(setSelectedGender(gender.value))}
            />
            <label htmlFor={gender.value} className='mr-2'>
              {gender.name}
            </label>
          </article>
        )
      })}
    </div>
  )
}

export default GenderSelect
