import { Button } from "@/components/ui/button"
import { Calendar, CalendarPlus } from "lucide-react"

export default function AppointmentsPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="space-y-1">
                    <h1 className="text-3xl font-bold tracking-tight">Appointments</h1>
                    <p className="text-muted-foreground">Manage patient appointments and doctor schedules.</p>
                </div>
                <Button>
                    <CalendarPlus className="mr-2 h-4 w-4" /> Book Appointment
                </Button>
            </div>
            <div className="rounded-lg border border-dashed p-8 text-center text-muted-foreground">
                No appointments scheduled.
            </div>
        </div>
    )
}
