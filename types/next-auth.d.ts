// eslint-disable-next-line unused-imports/no-unused-imports
import NextAuth from "next-auth"

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      subscriptionId?: string
      name: string
      id: string
      isPremium?: boolean
    }
  }
}
