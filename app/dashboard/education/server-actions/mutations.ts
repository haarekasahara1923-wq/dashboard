'use server'

import { db } from "@/lib/db"
import { revalidatePath } from "next/cache"
import { sendWhatsAppMessage } from "@/lib/whatsapp/client"

async function getDevTenant() {
    const tenant = await db.tenant.findFirst({
        where: { name: "Demo Education" }
    })
    if (tenant) return tenant
    return await db.tenant.create({
        data: { name: "Demo Education", industry: "EDUCATION" }
    })
}

export async function registerStudent(formData: FormData) {
    const tenant = await getDevTenant()

    const firstName = formData.get("firstName") as string
    const lastName = formData.get("lastName") as string
    const email = formData.get("email") as string
    const phone = formData.get("phone") as string

    if (!firstName || !lastName || !phone) throw new Error("Missing required fields")

    const student = await db.student.create({
        data: {
            firstName,
            lastName,
            email,
            phone,
            tenantId: tenant.id
        }
    })

    const rules = await db.automationRule.findMany({
        where: { tenantId: tenant.id, isActive: true, trigger: "ADMISSION_ENQUIRY" }
    })

    for (const rule of rules) {
        if (rule.action === "SEND_WHATSAPP") {
            await sendWhatsAppMessage(student.phone || "", "hello_world")
        }
    }

    revalidatePath("/dashboard/education")
}

export async function createFeeRecord(formData: FormData) {
    const tenant = await getDevTenant()
    const studentId = formData.get("studentId") as string
    const amount = parseFloat(formData.get("amount") as string)
    const dueDate = new Date(formData.get("dueDate") as string)

    if (!studentId || !amount || !dueDate) throw new Error("Missing fields")

    const fee = await db.fee.create({
        data: {
            amount,
            dueDate,
            status: "PENDING",
            studentId,
            tenantId: tenant.id
        },
        include: {
            student: true
        }
    })

    const rules = await db.automationRule.findMany({
        where: { tenantId: tenant.id, isActive: true, trigger: "FEE_DUE" }
    })

    for (const rule of rules) {
        if (rule.action === "SEND_WHATSAPP") {
            if (fee.student.phone) {
                await sendWhatsAppMessage(fee.student.phone, "hello_world")
            }
        }
    }

    revalidatePath("/dashboard/education")
}
