import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function DisclaimerPage() {
    return (
        <div className="container mx-auto py-12 px-4 md:px-6">
            <div className="mb-6">
                <Link href="/">
                    <Button variant="outline">Back to Home</Button>
                </Link>
            </div>
            <h1 className="text-3xl font-bold mb-6">Disclaimer</h1>
            <div className="prose max-w-none text-muted-foreground">
                <p className="mb-4">
                    The information provided by DAZO ("we," "us," or "our") on our website and software platform is for general informational purposes only.
                </p>
                <p className="mb-4">
                    All information on the site is provided in good faith, however, we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information on the site.
                </p>
                <p className="mb-4">
                    Under no circumstance shall we have any liability to you for any loss or damage of any kind incurred as a result of the use of the site or reliance on any information provided on the site. Your use of the site and your reliance on any information on the site is solely at your own risk.
                </p>
            </div>
        </div>
    )
}
