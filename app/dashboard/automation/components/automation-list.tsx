'use client'

import { Card } from "@/components/ui/card"
import { Zap, MoreVertical, Play, Pause, Trash } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { toggleRuleStatus, deleteRule, testRule } from "../server-actions/mutations"

export function AutomationList({ rules }: { rules: any[] }) {
    if (rules.length === 0) {
        return (
            <div className="text-center py-12 text-muted-foreground border-2 border-dashed rounded-lg">
                No automation rules found. Create one to get started.
            </div>
        )
    }

    return (
        <div className="grid gap-4">
            {rules.map((rule) => (
                <AutomationCard key={rule.id} rule={rule} />
            ))}
        </div>
    )
}

function AutomationCard({ rule }: { rule: any }) {
    return (
        <Card className="flex items-center p-4">
            <div className={`h-10 w-10 rounded-full flex items-center justify-center mr-4 ${rule.isActive ? 'bg-primary/10' : 'bg-gray-100'}`}>
                <Zap className={`h-5 w-5 ${rule.isActive ? 'text-primary' : 'text-gray-400'}`} />
            </div>
            <div className="flex-1">
                <h3 className="font-semibold text-lg">{rule.name}</h3>
                <p className="text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">Trigger:</span> {formatTrigger(rule.trigger)} → <span className="font-medium text-foreground">Action:</span> {formatAction(rule.action)}
                </p>
            </div>
            <div className="flex items-center gap-4">
                <div className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${rule.isActive ? "bg-green-50 text-green-700 border-green-200" : "bg-yellow-50 text-yellow-700 border-yellow-200"
                    }`}>
                    {rule.isActive ? "Active" : "Paused"}
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => toggleRuleStatus(rule.id, rule.isActive)}>
                            {rule.isActive ? (
                                <>
                                    <Pause className="mr-2 h-4 w-4" /> Pause
                                </>
                            ) : (
                                <>
                                    <Play className="mr-2 h-4 w-4" /> Resume
                                </>
                            )}
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={async () => {
                            const result = await testRule(rule.id)
                            alert(result.message)
                        }}>
                            <Play className="mr-2 h-4 w-4" /> Test Run
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600" onClick={() => deleteRule(rule.id)}>
                            <Trash className="mr-2 h-4 w-4" /> Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </Card>
    )
}

function formatTrigger(trigger: string) {
    return trigger.replace(/_/g, " ").toLowerCase().replace(/\b\w/g, l => l.toUpperCase())
}

function formatAction(action: string) {
    return action.replace(/_/g, " ").toLowerCase().replace(/\b\w/g, l => l.toUpperCase())
}
