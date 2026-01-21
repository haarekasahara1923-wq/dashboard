import { AddLeadDialog } from "@/components/dashboard/real-estate/add-lead-dialog"
import { getLeads } from "../actions"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default async function LeadsPage() {
    const leads = await getLeads()

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="space-y-1">
                    <h1 className="text-3xl font-bold tracking-tight">Leads</h1>
                    <p className="text-muted-foreground">Manage your real estate leads and potential clients.</p>
                </div>
                <AddLeadDialog />
            </div>

            {leads.length === 0 ? (
                <div className="rounded-lg border border-dashed p-8 text-center text-muted-foreground">
                    No leads found.
                </div>
            ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {leads.map((lead) => (
                        <Card key={lead.id}>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    {lead.name}
                                </CardTitle>
                                <Badge variant={lead.status === 'HOT' ? "destructive" : lead.status === 'WARM' ? "default" : "secondary"}>{lead.status}</Badge>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{lead.phone}</div>
                                <p className="text-xs text-muted-foreground">
                                    Added {new Date(lead.createdAt || new Date()).toLocaleDateString()}
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    )
}
