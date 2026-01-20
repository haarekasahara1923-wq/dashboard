'use server'

import { db } from "@/lib/db"
import { revalidatePath } from "next/cache"
import { TriggerType, ActionType } from "@prisma/client"

async function getDevTenant() {
    const tenant = await db.tenant.findFirst({
        where: { name: "Demo Real Estate" }
    })
    if (tenant) return tenant
    return await db.tenant.create({
        data: { name: "Demo Real Estate", industry: "REAL_ESTATE" }
    })
}

export async function toggleRuleStatus(ruleId: string, currentStatus: boolean) {
    await db.automationRule.update({
        where: { id: ruleId },
        data: { isActive: !currentStatus }
    })
    revalidatePath("/dashboard/automation")
}

export async function deleteRule(ruleId: string) {
    await db.automationRule.delete({
        where: { id: ruleId }
    })
    revalidatePath("/dashboard/automation")
}

export async function createRule(formData: FormData) {
    const tenant = await getDevTenant()

    const name = formData.get("name") as string
    const trigger = formData.get("trigger") as TriggerType
    const action = formData.get("action") as ActionType

    if (!name || !trigger || !action) throw new Error("Missing required fields")

    await db.automationRule.create({
        data: {
            name,
            trigger,
            action,
            tenantId: tenant.id,
            isActive: true
        }
    })

    revalidatePath("/dashboard/automation")
}
