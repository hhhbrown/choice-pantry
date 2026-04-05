'use client'

import { useState } from 'react'
import { db } from '@/app/firebase'
import { doc, setDoc, increment } from 'firebase/firestore'
import { useRouter } from 'next/navigation'

export default function SubmitPage() {
  const [customInput, setCustomInput] = useState('')
  const [submittedValue, setSubmittedValue] = useState<string | null>(null)
  const router = useRouter()

  const handleAddCustom = () => {
    if (!customInput.trim()) return
    setSubmittedValue(customInput.trim())
    setCustomInput('')
  }

  const handleSubmit = async () => {
    try {
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

      router.push('/thankyou')

    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (

    <main
        className="relative min-h-screen flex items-center justify-center px-6 bg-center bg-cover"
        style={{
          backgroundImage: "url('/images/background.jpg')",
        }}
      > 
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-sm border border-zinc-200">
        <h1 className="text-2xl font-bold text-zinc-900 mb-2">
          Did we miss anything?
        </h1>

        <div className="rounded-xl border border-zinc-300 bg-white p-4">
          <label className="block text-sm font-medium text-zinc-800 mb-2">
            I'm looking for:
          </label>

          <input
            type="text"
            placeholder="e.g. food choices, other concerns..."
            value={customInput}
            onChange={(e) => setCustomInput(e.target.value)}
            className="w-full rounded-lg border px-4 py-3"
          />

          <button
            onClick={handleAddCustom}
            className="mt-3 w-full rounded-lg bg-black px-4 py-3 text-white"
          >
            Add
          </button>

          {submittedValue && (
            <p className="mt-3 text-sm">
              Added: <strong>{submittedValue}</strong>
            </p>
          )}
        </div>

        <button
          onClick={handleSubmit}
          className="mt-6 w-full rounded-xl bg-black px-4 py-3 text-white"
        >
          Submit
        </button>
      </div>
    </main>
  )
}