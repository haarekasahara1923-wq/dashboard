'use server'

import { db } from "@/lib/db"

async function getDevTenant() {
    const tenant = await db.tenant.findFirst({
        where: { name: "Demo Healthcare" }
    })
    if (tenant) return tenant
    return await db.tenant.create({
        data: { name: "Demo Healthcare", industry: "HEALTHCARE" }
    })
}

export async function ensureDevDoctor() {
    const tenant = await getDevTenant()

    const count = await db.doctor.count({ where: { tenantId: tenant.id } })
    if (count === 0) {
        await db.doctor.createMany({
            data: [
                { name: "Dr. Smith", specialty: "General Physician", tenantId: tenant.id },
                { name: "Dr. Jones", specialty: "Cardiologist", tenantId: tenant.id },
                { name: "Dr. Emily", specialty: "Pediatrician", tenantId: tenant.id }
            ]
        })
    }
}
