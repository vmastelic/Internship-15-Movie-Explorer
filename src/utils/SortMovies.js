export function sortMovies(movies, sortBy) {
  const copy = [...movies]

  function yearToNumber(yearStr){
      const n = parseInt(yearStr, 10)
      return Number.isFinite(n) ? n : -Infinity
  }
  
  switch (sortBy) {
    case "title-asc":
        copy.sort((a, b) => (a.Title ?? "").localeCompare(b.Title ?? ""))
        break
    case "year-asc":
        copy.sort((a, b) => yearToNumber(a.Year) - yearToNumber(b.Year))
        break
    case "year-desc":
        copy.sort((a, b) => yearToNumber(b.Year) - yearToNumber(a.Year))
        break
    case "relevance":
        break
    default:
        break
  }

  return copy
}