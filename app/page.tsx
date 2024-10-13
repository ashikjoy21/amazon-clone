'use client'

import { getFirebaseAuth } from '@/lib/firebase/config'
import { onAuthStateChanged, User } from 'firebase/auth'
import { useEffect, useState } from 'react'
import LoginPage from '@/components/LoginPage'
import Dashboard from '@/components/Dashboard'

export default function Home() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const auth = getFirebaseAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  if (!user) {
    return <LoginPage />
  }

  return <Dashboard />
}
