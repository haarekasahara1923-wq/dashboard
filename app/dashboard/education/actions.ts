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

export async function getEducationStats() {
    const tenant = await getDevTenant()

    const totalStudents = await db.student.count({ where: { tenantId: tenant.id } })

    // Assuming 'Admission' tracks enquiries too for simplicity in this demo, or we treat students without admission status 'ADMITTED' as enquiries
    const totalEnquiries = await db.student.count({
        where: { tenantId: tenant.id } // Total database of students/leads
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

    // --- AUTOMATION TRIGGER: ADMISSION_ENQUIRY ---
    // Treating new registration as enquiry
    const rules = await db.automationRule.findMany({
        where: { tenantId: tenant.id, isActive: true, trigger: "ADMISSION_ENQUIRY" }
    })

    for (const rule of rules) {
        if (rule.action === "SEND_WHATSAPP") {
            // Send Welcome / Enquiry Received
            await sendWhatsAppMessage(student.phone || "", "hello_world")
        }
    }
    // ---------------------------------------------

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

    // --- AUTOMATION TRIGGER: FEE_DUE ---
    // (Usually fired by cron job, but here we can simulate 'Invoice Created' notification)
    const rules = await db.automationRule.findMany({
        where: { tenantId: tenant.id, isActive: true, trigger: "FEE_DUE" }
    })

    for (const rule of rules) {
        if (rule.action === "SEND_WHATSAPP") {
            // Send Fee Reminder
            if (fee.student.phone) {
                await sendWhatsAppMessage(fee.student.phone, "hello_world")
            }
        }
    }
    // -----------------------------------

    revalidatePath("/dashboard/education")
}
