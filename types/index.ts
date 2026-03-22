export type WingLevel = 'A' | 'B' | 'C' | 'D'

export type FlyingGoal = 'leisure' | 'xc' | 'competition' | 'hike-and-fly'

export type FlyingConditions = 'coastal' | 'thermal-inland' | 'mixed'

export type LightweightPreference = 'yes' | 'no' | 'not-sure'

export interface Product {
  id: string
  name: string
  slug: string
  category: string
  description: string
  specs: Record<string, string>
  images: string[]
  wing_level: WingLevel
  weight_ranges: WeightRange[]
  is_lightweight: boolean
  created_at: string
}

export interface WeightRange {
  size: string
  min_weight: number
  max_weight: number
}

export interface Pilot {
  id: string
  name: string
  email: string
  whatsapp?: string
  pilot_level?: string
  hours_flown?: number
  years_flying?: number
  weight?: number
  location?: string
  notes?: string
  created_at: string
  updated_at: string
}

export interface Inquiry {
  id: string
  pilot_id: string
  source: 'selector' | 'product' | 'homepage'
  message: string
  status: 'new' | 'contacted' | 'closed'
  created_at: string
}

export interface SelectorProfile {
  weight: number
  pilot_level: WingLevel | ''
  hours_flown: number
  years_flying: number
  flying_goal: FlyingGoal | ''
  conditions: FlyingConditions | ''
  lightweight_preference: LightweightPreference
}

export interface ScoredProduct {
  product: Product
  score: number
  reasons: string[]
  matched_size?: WeightRange
}

export interface RecommendationResult {
  primary: ScoredProduct
  alternatives: ScoredProduct[]
}
