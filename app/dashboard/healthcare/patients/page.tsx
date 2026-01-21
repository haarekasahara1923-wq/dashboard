import { AddPatientDialog } from "@/components/dashboard/healthcare/add-patient-dialog"
import { getPatients } from "../actions"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users } from "lucide-react"

export default async function PatientsPage() {
    const patients = await getPatients()

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="space-y-1">
                    <h1 className="text-3xl font-bold tracking-tight">Patients</h1>
                    <p className="text-muted-foreground">Manage patient records and history.</p>
                </div>
                <AddPatientDialog />
            </div>

            {patients.length === 0 ? (
                <div className="rounded-lg border border-dashed p-8 text-center text-muted-foreground">
                    No patients records found.
                </div>
            ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {patients.map((patient) => (
                        <Card key={patient.id}>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    {patient.name}
                                </CardTitle>
                                <Users className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{patient.phone}</div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    )
}
