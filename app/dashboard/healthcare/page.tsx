import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Calendar, Activity, Clock } from "lucide-react"
import { getHealthcareStats, getAppointments, getDoctors } from "./actions"
import { ensureDevDoctor } from "./seed"
import { BookAppointmentDialog } from "./components/book-appointment-dialog"
import { format } from "date-fns"

export default async function HealthcareDashboard() {
    await ensureDevDoctor()
    const stats = await getHealthcareStats()
    const appointments = await getAppointments()
    const doctors = await getDoctors()

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Healthcare Dashboard</h1>
                <div className="flex gap-2">
                    <BookAppointmentDialog doctors={doctors} />
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <KpiCard title="Appointments Today" value={stats.appointmentsToday.toString()} icon={Calendar} trend="For today" />
                <KpiCard title="Pending Patients" value={stats.pendingPatients.toString()} icon={Users} trend="Scheduled" />
                <KpiCard title="Patients Waiting" value="0" icon={Clock} trend="Avg wait: --" />
                <KpiCard title="Active Doctors" value={stats.activeDoctors.toString()} icon={Activity} trend="On duty" />
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>Upcoming Appointments</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ScheduleList appointments={appointments} />
                    </CardContent>
                </Card>
                <Card className="col-span-3">
                    <CardHeader>
                        <CardTitle>Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 gap-4">
                            <ActionButton label="New Patient" />
                            <ActionButton label="Lab Report" />
                            <ActionButton label="Billing" />
                            <ActionButton label="Prescription" />
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

function KpiCard({ title, value, icon: Icon, trend }: { title: string, value: string, icon: React.ElementType, trend: string }) {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{value}</div>
                <p className="text-xs text-muted-foreground">{trend}</p>
            </CardContent>
        </Card>
    )
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function ScheduleList({ appointments }: { appointments: any[] }) {
    if (appointments.length === 0) {
        return <p className="text-sm text-muted-foreground">No appointments scheduled for today.</p>
    }

    return (
        <div className="space-y-4">
            {appointments.map((appt, i) => (
                <div key={i} className="flex items-center justify-between border-b pb-2 last:border-0 last:pb-0">
                    <div className="flex gap-4 items-center">
                        <div className="text-sm font-bold w-16 text-right">
                            {format(new Date(appt.date), "hh:mm a")}
                        </div>
                        <div>
                            <p className="text-sm font-medium leading-none">{appt.patient.name}</p>
                            <p className="text-xs text-muted-foreground">{appt.doctor.name} • {appt.status}</p>
                        </div>
                    </div>
                    <div className={`text-xs px-2 py-0.5 rounded-full font-medium ${appt.status === "COMPLETED" ? "bg-green-100 text-green-700" :
                        appt.status === "SCHEDULED" ? "bg-blue-100 text-blue-700" :
                            "bg-gray-100 text-gray-700"
                        }`}>
                        {appt.status}
                    </div>
                </div>
            ))}
        </div>
    )
}

function ActionButton({ label }: { label: string }) {
    return (
        <button className="h-20 border rounded-lg hover:bg-muted/50 flex flex-col items-center justify-center gap-2 transition-colors">
            <span className="font-medium text-sm">{label}</span>
        </button>
    )
}

