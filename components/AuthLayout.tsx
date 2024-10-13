'use client'

import { ReactNode, useEffect } from 'react'
import { auth } from '@/lib/firebaseConfig'
import { useRouter } from 'next/navigation'

interface AuthLayoutProps {
  children: ReactNode
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  const router = useRouter()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        router.push('/')
      }
    })

    return () => unsubscribe()
  }, [router])

  return <div>{children}</div>
}
