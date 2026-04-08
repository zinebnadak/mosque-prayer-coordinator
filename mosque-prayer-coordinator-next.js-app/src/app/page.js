/* I am building everything in one single page. This is called conditional rendering 
(= showing different UI based on conditions), so React switches between screens without changing the URL.

State 1: loading = true → shows "Loading..."
State 2: savedName = null (no name saved) → shows NAME ENTRY screen
State 3: savedName exists + screen = 'welcome' → shows WELCOME screen for 15 seconds
State 4: savedName exists + screen = 'home' → shows HOME screen with prayer times 

everything lives inside Home(), in this order:
1. States
2. useEffect
3. Functions
4. Return statements (screens)

*/

javascript/* I am building everything in one single page. This is called conditional rendering 
(= showing different UI based on conditions), so React switches between screens without changing the URL.

State 1: loading = true → shows "Loading..."
State 2: savedName = null (no name saved) → shows NAME ENTRY screen
State 3: savedName exists + screen = 'welcome' → shows WELCOME screen
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
  const [upcomingPrayer, setUpcomingPrayer] = useState(null)  //  highlighted prayer
  const [attendance, setAttendance] = useState([])             // who is attending
  const [userAttending, setUserAttending] = useState(false)    // is current user attending?

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

    // REAL-TIME SUBSCRIPTION
    const subscription = supabase
      .channel('attendance')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'attendance' },
        () => fetchAttendance(upcomingPrayer?.name)
      )
      .subscribe()

    return () => subscription.unsubscribe()
  }, []) // [] = run only once when the component first loads


  async function fetchPrayerTimes() {
    const res = await fetch(
      'https://api.aladhan.com/v1/timings?latitude=60.0969&longitude=19.9348&method=3'
    )
    const data = await res.json()
    const timings = data.data.timings

    const prayerList = [
      { name: 'Fajr', time: timings.Fajr },
      { name: 'Dhuhr', time: timings.Dhuhr },
      { name: 'Asr', time: timings.Asr },
      { name: 'Maghrib', time: timings.Maghrib },
      { name: 'Isha', time: timings.Isha },
    ]

    setPrayers(prayerList)
    // ← find and set upcoming prayer immediately after fetching
    const upcoming = findUpcomingPrayer(prayerList)
    setUpcomingPrayer(upcoming)
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

  // 1. Find upcoming prayer — no database needed, just logic
  function findUpcomingPrayer(prayerList) {
    const now = new Date() // current time

    for (const prayer of prayerList) { // loop through each prayer

      // Split "04:12" into hours and minutes
      const [hours, minutes] = prayer.time.split(':').map(Number)

      // Create a Date object for this prayer's time today
      const prayerTime = new Date()
      prayerTime.setHours(hours, minutes, 0, 0)

      // Add 30 minutes to prayer time
      const prayerTimePlus30 = new Date(prayerTime.getTime() + 30 * 60 * 1000)

      // If current time is before prayer time + 30 min → this is upcoming
      if (now < prayerTimePlus30) {
        return prayer // ← return this prayer as the upcoming one
      }
    }
    return null // all prayers passed → return null → show "No prayers left"
  }

  // 2. Fetch attendance for that prayer from Supabase
  async function fetchAttendance(prayerName) {
  }

  // 3. Handle attending/cancel — needs database
  async function handleAttending() {
  }

  // 4. Real-time subscription — goes inside useEffect, not here


  if (loading) return <p>Loading...</p>

  // Welcome screen — tap anywhere to go to home
  if (savedName && screen === 'welcome') {
    return (
      <main
        className="flex flex-col items-center justify-center min-h-screen p-6 text-center"
        onClick={() => setScreen('home')} // tap anywhere → go to home
      >
        <h1 className="text-2xl font-bold mb-2">
          Assalamu Alaykum {savedName}!
        </h1>
        <p className="text-gray-500">"Whoever goes to the masjid, Allah prepares for him a place in Paradise."</p>
        <p className="text-gray-500 mb-6"> — Prophet Muhammad ﷺ (Bukhari & Muslim)</p>
        <p className="text-sm text-gray-400 mt-8">Tap to continue</p>
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

          {/* Upcoming prayer — highlighted in green, bigger box, attending button */}
          {upcomingPrayer ? (
            <div className="bg-green-700 text-white rounded-2xl px-4 py-5 mb-4">
              <p className="text-xs uppercase tracking-wide mb-1 opacity-70">Next Prayer</p>
              <div className="flex justify-between items-center">
                <span className="text-xl font-bold">{upcomingPrayer.name}</span>
                <span className="text-xl">{upcomingPrayer.time}</span>
              </div>
              <button className="w-full bg-white text-green-700 rounded-xl py-2 mt-3 font-medium">
                Attending
              </button>
            </div>
          ) : (
            // All prayers passed → show message
            <p className="text-center text-gray-500 my-4">No prayers left for today!</p>
          )}

          {/* Remaining prayers — smaller boxes, no attending button */}
          {prayers
            .filter(p => p.name !== upcomingPrayer?.name) // remove upcoming from list
            .map((prayer) => (
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
