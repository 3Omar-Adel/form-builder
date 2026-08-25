import { createBrowserRouter, Navigate } from "react-router-dom";
import Home from "../../pages/Home/Home";
import Login from "../../pages/Login/Login";
import Register from "../../pages/Register/Register";
import GuestRoute from "./GuestRoute";
import Dashboard from "../../pages/Dashboard/Dashboard";
import DashboardLayout from "../../layouts/DashboardLayout/DashboardLayout";
import ProtectedRoute from "./ProtectedRoute";
import Forms from "../../pages/Forms/Forms";
import CreateForm from "../../pages/CreateForm/CreateForm";

export const router = createBrowserRouter([
    { path: "/", element: <Home />, },
    {
        element: <GuestRoute />,
        children: [
            { path: "/login", element: <Login />, },
            { path: "/register", element: <Register />, },
        ],
    },
    {
        element: <ProtectedRoute />,
        children: [
            {
                element: <DashboardLayout />,
                children: [
                    {
                        path: "/dashboard",
                        element: <Dashboard />,
                    },
                    {
                        path: "/forms",
                        element: <Forms />,
                    },
                    {
                        path: "/forms/new",
                        element: <CreateForm />,
                    },

                ],
            },
        ],
    },
    {
        path: "*",
        element: <Navigate to="/" replace />,
    },
]);