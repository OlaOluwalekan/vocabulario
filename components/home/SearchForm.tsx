'use client'

import { useState } from 'react'
import { FaSearch } from 'react-icons/fa'

const SearchForm = () => {
  const [language, setLanguage] = useState('spanish')

  return (
    <form className='w-full my-3'>
      <div className='join'>
        <label className='input input-bordered flex items-center gap-2 join-item'>
          <FaSearch className='text-gray-400' />
          <input type='text' className='grow' placeholder='Search...' />
        </label>
        <select
          className='select select-bordered join-item'
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value='spanish'>Spanish</option>
          <option value='english'>English</option>
        </select>

        <button className='btn join-item'>Search</button>
      </div>
    </form>
  )
}

export default SearchForm
