import Link from 'next/link'

export default function HomePage() {
    return (
        <main
            className="relative min-h-screen flex items-center justify-center px-6 bg-center bg-cover"
            style={{
                backgroundImage: "url('/images/background.jpg')",
            }}
        >
            <div className="absolute inset-0 bg-white/80" />

            <div className="relative text-center max-w-xl">
                <h1 className="text-3xl font-bold text-zinc-900">
                    Seat at the Table
                </h1>

                <p className="mt-4 text-zinc-600">
                    A fuller plate, in every sense.
                </p>

                <div className="mt-8 flex flex-col gap-4">
                    <Link
                        href="/resident"
                        className="px-6 py-4 rounded-xl bg-black text-white"
                    >
                        I am a resident
                    </Link>

                    <Link
                        href="/staff"
                        className="px-6 py-4 rounded-xl bg-white border text-black"
                    >
                        I am staff
                    </Link>
                </div>
            </div>
        </main>
    )
}