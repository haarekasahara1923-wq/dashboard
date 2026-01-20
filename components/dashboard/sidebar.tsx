"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Building2, Calendar, ClipboardList, CreditCard, GraduationCap, Home, LayoutDashboard, MessageSquare, Stethoscope, Users, Zap } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export function Sidebar() {
    return (
        <div className="hidden border-r bg-gray-100/40 md:block dark:bg-gray-800/40 w-[240px] lg:w-[280px] shrink-0 h-screen sticky top-0">
            <div className="flex flex-col gap-2 h-full">
                <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                    <Link href="/" className="flex items-center gap-2 font-semibold">
                        <MessageSquare className="h-6 w-6 text-primary" />
                        <span className="">SaaSAuto</span>
                    </Link>
                    <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
                        <Bell className="h-4 w-4" />
                        <span className="sr-only">Toggle notifications</span>
                    </Button>
                </div>
                <div className="flex-1 overflow-auto py-2">
                    <nav className="grid items-start px-2 text-sm font-medium lg:px-4 space-y-1">
                        <NavItem href="/dashboard" icon={LayoutDashboard}>Overview</NavItem>
                        <NavItem href="/dashboard/automation" icon={Zap}>Automation</NavItem>
                        <NavItem href="/dashboard/whatsapp" icon={MessageSquare}>WhatsApp</NavItem>

                        <SectionHeader>Education</SectionHeader>
                        <NavItem href="/dashboard/education" icon={GraduationCap}>Dashboard</NavItem>
                        <NavItem href="/dashboard/education/students" icon={Users}>Students</NavItem>
                        <NavItem href="/dashboard/education/admissions" icon={ClipboardList}>Admissions</NavItem>
                        <NavItem href="/dashboard/education/fees" icon={CreditCard}>Fees & Payments</NavItem>

                        <SectionHeader>Real Estate</SectionHeader>
                        <NavItem href="/dashboard/real-estate" icon={Building2}>Dashboard</NavItem>
                        <NavItem href="/dashboard/real-estate/leads" icon={Users}>Leads</NavItem>
                        <NavItem href="/dashboard/real-estate/properties" icon={Home}>Properties</NavItem>
                        <NavItem href="/dashboard/real-estate/site-visits" icon={Calendar}>Site Visits</NavItem>

                        <SectionHeader>Healthcare</SectionHeader>
                        <NavItem href="/dashboard/healthcare" icon={Stethoscope}>Dashboard</NavItem>
                        <NavItem href="/dashboard/healthcare/appointments" icon={Calendar}>Appointments</NavItem>
                        <NavItem href="/dashboard/healthcare/patients" icon={Users}>Patients</NavItem>
                    </nav>
                </div>
                <div className="mt-auto p-4">
                    {/* Bottom content if any */}
                </div>
            </div>
        </div>
    )
}

function NavItem({ href, icon: Icon, children }: { href: string, icon: any, children: React.ReactNode }) {
    const pathname = usePathname()
    const isActive = pathname === href || pathname?.startsWith(href + "/")

    return (
        <Link
            href={href}
            className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary",
                isActive ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground"
            )}
        >
            <Icon className="h-4 w-4" />
            {children}
        </Link>
    )
}

function SectionHeader({ children }: { children: React.ReactNode }) {
    return (
        <h4 className="mb-1 mt-4 px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            {children}
        </h4>
    )
}

function Bell(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
            <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
        </svg>
    )
}
