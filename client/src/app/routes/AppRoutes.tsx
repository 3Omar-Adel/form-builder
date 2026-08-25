import { RouterProvider } from "react-router-dom";
import { router } from "./routeConfig";

const AppRoutes = () => {
    return <RouterProvider router={router} />;
};

export default AppRoutes;