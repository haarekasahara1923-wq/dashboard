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

export async function executeAction(tenantId: string, action: ActionType, payload: any, data: any) {
    const tenant = await db.tenant.findUnique({
        where: { id: tenantId },
        select: { whatsappConfig: true, name: true }
    })

    if (action === "SEND_WHATSAPP") {
        const dbConfig = tenant?.whatsappConfig as any || {}

        // Priority: DB -> Env
        const apiKey = (dbConfig.apiKey || process.env.WHATSAPP_API_KEY || "").trim()
        const phoneNumber = (dbConfig.phoneNumber || process.env.WHATSAPP_PHONE_NUMBER || "").trim()
        const phoneId = (dbConfig.phoneId || process.env.WHATSAPP_PHONE_ID || phoneNumber).trim()

        if (!apiKey) {
            throw new Error("WhatsApp API Key is missing. Please configure it in Dashboard > WhatsApp or set WHATSAPP_API_KEY environment variable.")
        }
        if (!phoneId) {
            throw new Error("WhatsApp Phone ID is missing. Please configure it in Dashboard > WhatsApp or set WHATSAPP_PHONE_ID environment variable.")
        }

        const config = { apiKey, phoneNumber, phoneId }

        const recipientPhone = data.phone || data.student?.phone || data.details?.phone || data.patient?.phone

        if (!recipientPhone) {
            throw new Error("Target phone number not found in data")
        }

        console.log(`Sending WhatsApp to ${recipientPhone} using Phone ID ${config.phoneId}`)

        try {
            const response = await fetch(`https://graph.facebook.com/v17.0/${config.phoneId}/messages`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${config.apiKey}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    messaging_product: "whatsapp",
                    to: recipientPhone,
                    type: "template",
                    template: {
                        name: "hello_world", // Using standard sandbox template for testing
                        language: {
                            code: "en_US"
                        }
                    }
                }),
            })

            const responseData = await response.json()

            if (!response.ok) {
                console.error("WhatsApp API Error:", responseData)
                throw new Error(`WhatsApp API Error: ${JSON.stringify(responseData)}`)
            }

            console.log("WhatsApp Sent Successfully:", responseData)
            return { message: "WhatsApp message sent successfully", apiResponse: responseData }

        } catch (error) {
            console.error("Failed to send WhatsApp:", error)
            throw error
        }
    }

    if (action === "NOTIFY_ADMIN") {
        // Mock notification
        console.log(`[MOCK] Admin Notified: ${JSON.stringify(data)}`)
        return { message: "Admin notified" }
    }

    return { message: "Action not implemented yet" }
}
