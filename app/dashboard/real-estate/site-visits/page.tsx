import { Button } from "@/components/ui/button"
import { Calendar, CalendarPlus } from "lucide-react"

export default function SiteVisitsPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="space-y-1">
                    <h1 className="text-3xl font-bold tracking-tight">Site Visits</h1>
                    <p className="text-muted-foreground">Schedule and track property site visits.</p>
                </div>
                <Button>
                    <CalendarPlus className="mr-2 h-4 w-4" /> Schedule Visit
                </Button>
            </div>
            <div className="rounded-lg border border-dashed p-8 text-center text-muted-foreground">
                No site visits scheduled.
            </div>
        </div>
    )
}
