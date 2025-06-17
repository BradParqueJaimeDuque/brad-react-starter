import { AppSidebar } from "@/components/app-sidebar";
import Loader from "@/components/Loader";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useAuth } from "@/contexts/AuthContext";
import { Suspense } from "react";
import { Outlet, useNavigate } from "react-router";

export default function DashboardLayout() {
    const {loading, data} = useAuth()
    const navigate = useNavigate()
    
    if(loading && !data){
        return <div className="flex items-center justify-center fixed inset-0"><Loader /></div>
    }

    if(!data){
        navigate("/", {viewTransition: true})
    }

    return (
        <div>
            <SidebarProvider
                style={
                    {
                        "--sidebar-width": "calc(var(--spacing) * 72)",
                        "--header-height": "calc(var(--spacing) * 12)",
                    } as React.CSSProperties
                }
            >
                <AppSidebar variant="inset" />
                <SidebarInset>
                    <SiteHeader />
                    <Suspense fallback={<div className="flex items-center justify-center inset-0 h-full"><Loader /></div>}>
                        <Outlet />
                    </Suspense>
                </SidebarInset>
            </SidebarProvider>
        </div>
    )
}
