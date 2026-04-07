/* I am building everything in one single page. This is called conditional rendering 
(= showing different UI based on conditions), so React switches between screens without changing the URL.

State 1: loading = true → shows "Loading..."
State 2: savedName = null (no name saved) → shows NAME ENTRY screen
State 3: savedName exists + screen = 'welcome' → shows WELCOME screen for 15 seconds
State 4: savedName exists + screen = 'home' → shows HOME screen with prayer times */

'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

export default function Home() {
  const [name, setName] = useState('')
  const [savedName, setSavedName] = useState(null)
  const [loading, setLoading] = useState(true)
  const [screen, setScreen] = useState('welcome') // 'welcome' or 'home'
  const [todayDate, setTodayDate] = useState('')
  const [prayers, setPrayers] = useState([])
  

  useEffect(() => {
    const stored = localStorage.getItem('userName')
    if (stored) {
      setSavedName(stored)
    }
    setLoading(false)
    fetchPrayerTimes()

    // Get today's date
    const today = new Date()
    const formatted = today.toLocaleDateString('en-GB', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
    setTodayDate(formatted) 
  }, [])



  async function fetchPrayerTimes() {
    const res = await fetch(
      'https://api.aladhan.com/v1/timings?latitude=60.0969&longitude=19.9348&method=3'
    )
    const data = await res.json()
    const timings = data.data.timings

    setPrayers([
      { name: 'Fajr', time: timings.Fajr },
      { name: 'Dhuhr', time: timings.Dhuhr },
      { name: 'Asr', time: timings.Asr },
      { name: 'Maghrib', time: timings.Maghrib },
      { name: 'Isha', time: timings.Isha },
    ])
  }

  async function handleSubmit() {
    if (!name.trim()) return

    const { data, error } = await supabase
      .from('users')
      .insert([{ name: name.trim() }])
      .select()

    if (error) {
      console.error('Error saving name:', error)
      return
    }

    localStorage.setItem('userName', name.trim())
    localStorage.setItem('userId', data[0].id)
    setSavedName(name.trim())
  }

  if (loading) return <p>Loading...</p>

  // Welcome screen — shows for 15 seconds then switches to home
  if (savedName && screen === 'welcome') {
    return (
      <main 
        className="flex flex-col items-center justify-center min-h-screen p-6 text-center"
        onClick={() => setScreen('home')} // tap anywhere → go to home
      >
        <h1 className="text-2xl font-bold mb-2">
          Assalamu Alaykum {savedName}! 🕌
        </h1>
        <p className="text-gray-500">"Whoever goes to the masjid, Allah prepares for him a place in Paradise."</p>
        <p className="text-gray-500 mb-6"> — Prophet Muhammad ﷺ (Bukhari & Muslim)</p>
        <p className="text-sm text-gray-400 mt-8">Tap anywhere to continue</p>
      </main>
    )
  }



  // Home screen — shows prayer times
  if (savedName && screen === 'home') {
    return (
      <main className="flex flex-col min-h-screen p-6">
        
        <h1 className="text-xl font-bold mb-4 text-center"><p className="text-center text-5xl mb-4">🕌</p><br />Today&apos;s Prayers</h1>
        <div className="w-full max-w-sm mx-auto">
            {/* Date and location header */}
            <div className="text-center mb-6">
              <p className="text-sm text-gray-500"> Mariehamn, Åland</p>
              <p className="text-sm text-gray-500">{todayDate}</p>
            </div>
          
          {prayers.map((prayer) => (
            <div key={prayer.name} className="flex justify-between bg-green-50 rounded-xl px-4 py-3 mb-2">
              <span className="font-medium">{prayer.name}</span>
              <span className="text-gray-600">{prayer.time}</span>
            </div>
          ))}
        </div>
      </main>
    )
  }

  // Name entry screen — shown if no name is saved
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6">
      <div className="bg-green-50 rounded-2xl shadow-md p-8 w-full max-w-sm">
        <h1 className="text-xl font-bold mb-6 text-center">
          Please enter your name
        </h1>
        <input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-4 text-base"
        />
        <button
          onClick={handleSubmit}
          className="w-full bg-black text-white rounded-lg px-4 py-3 text-base font-medium"
        >
          Continue
        </button>
      </div>
    </main>
  )
}


/* 'use client'

import { useEffect } from 'react'
import { supabase } from '@/lib/supabase'

export default function Home() {
  useEffect(() => {
    async function testConnection() {
      const { data, error } = await supabase.from('users').select('*')
      console.log('data:', data)
      console.log('error:', error)
    }
    testConnection()
  }, [])

  return (
    <main>
      <h1>Mosque Prayer Coordinator</h1>
      <p>Check the browser console for Supabase connection test</p>
    </main>
  )
}*/

/* Click on Inspect > Console, you should see the following to know Supabase is successfully connected to Next.js app.:
[HMR] connected    ← Next.js is running and watching for changes
data: Array(0)     ← Supabase connected! Returns empty array (no users yet, expected)
error: null        ← NO errors */
