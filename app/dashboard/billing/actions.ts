'use server'

import { db } from "@/lib/db"
import { razorpay } from "@/lib/razorpay"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import crypto from "crypto"
import { revalidatePath } from "next/cache"

export async function createSubscriptionOrder(planType: "MONTHLY" | "YEARLY") {
    try {
        const session = await getServerSession(authOptions)
        if (!session?.user?.tenantId) {
            return { error: "Unauthorized: Please log in again." }
        }

        if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
            console.error("Razorpay keys are missing in environment variables")
            return { error: "Server Configuration Error: Razorpay keys are missing." }
        }

        const amount = planType === "MONTHLY" ? 210000 : 1680000 // Amount in paise

        const order = await razorpay.orders.create({
            amount: amount,
            currency: "INR",
            receipt: `receipt_${session.user.tenantId}_${Date.now()}`,
            notes: {
                tenantId: session.user.tenantId,
                planType: planType
            }
        })

        return {
            success: true,
            orderId: order.id,
            amount: order.amount,
            currency: order.currency,
            keyId: process.env.RAZORPAY_KEY_ID
        }
    } catch (error: any) {
        console.error("Razorpay Order Creation Error (Full):", JSON.stringify(error, null, 2))

        let errorMessage = error.message || "Failed to create subscription order with payment provider.";

        // Extract inner error description if available (common in Razorpay errors)
        if (error.error && error.error.description) {
            errorMessage = error.error.description;
        }

        return {
            error: errorMessage
        }
    }
}

export async function verifyPayment(
    razorpayOrderId: string,
    razorpayPaymentId: string,
    razorpaySignature: string,
    planType: "MONTHLY" | "YEARLY"
) {
    const session = await getServerSession(authOptions)
    if (!session?.user?.tenantId) throw new Error("Unauthorized")

    // Verify signature
    const body = razorpayOrderId + "|" + razorpayPaymentId
    const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
        .update(body.toString())
        .digest("hex")

    if (expectedSignature !== razorpaySignature) {
        throw new Error("Invalid signature")
    }

    // Calculate expiry
    const expiresAt = new Date()
    if (planType === "MONTHLY") {
        expiresAt.setDate(expiresAt.getDate() + 30)
    } else {
        expiresAt.setDate(expiresAt.getDate() + 365)
    }

    // Update Tenant Subscription
    await db.tenant.update({
        where: { id: session.user.tenantId },
        data: {
            subscriptionStatus: "ACTIVE",
            subscriptionExpires: expiresAt,
            subscriptionPlan: "PRO" // Assuming PRO for paid
        }
    })

    revalidatePath("/dashboard/billing")
    return { success: true }
}
