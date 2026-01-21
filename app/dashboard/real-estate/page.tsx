import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Home, Calendar } from "lucide-react"
import { getRealEstateStats, getLeads, getUpcomingVisits } from "./actions"
import { AddLeadDialog } from "./components/add-lead-dialog"
import { ScheduleVisitDialog } from "./components/schedule-visit-dialog"
import { format } from "date-fns"

export default async function RealEstateDashboard() {
    const stats = await getRealEstateStats()
    const leads = await getLeads()
    const upcomingVisits = await getUpcomingVisits()

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Real Estate Dashboard</h1>
                <div className="flex gap-2">
                    <ScheduleVisitDialog leads={leads} />
                    <AddLeadDialog />
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <KpiCard title="Total Leads" value={stats.totalLeads.toString()} icon={Users} trend="All time" />
                <KpiCard title="Hot Leads" value={stats.hotLeads.toString()} icon={Users} trend="Need attention" />
                <KpiCard title="Visits Scheduled" value={stats.scheduledVisits.toString()} icon={Calendar} trend="Upcoming" />
                <KpiCard title="Deals Closed" value={stats.dealsClosed.toString()} icon={Home} trend="This month" />
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>Recent Leads</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <PipelineList leads={leads} />
                    </CardContent>
                </Card>
                <Card className="col-span-3">
                    <CardHeader>
                        <CardTitle>Upcoming Site Visits</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <UpcomingVisitsList visits={upcomingVisits} />
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
function PipelineList({ leads }: { leads: any[] }) {
    return (
        <div className="space-y-4">
            {leads.length === 0 && <p className="text-sm text-muted-foreground">No leads found. Add one to get started.</p>}
            {leads.map((lead, i) => (
                <div key={i} className="flex items-center justify-between border-b pb-2 last:border-0 last:pb-0">
                    <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">{lead.name}</p>
                        <p className="text-xs text-muted-foreground">{lead.source || "Direct"}</p>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                        <div className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">
                            {lead.status}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function UpcomingVisitsList({ visits }: { visits: any[] }) {
    if (visits.length === 0) {
        return <p className="text-sm text-muted-foreground">No upcoming visits scheduled.</p>
    }

    return (
        <div className="space-y-4">
            {visits.map((visit, i) => (
                <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded bg-primary/10 flex items-center justify-center text-primary">
                            <Calendar className="h-4 w-4" />
                        </div>
                        <div className="space-y-1">
                            <p className="text-sm font-medium leading-none">{visit.lead.name}</p>
                            <p className="text-xs text-muted-foreground">
                                {format(new Date(visit.date), "PPP")}
                            </p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

