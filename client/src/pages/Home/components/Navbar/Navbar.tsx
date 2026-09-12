import {
    Add,
    Dashboard,
    DarkMode,
    LightMode,
    Menu,
    Close,
} from "@mui/icons-material";
import {
    useState,
} from "react";

import {
    Link,
} from "react-router-dom";

import {
    useSelector,
} from "react-redux";

import type {
    RootState,
} from "../../../../redux/store";

import {
    useTheme,
} from "../../../../app/providers/theme/useTheme";

import "./Navbar.css";

const Navbar = () => {
    const {
        theme,
        toggleTheme,
    } = useTheme();

    const [
        menuOpen,
        setMenuOpen,
    ] = useState(false);

    const isAuthenticated = useSelector(
        (state: RootState) =>
            state.auth.isAuthenticated
    );

    const closeMenu = () => {
        setMenuOpen(false);
    };

    return (
        <header className="navbar">
            <div className="navbar-container">

                <Link
                    to="/"
                    className="navbar-logo"
                    onClick={closeMenu}
                >
                    <div className="sidebar-brand">

                        <div className="sidebar-logo">
                            F
                        </div>

                        <span>
                            Form Builder
                        </span>

                    </div>
                </Link>


                {/* =========================
                    DESKTOP NAVIGATION
                ========================= */}

                <nav
                    className={`navbar-links ${menuOpen
                            ? "navbar-links-open"
                            : ""
                        }`}
                >

                    <a
                        href="#features"
                        onClick={closeMenu}
                    >
                        Features
                    </a>

                    <Link
                        to="/templates"
                        onClick={closeMenu}
                    >
                        Templates
                    </Link>

                    <a
                        href="#about"
                        onClick={closeMenu}
                    >
                        About
                    </a>


                    {/* Mobile Auth */}

                    <div className="mobile-auth">

                        {isAuthenticated ? (
                            <>
                                <Link
                                    to="/dashboard"
                                    onClick={closeMenu}
                                >
                                    <Dashboard />
                                    Dashboard
                                </Link>

                                <Link
                                    to="/forms/new"
                                    className="navbar-mobile-button"
                                    onClick={closeMenu}
                                >
                                    <Add />
                                    Create form
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    onClick={closeMenu}
                                >
                                    Log in
                                </Link>

                                <Link
                                    to="/register"
                                    className="navbar-mobile-button"
                                    onClick={closeMenu}
                                >
                                    Get started
                                </Link>
                            </>
                        )}

                    </div>

                </nav>


                {/* =========================
                    ACTIONS
                ========================= */}

                <div className="navbar-actions">


                    {/* Theme */}

                    <button
                        type="button"
                        className="theme-toggle"
                        onClick={toggleTheme}
                        aria-label={`Switch to ${theme === "light"
                                ? "dark"
                                : "light"
                            } mode`}
                        title={`Switch to ${theme === "light"
                                ? "dark"
                                : "light"
                            } mode`}
                    >
                        {theme === "light" ? (
                            <DarkMode />
                        ) : (
                            <LightMode />
                        )}
                    </button>


                    {/* Desktop Auth */}

                    {isAuthenticated ? (
                        <>
                            <Link
                                to="/dashboard"
                                className="dashboard-button"
                            >
                                <Dashboard />

                                <span>
                                    Dashboard
                                </span>
                            </Link>

                            <Link
                                to="/forms/new"
                                className="create-form-button"
                            >
                                <Add />

                                <span>
                                    Create form
                                </span>
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link
                                to="/login"
                                className="login-button"
                            >
                                Log in
                            </Link>

                            <Link
                                to="/register"
                                className="get-started-button"
                            >
                                Get started
                            </Link>
                        </>
                    )}


                    {/* Mobile Menu */}

                    <button
                        type="button"
                        className="menu-button"
                        onClick={() =>
                            setMenuOpen(!menuOpen)
                        }
                        aria-label="Toggle menu"
                    >
                        {menuOpen ? (
                            <Close />
                        ) : (
                            <Menu />
                        )}
                    </button>

                </div>

            </div>
        </header>
    );
};

export default Navbar;