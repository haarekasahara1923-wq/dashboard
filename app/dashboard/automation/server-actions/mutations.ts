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

export async function testRule(ruleId: string) {
    const session = await getServerSession(authOptions)
    if (!session?.user?.tenantId) throw new Error("Unauthorized")

    const rule = await db.automationRule.findUnique({
        where: { id: ruleId }
    })

    if (!rule) throw new Error("Rule not found")

    // In a real app, this would trigger the actual logic.
    // For now, we simulate success.

    // Check if WhatsApp config exists if action is SEND_WHATSAPP
    if (rule.action === "SEND_WHATSAPP") {
        const tenant = await db.tenant.findUnique({
            where: { id: session.user.tenantId },
            select: { whatsappConfig: true }
        })

        let hasConfig = false
        if (tenant?.whatsappConfig && (tenant.whatsappConfig as any).phoneNumber) {
            hasConfig = true
        } else if (process.env.WHATSAPP_PHONE_NUMBER && process.env.WHATSAPP_API_KEY) {
            hasConfig = true
        }

        if (!hasConfig) {
            return { success: false, message: "WhatsApp not configured (checked DB and ENV)" }
        }
    }

    return { success: true, message: `Executed ${rule.action} for ${rule.trigger}` }
}

