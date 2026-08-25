import { NavLink, useNavigate } from "react-router-dom";

import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

import { authStorage } from "../../auth/auth.storage";

const Sidebar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        authStorage.removeToken();

        navigate("/login", {
            replace: true,
        });
    };

    return (
        <aside className="sidebar">
            <div className="sidebar-brand">
                <div className="sidebar-logo">
                    F
                </div>

                <span>Form Builder</span>
            </div>

            <nav className="sidebar-nav">
                <NavLink
                    to="/dashboard"
                    className="sidebar-link"
                >
                    <span className="sidebar-icon">
                        ◼
                    </span>

                    <span>Dashboard</span>
                </NavLink>

                <NavLink
                    to="/forms"
                    className="sidebar-link"
                >
                    <span className="sidebar-icon">
                        ▤
                    </span>

                    <span>Forms</span>
                </NavLink>
                

                <NavLink 
                to="/forms/new"
                className="sidebar-link"
                >
                    <span className="sidebar-icon">
                        ▤
                    </span>

                    <span>Create Forms</span>
                </NavLink>

                <NavLink
                    to="/templates"
                    className="sidebar-link"
                >
                    <span className="sidebar-icon">
                        ◫
                    </span>

                    <span>Templates</span>
                </NavLink>

                <NavLink
                    to="/settings"
                    className="sidebar-link"
                >
                    <span className="sidebar-icon">
                        ⚙
                    </span>

                    <span>Settings</span>
                </NavLink>
            </nav>

            <div className="sidebar-footer">
                <button
                    type="button"
                    className="logout-button"
                    onClick={handleLogout}
                >
                    <LogoutOutlinedIcon />

                    <span>Logout</span>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;