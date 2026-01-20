import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Plus, Play, Pause, MoreVertical, Zap } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function AutomationPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="space-y-1">
                    <h1 className="text-3xl font-bold tracking-tight">Automation Rules</h1>
                    <p className="text-muted-foreground">Manage your automated workflows and triggers.</p>
                </div>
                <Button>
                    <Plus className="mr-2 h-4 w-4" /> Create Rule
                </Button>
            </div>

            <div className="grid gap-4">
                <AutomationCard
                    title="New Lead Welcome"
                    trigger="When a lead is created"
                    action="Send 'Welcome' WhatsApp message"
                    status="Active"
                />
                <AutomationCard
                    title="Fee Overdue Alert"
                    trigger="When fee is due for > 3 days"
                    action="Send 'Fee Reminder' WhatsApp + Email Parent"
                    status="Active"
                />
                <AutomationCard
                    title="Appointment Confirmation"
                    trigger="When appointment booked"
                    action="Send confirmation details"
                    status="Paused"
                />
            </div>
        </div>
    )
}

function AutomationCard({ title, trigger, action, status }: { title: string, trigger: string, action: string, status: "Active" | "Paused" }) {
    return (
        <Card className="flex items-center p-4">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                <Zap className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1">
                <h3 className="font-semibold text-lg">{title}</h3>
                <p className="text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">Trigger:</span> {trigger} → <span className="font-medium text-foreground">Action:</span> {action}
                </p>
            </div>
            <div className="flex items-center gap-4">
                <div className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${status === "Active" ? "bg-green-50 text-green-700 border-green-200" : "bg-yellow-50 text-yellow-700 border-yellow-200"
                    }`}>
                    {status}
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        {status === "Active" ? (
                            <DropdownMenuItem><Pause className="mr-2 h-4 w-4" /> Pause</DropdownMenuItem>
                        ) : (
                            <DropdownMenuItem><Play className="mr-2 h-4 w-4" /> Resume</DropdownMenuItem>
                        )}
                        <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </Card>
    )
}
