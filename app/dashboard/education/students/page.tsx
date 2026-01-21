import { AddStudentDialog } from "@/components/dashboard/education/add-student-dialog"
import { getStudents } from "../actions"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users } from "lucide-react"

export default async function StudentsPage() {
    const students = await getStudents()

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="space-y-1">
                    <h1 className="text-3xl font-bold tracking-tight">Students</h1>
                    <p className="text-muted-foreground">Manage your student directory.</p>
                </div>
                <AddStudentDialog />
            </div>

            {students.length === 0 ? (
                <div className="rounded-lg border border-dashed p-8 text-center text-muted-foreground">
                    No students found. Add your first student to get started.
                </div>
            ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {students.map((student) => (
                        <Card key={student.id}>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    {student.firstName} {student.lastName}
                                </CardTitle>
                                <Users className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-sm">{student.email}</div>
                                <div className="text-xs text-muted-foreground">{student.phone}</div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    )
}
