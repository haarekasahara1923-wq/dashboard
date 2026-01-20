import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, FileText, Banknote, AlertCircle } from "lucide-react"

export default function EducationDashboard() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Education Dashboard</h1>
                {/* Date picker or filters could go here */}
            </div>

            {/* KPI Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <KpiCard title="Total Enquiries" value="128" icon={FileText} trend="+12% from last month" />
                <KpiCard title="Active Students" value="450" icon={Users} trend="+4 new this week" />
                <KpiCard title="Fee Collected" value="₹ 4.2L" icon={Banknote} trend="+8% from last month" />
                <KpiCard title="Pending Dues" value="₹ 85k" icon={AlertCircle} trend="15 students overdue" alert />
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>Recent Admissions & Enquiries</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <RecentEnquiries />
                    </CardContent>
                </Card>
                <Card className="col-span-3">
                    <CardHeader>
                        <CardTitle>Attendance Overview</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {/* Placeholder for chart */}
                        <div className="h-[200px] flex items-center justify-center bg-muted/20 rounded-md border border-dashed">
                            attendance_chart.png (Placeholder)
                        </div>
                        <div className="mt-4 space-y-2">
                            <div className="flex justify-between text-sm">
                                <span>Class 10A</span>
                                <span className="font-bold">92%</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span>Class 12B</span>
                                <span className="font-bold">88%</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

function KpiCard({ title, value, icon: Icon, trend, alert }: { title: string, value: string, icon: React.ElementType, trend: string, alert?: boolean }) {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                    {title}
                </CardTitle>
                <Icon className={`h-4 w-4 ${alert ? "text-red-500" : "text-muted-foreground"}`} />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{value}</div>
                <p className="text-xs text-muted-foreground">
                    {trend}
                </p>
            </CardContent>
        </Card>
    )
}

function RecentEnquiries() {
    const enquiries = [
        { name: "Rahul Kumar", course: "Class 11 (Science)", status: "New", date: "Today" },
        { name: "Priya Singh", course: "NEET Prep", status: "Follow-up", date: "Yesterday" },
        { name: "Amit Sharma", course: "Class 10", status: "Admitted", date: "2 days ago" },
        { name: "Sneha Gupta", course: "JEE Mains", status: "New", date: "3 days ago" },
        { name: "Vikram Malhotra", course: "Class 9", status: "Closed", date: "1 week ago" },
    ]

    return (
        <div className="space-y-4">
            {enquiries.map((enquiry, i) => (
                <div key={i} className="flex items-center justify-between border-b pb-2 last:border-0 last:pb-0">
                    <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">{enquiry.name}</p>
                        <p className="text-xs text-muted-foreground">{enquiry.course}</p>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                        <div className={`text-xs px-2 py-0.5 rounded-full font-medium ${enquiry.status === "New" ? "bg-blue-100 text-blue-700" :
                            enquiry.status === "Admitted" ? "bg-green-100 text-green-700" :
                                enquiry.status === "Closed" ? "bg-red-100 text-red-700" :
                                    "bg-yellow-100 text-yellow-700"
                            }`}>
                            {enquiry.status}
                        </div>
                        <span className="text-xs text-muted-foreground">{enquiry.date}</span>
                    </div>
                </div>
            ))}
        </div>
    )
}
