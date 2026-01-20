import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function PrivacyPage() {
    return (
        <div className="container mx-auto py-12 px-4 md:px-6">
            <div className="mb-6">
                <Link href="/">
                    <Button variant="outline">Back to Home</Button>
                </Link>
            </div>
            <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
            <div className="prose max-w-none text-muted-foreground">
                <p className="mb-4">
                    At DAZO, accessible from our website and platform, one of our main priorities is the privacy of our visitors and users. This Privacy Policy document contains types of information that is collected and recorded by DAZO and how we use it.
                </p>
                <h2 className="text-xl font-semibold mb-2 text-foreground">Information Collection</h2>
                <p className="mb-4">
                    We collect personal information that you provide to us such as name, email address, phone number, and business details when you register for an account or communicate with us.
                </p>
                <h2 className="text-xl font-semibold mb-2 text-foreground">How We Use Your Information</h2>
                <p className="mb-4">
                    We use the information we collect to provide, operate, and maintain our website; improve, personalize, and expand our website; understand and analyze how you use our website; and communicate with you, including for customer service and updates.
                </p>
                <p className="mb-4">
                    We process data related to your customers (leads, students, patients) strictly for the purpose of providing the automation services you requested, in accordance with applicable data protection laws.
                </p>
            </div>
        </div>
    )
}
