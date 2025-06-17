'use client'

import { NavAdmin } from "@/components/nav-admin"
import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useAuth } from "@/contexts/AuthContext"
import { navAdmin, navMain, navSecondary } from "@/data/pages"
import { Link } from "react-router"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const {data} = useAuth()

    const navAdminFilter = navAdmin.filter(item =>
        data?.permissions?.some(permission => permission.href === item.url)
    )
    
    return (
        <Sidebar collapsible="offcanvas" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            asChild
                            className="data-[slot=sidebar-menu-button]:!p-1.5"
                        >
                            <Link to="/dashboard" viewTransition>
                                <img src="/img/LOGO_FPJD.png" alt="Logo Parque Jaime Duque" className="size-7" />
                                <span className="text-base font-semibold">React Starter kit</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={navMain} />
                {navAdminFilter.length > 0 && (
                    <NavAdmin items={navAdminFilter} />
                )}
                <NavSecondary items={navSecondary} className="mt-auto" />
            </SidebarContent>
            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    )
}
