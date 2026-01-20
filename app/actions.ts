
import { db } from "@/lib/db"

export async function getTenantName() {
    // For demo/dev purposes, fetching the hardcoded tenant
    const tenant = await db.tenant.findFirst({
        where: { name: "Demo Real Estate" },
        select: { name: true }
    })
    return tenant?.name || "SaaSAuto"
}
