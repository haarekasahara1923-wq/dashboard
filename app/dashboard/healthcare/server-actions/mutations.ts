'use server'

import { db } from "@/lib/db"
import { revalidatePath } from "next/cache"
import { processTriggers } from "@/lib/automation-engine"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

export async function createPatient(formData: FormData) {
    const session = await getServerSession(authOptions)
    if (!session?.user?.tenantId) throw new Error("Unauthorized")

    const name = formData.get("name") as string
    const phone = formData.get("phone") as string

    await db.patient.create({
        data: {
            name,
            phone,
            tenantId: session.user.tenantId
        }
    })

    revalidatePath("/dashboard/healthcare/patients")
    return { success: true }
}

export async function createAppointment(formData: FormData) {
    const session = await getServerSession(authOptions)
    if (!session?.user?.tenantId) throw new Error("Unauthorized")

    const patientId = formData.get("patientId") as string
    const doctorId = formData.get("doctorId") as string // Assuming we have doctors, or can be nullable/text for now if no Doctor model usage yet, but schema has Doctor.
    const dateStr = formData.get("date") as string
    const date = new Date(dateStr)

    // For now, if no doctor selected, we might need to handle it. Schema says doctorId is required.
    // Let's create a dummy doctor if none exists for this tenant, or just require it.
    // For simplicity in this turn, I'll assume a doctor exists or auto-create 'General Physician'.

    let validDoctorId = doctorId
    if (!validDoctorId) {
        const doc = await db.doctor.findFirst({ where: { tenantId: session.user.tenantId } })
        if (doc) validDoctorId = doc.id
        else {
            const newDoc = await db.doctor.create({
                data: { name: "General Physician", specialty: "General", tenantId: session.user.tenantId }
            })
            validDoctorId = newDoc.id
        }
    }

    const appointment = await db.appointment.create({
        data: {
            patientId,
            doctorId: validDoctorId,
            date,
            status: "SCHEDULED",
            tenantId: session.user.tenantId
        }
    })

    const patient = await db.patient.findUnique({ where: { id: patientId } })
    await processTriggers(session.user.tenantId, "APPOINTMENT_BOOKED", { appointment, patient })

    revalidatePath("/dashboard/healthcare/appointments")
    return { success: true }
}
