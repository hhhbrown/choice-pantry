'use client'

import { useEffect, useState } from 'react'
import { db } from '@/app/firebase'
import { collection, getDocs } from 'firebase/firestore'

export default function Dashboard() {
    const [patterns, setPatterns] = useState<any[]>([])
    const [suggestions, setSuggestions] = useState<any[]>([])
    const [comfortFoods, setComfortFoods] = useState<any[]>([])
    const [requests, setRequests] = useState<any[]>([])

    const fetchCollection = async (name: string) => {
        const snapshot = await getDocs(collection(db, name))
        return snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }))
    }

    useEffect(() => {
        const fetchData = async () => {
            setPatterns(await fetchCollection('patternCounts'))
            setSuggestions(await fetchCollection('suggestionCounts'))
            setComfortFoods(await fetchCollection('comfortFoodCounts'))
            setRequests(await fetchCollection('requests'))
        }

        fetchData()
    }, [])

    const sortData = (data: any[]) =>
        [...data].sort((a, b) => (b.count || 0) - (a.count || 0))

    const top = (data: any[]) => sortData(data)[0]

    const renderBars = (title: string, data: any[]) => {
        const sorted = sortData(data)
        const max = sorted[0]?.count || 1

        return (
            <div className="bg-white p-6 rounded-2xl shadow">
                <h2 className="text-xl font-bold mb-4">{title}</h2>

                <div className="space-y-3">
                    {sorted.slice(0, 5).map((item) => (
                        <div key={item.id}>
                            <div className="flex justify-between text-sm mb-1">
                                <span>{item.label || item.name || item.id}</span>
                                <span>{item.count}</span>
                            </div>

                            <div className="w-full bg-zinc-200 rounded-full h-2">
                                <div
                                    className="bg-black h-2 rounded-full"
                                    style={{
                                        width: `${(item.count / max) * 100}%`,
                                    }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    const insights = () => {
        const topPattern = top(patterns)
        const topFood = top(suggestions)
        const topComfort = top(comfortFoods)
        const topRequest = top(requests)

        return (
            <div className="bg-black text-white p-6 rounded-2xl mb-8">
                <h2 className="text-xl font-bold mb-4">Top insights this week</h2>

                <ul className="space-y-2 text-sm">
                    {topPattern && (
                        <li>🍽 Most common meal pattern: {topPattern.label}</li>
                    )}
                    {topFood && (
                        <li>🥗 Most requested food: {topFood.id}</li>
                    )}
                    {topComfort && (
                        <li>☕ Top comfort item: {topComfort.id}</li>
                    )}
                    {topRequest && (
                        <li>📝 Frequent custom need: {topRequest.name}</li>
                    )}
                </ul>
            </div>
        )
    }

    return (
        <main className="min-h-screen bg-zinc-50 p-8 text-black">
            <h1 className="text-3xl font-bold mb-6">Staff Dashboard</h1>

            {insights()}

            <div className="grid md:grid-cols-2 gap-6">
                {renderBars('Cultural Patterns', patterns)}
                {renderBars('Suggested Foods', suggestions)}
                {renderBars('Comfort Foods', comfortFoods)}
                {renderBars('Special Requests', requests)}
            </div>
        </main>
    )
}