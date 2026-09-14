import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import {
    Lock,
    Save,
} from "@mui/icons-material";

import {
    updateProfileUser,
} from "../../../../redux/authSlice";

import type {
    AppDispatch,
    RootState,
} from "../../../../redux/store";

import "./PasswordSection.css";


const PasswordSection = () => {
    const user = useSelector(
        (state: RootState) => state.auth.user
    );
    const dispatch = useDispatch<AppDispatch>();

    const isLoading = useSelector(
        (state: RootState) => state.auth.isLoading
    );

    const error = useSelector(
        (state: RootState) => state.auth.error
    );

    const [
        currentPassword,
        setCurrentPassword,
    ] = useState("");

    const [
        newPassword,
        setNewPassword,
    ] = useState("");

    const [
        confirmPassword,
        setConfirmPassword,
    ] = useState("");

    const [
        localError,
        setLocalError,
    ] = useState<string | null>(null);

    const [success, setSuccess] =
        useState(false);

    const handleSubmit = async (
        event: React.FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        setLocalError(null);
        setSuccess(false);

        if (!currentPassword) {
            setLocalError(
                "Current password is required."
            );

            return;
        }

        if (newPassword.length < 8) {
            setLocalError(
                "New password must be at least 8 characters."
            );

            return;
        }

        if (newPassword !== confirmPassword) {
            setLocalError(
                "New passwords do not match."
            );

            return;
        }

        const result = await dispatch(
            updateProfileUser({
                name: user?.name ?? "",
                email: user?.email ?? "",
                currentPassword,
                newPassword,
            })
        );

        if (
            updateProfileUser.fulfilled.match(
                result
            )
        ) {
            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");

            setSuccess(true);
        }
    };

    return (
        <section className="settings-card">

            <div className="settings-card-header">

                <div>
                    <h2>Password</h2>

                    <p>
                        Change your account password.
                    </p>
                </div>

                <div className="settings-section-icon">
                    <Lock />
                </div>

            </div>

            <form
                className="settings-form"
                onSubmit={handleSubmit}
            >

                <div className="settings-form-grid">

                    <div className="settings-field">

                        <label htmlFor="current-password">
                            Current password
                        </label>

                        <input
                            id="current-password"
                            type="password"
                            value={currentPassword}
                            onChange={(event) =>
                                setCurrentPassword(
                                    event.target.value
                                )
                            }
                            placeholder="Enter current password"
                            disabled={isLoading}
                        />

                    </div>

                    <div />

                    <div className="settings-field">

                        <label htmlFor="new-password">
                            New password
                        </label>

                        <input
                            id="new-password"
                            type="password"
                            value={newPassword}
                            onChange={(event) =>
                                setNewPassword(
                                    event.target.value
                                )
                            }
                            placeholder="Enter new password"
                            disabled={isLoading}
                        />

                    </div>

                    <div className="settings-field">

                        <label htmlFor="confirm-password">
                            Confirm new password
                        </label>

                        <input
                            id="confirm-password"
                            type="password"
                            value={confirmPassword}
                            onChange={(event) =>
                                setConfirmPassword(
                                    event.target.value
                                )
                            }
                            placeholder="Confirm new password"
                            disabled={isLoading}
                        />

                    </div>

                </div>

                {(localError || error) && (
                    <p className="settings-message settings-message-error">
                        {localError || error}
                    </p>
                )}

                {success && (
                    <p className="settings-message settings-message-success">
                        Password updated successfully.
                    </p>
                )}

                <div className="settings-form-actions">

                    <button
                        type="submit"
                        className="settings-save-button"
                        disabled={
                            isLoading ||
                            !currentPassword ||
                            !newPassword ||
                            !confirmPassword
                        }
                    >
                        <Save />

                        {isLoading
                            ? "Updating..."
                            : "Update password"}
                    </button>

                </div>

            </form>

        </section>
    );
};

export default PasswordSection;