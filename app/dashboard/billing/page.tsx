import { db } from "@/lib/db"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, CreditCard, Zap, Calendar } from "lucide-react"
import Script from "next/script"
import { SubscriptionButton } from "./components/subscription-button"
import { format } from "date-fns"

export default async function BillingPage() {
    const session = await getServerSession(authOptions)

    if (!session?.user?.tenantId) {
        return <div>Unauthorized</div>
    }

    const tenant = await db.tenant.findUnique({
        where: { id: session.user.tenantId }
    })

    if (!tenant) return <div>Tenant not found</div>

    const isTrial = tenant.subscriptionStatus === "TRIAL"
    const isActive = tenant.subscriptionStatus === "ACTIVE"
    const isExpired = new Date() > (tenant.subscriptionExpires || new Date(0))
    const daysLeft = tenant.subscriptionExpires ? Math.ceil((tenant.subscriptionExpires.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)) : 0

    return (
        <div className="space-y-6">
            <Script src="https://checkout.razorpay.com/v1/checkout.js" />

            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Billing & Subscription</h1>
                    <p className="text-muted-foreground">Manage your plan and billing details.</p>
                </div>
            </div>

            {/* Current Status Card */}
            <Card className="border-l-4 border-l-primary bg-muted/20">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <div className="space-y-1">
                        <CardTitle>Current Plan: {tenant.subscriptionPlan} {isTrial ? "(Trial)" : ""}</CardTitle>
                        <CardDescription>
                            Status: <span className={`font-medium ${isActive ? "text-green-600" : isTrial ? "text-blue-600" : "text-red-600"}`}>
                                {tenant.subscriptionStatus}
                            </span>
                        </CardDescription>
                    </div>
                    <CredtiCardIcon className="h-8 w-8 text-muted-foreground opacity-50" />
                </CardHeader>
                <CardContent>
                    <div className="text-sm">
                        {isExpired ? (
                            <span className="text-red-600 font-medium">Your subscription has expired. Please upgrade to continue accessing all features.</span>
                        ) : (
                            <span>
                                Expires on: <span className="font-medium">{tenant.subscriptionExpires ? format(tenant.subscriptionExpires, "PPP") : "N/A"}</span> ({daysLeft} days remaining)
                            </span>
                        )}
                    </div>
                </CardContent>
            </Card>

            <div className="grid gap-8 md:grid-cols-2 lg:max-w-4xl">
                {/* Monthly Plan */}
                <Card className="flex flex-col">
                    <CardHeader>
                        <CardTitle className="flex justify-between items-center">
                            Monthly
                            <span className="text-2xl font-bold">₹2,100<span className="text-sm font-normal text-muted-foreground">/mo</span></span>
                        </CardTitle>
                        <CardDescription>Flexible monthly billing.</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1">
                        <ul className="space-y-2 text-sm">
                            <li className="flex items-center"><Check className="mr-2 h-4 w-4 text-green-500" /> Full Access</li>
                            <li className="flex items-center"><Check className="mr-2 h-4 w-4 text-green-500" /> Unlimited Users</li>
                            <li className="flex items-center"><Check className="mr-2 h-4 w-4 text-green-500" /> WhatsApp Automation</li>
                        </ul>
                    </CardContent>
                    <CardFooter>
                        <SubscriptionButton plan="MONTHLY" />
                    </CardFooter>
                </Card>

                {/* Yearly Plan */}
                <Card className="flex flex-col border-primary shadow-md relative overflow-hidden">
                    <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-bl-lg">
                        SAVE 33%
                    </div>
                    <CardHeader>
                        <CardTitle className="flex justify-between items-center">
                            Yearly
                            <span className="text-2xl font-bold">₹16,800<span className="text-sm font-normal text-muted-foreground">/yr</span></span>
                        </CardTitle>
                        <CardDescription>Best value for long-term growth.</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1">
                        <ul className="space-y-2 text-sm">
                            <li className="flex items-center"><Check className="mr-2 h-4 w-4 text-green-500" /> All Monthly Features</li>
                            <li className="flex items-center"><Check className="mr-2 h-4 w-4 text-green-500" /> Priority Support</li>
                            <li className="flex items-center"><Check className="mr-2 h-4 w-4 text-green-500" /> Custom Onboarding</li>
                        </ul>
                    </CardContent>
                    <CardFooter>
                        <SubscriptionButton plan="YEARLY" />
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}

function CredtiCardIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <rect width="20" height="14" x="2" y="5" rx="2" />
            <line x1="2" x2="22" y1="10" y2="10" />
        </svg>
    )
}
