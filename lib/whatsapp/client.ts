const WHATSAPP_API_TOKEN = process.env.WHATSAPP_API_TOKEN
const WHATSAPP_PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_ID

export async function sendWhatsAppMessage(to: string, templateName: string, languageCode: string = "en_US") {
    if (!WHATSAPP_API_TOKEN || !WHATSAPP_PHONE_NUMBER_ID) {
        console.error("WhatsApp credentials missing")
        return { success: false, error: "Credentials missing" }
    }

    // Format phone number (remove +, spaces, ensure country code)
    // Assuming 'to' is like "919876543210"
    const cleanPhone = to.replace(/[^0-9]/g, "")

    try {
        const response = await fetch(
            `https://graph.facebook.com/v18.0/${WHATSAPP_PHONE_NUMBER_ID}/messages`,
            {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${WHATSAPP_API_TOKEN}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    messaging_product: "whatsapp",
                    to: cleanPhone,
                    type: "template",
                    template: {
                        name: templateName,
                        language: {
                            code: languageCode,
                        },
                    },
                }),
            }
        )

        const data = await response.json()

        if (!response.ok) {
            console.error("WhatsApp API Error:", data)
            return { success: false, error: data }
        }

        return { success: true, data }

    } catch (error) {
        console.error("WhatsApp Send Error:", error)
        return { success: false, error }
    }
}
