import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export default NextAuth({
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'email',
      credentials: {
        email: {label: 'email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },

      async authorize(credentials, req) {
        const payload = {
          email: credentials.email,
          password: credentials.password,
        }

        const res = await fetch('http://localhost:5000/auth/login', { //TODO: move to env variable
          method: 'POST',
          body: JSON.stringify(payload),
          headers: {
            'Content-Type': 'application/json',
          },
        })

        //TODO: figure out isEmployee status in res here; also consult with Caden wrt backend response body
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

  secret: process.env.JWT_SECRET,
  pages: {
    signIn: '/auth/login',
  },

  callbacks: {
    async jwt({ token, user, account }) {
      if (account && user) {
        return {
          ...token,
          accessToken: user.token,
          refreshToken: user.refreshToken,
        }
      }
      return token
    },

    async session({ session, token }) {
      session.user.accessToken = token.accessToken
      session.user.refreshToken = token.refreshToken
      session.user.accessTokenExpires = token.accessTokenExpires
      return session
    },
  },

  //Debugging on ENV code; FIXME: remove when done
  debug: process.env.NODE_ENV === 'development',
})