import { Button } from "@/components/ui/button"
import { Users, UserPlus } from "lucide-react"

export default function PatientsPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="space-y-1">
                    <h1 className="text-3xl font-bold tracking-tight">Patients</h1>
                    <p className="text-muted-foreground">Manage patient records and history.</p>
                </div>
                <Button>
                    <UserPlus className="mr-2 h-4 w-4" /> Add Patient
                </Button>
            </div>
            <div className="rounded-lg border border-dashed p-8 text-center text-muted-foreground">
                No patients records found.
            </div>
        </div>
    )
}
