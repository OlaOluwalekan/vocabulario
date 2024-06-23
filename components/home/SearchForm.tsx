import React from 'react'
import { FaSearch } from 'react-icons/fa'

const SearchForm = () => {
  return (
    <form className='w-full'>
      <div className='join'>
        <label className='input input-bordered flex items-center gap-2 join-item'>
          <FaSearch className='text-gray-400' />
          <input type='text' className='grow' placeholder='Search...' />
        </label>
        <select className='select select-bordered join-item'>
          <option selected>Spanish</option>
          <option>English</option>
        </select>

        <button className='btn join-item'>Search</button>
      </div>
    </form>
  )
}

export default SearchForm
