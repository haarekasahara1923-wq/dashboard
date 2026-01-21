'use server'

import { db } from "@/lib/db"
import { revalidatePath } from "next/cache"
import { processTriggers } from "@/lib/automation-engine"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

export async function createLead(formData: FormData) {
    const session = await getServerSession(authOptions)
    if (!session?.user?.tenantId) throw new Error("Unauthorized")

    const name = formData.get("name") as string
    const phone = formData.get("phone") as string
    const status = formData.get("status") as string || "HOT"

    const lead = await db.lead.create({
        data: {
            name,
            phone,
            status,
            tenantId: session.user.tenantId
        }
    })

    // Trigger automation
    await processTriggers(session.user.tenantId, "LEAD_CREATED", lead)

    revalidatePath("/dashboard/real-estate/leads")
    return { success: true }
}

export async function createProperty(formData: FormData) {
    const session = await getServerSession(authOptions)
    if (!session?.user?.tenantId) throw new Error("Unauthorized")

    const title = formData.get("title") as string
    const price = parseFloat(formData.get("price") as string)

    await db.property.create({
        data: {
            title,
            price,
            tenantId: session.user.tenantId
        }
    })

    revalidatePath("/dashboard/real-estate/properties")
    return { success: true }
}

export async function scheduleSiteVisit(formData: FormData) {
    const session = await getServerSession(authOptions)
    if (!session?.user?.tenantId) throw new Error("Unauthorized")

    const leadId = formData.get("leadId") as string
    const dateStr = formData.get("date") as string
    const date = new Date(dateStr)

    const visit = await db.siteVisit.create({
        data: {
            leadId,
            date,
        }
    })

    // Fetch lead for phone number context
    const lead = await db.lead.findUnique({ where: { id: leadId } })

    await processTriggers(session.user.tenantId, "SITE_VISIT_SCHEDULED", { visit, lead })

    revalidatePath("/dashboard/real-estate/site-visits")
    return { success: true }
}
