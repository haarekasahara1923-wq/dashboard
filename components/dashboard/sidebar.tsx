import Link from "next/link"
import { MessageSquare, Bell, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { SidebarNav } from "./sidebar-nav"

export async function Sidebar() {
    const session = await getServerSession(authOptions)
    const tenantName = session?.user?.tenantName || "SaaSAuto"
    const industry = session?.user?.industry

    return (
        <div className="hidden border-r bg-gray-100/40 md:block dark:bg-gray-800/40 w-[240px] lg:w-[280px] shrink-0 h-screen sticky top-0">
            <div className="flex flex-col gap-2 h-full">
                <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                    <Link href="/" className="flex items-center gap-2 font-semibold">
                        <MessageSquare className="h-6 w-6 text-primary" />
                        <span className="">{tenantName}</span>
                    </Link>
                    <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
                        <Bell className="h-4 w-4" />
                        <span className="sr-only">Toggle notifications</span>
                    </Button>
                </div>
                <div className="flex-1 overflow-auto py-2">
                    <SidebarNav industry={industry} />
                </div>
                <div className="mt-auto p-4">
                    <div className="rounded-lg border bg-gradient-to-br from-indigo-50 to-purple-50 p-4 shadow-sm dark:from-indigo-950/50 dark:to-purple-950/50">
                        <div className="mb-2 flex items-center gap-2">
                            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 text-white">
                                <Zap className="h-4 w-4" />
                            </span>
                            <h4 className="font-semibold text-sm">Advanced Automation</h4>
                        </div>
                        <p className="mb-3 text-xs text-muted-foreground">
                            Unlock Bulk WhatsApp, Chatbots, and Email Automation.
                        </p>
                        <a href="https://api.wapiflow.site" target="_blank" rel="noopener noreferrer">
                            <Button size="sm" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white shadow-md">
                                Automate Your Business
                            </Button>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

