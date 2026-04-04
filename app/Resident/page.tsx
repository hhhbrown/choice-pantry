export default function resident() {
    return (
        <main className="min-h-screen bg-zinc-50 flex flex-col items-center justify-center px-6">
            <div className="text-center max-w-xl">
                <h1 className="text-3xl md:text-4xl font-bold text-zinc-900">
                    Welcome!
                </h1>
            </div>
        <div className="mt-10 w-full max-w-sm flex flex-col gap-4">
        <a 
        href="/cuisinepreferences"
        className="w-full text-center px-6 py-4 rounded-xl bg-black text-white font-medium text-lg hover:bg-zinc-800 transition"
        >
            Start
        </a>
        <a
        href="/cuisinepreferences"
        className="w-full text-center px-6 py-4 rounded-xl bg-white border border-zinc-300 text-zinc-800 font-medium text-lg hover:bg-zinc-100 transition"
        >
            Language Preferences
        </a>
    </div>
    
        <p className="mt-8 text-sm text-zinc-500 text-center max-w-xs">
            No login required. Your input is anonymous and helps improve food choices.
        </p>
      </main>
    )
  }