'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { createSubscriptionOrder, verifyPayment } from "../actions"
import { useRouter } from "next/navigation"

declare global {
    interface Window {
        Razorpay: any;
    }
}

export function SubscriptionButton({ plan, currentPlan }: { plan: "MONTHLY" | "YEARLY", currentPlan?: string }) {
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    async function handleSubscribe() {
        setLoading(true)
        try {
            // 1. Create Order
            const { orderId, amount, currency, keyId } = await createSubscriptionOrder(plan)

            // 2. Initialize Razorpay options
            const options = {
                key: keyId,
                amount: amount,
                currency: currency,
                name: "SaaSAuto",
                description: `${plan} Subscription`,
                order_id: orderId,
                handler: async function (response: any) {
                    try {
                        // 3. Verify Payment
                        await verifyPayment(
                            response.razorpay_order_id,
                            response.razorpay_payment_id,
                            response.razorpay_signature,
                            plan
                        )
                        alert("Subscription activated successfully!")
                        router.refresh()
                    } catch (err) {
                        console.error(err)
                        alert("Payment verification failed")
                    }
                },
                prefill: {
                    // We could prefill email/name if we had them in props
                },
                theme: {
                    color: "#0F172A"
                }
            };

            const rzp = new window.Razorpay(options);
            rzp.open();

        } catch (err) {
            console.error("Subscription error:", err)
            alert("Failed to initiate subscription")
        } finally {
            setLoading(false)
        }
    }

    const isCurrent = currentPlan === (plan === "MONTHLY" ? "PRO_MONTHLY" : "PRO_YEARLY") // Simplified check

    return (
        <Button
            onClick={handleSubscribe}
            disabled={loading || isCurrent}
            className="w-full"
            variant={plan === "YEARLY" ? "default" : "outline"}
        >
            {loading ? "Processing..." : (isCurrent ? "Current Plan" : `Upgrade to ${plan === "MONTHLY" ? "Monthly" : "Yearly"}`)}
        </Button>
    )
}
