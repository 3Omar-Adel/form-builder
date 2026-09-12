import {
    GitHub,
    LinkedIn,
    ArrowUpward,
} from "@mui/icons-material";

import {Link,useNavigate, } from "react-router-dom";
import {useDispatch,useSelector,} from "react-redux";
import type {AppDispatch,RootState,} from "../../../../redux/store";
import {logout,} from "../../../../redux/authSlice";

import "./Footer.css";

const Footer = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const isAuthenticated = useSelector(
        (state: RootState) =>
            state.auth.isAuthenticated
    );

    const handleLogout = () => {
        dispatch(logout());

        navigate("/");
    };

    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-main">
                    <div className="footer-brand">
                        <Link
                            to="/"
                            className="footer-logo"
                        >
                            <span className="footer-logo-icon">
                                ✓
                            </span>
                            Formly
                        </Link>
                        <p>
                            Simple forms.
                            <br />
                            Powerful results.
                        </p>
                    </div>
                    <div className="footer-column">
                        <span className="footer-column-title">
                            Product
                        </span>
                        <a href="#features">
                            Features
                        </a>
                        {isAuthenticated ? (
                            <Link to="/dashboard">
                                Dashboard
                            </Link>
                        ) : (
                            <Link to="/register">
                                Get started
                            </Link>
                        )}

                        {isAuthenticated ? (
                            <button
                                type="button"
                                className="footer-logout"
                                onClick={handleLogout}
                            >
                                Log out
                            </button>
                        ) : (
                            <Link to="/login">
                                Log in
                            </Link>
                        )}
                    </div>
                    <div className="footer-column">
                        <span className="footer-column-title">
                            Connect
                        </span>
                        <a
                            href="https://github.com/3Omar-Adel"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            GitHub
                        </a>
                        <a
                            href="https://www.linkedin.com/in/omar-maklad-165b192a9"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            LinkedIn
                        </a>
                    </div>
                </div>
                <div className="footer-divider" />
                <div className="footer-bottom">
                    <span>
                        © 2026 Formly. All rights reserved.
                    </span>
                    <div className="footer-socials">

                        <a
                            href="https://github.com/3Omar-Adel"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="GitHub"
                            title="GitHub"
                        >
                            <GitHub />
                        </a>

                        <a
                            href="https://www.linkedin.com/in/omar-maklad-165b192a9"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="LinkedIn"
                            title="LinkedIn"
                        >
                            <LinkedIn />
                        </a>

                        <a
                            href="#top"
                            className="footer-top"
                            aria-label="Back to top"
                            title="Back to top"
                        >
                            <ArrowUpward />
                        </a>
                    </div>
                    <span className="footer-built">
                        Built with React & TypeScript
                    </span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;