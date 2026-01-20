import Link from "next/link"
import { MessageSquare, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getTenantName } from "@/app/actions"
import { SidebarNav } from "./sidebar-nav"

export async function Sidebar() {
    const tenantName = await getTenantName()

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
                    <SidebarNav />
                </div>
                <div className="mt-auto p-4">
                    {/* Bottom content if any */}
                </div>
            </div>
        </div>
    )
}

