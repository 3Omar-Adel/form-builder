
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

import { useTheme } from "../../app/providers/theme/useTheme";
import { authStorage } from "../../auth/auth.storage";

const Header = () => {
    const { theme, toggleTheme } = useTheme();

    const user = authStorage.getUser();

    const handleLogout = () => {
        authStorage.removeToken();
        authStorage.removeUser();

        window.location.href = "/login";
    };

    const displayName = user?.name || "User";

    return (
        <header className="dashboard-header">
            <div className="header-left">
                <h1>Dashboard</h1>

                <p>
                    Welcome back{" "}
                    <strong>{displayName}</strong>
                </p>
            </div>

            <div className="header-right">
                <button
                    type="button"
                    className="theme-button"
                    onClick={toggleTheme}
                    aria-label={
                        theme === "light"
                            ? "Switch to dark mode"
                            : "Switch to light mode"
                    }
                >
                    {theme === "light" ? (
                        <DarkModeOutlinedIcon />
                    ) : (
                        <LightModeOutlinedIcon />
                    )}
                </button>

                <div className="header-user">
                    <AccountCircleOutlinedIcon className="user-icon" />

                    <div className="user-info">
                        <span className="user-name">
                            {displayName}
                        </span>

                        <span className="user-email">
                            {user?.email}
                        </span>
                    </div>
                </div>

                <button
                    type="button"
                    className="logout-button"
                    onClick={handleLogout}
                    aria-label="Logout"
                    title="Logout"
                >
                    <LogoutOutlinedIcon />
                </button>
            </div>
        </header>
    );
};

export default Header;