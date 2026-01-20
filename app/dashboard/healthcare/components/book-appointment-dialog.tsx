'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { TimePicker } from "@/components/ui/time-picker-demo" // Note: Assuming this exists or I'll use simple select
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { CalendarIcon, Plus } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { bookAppointment } from "../actions"

export function BookAppointmentDialog({ doctors }: { doctors: any[] }) {
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [date, setDate] = useState<Date>()
    const [time, setTime] = useState("09:00") // Simple time string

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        if (!date) return

        setLoading(true)
        const formData = new FormData(event.currentTarget)

        // Combine date and time
        const dateTime = new Date(date)
        const [hours, minutes] = time.split(':')
        dateTime.setHours(parseInt(hours), parseInt(minutes))

        formData.append("date", dateTime.toISOString())

        await bookAppointment(formData)
        setLoading(false)
        setOpen(false)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="gap-2">
                    <Plus className="h-4 w-4" /> Book Appointment
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Book Appointment</DialogTitle>
                    <DialogDescription>
                        Schedule a new appointment for a patient.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="patientName">Patient Name</Label>
                        <Input id="patientName" name="patientName" required placeholder="e.g. John Doe" />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="patientPhone">Patient Phone</Label>
                        <Input id="patientPhone" name="patientPhone" required placeholder="e.g. 9876543210" />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="doctor">Doctor</Label>
                        <Select name="doctorId" required>
                            <SelectTrigger>
                                <SelectValue placeholder="Select doctor" />
                            </SelectTrigger>
                            <SelectContent>
                                {doctors.map((doc) => (
                                    <SelectItem key={doc.id} value={doc.id}>{doc.name} ({doc.specialty})</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <Label>Date</Label>
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
                                        {date ? format(date, "PPP") : <span>Pick date</span>}
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
                        <div className="grid gap-2">
                            <Label>Time</Label>
                            <Select onValueChange={setTime} defaultValue="09:00">
                                <SelectTrigger>
                                    <SelectValue placeholder="Time" />
                                </SelectTrigger>
                                <SelectContent className="h-[200px]">
                                    {Array.from({ length: 18 }).map((_, i) => {
                                        const hour = i + 9 // Start 9 AM
                                        const timeStr = `${hour < 10 ? '0' + hour : hour}:00`
                                        return (
                                            <SelectItem key={timeStr} value={timeStr}>
                                                {timeStr}
                                            </SelectItem>
                                        )
                                    })}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit" disabled={loading || !date}>
                            {loading ? "Booking..." : "Confirm Booking"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
