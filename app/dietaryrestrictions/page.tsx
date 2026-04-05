'use client'

import { useState } from 'react'
import { db } from '@/app/firebase'
import { doc, updateDoc, increment, setDoc } from 'firebase/firestore'
import { useRouter } from 'next/navigation'

type Option = {
    label: string
    value: string
}

const options: Option[] = [
    { label: 'Vegan', value: 'vegan' },
    { label: 'Vegetarian', value: 'vegetarian' },
    { label: 'Halal', value: 'halal' },
    { label: 'No pork', value: 'no_pork' },
    { label: 'Gluten free', value: 'gf' },
    { label: 'Dairy free', value: 'dairy_free' },
    { label: 'Nut free', value: 'nut_free' },
]

export default function DietaryRestrictions() {
    const [selected, setSelected] = useState<string[]>([])
    const [customInput, setCustomInput] = useState('')
    const [submittedValue, setSubmittedValue] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)
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
        setLoading(true)

        try {
            const updates = selected.map((value) => {
                const ref = doc(db, 'restrictions', value)
                return updateDoc(ref, {
                    count: increment(1),
                })
            })

            await Promise.all(updates)

            if (submittedValue) {
                const customRef = doc(
                    db,
                    'requests',
                    submittedValue.toLowerCase()
                )

                await setDoc(
                    customRef,
                    {
                        name: submittedValue,
                        count: increment(1),
                    },
                    { merge: true }
                )
            }

            console.log('Data successfully updated!')

            router.push('/submitprefs')

        } catch (error) {
            console.error('Error updating data:', error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="relative min-h-screen">
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: "url('/images/background3.jpg')" }}
            />

            <div className="absolute inset-0 bg-white/70" />

            <main className="relative z-10 flex min-h-screen items-center justify-center px-6 py-10">
                <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-sm border border-zinc-200">
                    <h1 className="text-2xl font-bold text-zinc-900 mb-2">
                        What are your dietary restrictions?
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
                                    className={`w-full rounded-xl border px-4 py-3 text-left transition ${isSelected
                                            ? 'border-black bg-black text-white'
                                            : 'border-zinc-300 bg-white text-zinc-800 hover:bg-zinc-100'
                                        }`}
                                >
                                    {option.label}
                                </button>
                            )
                        })}

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
                                placeholder="e.g. pregnant, breastfeeding, allergies..."
                                value={customInput}
                                onChange={(e) => setCustomInput(e.target.value)}
                                className="w-full rounded-lg border border-zinc-300 px-4 py-3 text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-black"
                            />

                            <button
                                type="button"
                                onClick={handleAddCustom}
                                className="mt-3 w-full rounded-lg bg-white px-4 py-3 text-black font-medium transition border border-zinc-400"
                            >
                                Add
                            </button>

                            {submittedValue && (
                                <p className="mt-3 text-sm text-zinc-600">
                                    Added:{' '}
                                    <span className="font-medium text-zinc-900">
                                        {submittedValue}
                                    </span>
                                </p>
                            )}
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={handleContinue}
                        disabled={loading}
                        className="mt-6 w-full rounded-xl bg-zinc-900 px-4 py-3 text-white font-medium hover:bg-zinc-800 transition disabled:opacity-50"
                    >
                        {loading ? 'Saving...' : 'Continue'}
                    </button>
                </div>
            </main>
        </div>
    )
}