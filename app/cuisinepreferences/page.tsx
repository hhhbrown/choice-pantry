'use client'

import { useState } from 'react'

type Option = {
  label: string
  value: string
}

const options: Option[] = [
  { label: 'Rice dishes', value: 'rice' },
  { label: 'Flatbreads', value: 'bread' },
  { label: 'Noodles', value: 'noodles' },
  { label: 'Stews', value: 'stews' },
]

export default function cuisinepreferences() {
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
          What foods would you like to eat?
        </h1>

        <p className="text-zinc-600 mb-6">
          Select all that apply.
        </p>

        <div className="space-y-3">
          {options.map((option) => {
            const isSelected = selected.includes(option.value)

            return (
              <button
                key={option.value}
                type="button"
                onClick={() => toggleOption(option.value)}
                className={`w-full rounded-xl border px-4 py-3 text-left transition ${
                  isSelected
                    ? 'border-black bg-black text-white'
                    : 'border-zinc-300 bg-white text-zinc-800 hover:bg-zinc-100'
                }`}
              >
                {option.label}
              </button>
            )
          })}

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
              placeholder="e.g. Injera, roti, kimchi..."
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
        </div>

        <button
          type="button"
          onClick={handleContinue}
          className="mt-6 w-full rounded-xl bg-zinc-900 px-4 py-3 text-white font-medium hover:bg-zinc-800 transition"
        >
          Continue
        </button>
      </div>
    </main>
  )
}