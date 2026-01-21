'use client'

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CalendarPlus } from "lucide-react"
import { scheduleSiteVisit } from "@/app/dashboard/real-estate/server-actions/mutations"
import { useState } from "react"
import { useRouter } from "next/navigation"

export function ScheduleVisitDialog({ leads }: { leads: { id: string, name: string }[] }) {
    const [open, setOpen] = useState(false)
    const router = useRouter()

    async function onSubmit(formData: FormData) {
        await scheduleSiteVisit(formData)
        setOpen(false)
        router.refresh()
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>
                    <CalendarPlus className="mr-2 h-4 w-4" /> Schedule Visit
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Schedule Site Visit</DialogTitle>
                    <DialogDescription>
                        Book a site visit for a lead. Automation rules will trigger (e.g. confirmation message).
                    </DialogDescription>
                </DialogHeader>
                <form action={onSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="leadId" className="text-right">
                                Lead
                            </Label>
                            <select name="leadId" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 col-span-3" required>
                                <option value="">Select a lead...</option>
                                {leads.map(lead => (
                                    <option key={lead.id} value={lead.id}>{lead.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="date" className="text-right">
                                Date & Time
                            </Label>
                            <Input id="date" name="date" type="datetime-local" className="col-span-3" required />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit">Schedule Visit</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
