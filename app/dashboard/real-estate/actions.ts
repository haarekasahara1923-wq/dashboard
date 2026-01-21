
import { db } from "@/lib/db"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

export async function getRealEstateStats() {
    const session = await getServerSession(authOptions)
    if (!session?.user?.tenantId) return { totalLeads: 0, hotLeads: 0, scheduledVisits: 0, dealsClosed: 0 }

    const tenantId = session.user.tenantId

    const totalLeads = await db.lead.count({ where: { tenantId } })
    const hotLeads = await db.lead.count({ where: { tenantId, status: "HOT" } })
    const scheduledVisits = await db.siteVisit.count({ where: { lead: { tenantId }, date: { gte: new Date() } } })
    const dealsClosed = await db.deal.count({ where: { tenantId, status: "CLOSED" } })

    return {
        totalLeads,
        hotLeads,
        scheduledVisits,
        dealsClosed
    }
}

export async function getLeads() {
    const session = await getServerSession(authOptions)
    if (!session?.user?.tenantId) return []

    return await db.lead.findMany({
        where: { tenantId: session.user.tenantId },
        orderBy: { id: 'desc' },
        include: {
            siteVisits: true
        }
    })
}

export async function getUpcomingVisits() {
    const session = await getServerSession(authOptions)
    if (!session?.user?.tenantId) return []

    return await db.siteVisit.findMany({
        where: {
            lead: { tenantId: session.user.tenantId },
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

export async function getProperties() {
    const session = await getServerSession(authOptions)
    if (!session?.user?.tenantId) return []

    return await db.property.findMany({
        where: { tenantId: session.user.tenantId },
        orderBy: { id: 'desc' }
    })
}

