export function sortMovies(movies, sortBy) {
  const copy = [...movies]

  switch (sortBy) {
    case "title-asc":
        copy.sort((a, b) => (a.Title ?? "").localeCompare(b.Title ?? ""))
        break
    case "year-asc":
        copy.sort((a, b) => Number(a.Year) - Number(b.Year))
        break
    case "year-desc":
        copy.sort((a, b) => Number(b.Year) - Number(a.Year))
        break
    case "rating":
        copy.sort((a, b) => Number(a.Rating) - Number(b.Rating))
        break
    case "relevance":
        break
    default:
        break
  }

  return copy
}