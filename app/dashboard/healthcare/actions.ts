
import { db } from "@/lib/db"

async function getDevTenant() {
    const tenant = await db.tenant.findFirst({
        where: { name: "Demo Healthcare" }
    })
    if (tenant) return tenant
    return await db.tenant.create({
        data: { name: "Demo Healthcare", industry: "HEALTHCARE" }
    })
}

export async function getHealthcareStats() {
    const tenant = await getDevTenant()

    const startOfDay = new Date()
    startOfDay.setHours(0, 0, 0, 0)
    const endOfDay = new Date()
    endOfDay.setHours(23, 59, 59, 999)

    const appointmentsToday = await db.appointment.count({
        where: {
            tenantId: tenant.id,
            date: {
                gte: startOfDay,
                lte: endOfDay
            }
        }
    })

    const pendingPatients = await db.appointment.count({
        where: {
            tenantId: tenant.id,
            date: {
                gte: startOfDay,
                lte: endOfDay
            },
            status: "SCHEDULED"
        }
    })

    const activeDoctors = await db.doctor.count({
        where: { tenantId: tenant.id }
    })

    return {
        appointmentsToday,
        pendingPatients,
        activeDoctors
    }
}

export async function getAppointments() {
    const tenant = await getDevTenant()
    const startOfDay = new Date()
    startOfDay.setHours(0, 0, 0, 0)

    return await db.appointment.findMany({
        where: {
            tenantId: tenant.id,
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
    const tenant = await getDevTenant()
    return await db.doctor.findMany({
        where: { tenantId: tenant.id }
    })
}
