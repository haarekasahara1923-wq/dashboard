import { db } from "@/lib/db"
import { TriggerType, ActionType } from "@prisma/client"

export async function processTriggers(tenantId: string, trigger: TriggerType, data: any) {
    console.log(`Processing triggers for tenant ${tenantId}, trigger ${trigger}`)

    // Find active rules for this tenant and trigger
    const rules = await db.automationRule.findMany({
        where: {
            tenantId,
            trigger,
            isActive: true
        }
    })

    console.log(`Found ${rules.length} active rules`)

    const results = []

    for (const rule of rules) {
        try {
            const result = await executeAction(tenantId, rule.action, rule.payload, data)
            results.push({ ruleId: rule.id, status: 'success', result })
        } catch (error) {
            console.error(`Error executing rule ${rule.id}:`, error)
            results.push({ ruleId: rule.id, status: 'error', error })
        }
    }

    return results
}

async function executeAction(tenantId: string, action: ActionType, payload: any, data: any) {
    const tenant = await db.tenant.findUnique({
        where: { id: tenantId },
        select: { whatsappConfig: true, name: true }
    })

    if (action === "SEND_WHATSAPP") {
        if (!tenant?.whatsappConfig) {
            throw new Error("WhatsApp configuration not found for tenant")
        }

        // Mock sending WhatsApp message
        // In a real implementation, this would call the WhatsApp Cloud API
        const config = tenant.whatsappConfig as any
        const phone = data.phone || data.student?.phone || data.details?.phone

        if (!phone) {
            throw new Error("Target phone number not found in data")
        }

        console.log(`[MOCK] Sending WhatsApp to ${phone} from ${config.phoneNumber}: "Hello from ${tenant.name}, thanks for your interest!"`)

        return { message: "WhatsApp message sent (mock)" }
    }

    if (action === "NOTIFY_ADMIN") {
        // Mock notification
        console.log(`[MOCK] Admin Notified: ${JSON.stringify(data)}`)
        return { message: "Admin notified" }
    }

    return { message: "Action not implemented yet" }
}
