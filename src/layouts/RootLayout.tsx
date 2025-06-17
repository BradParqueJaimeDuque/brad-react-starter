import Loader from "@/components/Loader";
import { useAuth } from "@/contexts/AuthContext";
import { Suspense } from "react";
import { Outlet, useNavigate } from "react-router";

export default function RootLayout() {
    const {loading, data} = useAuth()
    const navigate = useNavigate()

    console.log(data, loading);
    if(loading && !data){
        return <div className="flex items-center justify-center fixed inset-0"><Loader /></div>
    }

    if(data){
        navigate("/dashboard", {viewTransition: true})
    }

    return (
        <div>
            <Suspense fallback={<div className="flex items-center justify-center fixed inset-0"><Loader /></div>}>
                <Outlet />
            </Suspense>
        </div>
    )
}
