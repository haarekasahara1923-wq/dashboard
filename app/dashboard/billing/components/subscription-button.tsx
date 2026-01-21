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
            // Check if Razorpay is loaded
            if (!window.Razorpay) {
                alert("Payment gateway failed to load. Please refresh the page.")
                setLoading(false)
                return
            }

            // 1. Create Order
            const result = await createSubscriptionOrder(plan)

            if (result.error || !result.success) {
                alert(`Order Creation Failed: ${result.error}`)
                setLoading(false)
                return
            }

            const { orderId, amount, currency, keyId } = result

            if (!keyId) {
                alert("Payment Error: Invalid Key ID received from server.")
                setLoading(false)
                return
            }

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
            rzp.on('payment.failed', function (response: any) {
                alert(`Payment Failed: ${response.error.description}`);
            });
            rzp.open();

        } catch (err: any) {
            console.error("Subscription error:", err)
            alert(`Failed to initiate subscription: ${err.message || "Unknown error"}`)
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
