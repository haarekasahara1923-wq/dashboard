import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function TermsPage() {
    return (
        <div className="container mx-auto py-12 px-4 md:px-6">
            <div className="mb-6">
                <Link href="/">
                    <Button variant="outline">Back to Home</Button>
                </Link>
            </div>
            <h1 className="text-3xl font-bold mb-6">Terms and Conditions</h1>
            <div className="prose max-w-none text-muted-foreground">
                <p className="mb-4">
                    Welcome to DAZO. By accessing or using our website and services, you agree to be bound by these Terms and Conditions. Please read them carefully.
                </p>
                <h2 className="text-xl font-semibold mb-2 text-foreground">1. Use of Service</h2>
                <p className="mb-4">
                    You must be at least 18 years old to use our services. You agree to use the platform only for lawful purposes and in accordance with these terms.
                </p>
                <h2 className="text-xl font-semibold mb-2 text-foreground">2. Account Registration</h2>
                <p className="mb-4">
                    You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.
                </p>
                <h2 className="text-xl font-semibold mb-2 text-foreground">3. Subscription and Billing</h2>
                <p className="mb-4">
                    Our services are offered on a subscription basis. You agree to pay all applicable fees. We utilize third-party payment gateways (e.g., Razorpay) for transaction processing.
                </p>
                <h2 className="text-xl font-semibold mb-2 text-foreground">4. Limitation of Liability</h2>
                <p className="mb-4">
                    Shree Shyam Tech shall not be liable for any indirect, incidental, special, or consequential damages arising out of or in connection with the use of our services.
                </p>
                <p className="mt-8 text-sm">
                    Last updated: January 2026
                </p>
            </div>
        </div>
    )
}
