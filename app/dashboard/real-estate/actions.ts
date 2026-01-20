
import { db } from "@/lib/db"

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

export async function getUpcomingVisits() {
    const tenant = await getDevTenant()

    return await db.siteVisit.findMany({
        where: {
            lead: { tenantId: tenant.id },
            date: { gte: new Date() }
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
