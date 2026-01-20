'use server'

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

export async function createPatient(formData: FormData) {
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
    const tenant = await getDevTenant()
    const patientName = formData.get("patientName") as string
    const patientPhone = formData.get("patientPhone") as string
    const doctorId = formData.get("doctorId") as string
    const dateStr = formData.get("date") as string

    if (!patientName || !patientPhone || !doctorId || !dateStr) throw new Error("Missing fields")

    let patient = await db.patient.findFirst({
        where: { phone: patientPhone, tenantId: tenant.id }
    })

    if (!patient) {
        patient = await db.patient.create({
            data: { name: patientName, phone: patientPhone, tenantId: tenant.id }
        })
    }

    await db.appointment.create({
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

    const rules = await db.automationRule.findMany({
        where: { tenantId: tenant.id, isActive: true, trigger: "APPOINTMENT_BOOKED" }
    })

    for (const rule of rules) {
        if (rule.action === "SEND_WHATSAPP") {
            await sendWhatsAppMessage(patient.phone, "hello_world")
        }
    }

    revalidatePath("/dashboard/healthcare")
}
