"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Building2, Calendar, ClipboardList, CreditCard, GraduationCap, Home, LayoutDashboard, MessageSquare, Stethoscope, Users, Zap, ShieldAlert } from "lucide-react"
import { cn } from "@/lib/utils"

export function SidebarNav({ industry, role }: { industry?: string, role?: string }) {
    const pathname = usePathname()

    return (
        <nav className="grid items-start px-2 text-sm font-medium lg:px-4 space-y-1">
            {role === 'SUPER_ADMIN' ? (
                <NavItem pathname={pathname} href="/dashboard/admin" icon={ShieldAlert}>Admin Console</NavItem>
            ) : (
                <>
                    <NavItem pathname={pathname} href="/dashboard" icon={LayoutDashboard}>Overview</NavItem>
                    <NavItem pathname={pathname} href="/dashboard/automation" icon={Zap}>Automation</NavItem>
                    <NavItem pathname={pathname} href="/dashboard/whatsapp" icon={MessageSquare}>WhatsApp</NavItem>
                    <NavItem pathname={pathname} href="/dashboard/billing" icon={CreditCard}>Billing & Plans</NavItem>
                </>
            )}

            {industry === "EDUCATION" && (
                <>
                    <SectionHeader>Education</SectionHeader>
                    <NavItem pathname={pathname} href="/dashboard/education" icon={GraduationCap}>Dashboard</NavItem>
                    <NavItem pathname={pathname} href="/dashboard/education/students" icon={Users}>Students</NavItem>
                    <NavItem pathname={pathname} href="/dashboard/education/admissions" icon={ClipboardList}>Admissions</NavItem>
                    <NavItem pathname={pathname} href="/dashboard/education/fees" icon={CreditCard}>Fees & Payments</NavItem>
                </>
            )}

            {industry === "REAL_ESTATE" && (
                <>
                    <SectionHeader>Real Estate</SectionHeader>
                    <NavItem pathname={pathname} href="/dashboard/real-estate" icon={Building2}>Dashboard</NavItem>
                    <NavItem pathname={pathname} href="/dashboard/real-estate/leads" icon={Users}>Leads</NavItem>
                    <NavItem pathname={pathname} href="/dashboard/real-estate/properties" icon={Home}>Properties</NavItem>
                    <NavItem pathname={pathname} href="/dashboard/real-estate/site-visits" icon={Calendar}>Site Visits</NavItem>
                </>
            )}

            {industry === "HEALTHCARE" && (
                <>
                    <SectionHeader>Healthcare</SectionHeader>
                    <NavItem pathname={pathname} href="/dashboard/healthcare" icon={Stethoscope}>Dashboard</NavItem>
                    <NavItem pathname={pathname} href="/dashboard/healthcare/appointments" icon={Calendar}>Appointments</NavItem>
                    <NavItem pathname={pathname} href="/dashboard/healthcare/patients" icon={Users}>Patients</NavItem>
                </>
            )}
        </nav>
    )
}

function NavItem({ pathname, href, icon: Icon, children }: { pathname: string | null, href: string, icon: React.ElementType, children: React.ReactNode }) {
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
