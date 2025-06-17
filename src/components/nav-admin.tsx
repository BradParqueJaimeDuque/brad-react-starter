'use client'

import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import type { ElementType } from "react"
import { Link, useLocation } from "react-router"

export function NavAdmin({
    items,
}: {
    items: {
        title: string
        url: string
        icon: ElementType
    }[]
}) {
    const location = useLocation()
    return (
        <SidebarGroup className="group-data-[collapsible=icon]:hidden">
            <SidebarGroupLabel>Administración</SidebarGroupLabel>
            <SidebarMenu>
                {items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton asChild>
                            <Link to={"/dashboard"+item.url} viewTransition className={`${location.pathname === "/dashboard"+item.url && "!bg-primary !text-secondary"}`}>
                                <item.icon />
                                <span>{item.title}</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    )
}
