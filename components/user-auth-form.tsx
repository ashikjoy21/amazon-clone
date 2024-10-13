import { useState } from 'react'
import { useToast } from "./use-toast"
import { auth } from "@/lib/firebaseConfig"
import { signInWithEmailAndPassword } from "firebase/auth"

interface UserAuthFormProps {
  className?: string;
}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const { toast } = useToast()
  // const [isLoading, setIsLoading] = useState(false)
  // const [email, setEmail] = useState('')
  // const [password, setPassword] = useState('')
  // const [error, setError] = useState('')

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault()
    // setIsLoading(true)

    try {
      await signInWithEmailAndPassword(auth, email, password)
      toast({
        title: "Success",
        description: "You have successfully logged in.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error logging in. Please try again.",
        variant: "destructive",
      })
    } finally {
      // setIsLoading(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className={className} {...props}>
      {/* Add your form fields here */}
    </form>
  )
}
