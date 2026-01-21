import { BookAppointmentDialog } from "@/components/dashboard/healthcare/book-appointment-dialog"
import { getAppointments, getPatients } from "../actions"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "lucide-react"

export default async function AppointmentsPage() {
    const appointments = await getAppointments()
    const patients = await getPatients()

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="space-y-1">
                    <h1 className="text-3xl font-bold tracking-tight">Appointments</h1>
                    <p className="text-muted-foreground">Manage patient appointments and doctor schedules.</p>
                </div>
                <BookAppointmentDialog patients={patients} />
            </div>

            {appointments.length === 0 ? (
                <div className="rounded-lg border border-dashed p-8 text-center text-muted-foreground">
                    No appointments scheduled.
                </div>
            ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {appointments.map((appointment) => (
                        <Card key={appointment.id}>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    {appointment.patient.name}
                                </CardTitle>
                                <Calendar className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-lg font-bold">
                                    {new Date(appointment.date).toLocaleString()}
                                </div>
                                <p className="text-xs text-muted-foreground mt-1">
                                    Dr. {appointment.doctor.name}
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    )
}
