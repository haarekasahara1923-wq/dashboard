import { Button } from "@/components/ui/button"
import { Users, UserPlus } from "lucide-react"

export default function LeadsPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="space-y-1">
                    <h1 className="text-3xl font-bold tracking-tight">Leads</h1>
                    <p className="text-muted-foreground">Manage your real estate leads and potential clients.</p>
                </div>
                <Button>
                    <UserPlus className="mr-2 h-4 w-4" /> Add Lead
                </Button>
            </div>
            <div className="rounded-lg border border-dashed p-8 text-center text-muted-foreground">
                No leads found.
            </div>
        </div>
    )
}
