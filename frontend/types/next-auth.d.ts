import NextAuth, { DefaultSession } from "next-auth"
import { DefaultJWT, JWT } from "next-auth/jwt"

/** 
 * This configures some next-auth specific interfaces.
 * Specifically it edits the default Session and User interfaces to be compatible with our backend.
 */
declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      email: string,
      isEmployee: boolean,
    }
    accessToken: string
  }
}


