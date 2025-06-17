import { createBrowserRouter } from "react-router";
import { lazy } from "react";
import RootLayout from "./layouts/RootLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import NotFound from "./pages/(errors)/NotFound";

// AUTH
const Login = lazy(() => import("./pages/(auth)/Login"))

// DASHBOARD
const Home = lazy(() => import("./pages/(dashboard)/home/Home"))
const Example = lazy(() => import("./pages/(dashboard)/example"))
const Settings = lazy(() => import("./pages/(dashboard)/settings"))

const router = createBrowserRouter([
    {
        path: "/",
        errorElement: <NotFound />,
        element: <RootLayout />,
        children: [
            {
                index: true,
                element: <Login />
            }
        ]
    },
    {
        path: "/dashboard",
        errorElement: <NotFound />,
        element: <DashboardLayout />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: "example",
                element: <Example />
            },

            {
                path: "settings",
                element: <Settings />
            },
        ]
    },

    {
        path: "*",
        element: <NotFound />,
    }
])

export default router