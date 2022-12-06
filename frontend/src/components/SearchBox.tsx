import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BiSearch } from 'react-icons/bi'

const SearchBox = () => {
  const navigate = useNavigate()

  const [query, setQuery] = useState('')

  const submitHandler = (e: React.FormEvent<EventTarget>) => {
    e.preventDefault()
    navigate(query ? `/search/?query=${query}` : '/search')
  }
  return (
    <div>
      <form className="m-auto flex " onSubmit={submitHandler}>
        <div className="flex items-center justify-start">
          <input
            className="w-[110px] rounded-l-lg border-0 p-1 indent-1 sm:w-full sm:p-2.5"
            type="text"
            name="q"
            id="q"
            onChange={(e) => setQuery(e.target.value)}
            placeholder="search.."
          />
          <button
            type="submit"
            id="button-search"
            className="flex h-full w-10 items-center justify-center rounded-r-lg bg-[#E3A008] text-2xl font-bold text-white"
          >
            <BiSearch />
          </button>
        </div>
      </form>
    </div>
  )
}

export default SearchBox
