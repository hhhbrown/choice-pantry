'use client'

import { useRouter } from 'next/navigation'

export default function ThankYou() {
    const router = useRouter()

    return (
        <main
            className="relative min-h-screen flex items-center justify-center px-6 bg-center bg-cover"
            style={{
                backgroundImage: "url('/Images/background.jpg')",
            }}
        >
            <div className="absolute inset-0 bg-white/80" />

            <div className="relative text-center max-w-xl">

                <div className="bg-white p-10 rounded-2xl shadow text-center max-w-md">
                    <h1 className="text-2xl text-black font-bold mb-4">
                        Thank you!
                    </h1>

                    <p className="text-zinc-600 mb-6">
                        Your input helps improve food choices and support in the shelter.
                    </p>

                    <button
                        onClick={() => router.push('/')}
                        className="bg-black text-white px-6 py-3 rounded-xl"
                    >
                        Back to Home
                    </button>
                </div>
            </div>
        </main>
    )
}