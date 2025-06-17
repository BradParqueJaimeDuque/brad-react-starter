
import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import type { ElementType } from "react"
import { Link, useLocation } from "react-router"

export function NavSecondary({
    items,
    ...props
}: {
    items: {
        title: string
        url: string
        icon: ElementType
    }[]
} & React.ComponentPropsWithoutRef<typeof SidebarGroup>) {
    const location = useLocation()
    return (
        <SidebarGroup {...props}>
            <SidebarGroupContent>
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
            </SidebarGroupContent>
        </SidebarGroup>
    )
}
