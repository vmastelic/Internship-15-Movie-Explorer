function SortSelect({ sortBy, onChange }) {
  return (
    <label>
      Sort by:{" "}
      <select value={sortBy} onChange={onChange}>
        <option value="year">year</option>
        <option value="rating">rating</option>
      </select>
    </label>
  )
}

export default SortSelect