import { Navigate, Outlet } from "react-router-dom";

import { authStorage } from "../../auth/auth.storage";

const GuestRoute = () => {
    const token = authStorage.getToken();

    if (token) {
        return <Navigate to="/dashboard" replace />;
    }

    return <Outlet />;
};

export default GuestRoute;