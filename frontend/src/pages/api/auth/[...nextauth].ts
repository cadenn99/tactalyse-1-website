import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import jwt from 'jsonwebtoken'
import {TokenInterface} from '../../../../typings'

export default NextAuth({
  // we are only using the credentialsprovider (email + password)
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'email',
      credentials: {},

      // This function does the actual authentication
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

  // options necessary for successfull JWT decoding
  jwt: {secret: "JWTSECRETTOKEN"}, //Todo: replace with ENV var

  // These are our custom pages, overriding the nextauth defaults
  pages: {
    signIn: '/auth/login',
    signOut: '/auth/logout',
  },

  callbacks: {
    /* This callback is invoked when a new JWT is created (on login)
     * it passes the accesstoken to the session, to be used client-side
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
      return session
    },
  },

  //enable debug mode if env variable says so
  debug: process.env.NODE_ENV === 'development',
})