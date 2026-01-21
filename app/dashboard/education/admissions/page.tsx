import { Button } from "@/components/ui/button"
import { ClipboardList, PlusCircle } from "lucide-react"

export default function AdmissionsPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="space-y-1">
                    <h1 className="text-3xl font-bold tracking-tight">Admissions</h1>
                    <p className="text-muted-foreground">Track new admission enquiries and applications.</p>
                </div>
                <Button>
                    <PlusCircle className="mr-2 h-4 w-4" /> New Admission
                </Button>
            </div>
            <div className="rounded-lg border border-dashed p-8 text-center text-muted-foreground">
                No active admissions found.
            </div>
        </div>
    )
}
