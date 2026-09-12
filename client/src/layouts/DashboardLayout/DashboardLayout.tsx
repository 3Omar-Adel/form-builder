import {
    useState,
} from "react";

import {
    Outlet,
} from "react-router-dom";

import Sidebar from "./Sidebar";
import Header from "./Header";

import "./dashboard-layout.css";

const DashboardLayout = () => {

    const [
        isSidebarOpen,
        setIsSidebarOpen,
    ] = useState(false);

    const handleOpenSidebar = () => {
        setIsSidebarOpen(true);
    };

    const handleCloseSidebar = () => {
        setIsSidebarOpen(false);
    };

    return (
        <div className="dashboard-layout">

            <Sidebar
                isOpen={isSidebarOpen}
                onClose={handleCloseSidebar}
            />

            <div className="dashboard-main">

                <Header
                    onMenuClick={handleOpenSidebar}
                />

                <main className="dashboard-content">
                    <Outlet />
                </main>

            </div>

        </div>
    );
};

export default DashboardLayout;