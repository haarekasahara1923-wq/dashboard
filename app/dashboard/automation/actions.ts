
import { db } from "@/lib/db"

async function getDevTenant() {
    const tenant = await db.tenant.findFirst({
        where: { name: "Demo Real Estate" }
    })
    if (tenant) return tenant
    return await db.tenant.create({
        data: { name: "Demo Real Estate", industry: "REAL_ESTATE" }
    })
}

export async function getAutomationRules() {
    const tenant = await getDevTenant()
    return await db.automationRule.findMany({
        where: { tenantId: tenant.id },
        orderBy: { createdAt: 'desc' }
    })
}
