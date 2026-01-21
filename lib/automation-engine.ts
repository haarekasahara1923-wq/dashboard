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
        // First check database config
        let config = tenant?.whatsappConfig as any

        // If not in DB, check env variables
        if (!config || !config.phoneNumber || !config.apiKey) {
            const envPhone = process.env.WHATSAPP_PHONE_NUMBER
            const envKey = process.env.WHATSAPP_API_KEY
            const envId = process.env.WHATSAPP_PHONE_ID

            if (envPhone && envKey) {
                config = {
                    phoneNumber: envPhone,
                    apiKey: envKey,
                    phoneId: envId // Optional: Business Phone ID usually needed for API
                }
            }
        }

        if (!config || !config.apiKey) {
            throw new Error("WhatsApp API Key not found (checked DB and ENV)")
        }

        // WhatsApp Cloud API typically requires a 'Phone Number ID', not just the display phone number.
        // We will assume 'phoneNumber' field in config MIGHT be the ID, or we need a separate ID.
        // For now, let's try to use the configured 'phoneNumber' as the Phone ID which is common in many setups,
        // or prompt user to ensure it's the ID.
        const phoneId = config.phoneId || config.phoneNumber

        const recipientPhone = data.phone || data.student?.phone || data.details?.phone || data.patient?.phone

        if (!recipientPhone) {
            throw new Error("Target phone number not found in data")
        }

        console.log(`Sending WhatsApp to ${recipientPhone} using Phone ID ${phoneId}`)

        // Send actual request to WhatsApp Cloud API
        try {
            const response = await fetch(`https://graph.facebook.com/v17.0/${phoneId}/messages`, {
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
