'use client'

import { useState } from 'react'
import { db } from '@/app/firebase'
import { doc, increment, setDoc } from 'firebase/firestore'
import { useRouter } from 'next/navigation'
import { getFoodInsights } from '../foodmappings'


type Option = {
  label: string
  value: string
  image: string
}

const options: Option[] = [
  { label: 'Flatbread', value: 'flatbread', image: '/images/flatbread.jpg' },
  { label: 'Noodles', value: 'noodles', image: '/images/noodles.jpg' },
  { label: 'Stew', value: 'stew', image: '/images/stew.jpg' },
  { label: 'Rice', value: 'rice', image: '/images/rice.jpg' },
  { label: 'Beans', value: 'beans', image: '/images/beans.jpg' },
  { label: 'Lentils', value: 'lentils', image: '/images/lentils.jpg' },
  { label: 'Root Vegetables', value: 'root_vegetables', image: '/images/rootveg.jpg' },
  { label: 'Dairy', value: 'dairy', image: '/images/dairy.jpg' },
]

export default function CuisinePreferences() {
  const [selected, setSelected] = useState<string[]>([])
  const [customInput, setCustomInput] = useState('')
  const [submittedValue, setSubmittedValue] = useState<string | null>(null)
  const router = useRouter()

  const toggleOption = (value: string) => {
    setSelected((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    )
  }

  const handleAddCustom = () => {
    if (!customInput.trim()) return
    setSubmittedValue(customInput.trim())
    setCustomInput('')
  }

  const handleContinue = async () => {
    try {
      const insights = getFoodInsights(selected)

      console.log('Selected:', selected)
      console.log('Matched Patterns:', insights.matchedPatterns)
      console.log('Suggestions:', insights.suggestions)

      // COUNT PATTERNS
      for (const pattern of insights.matchedPatterns) {
        const id = pattern.label.toLowerCase().replace(/\s+/g, '_')

        const ref = doc(db, 'patternCounts', id)

        await setDoc(
          ref,
          {
            label: pattern.label,
            count: increment(1),
          },
          { merge: true }
        )
      }

      // COUNT SUGGESTIONS
      for (const suggestion of insights.suggestions) {
        const ref = doc(db, 'suggestionCounts', suggestion)

        await setDoc(
          ref,
          { count: increment(1) },
          { merge: true }
        )
      }

      // CUSTOM INPUT
      if (submittedValue) {
        const ref = doc(
          db,
          'requests',
          submittedValue.toLowerCase()
        )

        await setDoc(
          ref,
          {
            name: submittedValue,
            count: increment(1),
          },
          { merge: true }
        )
      }

      router.push('/comfortfoods')
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <main className="min-h-screen bg-zinc-50 flex items-center justify-center px-6 py-10">
      <div className="w-full max-w-6xl rounded-3xl bg-white p-8 shadow-sm border border-zinc-200">
        <h1 className="text-3xl font-bold text-zinc-900 mb-2">
          Comfort Foods?
        </h1>

        <p className="text-zinc-600 mb-8">
          Select 1–2.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
          {options.map((option) => {
            const isSelected = selected.includes(option.value)

            return (
              <button
                key={option.value}
                type="button"
                onClick={() => toggleOption(option.value)}
                className={`group relative min-h-36 rounded-2xl overflow-hidden transition ${
                  isSelected
                    ? 'ring-2 ring-white/80'
                    : 'ring-1 ring-black/10 hover:ring-black/20'
                }`}
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-90"
                  style={{ backgroundImage: `url(${option.image})` }}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-black/5" />

                <div className="relative h-full flex flex-col justify-between p-5 text-black">
                  <span className="text-lg font-semibold">
                    {option.label}
                  </span>

                  <span className="mt-4 text-sm opacity-80">
                    {isSelected ? 'Selected' : 'Tap to choose'}
                  </span>
                </div>
              </button>
            )
          })}

          {/* OTHER INPUT */}
          <div className="col-span-2 md:col-span-3 xl:col-span-4 rounded-2xl border bg-white p-5">
            <label className="block text-lg font-semibold mb-3">
              Other:
            </label>

            <div className="flex gap-3">
              <input
                type="text"
                placeholder="e.g. fruits, leafy greens..."
                value={customInput}
                onChange={(e) => setCustomInput(e.target.value)}
                className="flex-1 rounded-xl border px-4 py-3"
              />

              <button
                onClick={handleAddCustom}
                className="rounded-xl bg-black px-6 py-3 text-white"
              >
                Add
              </button>
            </div>

            {submittedValue && (
              <p className="mt-3 text-sm">
                Added: <strong>{submittedValue}</strong>
              </p>
            )}
          </div>
        </div>

        <button
          onClick={handleContinue}
          className="mt-8 w-full rounded-2xl bg-black px-6 py-4 text-white"
        >
          Continue
        </button>
      </div>
    </main>
  )
}