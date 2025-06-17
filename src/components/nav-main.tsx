import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import type { ElementType } from "react"
import { Link, useLocation } from "react-router"

export function NavMain({
    items,
}: {
    items: {
        title: string
        url: string
        icon?: ElementType
    }[]
}) {
    const location = useLocation()
    
    return (
        <SidebarGroup>
            <SidebarGroupContent className="flex flex-col gap-2">
                <SidebarMenu>
                    {items.map((item) => (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton tooltip={item.title} asChild>
                                <Link to={"/dashboard"+item.url} viewTransition className={`${location.pathname === "/dashboard"+item.url && "!bg-primary !text-secondary"}`}>
                                    {item.icon && <item.icon />}
                                    <span>{item.title}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    )
}
