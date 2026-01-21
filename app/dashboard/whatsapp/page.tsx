import { getWhatsAppConfig, updateWhatsAppConfig } from "./actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageSquare } from "lucide-react"

export default async function WhatsAppPage() {
    const config = await getWhatsAppConfig()

    return (
        <div className="space-y-6">
            <div className="space-y-1">
                <h1 className="text-3xl font-bold tracking-tight">WhatsApp Configuration</h1>
                <p className="text-muted-foreground">
                    Connect your WhatsApp Business Account to enable automation.
                </p>
            </div>

            <Card className="max-w-2xl">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <MessageSquare className="h-5 w-5 text-green-600" />
                        WhatsApp Settings
                    </CardTitle>
                    <CardDescription>
                        Configuration priority: Database (below) {'>'} Environment Variables.
                    </CardDescription>
                </CardHeader>
                <form action={updateWhatsAppConfig}>
                    <CardContent className="space-y-4">
                        {!config?.phoneNumber && process.env.WHATSAPP_PHONE_NUMBER && (
                            <div className="bg-blue-50 p-4 rounded-md text-sm text-blue-700 mb-4 border border-blue-200">
                                <strong>Environment Variable Detected:</strong> A default phone number is set in your environment variables.
                                You can override it here.
                            </div>
                        )}
                        <div className="space-y-2">
                            <Label htmlFor="phoneNumber">Phone Number</Label>
                            <Input
                                id="phoneNumber"
                                name="phoneNumber"
                                placeholder={process.env.WHATSAPP_PHONE_NUMBER || "+91 99999 99999"}
                                defaultValue={config?.phoneNumber || ""}
                            />
                            <p className="text-xs text-muted-foreground">Include country code without special characters (e.g., 919999999999)</p>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="apiKey">API Key (Optional)</Label>
                            <Input
                                id="apiKey"
                                name="apiKey"
                                type="password"
                                placeholder={process.env.WHATSAPP_API_KEY ? "Set in Environment Variables" : "WhatsApp Cloud API Key"}
                                defaultValue={config?.apiKey || ""}
                            />
                            <p className="text-xs text-muted-foreground">
                                {process.env.WHATSAPP_API_KEY ? "Defaults to WHATSAPP_API_KEY from .env if left blank." : "Required for sending messages."}
                            </p>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button type="submit">Save Configuration</Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    )
}
