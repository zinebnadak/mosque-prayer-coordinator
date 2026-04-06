'use client'

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
}

/* Click on Inspect > Console, you should see the following to know Supabase is successfully connected to Next.js app.:
[HMR] connected    ← Next.js is running and watching for changes
data: Array(0)     ← Supabase connected! Returns empty array (no users yet, expected)
error: null        ← NO errors */
