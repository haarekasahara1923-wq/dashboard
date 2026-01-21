import { db } from "@/lib/db"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

export async function getHealthcareStats() {
    const session = await getServerSession(authOptions)
    if (!session?.user?.tenantId) return { appointmentsToday: 0, pendingPatients: 0, activeDoctors: 0 }

    const tenantId = session.user.tenantId

    const startOfDay = new Date()
    startOfDay.setHours(0, 0, 0, 0)
    const endOfDay = new Date()
    endOfDay.setHours(23, 59, 59, 999)

    const appointmentsToday = await db.appointment.count({
        where: {
            tenantId,
            date: {
                gte: startOfDay,
                lte: endOfDay
            }
        }
    })

    const pendingPatients = await db.appointment.count({
        where: {
            tenantId,
            date: {
                gte: startOfDay,
                lte: endOfDay
            },
            status: "SCHEDULED"
        }
    })

    const activeDoctors = await db.doctor.count({
        where: { tenantId }
    })

    return {
        appointmentsToday,
        pendingPatients,
        activeDoctors
    }
}

export async function getAppointments() {
    const session = await getServerSession(authOptions)
    if (!session?.user?.tenantId) return []

    const startOfDay = new Date()
    startOfDay.setHours(0, 0, 0, 0)

    return await db.appointment.findMany({
        where: {
            tenantId: session.user.tenantId,
            date: {
                gte: startOfDay
            }
        },
        include: {
            patient: true,
            doctor: true
        },
        orderBy: { date: 'asc' }
    })
}

export async function getDoctors() {
    const session = await getServerSession(authOptions)
    if (!session?.user?.tenantId) return []

    return await db.doctor.findMany({
        where: { tenantId: session.user.tenantId }
    })
}

export async function getPatients() {
    const session = await getServerSession(authOptions)
    if (!session?.user?.tenantId) return []

    return await db.patient.findMany({
        where: { tenantId: session.user.tenantId },
        orderBy: { id: 'desc' }
    })
}

