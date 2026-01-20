import { getAutomationRules } from "./actions"
import { CreateRuleDialog } from "./components/create-rule-dialog"
import { AutomationList } from "./components/automation-list"

export default async function AutomationPage() {
    const rules = await getAutomationRules()

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="space-y-1">
                    <h1 className="text-3xl font-bold tracking-tight">Automation Rules</h1>
                    <p className="text-muted-foreground">Manage your automated workflows and triggers.</p>
                </div>
                <CreateRuleDialog />
            </div>

            <AutomationList rules={rules} />
        </div>
    )
}


