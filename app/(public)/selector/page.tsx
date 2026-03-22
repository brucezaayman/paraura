'use client'

import { useState } from 'react'
import Link from 'next/link'
import { SelectorProfile, RecommendationResult, WingLevel } from '@/types'
import { getWingRecommendations } from '@/lib/recommendations'
import { placeholderProducts } from '@/lib/placeholder-products'

const TOTAL_STEPS = 5

const PILOT_LEVELS = [
  { value: 'A', label: 'EN-A', sub: 'Beginner / Student' },
  { value: 'B', label: 'EN-B', sub: 'Intermediate' },
  { value: 'C', label: 'EN-C', sub: 'Advanced' },
  { value: 'D', label: 'EN-D', sub: 'Expert / Competition' },
]

const FLYING_GOALS = [
  { value: 'leisure', label: 'Leisure & enjoyment', sub: 'Safe, relaxed flying' },
  { value: 'xc', label: 'Cross-country (XC)', sub: 'Distance and progression' },
  { value: 'competition', label: 'Competition', sub: 'Racing and performance' },
  { value: 'hike-and-fly', label: 'Hike & fly', sub: 'Lightweight mountain flying' },
]

const CONDITIONS = [
  { value: 'coastal', label: 'Coastal', sub: 'Smooth sea breezes' },
  { value: 'thermal-inland', label: 'Thermal / inland', sub: 'Active, punchy conditions' },
  { value: 'mixed', label: 'Mixed', sub: 'Variety of conditions' },
]

const LIGHTWEIGHT = [
  { value: 'yes', label: 'Yes', sub: 'I prioritise light pack weight' },
  { value: 'no', label: 'No', sub: 'Performance over weight' },
  { value: 'not-sure', label: 'Not sure', sub: 'Tell me more' },
]

const WING_LEVEL_LABELS: Record<WingLevel, string> = {
  A: 'EN-A (Beginner)',
  B: 'EN-B (Intermediate)',
  C: 'EN-C (Advanced)',
  D: 'EN-D (Expert / Competition)',
}

const emptyProfile: SelectorProfile = {
  weight: 0,
  pilot_level: '',
  hours_flown: 0,
  years_flying: 0,
  flying_goal: '',
  conditions: '',
  lightweight_preference: 'not-sure',
}

function StepDots({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={`step-dot ${
            i < current
              ? 'bg-sky-400 w-2 h-2'
              : i === current
              ? 'bg-white w-3 h-3'
              : 'bg-stone-700 w-2 h-2'
          }`}
        />
      ))}
    </div>
  )
}

