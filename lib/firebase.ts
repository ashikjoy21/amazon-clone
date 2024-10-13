import { initializeApp, getApps, FirebaseApp } from "firebase/app"
import { getAuth, Auth } from "firebase/auth"

const requiredEnvVars = [
  'NEXT_PUBLIC_FIREBASE_API_KEY',
  'NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN',
  'NEXT_PUBLIC_FIREBASE_PROJECT_ID',
  'NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET',
  'NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID',
  'NEXT_PUBLIC_FIREBASE_APP_ID'
] as const

const firebaseConfig = Object.fromEntries(
  requiredEnvVars.map(key => [key.replace('NEXT_PUBLIC_FIREBASE_', '').toLowerCase(), process.env[key]])
)

// Check if all required configuration values are present
const requiredKeys = ['apiKey', 'authDomain', 'projectId', 'storageBucket', 'messagingSenderId', 'appId'];
const missingKeys = requiredKeys.filter(key => !firebaseConfig[key]);

if (missingKeys.length > 0) {
  throw new Error(`Missing Firebase configuration values: ${missingKeys.join(', ')}`);
}

let firebaseApp: FirebaseApp;
let auth: Auth;

function initializeFirebase() {
  if (!getApps().length) {
    firebaseApp = initializeApp(firebaseConfig);
  } else {
    firebaseApp = getApps()[0];
  }
  auth = getAuth(firebaseApp);
}

// Initialize Firebase
initializeFirebase();

export { firebaseApp, auth };

// Helper function to get auth instance
export function getFirebaseAuth(): Auth {
  if (!auth) {
    initializeFirebase();
  }
  return auth;
}
