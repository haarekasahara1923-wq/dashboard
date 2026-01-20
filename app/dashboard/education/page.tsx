import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, FileText, Banknote, AlertCircle } from "lucide-react"
import { getEducationStats, getStudents } from "./actions"
import { AddStudentDialog } from "./components/add-student-dialog"
import { format } from "date-fns"

export default async function EducationDashboard() {
    const stats = await getEducationStats()
    const students = await getStudents()

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Education Dashboard</h1>
                <div className="flex gap-2">
                    <AddStudentDialog />
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <KpiCard title="Total Students" value={stats.totalStudents.toString()} icon={Users} trend="Active Enrolled" />
                <KpiCard title="Enquiries" value={stats.totalEnquiries.toString()} icon={FileText} trend="Total Database" />
                <KpiCard title="Fee Collected" value={`₹ ${stats.feeCollected}`} icon={Banknote} trend="This Session" />
                <KpiCard title="Pending Dues" value={`₹ ${stats.pendingDues}`} icon={AlertCircle} trend="Overdue" alert />
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>Recent Students & Enquiries</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <RecentEnquiries students={students} />
                    </CardContent>
                </Card>
                <Card className="col-span-3">
                    <CardHeader>
                        <CardTitle>Attendance Overview</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {/* Placeholder for chart */}
                        <div className="h-[200px] flex items-center justify-center bg-muted/20 rounded-md border border-dashed">
                            <p className="text-muted-foreground text-sm">Attendance Chart Widget</p>
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

function RecentEnquiries({ students }: { students: any[] }) {
    if (students.length === 0) {
        return <p className="text-sm text-muted-foreground">No records found.</p>
    }

    return (
        <div className="space-y-4">
            {students.map((student, i) => (
                <div key={i} className="flex items-center justify-between border-b pb-2 last:border-0 last:pb-0">
                    <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">{student.firstName} {student.lastName}</p>
                        <p className="text-xs text-muted-foreground">{student.phone}</p>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                        <div className="text-xs px-2 py-0.5 rounded-full font-medium bg-blue-100 text-blue-700">
                            New
                        </div>
                        {/* <span className="text-xs text-muted-foreground">{student.createdAt}</span> */}
                    </div>
                </div>
            ))}
        </div>
    )
}

