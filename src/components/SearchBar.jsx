import { useState } from 'react'

function SearchBar({ onSearch, loading }) {
  const [city, setCity] = useState('')

  function handleSubmit(e) {
    e.preventDefault()

    if (!city.trim() || loading) {
      return
    }

    onSearch(city.trim())
    setCity('')
  }

  return (
    <form
      className="search-bar"
      onSubmit={handleSubmit}
    >

      <input
        type="text"
        placeholder="Search for cities..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
        disabled={loading}
      />

      <button
        type="submit"
        disabled={loading}
      >
        {loading ? 'Loading...' : 'Search'}
      </button>

    </form>
  )
}

export default SearchBar