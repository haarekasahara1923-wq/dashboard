import { AddPropertyDialog } from "@/components/dashboard/real-estate/add-property-dialog"
import { getProperties } from "../actions"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default async function PropertiesPage() {
    const properties = await getProperties()

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="space-y-1">
                    <h1 className="text-3xl font-bold tracking-tight">Properties</h1>
                    <p className="text-muted-foreground">Manage your property listings and inventory.</p>
                </div>
                <AddPropertyDialog />
            </div>

            {properties.length === 0 ? (
                <div className="rounded-lg border border-dashed p-8 text-center text-muted-foreground">
                    No properties listed.
                </div>
            ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {properties.map((property) => (
                        <Card key={property.id}>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    {property.title}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">₹{property.price.toLocaleString('en-IN')}</div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    )
}
