'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function StaffLogin() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleLogin = () => {
    if (password === 'admin123') {
      router.push('/dashboard')
    } else {
      setError('Incorrect password')
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-zinc-50">
      <div className="bg-white p-8 rounded-2xl shadow w-full max-w-sm">
        <h1 className="text-xl font-bold mb-4">Staff Access</h1>

        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border px-4 py-3 rounded-lg mb-4"
        />

        {error && (
          <p className="text-red-500 text-sm mb-2">{error}</p>
        )}

        <button
          onClick={handleLogin}
          className="w-full bg-black text-white py-3 rounded-lg"
        >
          View dashboard
        </button>
      </div>
    </main>
  )
}