// auth.ts
import { signInWithPopup, GoogleAuthProvider, User, AuthError } from "firebase/auth";
import { getFirebaseAuth } from "./config";  // Import getFirebaseAuth from config.ts

// Sign in with Google
export const signInWithGoogle = async (): Promise<User | null> => {
  const auth = getFirebaseAuth(); // Get the Firebase auth instance
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    return result.user; // Return the user object upon successful sign-in
  } catch (error) {
    const authError = error as AuthError;
    console.error("Error signing in with Google", authError);
    if (authError.code === 'auth/popup-closed-by-user') {
      console.log("Popup closed by user");
    } else {
      throw authError; // Re-throw the error so it can be caught in the component
    }
    return null; // Return null in case of an error
  }
};

// Sign out
export const signOut = async (): Promise<void> => {
  const auth = getFirebaseAuth(); // Get the Firebase auth instance
  try {
    await auth.signOut(); // Use the Firebase signOut function
  } catch (error) {
    console.error("Error signing out", error);
  }
};

export { getFirebaseAuth };
