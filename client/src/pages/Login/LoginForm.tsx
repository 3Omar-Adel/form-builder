import { useState, type SubmitEvent } from "react";
import { useNavigate } from "react-router-dom";
import {
    useDispatch,
    useSelector,
} from "react-redux";

import type {
    AppDispatch,
    RootState,
} from "../../redux/store";
import {
    loginUser,
} from "../../redux/authSlice";

const LoginForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const isLoading = useSelector(
        (state: RootState) =>
            state.auth.isLoading
    );

    const error = useSelector(
        (state: RootState) =>
            state.auth.error
    );

    const handleSubmit = async (
        event: SubmitEvent<HTMLFormElement>,
    ) => {
        event.preventDefault();

        try {
            await dispatch(
                loginUser({
                    email,
                    password,
                })
            ).unwrap();

            navigate("/home", {
                replace: true,
            });
        } catch (error) {
            console.error(
                "Login failed:",
                error,
            );
        }
    };

    return (
        <section className="auth-card">
            <div className="auth-header">
                <h2>Welcome back</h2>

                <p>
                    Sign in to continue to your Form Builder
                    account.
                </p>
            </div>

            {error && (
                <div className="auth-error" role="alert">
                    {error}
                </div>
            )}

            <form
                onSubmit={handleSubmit}
                className="auth-form"
            >
                <div className="form-group">
                    <label htmlFor="email">
                        Email address
                    </label>

                    <input
                        id="email"
                        name="email"
                        type="email"
                        value={email}
                        onChange={(event) =>
                            setEmail(event.target.value)
                        }
                        placeholder="you@example.com"
                        autoComplete="email"
                        required
                    />
                </div>

                <div className="form-group">
                    <div className="form-label-row">
                        <label htmlFor="password">
                            Password
                        </label>

                        <a href="/forgot-password">
                            Forgot password?
                        </a>
                    </div>

                    <div className="password-input">
                        <input
                            id="password"
                            name="password"
                            type={
                                showPassword
                                    ? "text"
                                    : "password"
                            }
                            value={password}
                            onChange={(event) =>
                                setPassword(
                                    event.target.value,
                                )
                            }
                            placeholder="Enter your password"
                            autoComplete="current-password"
                            required
                        />

                        <button
                            type="button"
                            className="password-toggle"
                            onClick={() =>
                                setShowPassword(
                                    (current) => !current,
                                )
                            }
                        >
                            {showPassword
                                ? "Hide"
                                : "Show"}
                        </button>
                    </div>
                </div>

                <label className="remember-me">
                    <input type="checkbox" />
                    <span>Remember me</span>
                </label>

                <button
                    type="submit"
                    className="auth-submit"
                    disabled={isLoading}
                >
                    {isLoading
                        ? "Signing in..."
                        : "Sign in"}
                </button>
            </form>

            <div className="auth-divider">
                <span>or continue with</span>
            </div>

            <button
                type="button"
                className="social-login"
            >
                Continue with Google
            </button>

            <p className="auth-switch">
                Don't have an account?{" "}
                <a href="/register">
                    Create an account
                </a>
            </p>
        </section>
    );
};

export default LoginForm;