import { ScheduleVisitDialog } from "@/components/dashboard/real-estate/schedule-visit-dialog"
import { getUpcomingVisits, getLeads } from "../actions"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "lucide-react"

export default async function SiteVisitsPage() {
    const visits = await getUpcomingVisits()
    const leads = await getLeads()

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="space-y-1">
                    <h1 className="text-3xl font-bold tracking-tight">Site Visits</h1>
                    <p className="text-muted-foreground">Schedule and track property site visits.</p>
                </div>
                <ScheduleVisitDialog leads={leads} />
            </div>

            {visits.length === 0 ? (
                <div className="rounded-lg border border-dashed p-8 text-center text-muted-foreground">
                    No site visits scheduled.
                </div>
            ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {visits.map((visit) => (
                        <Card key={visit.id}>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    {visit.lead.name}
                                </CardTitle>
                                <Calendar className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-lg font-bold">
                                    {new Date(visit.date).toLocaleString()}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    )
}
