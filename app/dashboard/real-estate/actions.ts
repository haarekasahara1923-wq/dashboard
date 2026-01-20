'use server'

import { db } from "@/lib/db"
import { revalidatePath } from "next/cache"

// Helper to ensure we have a tenant to work with for the demo
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

export async function getRealEstateStats() {
    const tenant = await getDevTenant()

    const totalLeads = await db.lead.count({ where: { tenantId: tenant.id } })
    const hotLeads = await db.lead.count({ where: { tenantId: tenant.id, status: "HOT" } })
    const scheduledVisits = await db.siteVisit.count({ where: { lead: { tenantId: tenant.id }, date: { gte: new Date() } } })
    // Using a simplified query for 'Deals Closed' assuming it's a status on Lead or Property. 
    // The schema has a 'Deal' model, let's use that.
    const dealsClosed = await db.deal.count({ where: { tenantId: tenant.id, status: "CLOSED" } })

    return {
        totalLeads,
        hotLeads,
        scheduledVisits,
        dealsClosed
    }
}

export async function getLeads() {
    const tenant = await getDevTenant()
    return await db.lead.findMany({
        where: { tenantId: tenant.id },
        orderBy: { id: 'desc' },
        include: {
            siteVisits: true
        }
    })
}

import { sendWhatsAppMessage } from "@/lib/whatsapp/client"

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

    // --- AUTOMATION TRIGGER: LEAD_CREATED ---
    const rules = await db.automationRule.findMany({
        where: { tenantId: tenant.id, isActive: true, trigger: "LEAD_CREATED" }
    })

    for (const rule of rules) {
        if (rule.action === "SEND_WHATSAPP") {
            // Send Welcome Message
            // Using 'hello_world' template for testing as it's pre-approved
            await sendWhatsAppMessage(phone, "hello_world")
        }
    }
    // -----------------------------------------

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

    // Update lead status to Site Visit automatically if it's not already closed/negotiation
    await db.lead.update({
        where: { id: leadId },
        data: { status: "SITE_VISIT" }
    })

    // --- AUTOMATION TRIGGER: SITE_VISIT_SCHEDULED ---
    const rules = await db.automationRule.findMany({
        where: { tenantId: visit.lead.tenantId, isActive: true, trigger: "SITE_VISIT_SCHEDULED" }
    })

    for (const rule of rules) {
        if (rule.action === "SEND_WHATSAPP") {
            // Send Visit Confirmation
            await sendWhatsAppMessage(visit.lead.phone, "hello_world")
        }
    }
    // ------------------------------------------------

    revalidatePath("/dashboard/real-estate")
}

export async function getUpcomingVisits() {
    const tenant = await getDevTenant()

    return await db.siteVisit.findMany({
        where: {
            lead: { tenantId: tenant.id },
            date: { gte: new Date() } // Future visits only
        },
        include: {
            lead: true
        },
        orderBy: {
            date: 'asc'
        },
        take: 5
    })
}
