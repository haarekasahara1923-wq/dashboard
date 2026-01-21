import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"
import { getAdminData } from "./actions"
import { AdminDataTable } from "./data-table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default async function AdminDashboard() {
    const session = await getServerSession(authOptions)

    // Strict Admin Check
    if (session?.user?.role !== "SUPER_ADMIN") {
        redirect("/dashboard")
    }

    const data = await getAdminData()

    const educationTenants = data.filter(t => t.industry === "EDUCATION")
    const realEstateTenants = data.filter(t => t.industry === "REAL_ESTATE")
    const healthcareTenants = data.filter(t => t.industry === "HEALTHCARE")

    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Admin Console</h2>
            </div>
            <Tabs defaultValue="overview" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="education">Education</TabsTrigger>
                    <TabsTrigger value="real-estate">Real Estate</TabsTrigger>
                    <TabsTrigger value="healthcare">Healthcare</TabsTrigger>
                </TabsList>
                <TabsContent value="overview" className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Total Tenants</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{data.length}</div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Active Subscriptions</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">
                                    {data.filter(t => t.subscriptionStatus === "ACTIVE").length}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                    <Card>
                        <CardHeader>
                            <CardTitle>All Tenants</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <AdminDataTable data={data} />
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="education">
                    <Card>
                        <CardHeader>
                            <CardTitle>Education Tenants</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <AdminDataTable data={educationTenants} />
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="real-estate">
                    <Card>
                        <CardHeader>
                            <CardTitle>Real Estate Tenants</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <AdminDataTable data={realEstateTenants} />
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="healthcare">
                    <Card>
                        <CardHeader>
                            <CardTitle>Healthcare Tenants</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <AdminDataTable data={healthcareTenants} />
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}
