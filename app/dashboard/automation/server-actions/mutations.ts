'use server'

import { db } from "@/lib/db"
import { revalidatePath } from "next/cache"
import { TriggerType, ActionType } from "@prisma/client"



import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

export async function toggleRuleStatus(ruleId: string, currentStatus: boolean) {
    const session = await getServerSession(authOptions)
    if (!session?.user?.tenantId) throw new Error("Unauthorized")

    await db.automationRule.update({
        where: { id: ruleId },
        data: { isActive: !currentStatus }
    })
    revalidatePath("/dashboard/automation")
}

export async function deleteRule(ruleId: string) {
    const session = await getServerSession(authOptions)
    if (!session?.user?.tenantId) throw new Error("Unauthorized")

    await db.automationRule.delete({
        where: { id: ruleId }
    })
    revalidatePath("/dashboard/automation")
}

export async function createRule(formData: FormData) {
    const session = await getServerSession(authOptions)
    if (!session?.user?.tenantId) throw new Error("Unauthorized")

    const name = formData.get("name") as string
    const trigger = formData.get("trigger") as TriggerType
    const action = formData.get("action") as ActionType

    if (!name || !trigger || !action) throw new Error("Missing required fields")

    await db.automationRule.create({
        data: {
            name,
            trigger,
            action,
            tenantId: session.user.tenantId,
            isActive: true
        }
    })

    revalidatePath("/dashboard/automation")
}

import { executeAction } from "@/lib/automation-engine"

export async function testRule(ruleId: string) {
    const session = await getServerSession(authOptions)
    if (!session?.user?.tenantId) throw new Error("Unauthorized")

    const rule = await db.automationRule.findUnique({
        where: { id: ruleId }
    })

    if (!rule) throw new Error("Rule not found")

    // DATA PREPARATION FOR TEST
    let testData: any = {}

    // Attempt to fetch a real record for context
    if (rule.trigger === "LEAD_CREATED") {
        const lead = await db.lead.findFirst({ where: { tenantId: session.user.tenantId }, orderBy: { id: 'desc' } })
        if (lead) testData = lead
        else testData = { phone: "919999999999", name: "Test Lead" }
    } else if (rule.trigger === "ADMISSION_ENQUIRY" || rule.trigger === "FEE_DUE") {
        const student = await db.student.findFirst({ where: { tenantId: session.user.tenantId }, orderBy: { id: 'desc' } })
        if (student) testData = { student }
        else testData = { student: { phone: "919999999999", firstName: "Test", lastName: "Student" } }
    } else if (rule.trigger === "APPOINTMENT_BOOKED") {
        const appointment = await db.appointment.findFirst({ where: { tenantId: session.user.tenantId }, include: { patient: true }, orderBy: { date: 'desc' } })
        if (appointment) testData = { appointment, patient: appointment.patient }
        else testData = { patient: { phone: "919999999999", name: "Test Patient" } }
    } else {
        // Fallback for other triggers
        testData = { phone: "919999999999", name: "Test Data" }
    }

    // EXECUTE ACTION
    try {
        const result = await executeAction(session.user.tenantId, rule.action, rule.payload, testData)
        return { success: true, message: `Executed successfully: ${JSON.stringify(result)}` }
    } catch (e: any) {
        return { success: false, message: `Execution failed: ${e.message}` }
    }
}

export async function getRuleTestUrl(ruleId: string) {
    const session = await getServerSession(authOptions)
    if (!session?.user?.tenantId) throw new Error("Unauthorized")

    const rule = await db.automationRule.findUnique({
        where: { id: ruleId }
    })

    if (!rule) throw new Error("Rule not found")

    // DATA PREPARATION FOR TEST (Simulate data)
    let testData: any = {}
    let targetPhone = "919999999999" // Default fallback
    let messageText = "This is a test message from your automation rule."

    // Attempt to fetch a real record for context
    if (rule.trigger === "LEAD_CREATED") {
        const lead = await db.lead.findFirst({ where: { tenantId: session.user.tenantId }, orderBy: { id: 'desc' } })
        if (lead) {
            testData = lead
            targetPhone = lead.phone
            messageText = `Hi ${lead.name}, thanks for your interest! We have received your inquiry. (Lead Created)`
        } else {
            messageText = `Hi [Name], thanks for your interest! We have received your inquiry. (Lead Created)`
        }
    } else if (rule.trigger === "ADMISSION_ENQUIRY") {
        const student = await db.student.findFirst({ where: { tenantId: session.user.tenantId }, orderBy: { id: 'desc' } })
        if (student) {
            testData = { student }
            targetPhone = student.phone || targetPhone
            messageText = `Hello ${student.firstName}, thank you for your admission enquiry. We will contact you soon.`
        }
    } else if (rule.trigger === "APPOINTMENT_BOOKED") {
        const appointment = await db.appointment.findFirst({ where: { tenantId: session.user.tenantId }, include: { patient: true }, orderBy: { date: 'desc' } })
        if (appointment) {
            testData = { appointment, patient: appointment.patient }
            targetPhone = appointment.patient.phone
            messageText = `Dear ${appointment.patient.name}, your appointment is confirmed for ${appointment.date.toDateString()}.`
        }
    }

    // Clean phone number
    const cleanPhone = targetPhone.replace(/[^0-9]/g, "")

    // Construct WhatsApp Web URL
    const url = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(messageText)}`

    return { success: true, url }
}

