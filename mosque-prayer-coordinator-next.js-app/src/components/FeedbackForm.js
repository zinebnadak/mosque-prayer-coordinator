'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function FeedbackForm() {
  const [message, setMessage] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async () => {
    if (!message.trim()) return
    await supabase.from('feedback').insert({ message })
    setSubmitted(true)
  }

  if (submitted) return (
    <p className="text-center text-sm py-4" style={{ color: 'rgba(240,230,211,0.6)' }}>
      Thanks! Your feedback was sent ✓
    </p>
  )

  return (
    <div>
      <p className="text-base font-semibold mb-1 text-center" style={{ color: 'rgba(240,230,211,0.6)' }}>
        Help us improve!
      </p>
      <p className="text-sm mb-2 text-center" style={{ color: 'rgba(240,230,211,0.6)' }}>
        Suggest a feature!
      </p>
      <textarea
        className="w-full rounded-xl p-3 text-sm"
        style={{
          backgroundColor: 'rgba(238,244,245,0.07)',
          border: '1px solid rgba(240,230,211,0.3)',
          color: '#F0E6D3',
        }}
        rows={3}
        value={message}
        onChange={e => setMessage(e.target.value)}
        placeholder="Type your suggestion..."
      />
      <button
        onClick={handleSubmit}
        className="mt-2 w-full rounded-xl py-2 text-sm font-medium"
        style={{ backgroundColor: 'rgba(240,230,211,0.6)', color: '#2E2016' }}
      >
        Submit
      </button>
    </div>
  )
}
