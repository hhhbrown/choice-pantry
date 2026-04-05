'use client'

import { useState } from 'react'
import { db } from '@/app/firebase'
import { doc, setDoc, increment } from 'firebase/firestore'
import { useRouter } from 'next/navigation'

type Option = {
    label: string
    value: string
    image: string
}

const options: Option[] = [
    { label: 'Hot Drinks', value: 'hot_drinks', image: '/Images/hotdrinks.jpg' },
    { label: 'Sweets', value: 'sweets', image: '/Images/sweets.jpg' },
    { label: 'Spices & Sauces', value: 'spices', image: '/Images/spices.jpg' },
    { label: 'Fresh Fruits', value: 'fruits', image: '/Images/fruits.jpg' },
]

export default function ComfortFoods() {
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
            for (const item of selected) {
                const ref = doc(db, 'comfortFoodCounts', item)

                await setDoc(
                    ref,
                    { count: increment(1) },
                    { merge: true }
                )
            }

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
            router.push('/dietaryrestrictions')

        } catch (error) {
            console.error('Error:', error)
        }
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
                                className={`group relative min-h-36 rounded-2xl overflow-hidden transition ${isSelected
                                    ? 'ring-2 ring-black/100'
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
                                        {isSelected ? '' : ''}
                                    </span>
                                </div>
                            </button>
                        )
                    })}

                    <div className="col-span-2 md:col-span-3 xl:col-span-4 rounded-2xl border bg-white p-5">
                        <label className="block text-lg text-black font-semibold mb-3">
                            Other:
                        </label>

                        <div className="flex gap-3">
                            <input
                                type="text"
                                placeholder="e.g. snacks, cooking oil..."
                                value={customInput}
                                onChange={(e) => setCustomInput(e.target.value)}
                                className="flex-1 rounded-xl border px-4 py-3 placeholder-zinc-600 text-black"
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