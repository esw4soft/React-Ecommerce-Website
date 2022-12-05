import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const SearchBox = () => {
  const navigate = useNavigate()

  const [query, setQuery] = useState('')

  const submitHandler = (e: React.FormEvent<EventTarget>) => {
    e.preventDefault()
    navigate(query ? `/search/?query=${query}` : '/search')
  }
  return (
    <div>
      <form className="m-auto flex" onSubmit={submitHandler}>
        <div>
          <input
            type="text"
            name="q"
            id="q"
            onChange={(e) => setQuery(e.target.value)}
            placeholder="search products.."
          />
          <button type="submit" id="button-search">
            <i className="fas fa-search"></i>
          </button>
        </div>
      </form>
    </div>
  )
}

export default SearchBox
