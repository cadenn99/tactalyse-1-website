import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import jwt from 'jsonwebtoken'
import {TokenInterface} from '../../../../typings'

export default NextAuth({
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'email',
      credentials: {},

      async authorize(credentials, req) {
        const payload = credentials as {
          email: string,
          password: string,
        };

        const res = await fetch('http://localhost:5000/auth/login', { //TODO: Switch to ENV variable
          method: 'POST',
          body: JSON.stringify(payload),
          headers: {
            'Content-Type': 'application/json',
          },
        })

        //No user object could be created for whatever reason
        const user = await res.json()
        if (!res.ok) {
          throw new Error(user.message)
        }

        //Successfully signed in
        if (res.ok && user) {
          return user
        }

        //Signin failed somewhere
        return null
      },
    }),
  ],

  jwt: {secret: "JWTSECRETTOKEN"},
  pages: {
    signIn: '/auth/login',
    signOut: '/auth/logout',
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
      return session
    },
  },

  //Debugging on ENV code; FIXME: remove when done
  debug: process.env.NODE_ENV === 'development',
})