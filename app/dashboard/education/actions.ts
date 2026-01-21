import { db } from "@/lib/db"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

export async function getEducationStats() {
    const session = await getServerSession(authOptions)
    if (!session?.user?.tenantId) return { totalStudents: 0, totalEnquiries: 0, feeCollected: 0, pendingDues: 0 }

    const tenantId = session.user.tenantId

    const totalStudents = await db.student.count({ where: { tenantId } })

    // Assuming enquiries are just students for now or a separate status? 
    // Just reusing existing logic but filtered by tenant
    const totalEnquiries = await db.student.count({
        where: { tenantId }
    })

    const feeCollected = await db.fee.aggregate({
        where: { tenantId, status: "PAID" },
        _sum: { amount: true }
    })

    const pendingDues = await db.fee.aggregate({
        where: { tenantId, status: { in: ["PENDING", "OVERDUE"] } },
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
    const session = await getServerSession(authOptions)
    if (!session?.user?.tenantId) return []

    return await db.student.findMany({
        where: { tenantId: session.user.tenantId },
        orderBy: { id: 'desc' },
        take: 20
    })
}
