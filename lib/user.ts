import { User as FirebaseUser } from "firebase/auth"

export async function syncUserWithDatabase(firebaseUser: FirebaseUser) {
  const { uid, email, displayName } = firebaseUser

  try {
    const response = await fetch('/api/syncUser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ uid, email, displayName }),
    })

    if (!response.ok) {
      throw new Error('Failed to sync user')
    }

    return await response.json()
  } catch (error) {
    console.error('Error syncing user:', error)
    return null
  }
}
