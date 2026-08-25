import { useState, type SubmitEvent } from "react";
import { useNavigate } from "react-router-dom";

import { authApi } from "../../api/auth.api";
import { authStorage } from "../../auth/auth.storage";

const RegisterForm = () => {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] =
        useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] =
        useState(false);

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (
        event: SubmitEvent<HTMLFormElement>,
    ) => {
        event.preventDefault();

        setError("");

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        setIsLoading(true);

        try {
            const response = await authApi.register({
                name,
                email,
                password,
            });

            authStorage.setToken(response.data.token);
            authStorage.setUser(response.data.user);

            navigate("/dashboard", { replace: true, });
        } catch (error) {
            console.error(
                "Registration failed:",
                error,
            );

            setError(
                "Registration failed. Please check your information and try again.",
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section className="register-card">
            <div className="register-header">
                <h2>Create your account</h2>

                <p>
                    Get started with Form Builder today.
                </p>
            </div>

            {error && (
                <div
                    className="register-error"
                    role="alert"
                >
                    {error}
                </div>
            )}

            <form
                className="register-form"
                onSubmit={handleSubmit}
            >
                <div className="register-form-group">
                    <label htmlFor="name">
                        Full name
                    </label>

                    <input
                        id="name"
                        name="name"
                        type="text"
                        value={name}
                        onChange={(event) =>
                            setName(event.target.value)
                        }
                        placeholder="Enter your full name"
                        autoComplete="name"
                        minLength={2}
                        maxLength={50}
                        required
                    />
                </div>
                <div className="register-form-group">
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

                <div className="register-form-group">
                    <label htmlFor="password">
                        Password
                    </label>

                    <div className="register-password-input">
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
                            placeholder="Create a password"
                            autoComplete="new-password"
                            minLength={8}
                            required
                        />

                        <button
                            type="button"
                            className="register-password-toggle"
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

                <div className="register-form-group">
                    <label htmlFor="confirmPassword">
                        Confirm password
                    </label>

                    <div className="register-password-input">
                        <input
                            id="confirmPassword"
                            name="confirmPassword"
                            type={
                                showConfirmPassword
                                    ? "text"
                                    : "password"
                            }
                            value={confirmPassword}
                            onChange={(event) =>
                                setConfirmPassword(
                                    event.target.value,
                                )
                            }
                            placeholder="Confirm your password"
                            autoComplete="new-password"
                            minLength={8}
                            required
                        />

                        <button
                            type="button"
                            className="register-password-toggle"
                            onClick={() =>
                                setShowConfirmPassword(
                                    (current) => !current,
                                )
                            }
                        >
                            {showConfirmPassword
                                ? "Hide"
                                : "Show"}
                        </button>
                    </div>
                </div>

                <label className="register-terms">
                    <input
                        type="checkbox"
                        required
                    />

                    <span>
                        I agree to the{" "}
                        <a href="/terms">
                            Terms of Service
                        </a>{" "}
                        and{" "}
                        <a href="/privacy">
                            Privacy Policy
                        </a>
                    </span>
                </label>

                <button
                    type="submit"
                    className="register-submit"
                    disabled={isLoading}
                >
                    {isLoading
                        ? "Creating account..."
                        : "Create account"}
                </button>
            </form>

            <p className="register-switch">
                Already have an account?{" "}
                <a href="/login">Sign in</a>
            </p>
        </section>
    );
};

export default RegisterForm;