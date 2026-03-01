import styles from './SearchBar.module.css'

function SearchBar({ inputRef, value, onChange }) {
  return (
    <input
      className={styles.searchBar}
      ref={inputRef}
      value={value}
      onChange={onChange}
      placeholder="Search movies..."
    />
  )
}

export default SearchBar