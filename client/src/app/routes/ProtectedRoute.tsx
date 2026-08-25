import { Navigate, Outlet } from "react-router-dom";

import { authStorage } from "../../auth/auth.storage";

const ProtectedRoute = () => {
    const token = authStorage.getToken();

    if (!token) {
        return (
            <Navigate
                to="/login"
                replace
            />
        );
    }

    return <Outlet />;
};

export default ProtectedRoute;