import NextAuth, { DefaultSession } from "next-auth"

declare module "next-auth" {
    interface Session {
        user: {
            id: string
            tenantId: string
            industry: string
            role: string
        } & DefaultSession["user"]
    }

    interface User {
        tenantId: string
        industry: string
        role: string
    }
}
