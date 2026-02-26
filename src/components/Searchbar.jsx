function SearchBar({ inputRef, value, onChange }) {
  return (
    <input
      ref={inputRef}
      value={value}
      onChange={onChange}
      placeholder="Search movies..."
    />
  )
}

export default SearchBar