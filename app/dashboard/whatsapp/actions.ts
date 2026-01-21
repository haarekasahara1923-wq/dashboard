'use server'

import { db } from "@/lib/db"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { revalidatePath } from "next/cache"

export async function getWhatsAppConfig() {
    const session = await getServerSession(authOptions)
    if (!session?.user?.tenantId) return null

    const tenant = await db.tenant.findUnique({
        where: { id: session.user.tenantId },
        select: { whatsappConfig: true }
    })

    return tenant?.whatsappConfig as { phoneNumber?: string, apiKey?: string } | null
}

export async function updateWhatsAppConfig(formData: FormData) {
    const session = await getServerSession(authOptions)
    if (!session?.user?.tenantId) throw new Error("Unauthorized")

    const phoneNumber = formData.get("phoneNumber") as string
    const apiKey = formData.get("apiKey") as string

    await db.tenant.update({
        where: { id: session.user.tenantId },
        data: {
            whatsappConfig: {
                phoneNumber,
                apiKey
            }
        }
    })

    revalidatePath("/dashboard/whatsapp")
    return { success: true }
}
