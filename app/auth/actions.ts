'use server'

import { db } from "@/lib/db"
import { redirect } from "next/navigation"
import { IndustryType } from "@prisma/client"
import bcrypt from "bcryptjs"

export async function registerTenant(formData: FormData) {
    const firstName = formData.get("firstName") as string
    const lastName = formData.get("lastName") as string
    const email = formData.get("email") as string
    const password = formData.get("password") as string
    const orgName = formData.get("orgName") as string
    const industryStr = formData.get("industry") as string

    if (!firstName || !lastName || !email || !password || !orgName || !industryStr) {
        throw new Error("All fields are required")
    }

    const existingUser = await db.user.findUnique({
        where: { email }
    })

    if (existingUser) {
        // ideally return error to form
        throw new Error("User already exists")
    }

    const industryMap: Record<string, IndustryType> = {
        "education": "EDUCATION",
        "real-estate": "REAL_ESTATE",
        "healthcare": "HEALTHCARE"
    }

    const industry = industryMap[industryStr]

    const hashedPassword = await bcrypt.hash(password, 10)

    // Trial expires in 7 days
    const trialExpires = new Date()
    trialExpires.setDate(trialExpires.getDate() + 7)

    const tenant = await db.tenant.create({
        data: {
            name: orgName,
            industry: industry,
            subscriptionStatus: "TRIAL",
            subscriptionExpires: trialExpires,
            users: {
                create: {
                    name: `${firstName} ${lastName}`,
                    email: email,
                    password: hashedPassword,
                    role: "SUPER_ADMIN"
                }
            }
        }
    })

    // Auto-seed dummy data based on industry for instant value?
    // For now, clean slate is fine or we can call seed functions.

    // Allow NextAuth to login (since we can't set cookie directly in server action easily without custom logic, 
    // we direct to login or dashboard. For smooth UX, usually we auto-login, but that requires calling signIn() from client.
    // So we will return success and client will redirect or sign in.)

    // For simplicity, redirect to login with a query param
    return { success: true }
}
