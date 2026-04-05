'use client'

import { useState } from 'react'

type Option = {
  label: string
  value: string
  baseClass: string
  selectedClass: string
}

const options: Option[] = [
  {
    label: 'North American',
    value: 'n-american',
    baseClass: 'border-black text-black hover:bg-white',
    selectedClass: 'border-black bg-white text-black',
  },
  {
    label: 'South American',
    value: 's-american',
    baseClass: 'border-black text-black hover:bg-white',
    selectedClass: 'border-black bg-white text-black',
  },
  {
    label: 'European',
    value: 'european',
    baseClass: 'border-black text-black hover:bg-white',
    selectedClass: 'border-black bg-white text-black',
  },
  {
    label: 'Asian',
    value: 'asian',
    baseClass: 'border-black text-black hover:bg-white',
    selectedClass: 'border-black bg-white text-black',
  },
  {
    label: 'African',
    value: 'african',
    baseClass: 'border-black text-black hover:bg-white',
    selectedClass: 'border-black bg-white text-black',
  },
  {
    label: 'Oceania',
    value: 'oceania',
    baseClass: 'border-black text-black hover:bg-white',
    selectedClass: 'border-black bg-white text-black',
  },
  {
    label: 'Indigenous',
    value: 'indigenous',
    baseClass: 'border-black text-black hover:bg-white',
    selectedClass: 'border-black bg-white text-black',
  },
]

export default function CuisinePreferences() {
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

    setSubmittedValue(customInput.trim())
    setCustomInput('')
  }

  const handleContinue = () => {
    console.log({
      selected,
      customFood: submittedValue,
    })
  }

  return (
    <main className="min-h-screen bg-zinc-50 flex items-center justify-center px-6 py-10">
      <div className="w-full max-w-6xl rounded-3xl bg-white p-8 shadow-sm border border-zinc-200">
        <h1 className="text-3xl font-bold text-zinc-900 mb-2">
          What types of foods interest you?
        </h1>

        <p className="text-zinc-600 mb-8">
          Select all that apply.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
          {options.map((option) => {
            const isSelected = selected.includes(option.value)

            return (
              <button
                key={option.value}
                type="button"
                onClick={() => toggleOption(option.value)}
                className={`min-h-36 rounded-2xl border-2 p-5 text-left transition ${
                  isSelected ? option.selectedClass : option.baseClass
                }`}
              >
                <div className="flex h-full flex-col justify-between">
                  <span className="text-xl font-semibold leading-snug">
                    {option.label}
                  </span>
                  <span className="mt-4 text-sm opacity-80">
                    {isSelected ? 'Selected' : 'Tap to choose'}
                  </span>
                </div>
              </button>
            )
          })}

          <div className="col-span-2 md:col-span-3 xl:col-span-4 rounded-2xl border-2 border-black bg-white p-5">
            <label
              htmlFor="custom-food"
              className="block text-lg font-semibold text-black mb-3"
            >
              Something else
            </label>

            <div className="flex flex-col md:flex-row gap-3">
              <input
                id="custom-food"
                type="text"
                placeholder="e.g. Injera, roti, kimchi..."
                value={customInput}
                onChange={(e) => setCustomInput(e.target.value)}
                className="flex-1 rounded-xl border border-black bg-white px-4 py-3 text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:black-400"
              />

              <button
                type="button"
                onClick={handleAddCustom}
                className="rounded-xl bg-white px-6 py-3 text-white font-medium hover:bg-white"
              >
                Add
              </button>
            </div>

            {submittedValue && (
              <p className="mt-3 text-sm text-black">
                Added: <span className="font-semibold">{submittedValue}</span>
              </p>
            )}
          </div>
        </div>

        <button
          type="button"
          onClick={handleContinue}
          className="mt-8 w-full rounded-2xl bg-zinc-900 px-6 py-4 text-white text-lg font-medium hover:bg-zinc-800 transition"
        >
          Continue
        </button>
      </div>
    </main>
  )
}