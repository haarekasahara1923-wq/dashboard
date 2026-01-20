'use server'

import { db } from "@/lib/db"
import { revalidatePath } from "next/cache"
import { sendWhatsAppMessage } from "@/lib/whatsapp/client"

async function getDevTenant() {
    const tenant = await db.tenant.findFirst({
        where: { name: "Demo Real Estate" }
    })

    if (tenant) return tenant

    return await db.tenant.create({
        data: {
            name: "Demo Real Estate",
            industry: "REAL_ESTATE",
        }
    })
}

export async function createLead(formData: FormData) {
    const tenant = await getDevTenant()

    const name = formData.get("name") as string
    const phone = formData.get("phone") as string
    const status = formData.get("status") as string || "WARM"
    const source = formData.get("source") as string

    if (!name || !phone) throw new Error("Name and Phone are required")

    await db.lead.create({
        data: {
            name,
            phone,
            status,
            source,
            tenantId: tenant.id
        }
    })

    const rules = await db.automationRule.findMany({
        where: { tenantId: tenant.id, isActive: true, trigger: "LEAD_CREATED" }
    })

    for (const rule of rules) {
        if (rule.action === "SEND_WHATSAPP") {
            await sendWhatsAppMessage(phone, "hello_world")
        }
    }

    revalidatePath("/dashboard/real-estate")
}

export async function scheduleSiteVisit(leadId: string, date: Date) {
    if (!leadId || !date) throw new Error("Lead ID and Date are required")

    const visit = await db.siteVisit.create({
        data: {
            leadId,
            date
        },
        include: {
            lead: true
        }
    })

    await db.lead.update({
        where: { id: leadId },
        data: { status: "SITE_VISIT" }
    })

    const rules = await db.automationRule.findMany({
        where: { tenantId: visit.lead.tenantId, isActive: true, trigger: "SITE_VISIT_SCHEDULED" }
    })

    for (const rule of rules) {
        if (rule.action === "SEND_WHATSAPP") {
            await sendWhatsAppMessage(visit.lead.phone, "hello_world")
        }
    }

    revalidatePath("/dashboard/real-estate")
}
