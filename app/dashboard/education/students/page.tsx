import { Button } from "@/components/ui/button"
import { Users, UserPlus } from "lucide-react"

export default function StudentsPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="space-y-1">
                    <h1 className="text-3xl font-bold tracking-tight">Students</h1>
                    <p className="text-muted-foreground">Manage your student directory.</p>
                </div>
                <Button>
                    <UserPlus className="mr-2 h-4 w-4" /> Add Student
                </Button>
            </div>
            <div className="rounded-lg border border-dashed p-8 text-center text-muted-foreground">
                No students found. Add your first student to get started.
            </div>
        </div>
    )
}
