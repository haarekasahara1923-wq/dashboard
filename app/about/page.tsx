import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function AboutPage() {
    return (
        <div className="container mx-auto py-12 px-4 md:px-6">
            <div className="mb-6">
                <Link href="/">
                    <Button variant="outline">Back to Home</Button>
                </Link>
            </div>
            <h1 className="text-3xl font-bold mb-6">About Us</h1>
            <div className="prose max-w-none text-muted-foreground">
                <p className="mb-4">
                    Welcome to DAZO, powered by Shree Shyam Tech. We are dedicated to revolutionizing business management for the Real Estate, Education, and Healthcare industries. Our mission is to empower businesses with intelligent automation tools that simplify operations, enhance communication, and drive growth.
                </p>
                <p className="mb-4">
                    Founded with a vision to make advanced technology accessible to all, Shree Shyam Tech specializes in creating robust, user-friendly SaaS solutions. DAZO is our flagship platform, designed to address the unique challenges of service-based industries through seamless WhatsApp integration and data-driven insights.
                </p>
                <p>
                    We believe in the power of automation to unlock potential. Whether you are managing student admissions, property leads, or patient appointments, DAZO is here to help you scale without limits.
                </p>
            </div>
        </div>
    )
}
