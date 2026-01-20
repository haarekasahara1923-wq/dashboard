import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Calendar, Activity, Clock } from "lucide-react"

export default function HealthcareDashboard() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Healthcare Dashboard</h1>
                <div className="flex gap-2">
                    {/* Action buttons like "Book Appointment" */}
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <KpiCard title="Appointments Today" value="24" icon={Calendar} trend="4 slots remaining" />
                <KpiCard title="No-Shows" value="2" icon={Users} trend="8% rate (Low)" />
                <KpiCard title="Patients Waiting" value="6" icon={Clock} trend="Avg wait: 12m" />
                <KpiCard title="Doctor Utilization" value="85%" icon={Activity} trend="Dr. Smith is busy" />
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>Today&apos;s Schedule</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ScheduleList />
                    </CardContent>
                </Card>
                <Card className="col-span-3">
                    <CardHeader>
                        <CardTitle>Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 gap-4">
                            <ActionButton label="New Patient" />
                            <ActionButton label="Book Apt" />
                            <ActionButton label="Lab Report" />
                            <ActionButton label="Billing" />
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

function ScheduleList() {
    const appts = [
        { time: "09:00 AM", patient: "Rahul Sharma", doctor: "Dr. Smith", type: "Checkup", status: "Completed" },
        { time: "09:30 AM", patient: "Anita Desai", doctor: "Dr. Smith", type: "Follow-up", status: "In Progress" },
        { time: "10:00 AM", patient: "Vikram Singh", doctor: "Dr. Jones", type: "Consultation", status: "Waiting" },
        { time: "10:30 AM", patient: "Priya K", doctor: "Dr. Smith", type: "Report Review", status: "Scheduled" },
    ]

    return (
        <div className="space-y-4">
            {appts.map((appt, i) => (
                <div key={i} className="flex items-center justify-between border-b pb-2 last:border-0 last:pb-0">
                    <div className="flex gap-4 items-center">
                        <div className="text-sm font-bold w-16 text-right">{appt.time}</div>
                        <div>
                            <p className="text-sm font-medium leading-none">{appt.patient}</p>
                            <p className="text-xs text-muted-foreground">{appt.doctor} • {appt.type}</p>
                        </div>
                    </div>
                    <div className={`text-xs px-2 py-0.5 rounded-full font-medium ${appt.status === "Completed" ? "bg-green-100 text-green-700" :
                        appt.status === "In Progress" ? "bg-blue-100 text-blue-700" :
                            appt.status === "Waiting" ? "bg-orange-100 text-orange-700" :
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
