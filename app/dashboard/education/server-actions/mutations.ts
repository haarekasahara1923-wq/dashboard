'use server'

import { db } from "@/lib/db"
import { revalidatePath } from "next/cache"
import { processTriggers } from "@/lib/automation-engine"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

export async function createStudent(formData: FormData) {
    const session = await getServerSession(authOptions)
    if (!session?.user?.tenantId) throw new Error("Unauthorized")

    const firstName = formData.get("firstName") as string
    const lastName = formData.get("lastName") as string
    const email = formData.get("email") as string
    const phone = formData.get("phone") as string

    const student = await db.student.create({
        data: {
            firstName,
            lastName,
            email,
            phone,
            tenantId: session.user.tenantId
        }
    })

    revalidatePath("/dashboard/education/students")
    return { success: true }
}

export async function createAdmission(formData: FormData) {
    const session = await getServerSession(authOptions)
    if (!session?.user?.tenantId) throw new Error("Unauthorized")

    const studentId = formData.get("studentId") as string
    const status = formData.get("status") as string

    const admission = await db.admission.create({
        data: {
            studentId,
            status,
            tenantId: session.user.tenantId
        }
    })

    const student = await db.student.findUnique({ where: { id: studentId } })
    await processTriggers(session.user.tenantId, "ADMISSION_ENQUIRY", { admission, student })

    revalidatePath("/dashboard/education/admissions")
    return { success: true }
}

export async function createFee(formData: FormData) {
    const session = await getServerSession(authOptions)
    if (!session?.user?.tenantId) throw new Error("Unauthorized")

    const studentId = formData.get("studentId") as string
    const amount = parseFloat(formData.get("amount") as string)
    const dueDate = new Date(formData.get("dueDate") as string)

    const fee = await db.fee.create({
        data: {
            studentId,
            amount,
            dueDate,
            status: "PENDING",
            tenantId: session.user.tenantId
        }
    })

    const student = await db.student.findUnique({ where: { id: studentId } })
    await processTriggers(session.user.tenantId, "FEE_DUE", { fee, student })

    revalidatePath("/dashboard/education/fees")
    return { success: true }
}
