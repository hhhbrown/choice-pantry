'use client'

import { useState } from 'react'

type Option = {
  label: string
  value: string
  baseClass: string
  image: string
  selectedClass: string
}

const options: Option[] = [
  {
    label: 'Hot Drinks',
    value: 'hot-drinks',
    baseClass: 'border-black text-black hover:bg-white',
    image: '/images/hotdrinks.jpg',
    selectedClass: 'border-black bg-white text-black',
  },
  {
    label: 'Sweets',
    value: 'sweets',
    baseClass: 'border-black text-black hover:bg-white',
    image: '/images/sweets.jpg',
    selectedClass: 'border-black bg-white text-black',
  },
  {
    label: 'Spices & Sauces',
    value: 'spices',
    baseClass: 'border-black text-black hover:bg-white',
    image: '/images/spices.jpg',
    selectedClass: 'border-black bg-white text-black',
  },
  {
    label: 'Fresh Fruits',
    value: 'fruits',
    baseClass: 'border-black text-black hover:bg-white',
    image: '/images/fruits.jpg',
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
          Sometimes "non-essentials" are essential.
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
          <span className="text-lg font-semibold leading-snug">
            {option.label}
          </span>
      
          <span className="mt-4 text-sm opacity-80">
            {isSelected ? 'Selected' : 'Tap to choose'}
          </span>
        </div>
      </button>
    )
  })}

          <div className="col-span-2 md:col-span-3 xl:col-span-4 rounded-2xl border-2 border-white bg-white p-5">
            <label
              htmlFor="custom-food"
              className="block text-lg font-semibold text-black mb-3"
            >
              Other:
            </label>

            <div className="flex flex-col md:flex-row gap-3">
              <input
                id="custom-food"
                type="text"
                placeholder="e.g. snacks, cooking oil..."
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