export default function Home() {
    return (
        <main className="min-h-screen bg-zinc-50 flex flex-col items-center justify-center px-6">
            {/* Header */}
            <div className="text-center max-w-xl">
                <h1 className="text-3xl md:text-4xl font-bold text-zinc-900">
                    Choice Pantry
                </h1>
                    <p className="mt-4 text-zinc-600 text-base md:text-lg">
                    Providing food that feels like home.
                    </p>
            </div>
        <div className="mt-10 w-full max-w-sm flex flex-col gap-4">
        <a
            href="/resident"
            className="w-full text-center px-6 py-4 rounded-xl bg-black text-white font-medium text-lg hover:bg-zinc-800 transition"
          >
            I am a resident
          </a>
  
          {/* Staff Button */}
          <a
            href="/staff"
            className="w-full text-center px-6 py-4 rounded-xl bg-white border border-zinc-300 text-zinc-800 font-medium text-lg hover:bg-zinc-100 transition"
          >
            I am staff
          </a>
        </div>
  
        {/* Footer note */}
        <p className="mt-8 text-sm text-zinc-500 text-center max-w-xs">
          No login required. Your input is anonymous and helps improve food choices.
        </p>
      </main>
    )
  }