
import { db } from "@/lib/db"

async function getDevTenant() {
    const tenant = await db.tenant.findFirst({
        where: { name: "Demo Education" }
    })
    if (tenant) return tenant
    return await db.tenant.create({
        data: { name: "Demo Education", industry: "EDUCATION" }
    })
}

export async function getEducationStats() {
    const tenant = await getDevTenant()

    const totalStudents = await db.student.count({ where: { tenantId: tenant.id } })

    const totalEnquiries = await db.student.count({
        where: { tenantId: tenant.id }
    })

    const feeCollected = await db.fee.aggregate({
        where: { tenantId: tenant.id, status: "PAID" },
        _sum: { amount: true }
    })

    const pendingDues = await db.fee.aggregate({
        where: { tenantId: tenant.id, status: { in: ["PENDING", "OVERDUE"] } },
        _sum: { amount: true }
    })

    return {
        totalStudents,
        totalEnquiries,
        feeCollected: feeCollected._sum.amount || 0,
        pendingDues: pendingDues._sum.amount || 0
    }
}

export async function getStudents() {
    const tenant = await getDevTenant()
    return await db.student.findMany({
        where: { tenantId: tenant.id },
        orderBy: { id: 'desc' },
        take: 10
    })
}
