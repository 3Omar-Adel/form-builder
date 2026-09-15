import "./Navbar.css";

import {
    Add,
    Dashboard,
    DarkMode,
    LightMode,
    Menu,
    Close,
} from "@mui/icons-material";

import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import type { RootState } from "../../../../redux/store";

import { useTheme } from "../../../../app/providers/theme/useTheme";

const Navbar = () => {
    const { theme, toggleTheme } = useTheme();

    const [menuOpen, setMenuOpen] = useState(false);

    const isAuthenticated = useSelector(
        (state: RootState) => state.auth.isAuthenticated
    );

    const closeMenu = () => {
        setMenuOpen(false);
    };

    return (
        <header className="site-navbar">
            <div className="site-navbar-container">

                <Link
                    to="/"
                    className="site-navbar-logo"
                    onClick={closeMenu}
                >
                    <div className="site-navbar-brand">
                        <div className="site-navbar-logo-mark">
                            F
                        </div>

                        <span className="site-navbar-brand-name">
                            Form Builder
                        </span>
                    </div>
                </Link>

                <nav
                    className={`site-navbar-links ${
                        menuOpen ? "site-navbar-links-open" : ""
                    }`}
                >
                    <a href="#features" onClick={closeMenu}>
                        Features
                    </a>

                    <Link to="/templates" onClick={closeMenu}>
                        Templates
                    </Link>

                    <a href="#about" onClick={closeMenu}>
                        About
                    </a>

                    <div className="site-navbar-mobile-auth">
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
                                    className="site-navbar-mobile-primary"
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
                                    className="site-navbar-mobile-primary"
                                    onClick={closeMenu}
                                >
                                    Get started
                                </Link>
                            </>
                        )}
                    </div>
                </nav>

                <div className="site-navbar-actions">

                    <button
                        type="button"
                        className="site-navbar-theme-button"
                        onClick={toggleTheme}
                        aria-label={`Switch to ${
                            theme === "light" ? "dark" : "light"
                        } mode`}
                        title={`Switch to ${
                            theme === "light" ? "dark" : "light"
                        } mode`}
                    >
                        {theme === "light" ? (
                            <DarkMode />
                        ) : (
                            <LightMode />
                        )}
                    </button>

                    {isAuthenticated ? (
                        <>
                            <Link
                                to="/dashboard"
                                className="site-navbar-dashboard-button"
                            >
                                <Dashboard />

                                <span>
                                    Dashboard
                                </span>
                            </Link>

                            <Link
                                to="/forms/new"
                                className="site-navbar-create-button"
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
                                className="site-navbar-login-button"
                            >
                                Log in
                            </Link>

                            <Link
                                to="/register"
                                className="site-navbar-start-button"
                            >
                                Get started
                            </Link>
                        </>
                    )}

                    <button
                        type="button"
                        className="site-navbar-menu-button"
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label="Toggle menu"
                    >
                        {menuOpen ? <Close /> : <Menu />}
                    </button>

                </div>

            </div>
        </header>
    );
};

export default Navbar;
