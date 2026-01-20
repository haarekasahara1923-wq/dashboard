'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { CalendarIcon, Clock } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { scheduleSiteVisit } from "../server-actions/mutations"

export function ScheduleVisitDialog({ leads }: { leads: any[] }) {
    const [open, setOpen] = useState(false)
    const [date, setDate] = useState<Date>()
    const [selectedLeadId, setSelectedLeadId] = useState<string>("")
    const [loading, setLoading] = useState(false)

    async function handleSchedule() {
        if (!selectedLeadId || !date) return
        setLoading(true)
        await scheduleSiteVisit(selectedLeadId, date)
        setLoading(false)
        setOpen(false)
        setDate(undefined)
        setSelectedLeadId("")
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" className="gap-2">
                    <CalendarIcon className="h-4 w-4" /> Schedule Visit
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Schedule Site Visit</DialogTitle>
                    <DialogDescription>
                        Pick a date and assign it to a lead.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium">Select Lead</label>
                        <Select onValueChange={setSelectedLeadId} value={selectedLeadId}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select a lead..." />
                            </SelectTrigger>
                            <SelectContent>
                                {leads.map((lead) => (
                                    <SelectItem key={lead.id} value={lead.id}>
                                        {lead.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium">Pick Date</label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant={"outline"}
                                    className={cn(
                                        "w-full justify-start text-left font-normal",
                                        !date && "text-muted-foreground"
                                    )}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                                <Calendar
                                    mode="single"
                                    selected={date}
                                    onSelect={setDate}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                    </div>
                </div>
                <DialogFooter>
                    <Button onClick={handleSchedule} disabled={!date || !selectedLeadId || loading}>
                        {loading ? "Scheduling..." : "Confirm Visit"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