function OptionCard({
  selected,
  onClick,
  label,
  sub,
}: {
  selected: boolean
  onClick: () => void
  label: string
  sub?: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full text-left px-5 py-4 rounded-xl border transition-all duration-200 ${
        selected
          ? 'border-sky-400 bg-sky-950/40 text-white'
          : 'border-white/10 bg-stone-900/40 text-stone-300 hover:border-white/30 hover:bg-stone-900/70'
      }`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="font-medium text-sm">{label}</p>
          {sub && <p className="text-stone-500 text-xs mt-0.5">{sub}</p>}
        </div>
        <div
          className={`w-4 h-4 rounded-full border-2 shrink-0 transition-all ${
            selected ? 'border-sky-400 bg-sky-400' : 'border-stone-600'
          }`}
        />
      </div>
    </button>
  )
}

export default function SelectorPage() {
  const [step, setStep] = useState(0)
  const [profile, setProfile] = useState<SelectorProfile>(emptyProfile)
  const [result, setResult] = useState<RecommendationResult | null>(null)

  function update<K extends keyof SelectorProfile>(key: K, value: SelectorProfile[K]) {
    setProfile((p) => ({ ...p, [key]: value }))
  }

  function next() {
    if (step < TOTAL_STEPS - 1) {
      setStep((s) => s + 1)
    } else {
      const r = getWingRecommendations(placeholderProducts, profile)
      setResult(r)
      setStep(TOTAL_STEPS)
    }
  }

  function back() {
    if (step > 0) setStep((s) => s - 1)
  }

  function reset() {
    setStep(0)
    setProfile(emptyProfile)
    setResult(null)
  }

  const canNext = (() => {
    if (step === 0) return profile.weight >= 40 && profile.weight <= 200
    if (step === 1) return true // skill optional
    if (step === 2) return !!profile.flying_goal
    if (step === 3) return !!profile.conditions
    if (step === 4) return true
    return false
  })()

  // ── RESULTS ────────────────────────────────────────────────
  if (step === TOTAL_STEPS) {
    if (!result) {
      return (
        <div className="min-h-screen pt-32 flex items-center justify-center">
          <div className="section text-center max-w-lg">
            <p className="eyebrow mb-4">No Match Found</p>
            <h2 className="display-md text-white mb-4">
              We couldn&apos;t find a match with those inputs.
            </h2>
            <p className="text-stone-400 mb-8">
              Your weight or experience level may not align with our current range. Reach out directly — we&apos;ll help.
            </p>
            <div className="flex gap-4 justify-center">
              <button onClick={reset} className="btn-secondary">Try Again</button>
              <Link href="/advice" className="btn-primary">Get Advice</Link>
            </div>
          </div>
        </div>
      )
    }

    const { primary, alternatives } = result

    const adviceParams = new URLSearchParams({
      wing: primary.product.slug,
      name: primary.product.name,
      weight: String(profile.weight),
      level: profile.pilot_level,
      goal: profile.flying_goal,
    }).toString()

    return (
      <div className="min-h-screen pt-32 pb-20">
        <div className="section max-w-3xl mx-auto">
          <button onClick={reset} className="text-stone-500 hover:text-white text-sm mb-10 flex items-center gap-2 transition-colors">
            ← Start over
          </button>

          <p className="eyebrow mb-4">Your Result</p>
          <h1 className="display-lg text-white mb-4">
            We found<br />
            <em className="text-sky-300">your wing.</em>
          </h1>
          <p className="text-stone-400 mb-12 max-w-md">
            Based on your weight, experience, and goals — here&apos;s our recommendation.
          </p>

          {/* Primary */}
          <div className="card p-6 lg:p-8 mb-6 border-sky-400/20 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sky-400/40 to-transparent" />
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="eyebrow mb-2">Top Recommendation</p>
                <h2 className="text-white text-2xl font-light" style={{ fontFamily: 'var(--font-display)' }}>
                  {primary.product.name}
                </h2>
              </div>
              <span className={`badge-${primary.product.wing_level}`}>
                EN-{primary.product.wing_level}
              </span>
            </div>

            <p className="text-stone-300 leading-relaxed mb-5">
              {primary.product.description}
            </p>

            {/* Reasons */}
            <div className="space-y-2 mb-6">
              {primary.reasons.map((r) => (
                <div key={r} className="flex items-center gap-3 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-sky-400 shrink-0" />
                  <span className="text-stone-300">{r}</span>
                </div>
              ))}
              {primary.matched_size && (
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-sky-400 shrink-0" />
                  <span className="text-stone-300">
                    Recommended size: <strong className="text-white">{primary.matched_size.size}</strong>
                    {' '}({primary.matched_size.min_weight}–{primary.matched_size.max_weight} kg)
                  </span>
                </div>
              )}
            </div>

            {/* Quick specs */}
            <div className="flex flex-wrap gap-4 text-xs text-stone-400 pt-5 border-t border-white/5">
              {primary.product.specs.cells && <span>{primary.product.specs.cells} cells</span>}
              {primary.product.specs.glide_ratio && <span>Glide {primary.product.specs.glide_ratio}</span>}
              {primary.product.specs.top_speed && <span>Top speed {primary.product.specs.top_speed}</span>}
            </div>
          </div>

          {/* Alternatives */}
          {alternatives.length > 0 && (
            <div className="mb-12">
              <p className="eyebrow mb-4">Also Consider</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {alternatives.map((alt) => (
                  <div key={alt.product.id} className="card p-5">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-white font-medium">{alt.product.name}</h3>
                      <span className={`badge-${alt.product.wing_level}`}>
                        EN-{alt.product.wing_level}
                      </span>
                    </div>
                    <p className="text-stone-400 text-sm leading-relaxed mb-3 line-clamp-2">
                      {alt.product.description}
                    </p>
                    {alt.matched_size && (
                      <p className="text-stone-500 text-xs">
                        Size {alt.matched_size.size} · {alt.matched_size.min_weight}–{alt.matched_size.max_weight} kg
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="bg-stone-900/50 border border-white/5 rounded-2xl p-6 lg:p-8 text-center">
            <p className="eyebrow mb-3">Want expert confirmation?</p>
            <h3 className="text-white text-2xl font-light mb-3" style={{ fontFamily: 'var(--font-display)' }}>
              Talk to Paraura before you decide.
            </h3>
            <p className="text-stone-400 text-sm mb-6 max-w-sm mx-auto">
              The selector is a starting point. We&apos;ll confirm the right choice and answer any questions personally.
            </p>
            <Link
              href={`/advice?${adviceParams}`}
              className="btn-primary"
            >
              Get Personal Advice from Paraura
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // ── STEP SHELL ─────────────────────────────────────────────
  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="section max-w-xl mx-auto">

        {/* Progress */}
        <div className="flex items-center justify-between mb-12">
          <StepDots current={step} total={TOTAL_STEPS} />
          <span className="text-stone-500 text-sm">{step + 1} of {TOTAL_STEPS}</span>
        </div>

        {/* ── Step 0: Weight ── */}
        {step === 0 && (
          <div>
            <p className="eyebrow mb-4">Step 1 — Your Profile</p>
            <h2 className="display-md text-white mb-2">What&apos;s your all-up weight?</h2>
            <p className="text-stone-400 mb-8 text-sm">
              Total flying weight: you + harness + reserve parachute + gear.
            </p>
            <div className="flex items-center gap-4">
              <input
                type="number"
                min={40}
                max={200}
                placeholder="e.g. 95"
                value={profile.weight || ''}
                onChange={(e) => update('weight', Number(e.target.value))}
                className="input text-2xl text-center w-36 font-light"
                style={{ fontFamily: 'var(--font-display)' }}
              />
              <span className="text-stone-400 text-lg">kg</span>
            </div>
          </div>
        )}

        {/* ── Step 1: Experience ── */}
        {step === 1 && (
          <div>
            <p className="eyebrow mb-4">Step 2 — Experience</p>
            <h2 className="display-md text-white mb-2">What&apos;s your pilot level?</h2>
            <p className="text-stone-400 mb-8 text-sm">
              Select your EN certification level. Skip if you&apos;re not sure — we&apos;ll still find a match.
            </p>
            <div className="space-y-3 mb-8">
              {PILOT_LEVELS.map((l) => (
                <OptionCard
                  key={l.value}
                  selected={profile.pilot_level === l.value}
                  onClick={() => update('pilot_level', l.value as WingLevel)}
                  label={`${l.label} — ${l.sub}`}
                />
              ))}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="label">Hours flown (optional)</label>
                <input
                  type="number"
                  min={0}
                  placeholder="e.g. 150"
                  value={profile.hours_flown || ''}
                  onChange={(e) => update('hours_flown', Number(e.target.value))}
                  className="input"
                />
              </div>
              <div>
                <label className="label">Years flying (optional)</label>
                <input
                  type="number"
                  min={0}
                  placeholder="e.g. 3"
                  value={profile.years_flying || ''}
                  onChange={(e) => update('years_flying', Number(e.target.value))}
                  className="input"
                />
              </div>
            </div>
          </div>
        )}

        {/* ── Step 2: Goal ── */}
        {step === 2 && (
          <div>
            <p className="eyebrow mb-4">Step 3 — Flying Goal</p>
            <h2 className="display-md text-white mb-2">What do you mainly fly for?</h2>
            <p className="text-stone-400 mb-8 text-sm">
              Pick the option that best describes your flying ambitions.
            </p>
            <div className="space-y-3">
              {FLYING_GOALS.map((g) => (
                <OptionCard
                  key={g.value}
                  selected={profile.flying_goal === g.value}
                  onClick={() => update('flying_goal', g.value as SelectorProfile['flying_goal'])}
                  label={g.label}
                  sub={g.sub}
                />
              ))}
            </div>
          </div>
        )}

        {/* ── Step 3: Conditions ── */}
        {step === 3 && (
          <div>
            <p className="eyebrow mb-4">Step 4 — Conditions</p>
            <h2 className="display-md text-white mb-2">Where do you typically fly?</h2>
            <p className="text-stone-400 mb-8 text-sm">
              Your typical flying environment affects the right wing choice.
            </p>
            <div className="space-y-3">
              {CONDITIONS.map((c) => (
                <OptionCard
                  key={c.value}
                  selected={profile.conditions === c.value}
                  onClick={() => update('conditions', c.value as SelectorProfile['conditions'])}
                  label={c.label}
                  sub={c.sub}
                />
              ))}
            </div>
          </div>
        )}

        {/* ── Step 4: Lightweight ── */}
        {step === 4 && (
          <div>
            <p className="eyebrow mb-4">Step 5 — Preference</p>
            <h2 className="display-md text-white mb-2">Does pack weight matter to you?</h2>
            <p className="text-stone-400 mb-8 text-sm">
              Lightweight wings sacrifice some performance for packability — great for hiking in on foot.
            </p>
            <div className="space-y-3">
              {LIGHTWEIGHT.map((l) => (
                <OptionCard
                  key={l.value}
                  selected={profile.lightweight_preference === l.value}
                  onClick={() => update('lightweight_preference', l.value as SelectorProfile['lightweight_preference'])}
                  label={l.label}
                  sub={l.sub}
                />
              ))}
            </div>
          </div>
        )}

        {/* Nav buttons */}
        <div className="flex items-center justify-between mt-10">
          {step > 0 ? (
            <button onClick={back} className="btn-ghost">
              ← Back
            </button>
          ) : (
            <div />
          )}
          <button
            onClick={next}
            disabled={!canNext}
            className={`btn-primary transition-opacity ${canNext ? 'opacity-100' : 'opacity-40 cursor-not-allowed'}`}
          >
            {step === TOTAL_STEPS - 1 ? 'Find My Wing →' : 'Continue →'}
          </button>
        </div>
      </div>
    </div>
  )
}
