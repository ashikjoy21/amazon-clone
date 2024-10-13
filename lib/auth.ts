import { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { getAuth } from "firebase-admin/auth"
import { initializeApp, getApps, cert } from 'firebase-admin/app'
import { Session } from "next-auth"
import { JWT } from "next-auth/jwt"
import { AdapterUser } from "next-auth/adapters"

// Initialize Firebase Admin SDK if not already initialized
if (!getApps().length) {
  initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
  });
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async session({ session, token }: { session: Session; token: JWT }) {
      if (session.user && token.sub) {
        try {
          const auth = getAuth();
          const firebaseUser = await auth.getUser(token.sub);
          session.user.id = firebaseUser.uid;
          session.user.name = firebaseUser.displayName || session.user.name;
          session.user.email = firebaseUser.email || session.user.email;
          session.user.image = firebaseUser.photoURL || session.user.image;
        } catch (error: Error) {
          console.error("Error fetching Firebase user:", error);
        }
      }
      return session;
    },
    async jwt({ token, user, account }: { token: JWT; user?: AdapterUser; account?: any }) {
      if (account && user) {
        token.id = user.id;
      }
      return token;
    },
  },
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
  },
}
