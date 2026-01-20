import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Home, Calendar, IndianRupee } from "lucide-react"

export default function RealEstateDashboard() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Real Estate Dashboard</h1>
            </div>

            {/* KPI Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <KpiCard title="Hot Leads" value="42" icon={Users} trend="+8 from last week" />
                <KpiCard title="Visits Scheduled" value="18" icon={Calendar} trend="For upcoming week" />
                <KpiCard title="Deals Closed" value="4" icon={Home} trend="This month" />
                <KpiCard title="Revenue" value="₹ 1.2Cr" icon={IndianRupee} trend="YTD" />
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>Sales Pipeline</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <PipelineList />
                    </CardContent>
                </Card>
                <Card className="col-span-3">
                    <CardHeader>
                        <CardTitle>Agent Performance</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <AgentRow name="Rajesh Kumar" leads="15" closed="2" />
                            <AgentRow name="Sunita Verma" leads="22" closed="1" />
                            <AgentRow name="Amit Patel" leads="8" closed="0" />
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

function PipelineList() {
    const leads = [
        { name: "Mr. Sharma", property: "3BHK - Sector 15", status: "Site Visit", amount: "₹ 85L" },
        { name: "Mrs. Iyer", property: "Villa Plot 4", status: "Negotiation", amount: "₹ 1.5Cr" },
        { name: "Dr. Gupta", property: "2BHK - City Center", status: "New Lead", amount: "₹ 55L" },
        { name: "Tech Corp", property: "Office Space L2", status: "Contract", amount: "₹ 45k/mo" },
    ]
    return (
        <div className="space-y-4">
            {leads.map((lead, i) => (
                <div key={i} className="flex items-center justify-between border-b pb-2 last:border-0 last:pb-0">
                    <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">{lead.name}</p>
                        <p className="text-xs text-muted-foreground">{lead.property}</p>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                        <div className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">
                            {lead.status}
                        </div>
                        <span className="text-xs font-bold">{lead.amount}</span>
                    </div>
                </div>
            ))}
        </div>
    )
}

function AgentRow({ name, leads, closed }: { name: string, leads: string, closed: string }) {
    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center font-bold text-xs">
                    {name.charAt(0)}
                </div>
                <div className="text-sm font-medium">{name}</div>
            </div>
            <div className="text-xs text-muted-foreground">
                {leads} leads / {closed} closed
            </div>
        </div>
    )
}
