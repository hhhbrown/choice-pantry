type FoodPattern = {
  match: string[]
  label: string
  suggestions: string[]
}

export const FOOD_PATTERNS: FoodPattern[] = [
  {
    match: ['rice', 'lentils'],
    label: 'South Asian / Middle Eastern',
    suggestions: ['lentils', 'rice', 'spices', 'flatbread'],
  },
  {
    match: ['flatbread', 'lentils'],
    label: 'Middle Eastern / North African',
    suggestions: ['flatbread', 'chickpeas', 'lentils', 'yogurt'],
  },
  {
    match: ['rice', 'beans'],
    label: 'Latin American',
    suggestions: ['beans', 'rice', 'corn', 'tomatoes'],
  },
  {
    match: ['noodles'],
    label: 'East Asian',
    suggestions: ['noodles', 'soy sauce', 'vegetables', 'tofu'],
  },
  {
    match: ['stew', 'root_vegetables'],
    label: 'African / Caribbean / European',
    suggestions: ['root vegetables', 'protein', 'spices'],
  },
]

export function getFoodInsights(selectedFoods: string[]) {
  const results = FOOD_PATTERNS.map((pattern) => {
    const matchCount = pattern.match.filter((item) =>
      selectedFoods.includes(item)
    ).length

    const score = matchCount / pattern.match.length

    return {
      ...pattern,
      score,
    }
  })

  const matchedPatterns = results.filter((p) => p.score >= 0.5)

  const suggestions = Array.from(
    new Set(
      matchedPatterns.flatMap((p) => p.suggestions)
    )
  )

  return {
    matchedPatterns,
    suggestions,
  }
}