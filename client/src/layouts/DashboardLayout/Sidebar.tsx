import "./Sidebar.css";

import {
    NavLink,
    useNavigate,
} from "react-router-dom";

import {
    HomeOutlined,
    DashboardOutlined,
    DescriptionOutlined,
    AddBoxOutlined,
    FolderOpenOutlined,
    SettingsOutlined,
    LogoutOutlined,
    CloseOutlined,
} from "@mui/icons-material";

import { useDispatch } from "react-redux";

import type { AppDispatch } from "../../redux/store";

import { logout } from "../../redux/authSlice";

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
    const navigate = useNavigate();

    const dispatch = useDispatch<AppDispatch>();

    const handleLogout = () => {
        dispatch(logout());

        navigate("/login", {
            replace: true,
        });
    };

    return (
        <>
            <div
                className={`dashboard-sidebar-overlay ${
                    isOpen ? "dashboard-sidebar-overlay-visible" : ""
                }`}
                onClick={onClose}
            />

            <aside
                className={`dashboard-sidebar ${
                    isOpen ? "dashboard-sidebar-open" : ""
                }`}
            >
                <div className="dashboard-sidebar-brand">
                    <div className="dashboard-sidebar-logo">
                        F
                    </div>

                    <div className="dashboard-sidebar-brand-text">
                        <span className="dashboard-sidebar-brand-name">
                            Form Builder
                        </span>
                    </div>

                    <button
                        type="button"
                        className="dashboard-sidebar-close"
                        onClick={onClose}
                        aria-label="Close menu"
                    >
                        <CloseOutlined />
                    </button>
                </div>

                <nav className="dashboard-sidebar-nav">
                    <NavLink
                        to="/"
                        className="dashboard-sidebar-link"
                        onClick={onClose}
                    >
                        <HomeOutlined className="dashboard-sidebar-icon" />

                        <span>
                            Home
                        </span>
                    </NavLink>

                    <NavLink
                        to="/dashboard"
                        className="dashboard-sidebar-link"
                        onClick={onClose}
                    >
                        <DashboardOutlined className="dashboard-sidebar-icon" />

                        <span>
                            Dashboard
                        </span>
                    </NavLink>

                    <NavLink
                        to="/forms"
                        className="dashboard-sidebar-link"
                        onClick={onClose}
                    >
                        <DescriptionOutlined className="dashboard-sidebar-icon" />

                        <span>
                            Forms
                        </span>
                    </NavLink>

                    <NavLink
                        to="/forms/new"
                        className="dashboard-sidebar-link"
                        onClick={onClose}
                    >
                        <AddBoxOutlined className="dashboard-sidebar-icon" />

                        <span>
                            Create Form
                        </span>
                    </NavLink>

                    <NavLink
                        to="/templates"
                        className="dashboard-sidebar-link"
                        onClick={onClose}
                    >
                        <FolderOpenOutlined className="dashboard-sidebar-icon" />

                        <span>
                            Templates
                        </span>
                    </NavLink>

                    <NavLink
                        to="/settings"
                        className="dashboard-sidebar-link"
                        onClick={onClose}
                    >
                        <SettingsOutlined className="dashboard-sidebar-icon" />

                        <span>
                            Settings
                        </span>
                    </NavLink>
                </nav>

                <div className="dashboard-sidebar-footer">
                    <button
                        type="button"
                        className="dashboard-sidebar-logout"
                        onClick={handleLogout}
                    >
                        <LogoutOutlined />

                        <span>
                            Logout
                        </span>
                    </button>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;
