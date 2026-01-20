
import { db } from "@/lib/db"
import { revalidatePath } from "next/cache"
import { sendWhatsAppMessage } from "@/lib/whatsapp/client"

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

    // Using start and end of today
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

export async function createPatient(formData: FormData) {
    'use server'
    const tenant = await getDevTenant()
    const name = formData.get("name") as string
    const phone = formData.get("phone") as string

    if (!name || !phone) throw new Error("Missing fields")

    await db.patient.create({
        data: { name, phone, tenantId: tenant.id }
    })
    revalidatePath("/dashboard/healthcare")
}

export async function bookAppointment(formData: FormData) {
    'use server'
    const tenant = await getDevTenant()
    const patientName = formData.get("patientName") as string
    const patientPhone = formData.get("patientPhone") as string
    const doctorId = formData.get("doctorId") as string
    const dateStr = formData.get("date") as string // Expecting ISO string or similar

    if (!patientName || !patientPhone || !doctorId || !dateStr) throw new Error("Missing fields")

    // Find or create patient
    let patient = await db.patient.findFirst({
        where: { phone: patientPhone, tenantId: tenant.id }
    })

    if (!patient) {
        patient = await db.patient.create({
            data: { name: patientName, phone: patientPhone, tenantId: tenant.id }
        })
    }

    const appointment = await db.appointment.create({
        data: {
            date: new Date(dateStr),
            status: "SCHEDULED",
            patientId: patient.id,
            doctorId: doctorId,
            tenantId: tenant.id
        },
        include: {
            patient: true,
            doctor: true
        }
    })

    // --- AUTOMATION TRIGGER: APPOINTMENT_BOOKED ---
    const rules = await db.automationRule.findMany({
        where: { tenantId: tenant.id, isActive: true, trigger: "APPOINTMENT_BOOKED" }
    })

    for (const rule of rules) {
        if (rule.action === "SEND_WHATSAPP") {
            // Send Confirmation
            await sendWhatsAppMessage(patient.phone, "hello_world")
        }
    }
    // ----------------------------------------------

    revalidatePath("/dashboard/healthcare")
}

