import { Product, SelectorProfile, ScoredProduct, RecommendationResult, WingLevel } from '@/types'

const LEVEL_ORDER: WingLevel[] = ['A', 'B', 'C', 'D']

function getLevelIndex(level: WingLevel): number {
  return LEVEL_ORDER.indexOf(level)
}

function scoreProduct(product: Product, profile: SelectorProfile): ScoredProduct | null {
  let score = 0
  const reasons: string[] = []

  // Weight match — hard filter
  const matched_size = product.weight_ranges.find(
    (r) => profile.weight >= r.min_weight && profile.weight <= r.max_weight
  )
  if (!matched_size) return null

  // Wing level match
  if (profile.pilot_level) {
    const pilotIdx = getLevelIndex(profile.pilot_level as WingLevel)
    const productIdx = getLevelIndex(product.wing_level)
    const diff = Math.abs(pilotIdx - productIdx)

    if (diff === 0) {
      score += 40
      reasons.push('Perfect level match for your experience')
    } else if (diff === 1) {
      score += 20
      reasons.push('Close level match — suitable with guidance')
    } else {
      return null // exclude
    }
  } else {
    score += 20 // neutral if no level provided
  }

  // Experience — hours flown
  if (profile.hours_flown > 0) {
    if (
      (product.wing_level === 'A' && profile.hours_flown < 100) ||
      (product.wing_level === 'B' && profile.hours_flown >= 100 && profile.hours_flown < 300) ||
      (product.wing_level === 'C' && profile.hours_flown >= 300) ||
      (product.wing_level === 'D' && profile.hours_flown >= 500)
    ) {
      score += 15
      reasons.push('Your airtime aligns well with this wing')
    }
  }

  // Intent match
  if (profile.flying_goal) {
    const goalMap: Record<string, string[]> = {
      leisure: ['leisure', 'hike-and-fly'],
      xc: ['xc', 'competition'],
      competition: ['competition'],
      'hike-and-fly': ['hike-and-fly', 'leisure'],
    }
    const productGoals = product.specs?.flying_goal?.split(',').map((s: string) => s.trim()) ?? []
    const userGoals = goalMap[profile.flying_goal] ?? []
    const exactMatch = productGoals.some((g: string) => g === profile.flying_goal)
    const partialMatch = productGoals.some((g: string) => userGoals.includes(g))

    if (exactMatch) {
      score += 20
      reasons.push('Designed for your flying goal')
    } else if (partialMatch) {
      score += 10
      reasons.push('Compatible with your flying style')
    }
  }

  // Conditions match
  if (profile.conditions && product.specs?.conditions) {
    if (product.specs.conditions.includes(profile.conditions)) {
      score += 10
      reasons.push('Well-suited to your typical flying environment')
    }
  }

  // Lightweight preference
  if (profile.lightweight_preference === 'yes' && product.is_lightweight) {
    score += 5
    reasons.push('Lightweight — ideal for hike & fly')
  }

  return { product, score, reasons, matched_size }
}

export function getWingRecommendations(
  products: Product[],
  profile: SelectorProfile
): RecommendationResult | null {
  const scored: ScoredProduct[] = []

  for (const product of products) {
    const result = scoreProduct(product, profile)
    if (result) scored.push(result)
  }

  if (scored.length === 0) return null

  scored.sort((a, b) => b.score - a.score)

  const [primary, ...rest] = scored
  return {
    primary,
    alternatives: rest.slice(0, 2),
  }
}
