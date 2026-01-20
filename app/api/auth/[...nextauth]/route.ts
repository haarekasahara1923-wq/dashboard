import NextAuth, { AuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { db } from "@/lib/db"
import bcrypt from "bcryptjs"
import { PrismaAdapter } from "@next-auth/prisma-adapter"

export const authOptions: AuthOptions = {
    adapter: PrismaAdapter(db),
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null
                }

                const user = await db.user.findUnique({
                    where: { email: credentials.email },
                    include: { tenant: true }
                })

                if (!user) return null

                const passwordsMatch = await bcrypt.compare(credentials.password, user.password)

                if (!passwordsMatch) return null

                return {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    tenantId: user.tenantId,
                    industry: user.tenant.industry,
                    role: user.role
                }
            }
        })
    ],
    session: {
        strategy: "jwt"
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.tenantId = user.tenantId
                token.industry = user.industry
                token.role = user.role
            }
            return token
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.tenantId = token.tenantId as string
                session.user.industry = token.industry as string
                session.user.role = token.role as string
            }
            return session
        }
    },
    pages: {
        signIn: "/auth/login",
    }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
