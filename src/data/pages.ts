import { Layers, LayoutDashboard, Microchip, Settings, ShieldCheck, SlidersVertical, Users } from "lucide-react";

export const navMain = [
    {
        title: "Dashboard",
        url: "/",
        icon: LayoutDashboard,
    },
    {
        title: "React Starter",
        url: "/example",
        icon: Users,
    },
]

export const navAdmin = [
    {
        title: "Usuarios",
        url: "/users",
        icon: Users,
    },
    {
        title: "Perfiles",
        url: "/profiles",
        icon: ShieldCheck,
    },
    {
        title: "Páginas",
        url: "/pages",
        icon: Layers,
    },
    {
        title: "Dominios",
        url: "/domains",
        icon: Microchip,
    },
    {
        title: "Valores",
        url: "/worths",
        icon: SlidersVertical,
    },
]

export const navSecondary = [
    {
        title: "Settings",
        url: "/settings",
        icon: Settings,
    },
]