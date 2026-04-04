'use client'

import { useState } from 'react'

type Option = {
  label: string
  value: string
}

const options: Option[] = [
  { label: 'Vegan', value: 'vegan' },
  { label: 'Vegetarian', value: 'vegetarian' },
  { label: 'Halal', value: 'halal' },
  { label: 'No Pork', value: 'no pork' },
  { label: 'Gluten Free', value: 'gf' },
]

export default function submit() {
  const [selected, setSelected] = useState<string[]>([])
  const [customInput, setCustomInput] = useState('')
  const [submittedValue, setSubmittedValue] = useState<string | null>(null)

  const toggleOption = (value: string) => {
    setSelected((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    )
  }

  const handleAddCustom = () => {
    if (!customInput.trim()) return

    setSubmittedValue(customInput)
    console.log('Custom food:', customInput)
    setCustomInput('')
  }

  const handleContinue = () => {
    console.log({
      selected,
      customFood: submittedValue,
    })
    // go to next page later
  }

  return (
    <main className="min-h-screen bg-zinc-50 flex items-center justify-center px-6 py-10">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-sm border border-zinc-200">
        <h1 className="text-2xl font-bold text-zinc-900 mb-2">
          Did we miss anything?
        </h1>

        {/* Other / custom option */}
        <div className="rounded-xl border border-zinc-300 bg-white p-4">
        <label
            htmlFor="custom-food"
            className="block text-sm font-medium text-zinc-800 mb-2"
        >
            Other
        </label>

        <input
            id="custom-food"
            type="text"
            placeholder="e.g. food choices, other concerns..."
            value={customInput}
            onChange={(e) => setCustomInput(e.target.value)}
            className="w-full rounded-lg border border-zinc-300 px-4 py-3 text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-black"
        />

        <button
            type="button"
            onClick={handleAddCustom}
            className="mt-3 w-full rounded-lg bg-zinc-900 px-4 py-3 text-white font-medium hover:bg-zinc-800 transition"
        >
            Add custom food
        </button>

        {submittedValue && (
            <p className="mt-3 text-sm text-zinc-600">
            Added: <span className="font-medium text-zinc-900">{submittedValue}</span>
            </p>
        )}
        </div>

        <button
          type="button"
          onClick={handleContinue}
          className="mt-6 w-full rounded-xl bg-zinc-900 px-4 py-3 text-white font-medium hover:bg-zinc-800 transition"
        >
          No, submit
        </button>
      </div>
    </main>
  )
}