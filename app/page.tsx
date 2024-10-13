'use client'

import { getFirebaseAuth } from '@/lib/firebase/config'
import { onAuthStateChanged, User } from 'firebase/auth'
import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import LoadingSpinner from '../components/LoadingSpinner'

// Dynamically import components for better performance
const LoginPage = dynamic(() => import('@/components/LoginPage'), {
  loading: () => <LoadingSpinner />
})
const Dashboard = dynamic(() => import('@/components/Dashboard'), {
  loading: () => <LoadingSpinner />
})

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
    return <LoadingSpinner />
  }

  if (!user) {
    return <LoginPage />
  }

  return <Dashboard />
}
