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
import FormDetails from "../../pages/Forms/FormDetails/FormDetails";
import PublicForm from "../../pages/PublicForm/PublicForm";
import Templates from "../../pages/Templates/Templates";

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
                    path: "/templates",
                    element: <Templates />,
                    },
                    {
                        path: "/forms/new",
                        element: <CreateForm />,
                    },
                    {
    path: "/forms/:id/edit",
    element: <CreateForm />,
},
                    {
                        path: "/forms/:id",
                        element: <FormDetails />,
                    },
                ],
            },
        ],
    },
    {
    path: "/forms/public/:slug",
    element: <PublicForm />,
},
    {
        path: "*",
        element: <Navigate to="/" replace />,
    },
]);