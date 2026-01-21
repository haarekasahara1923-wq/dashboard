import { Button } from "@/components/ui/button"
import { Home, Plus } from "lucide-react"

export default function PropertiesPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="space-y-1">
                    <h1 className="text-3xl font-bold tracking-tight">Properties</h1>
                    <p className="text-muted-foreground">Manage your property listings and inventory.</p>
                </div>
                <Button>
                    <Plus className="mr-2 h-4 w-4" /> Add Property
                </Button>
            </div>
            <div className="rounded-lg border border-dashed p-8 text-center text-muted-foreground">
                No properties listed.
            </div>
        </div>
    )
}
