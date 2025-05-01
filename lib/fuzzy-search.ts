/**
 * Calculate the Levenshtein distance between two strings
 * This measures how many single-character edits are needed to change one string into another
 */
export function levenshteinDistance(a: string, b: string): number {
  const matrix = Array(b.length + 1)
    .fill(null)
    .map(() => Array(a.length + 1).fill(null))

  // Initialize first row and column
  for (let i = 0; i <= a.length; i++) {
    matrix[0][i] = i
  }
  for (let j = 0; j <= b.length; j++) {
    matrix[j][0] = j
  }

  // Fill the matrix
  for (let j = 1; j <= b.length; j++) {
    for (let i = 1; i <= a.length; i++) {
      const substitutionCost = a[i - 1] === b[j - 1] ? 0 : 1
      matrix[j][i] = Math.min(
        matrix[j][i - 1] + 1, // deletion
        matrix[j - 1][i] + 1, // insertion
        matrix[j - 1][i - 1] + substitutionCost, // substitution
      )
    }
  }

  return matrix[b.length][a.length]
}

/**
 * Calculate string similarity as a percentage (100% = exact match)
 */
export function stringSimilarity(a: string, b: string): number {
  if (a.length === 0 && b.length === 0) return 100
  const distance = levenshteinDistance(a.toLowerCase(), b.toLowerCase())
  const maxLength = Math.max(a.length, b.length)
  return ((maxLength - distance) / maxLength) * 100
}

/**
 * Fuzzy search function that returns matches above a certain threshold
 */
export function fuzzySearch<T>(
  query: string,
  items: T[],
  getSearchableText: (item: T) => string | string[],
  threshold = 60,
): T[] {
  if (!query || query.length < 2) return []

  return items
    .map((item) => {
      const searchableText = getSearchableText(item)
      const texts = Array.isArray(searchableText) ? searchableText : [searchableText]

      // Find the highest similarity score among all searchable texts
      let highestScore = 0
      for (const text of texts) {
        const score = stringSimilarity(query, text)
        if (score > highestScore) {
          highestScore = score
        }
      }

      return { item, score: highestScore }
    })
    .filter((result) => result.score >= threshold)
    .sort((a, b) => b.score - a.score)
    .map((result) => result.item)
}
