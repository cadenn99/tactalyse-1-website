import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import jwt from 'jsonwebtoken'
import { TokenInterface } from '../../../../types/types'

/**
 * This function does setup for Nextauth, the authentication library we're using in this project.
 */
export default NextAuth({
  /**
   * Configures the providers available (currently email only).
   */
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'email',
      credentials: {},

      /**
       * Actually authorizes the user with the backend.
       * @param credentials the credentials to authorize.
       * @returns the new session state.
       */
      async authorize(credentials) {
        const payload = credentials as {
          email: string,
          password: string,
        };

        /**
         * Calls the backend and stores the result.
         */
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`, {
          method: 'POST',
          body: JSON.stringify(payload),
          headers: {
            'Content-Type': 'application/json',
          },
        })

        /**
         * If the backend doesn't respond with an OK, throw an error.
         */
        const user = await res.json()
        console.log(res.status)
        if (!res.ok) {
          throw new Error(user.message)
        }

        /**
         * If the user signed in successfully, return the new session state as user object.
         */
        if (res.ok && user) {
          return user
        }

        /**
         * Shouldn't be reachable, only here for completion's sake.
         */
        return null
      },
    }),
  ],

  /**
   * Options necessary for decoding JWT tokens.
   */
  jwt: {
    secret: process.env.NEXTAUTH_SECRET
  },

  /**
   * Custom pages which override the Next-auth defaults.
   */
  pages: {
    signIn: '/auth/login',
  },

  callbacks: {
    /* This callback is invoked when a new JWT is created (on login)
     * it passes the accessToken to the session, to be used client-side
     */
    async jwt({ token, user, account }) {
      if (account && user) {
        token.accessToken = user.token
      }
      return token
    },

    /* This callback is invoked everytime the useSession() or getSession() hooks are called.
     * it determines what values exactly are forwarded to the client.
     * in our case it passes the JWT token, email and isEmployee status.
     */
    async session({ session, token }) {
      const payload = jwt.decode(token.accessToken as string) as TokenInterface
      session.accessToken = token.accessToken as string
      session.user.email = payload.email
      session.user.isEmployee = payload.isEmployee
      session.user.id = payload._id
      return session
    },
  },

  /**
   * Enables debug if the environment variables tell us to do so.
   */
  debug: process.env.NODE_ENV === 'development',
})