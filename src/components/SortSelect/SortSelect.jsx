function SortSelect({ sortBy, onChange }) {
  return (
    <label>
      Sort by:{" "}
      <select value={sortBy} onChange={onChange}>
        <option value="relevance">relevance</option>
        <option value="year-asc">year (oldest)</option>
        <option value="year-desc">year (newest)</option>
        <option value="title-asc">title (A-Z)</option>
      </select>
    </label>
  )
}

export default SortSelect