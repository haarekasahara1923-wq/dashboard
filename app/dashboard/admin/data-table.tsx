"use client"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MoreHorizontal, Lock, Unlock, CheckCircle } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { markAsPaid, blockTenant, unblockTenant } from "./actions"
import { useState } from "react"

interface AdminDataTableProps {
    data: any[]
}

export function AdminDataTable({ data }: AdminDataTableProps) {
    const [loadingId, setLoadingId] = useState<string | null>(null)

    async function handleAction(action: () => Promise<void>, id: string) {
        setLoadingId(id)
        try {
            await action()
        } catch (error) {
            console.error(error)
            alert("Action failed")
        } finally {
            setLoadingId(null)
        }
    }

    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Business Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Industry</TableHead>
                        <TableHead>Plan</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Revenue</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.map((row) => (
                        <TableRow key={row.id}>
                            <TableCell className="font-medium">{row.businessName}</TableCell>
                            <TableCell>{row.email}</TableCell>
                            <TableCell>
                                <Badge variant="outline">{row.industry}</Badge>
                            </TableCell>
                            <TableCell>{row.subscriptionType}</TableCell>
                            <TableCell>
                                <Badge variant={
                                    row.subscriptionStatus === 'ACTIVE' ? "default" :
                                        row.subscriptionStatus === 'CANCELLED' ? "destructive" : "secondary"
                                }>
                                    {row.subscriptionStatus}
                                </Badge>
                            </TableCell>
                            <TableCell>{row.revenue}</TableCell>
                            <TableCell className="text-right">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" className="h-8 w-8 p-0" disabled={loadingId === row.id}>
                                            <span className="sr-only">Open menu</span>
                                            <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                        <DropdownMenuItem
                                            onClick={() => handleAction(() => markAsPaid(row.id), row.id)}
                                            className="text-green-600"
                                        >
                                            <CheckCircle className="mr-2 h-4 w-4" />
                                            Mark as Paid
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        {row.subscriptionStatus === 'CANCELLED' ? (
                                            <DropdownMenuItem onClick={() => handleAction(() => unblockTenant(row.id), row.id)}>
                                                <Unlock className="mr-2 h-4 w-4" />
                                                Unblock User
                                            </DropdownMenuItem>
                                        ) : (
                                            <DropdownMenuItem
                                                onClick={() => handleAction(() => blockTenant(row.id), row.id)}
                                                className="text-red-600"
                                            >
                                                <Lock className="mr-2 h-4 w-4" />
                                                Block User
                                            </DropdownMenuItem>
                                        )}
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    ))}
                    {data.length === 0 && (
                        <TableRow>
                            <TableCell colSpan={7} className="h-24 text-center">
                                No results.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    )
}
