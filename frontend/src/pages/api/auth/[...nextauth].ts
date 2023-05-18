import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import jwt from 'jsonwebtoken'
import { TokenInterface } from '../../../../types/types'
import axios from 'axios'

/**
 * This function does setup for Nextauth, the authentication library we're using in this project.
 */
export default NextAuth({
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'email',
      credentials: {},
      async authorize(credentials) {
        const res = await axios(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`, {
          method: 'POST',
          data: credentials,
        })

        console.log(res)
        if (res.status !== 200) {
          throw new Error(res.data.message)
        }
        return res.data
      },
    }),
  ],
  jwt: {
    secret: process.env.NEXTAUTH_SECRET
  },
  pages: {
    signIn: '/auth/login',
  },

  callbacks: {
    async jwt({ token, user, account }) {
      if (account && user) {
        token.accessToken = user.token
      }
      return token
    },
    async session({ session, token }) {
      const payload = jwt.decode(token.accessToken as string) as TokenInterface
      session.accessToken = token.accessToken as string
      session.user.email = payload.email
      session.user.isEmployee = payload.isEmployee
      session.user.id = payload._id
      return session
    },
  },
  debug: process.env.NODE_ENV === 'development',
})