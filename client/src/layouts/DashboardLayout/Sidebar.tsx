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

import {
    useDispatch,
} from "react-redux";

import type {
    AppDispatch,
} from "../../redux/store";

import {
    logout,
} from "../../redux/authSlice";

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

const Sidebar = ({
    isOpen,
    onClose,
}: SidebarProps) => {

    const navigate =
        useNavigate();

    const dispatch =
        useDispatch<AppDispatch>();

    const handleLogout = () => {
        dispatch(logout());

        navigate("/login", {
            replace: true,
        });
    };

    return (
        <>
            <div
                className={`sidebar-overlay ${
                    isOpen ? "show" : ""
                }`}
                onClick={onClose}
            />

            <aside
                className={`sidebar ${
                    isOpen ? "open" : ""
                }`}
            >

                <div className="sidebar-brand">

                    <div className="sidebar-logo">
                        F
                    </div>

                    <div className="sidebar-brand-text">
                        <span className="sidebar-brand-name">
                            Form Builder
                        </span>
                    </div>

                    <button
                        type="button"
                        className="sidebar-close-button"
                        onClick={onClose}
                        aria-label="Close menu"
                    >
                        <CloseOutlined />
                    </button>

                </div>

                <nav className="sidebar-nav">

                    <NavLink
                        to="/"
                        className="sidebar-link"
                        onClick={onClose}
                    >
                        <HomeOutlined className="sidebar-icon" />

                        <span>
                            Home
                        </span>
                    </NavLink>

                    <NavLink
                        to="/dashboard"
                        className="sidebar-link"
                        onClick={onClose}
                    >
                        <DashboardOutlined className="sidebar-icon" />

                        <span>
                            Dashboard
                        </span>
                    </NavLink>

                    <NavLink
                        to="/forms"
                        className="sidebar-link"
                        onClick={onClose}
                    >
                        <DescriptionOutlined className="sidebar-icon" />

                        <span>
                            Forms
                        </span>
                    </NavLink>

                    <NavLink
                        to="/forms/new"
                        className="sidebar-link"
                        onClick={onClose}
                    >
                        <AddBoxOutlined className="sidebar-icon" />

                        <span>
                            Create Form
                        </span>
                    </NavLink>

                    <NavLink
                        to="/templates"
                        className="sidebar-link"
                        onClick={onClose}
                    >
                        <FolderOpenOutlined className="sidebar-icon" />

                        <span>
                            Templates
                        </span>
                    </NavLink>

                    <NavLink
                        to="/settings"
                        className="sidebar-link"
                        onClick={onClose}
                    >
                        <SettingsOutlined className="sidebar-icon" />

                        <span>
                            Settings
                        </span>
                    </NavLink>

                </nav>

                <div className="sidebar-footer">

                    <button
                        type="button"
                        className="logout-button"
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