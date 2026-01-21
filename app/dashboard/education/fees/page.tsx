import { Button } from "@/components/ui/button"
import { CreditCard, DollarSign } from "lucide-react"

export default function FeesPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="space-y-1">
                    <h1 className="text-3xl font-bold tracking-tight">Fees & Payments</h1>
                    <p className="text-muted-foreground">Manage student fees, invoices, and payment history.</p>
                </div>
                <Button>
                    <DollarSign className="mr-2 h-4 w-4" /> Record Payment
                </Button>
            </div>
            <div className="rounded-lg border border-dashed p-8 text-center text-muted-foreground">
                No fee records found.
            </div>
        </div>
    )
}
