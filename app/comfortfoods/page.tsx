'use client'

import { useState } from 'react'

type Option = {
  label: string
  value: string
}

const options: Option[] = [
  { label: 'Hot Drinks', value: 'hot-drinks' },
  { label: 'Sweet Treats', value: 'treats' },
  { label: 'Fresh fruit', value: 'fruits' },
  { label: 'Spicy foods', value: 'spicy' },
]

export default function ResidentPage() {
  const [selected, setSelected] = useState<string[]>([])

  const toggleOption = (value: string) => {
    setSelected((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    )
  }

  return (
    <main className="min-h-screen bg-zinc-50 flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold text-zinc-900 mb-2">
          Sometimes "non-essentials" are essential.
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
        </div>

        <button
          type="button"
          className="mt-6 w-full rounded-xl bg-zinc-900 px-4 py-3 text-white font-medium hover:bg-zinc-800 transition"
          onClick={() => console.log(selected)}
        >
          Continue
        </button>
      </div>
    </main>
  )
}