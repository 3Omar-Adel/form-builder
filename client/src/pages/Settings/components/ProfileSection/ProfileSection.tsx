import {  useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import {
    Save,
} from "@mui/icons-material";

import {
    updateProfileUser,
} from "../../../../redux/authSlice";

import type {
    AppDispatch,
    RootState,
} from "../../../../redux/store";

import "./ProfileSection.css";


const ProfileSection = () => {
    const dispatch = useDispatch<AppDispatch>();

    const user = useSelector(
        (state: RootState) => state.auth.user
    );

    const isLoading = useSelector(
        (state: RootState) => state.auth.isLoading
    );

    const error = useSelector(
        (state: RootState) => state.auth.error
    );

    const [name, setName] = useState(
        user?.name ?? ""
    );

    const [email, setEmail] = useState(
        user?.email ?? ""
    );

    const [success, setSuccess] = useState(false);


    const handleSubmit = async (
        event: React.FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        setSuccess(false);

        const result = await dispatch(
            updateProfileUser({
                name,
                email,
            })
        );

        if (
            updateProfileUser.fulfilled.match(
                result
            )
        ) {
            setSuccess(true);
        }
    };

    return (
        <section className="settings-card">

            <div className="settings-card-header">

                <div>
                    <h2>Profile</h2>

                    <p>
                        Update your personal information.
                    </p>
                </div>

            </div>

            <form
                className="settings-form"
                onSubmit={handleSubmit}
            >

                <div className="settings-form-grid">

                    <div className="settings-field">

                        <label htmlFor="settings-name">
                            Name
                        </label>

                        <input
                            id="settings-name"
                            type="text"
                            value={name}
                            onChange={(event) =>
                                setName(
                                    event.target.value
                                )
                            }
                            placeholder="Your name"
                            disabled={isLoading}
                        />

                    </div>

                    <div className="settings-field">

                        <label htmlFor="settings-email">
                            Email
                        </label>

                        <input
                            id="settings-email"
                            type="email"
                            value={email}
                            onChange={(event) =>
                                setEmail(
                                    event.target.value
                                )
                            }
                            placeholder="you@example.com"
                            disabled={isLoading}
                        />

                    </div>

                </div>

                {error && (
                    <p className="settings-message settings-message-error">
                        {error}
                    </p>
                )}

                {success && (
                    <p className="settings-message settings-message-success">
                        Profile updated successfully.
                    </p>
                )}

                <div className="settings-form-actions">

                    <button
                        type="submit"
                        className="settings-save-button"
                        disabled={
                            isLoading ||
                            !name.trim() ||
                            !email.trim()
                        }
                    >
                        <Save />

                        {isLoading
                            ? "Saving..."
                            : "Save changes"}
                    </button>

                </div>

            </form>

        </section>
    );
};

export default ProfileSection;