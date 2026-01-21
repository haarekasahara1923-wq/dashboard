'use server'

import { db } from "@/lib/db"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { revalidatePath } from "next/cache"

export async function getAdminData() {
    const session = await getServerSession(authOptions)
    if (session?.user?.role !== "SUPER_ADMIN") {
        throw new Error("Unauthorized")
    }

    const tenants = await db.tenant.findMany({
        include: {
            users: {
                select: {
                    name: true,
                    email: true,
                },
                take: 1 // Take the first user as contact
            },
            // We can add logic to sum revenue if we had a payment table. 
            // For now, imply revenue based on plan.
        },
        orderBy: {
            createdAt: 'desc'
        }
    })

    return tenants.map(t => ({
        id: t.id,
        businessName: t.name,
        industry: t.industry,
        email: t.users[0]?.email || "N/A",
        subscriptionType: t.subscriptionPlan,
        subscriptionStatus: t.subscriptionStatus,
        revenue: t.subscriptionPlan === "PRO" ? (t.subscriptionStatus === "ACTIVE" ? "Paid" : "Pending") : "Free",
        joinedDate: t.createdAt.toISOString()
    }))
}

export async function markAsPaid(tenantId: string) {
    const session = await getServerSession(authOptions)
    if (session?.user?.role !== "SUPER_ADMIN") throw new Error("Unauthorized")

    // Update to PRO/ACTIVE and set expiry to 1 year from now (defaulting to yearly for manual overwrite)
    const expiresAt = new Date()
    expiresAt.setDate(expiresAt.getDate() + 365)

    await db.tenant.update({
        where: { id: tenantId },
        data: {
            subscriptionStatus: "ACTIVE",
            subscriptionPlan: "PRO",
            subscriptionExpires: expiresAt
        }
    })
    revalidatePath("/dashboard/admin")
}

export async function blockTenant(tenantId: string) {
    const session = await getServerSession(authOptions)
    if (session?.user?.role !== "SUPER_ADMIN") throw new Error("Unauthorized")

    await db.tenant.update({
        where: { id: tenantId },
        data: {
            subscriptionStatus: "CANCELLED" // Using CANCELLED as 'Block'
        }
    })
    revalidatePath("/dashboard/admin")
}

export async function unblockTenant(tenantId: string) {
    const session = await getServerSession(authOptions)
    if (session?.user?.role !== "SUPER_ADMIN") throw new Error("Unauthorized")

    await db.tenant.update({
        where: { id: tenantId },
        data: {
            subscriptionStatus: "ACTIVE" // Re-activate
        }
    })
    revalidatePath("/dashboard/admin")
}
