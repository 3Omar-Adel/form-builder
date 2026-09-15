import { useState } from "react";
import { useNavigate } from "react-router-dom";

import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import SwapHorizOutlinedIcon from "@mui/icons-material/SwapHorizOutlined";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";

import { formApi, type Form, type FormStatus } from "../../../../../api/form.api";

import "./FormActions.css";

interface FormActionsProps {
    form: Form;
    onFormUpdate?: (form: Form) => void;
}

const FormActions = ({ form, onFormUpdate }: FormActionsProps) => {
    const navigate = useNavigate();

    const [showStatuses, setShowStatuses] = useState(false);
    const [isChangingStatus, setIsChangingStatus] = useState(false);
    const [copied, setCopied] = useState(false);
    const [error, setError] = useState("");

    const publicUrl = `${window.location.origin}/forms/public/${form.slug}`;

    const statusLabel: Record<FormStatus, string> = {
        DRAFT: "Draft",
        PUBLISHED: "Published",
        ARCHIVED: "Archived",
    };

    const handleStatusChange = async (status: FormStatus) => {
        if (status === form.status) {
            setShowStatuses(false);
            return;
        }

        setError("");
        setIsChangingStatus(true);

        try {
            let response;

            if (form.status === "DRAFT" && status === "PUBLISHED") {
                response = await formApi.publish(form.id);
            } else if (form.status === "PUBLISHED" && status === "DRAFT") {
                response = await formApi.unpublish(form.id);
            } else if (status === "ARCHIVED") {
                response = await formApi.archive(form.id);
            } else if (form.status === "ARCHIVED" && status === "DRAFT") {
                response = await formApi.restore(form.id);
            } else {
                setError("This status change is not available.");
                return;
            }

            onFormUpdate?.({
                ...form,
                status: response.data.form.status,
            });

            setShowStatuses(false);
        } catch (error) {
            console.error("Failed to change form status:", error);
            setError("Failed to change form status. Please try again.");
        } finally {
            setIsChangingStatus(false);
        }
    };

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(publicUrl);

            setCopied(true);

            setTimeout(() => {
                setCopied(false);
            }, 2000);
        } catch (error) {
            console.error("Failed to copy public link:", error);
        }
    };

    return (
        <section className="form-actions">
            <div className="form-actions-main">
                <div className="form-actions-info">
                    <div className="form-actions-title-row">
                        <h2>Form actions</h2>

                        <span
                            className={`form-status-badge ${form.status.toLowerCase()}`}
                        >
                            <span className="form-status-dot" />
                            {statusLabel[form.status]}
                        </span>
                    </div>

                    <p>Manage this form and its current status.</p>
                </div>

                <div className="form-actions-buttons">
                    <button
                        type="button"
                        className="form-action-button"
                        onClick={() => navigate(`/forms/${form.id}/edit`)}
                    >
                        <EditOutlinedIcon />
                        <span>Edit</span>
                    </button>

                    <button
                        type="button"
                        className={`form-action-button ${
                            showStatuses ? "active" : ""
                        }`}
                        onClick={() => setShowStatuses((current) => !current)}
                        disabled={isChangingStatus}
                    >
                        <SwapHorizOutlinedIcon />
                        <span>Change status</span>
                    </button>
                </div>
            </div>

            {showStatuses && (
                <div className="form-status-menu">
                    <div className="form-status-menu-header">
                        <span>Change status</span>

                        <small>
                            Current: {statusLabel[form.status]}
                        </small>
                    </div>

                    <div className="form-status-options">
                        {(["DRAFT", "PUBLISHED", "ARCHIVED"] as FormStatus[]).map(
                            (status) => {
                                const isCurrent = status === form.status;

                                const isDisabled =
                                    isChangingStatus ||
                                    isCurrent ||
                                    (form.status === "ARCHIVED" &&
                                        status === "PUBLISHED");

                                return (
                                    <button
                                        key={status}
                                        type="button"
                                        className={`form-status-option ${
                                            isCurrent ? "selected" : ""
                                        }`}
                                        disabled={isDisabled}
                                        onClick={() =>
                                            handleStatusChange(status)
                                        }
                                    >
                                        <span className="form-status-option-content">
                                            <span
                                                className={`form-status-option-dot ${status.toLowerCase()}`}
                                            />

                                            <span>
                                                {statusLabel[status]}
                                            </span>
                                        </span>

                                        {isCurrent && <CheckOutlinedIcon />}
                                    </button>
                                );
                            },
                        )}
                    </div>
                </div>
            )}

            {isChangingStatus && (
                <div className="form-status-loading">
                    Updating form status...
                </div>
            )}

            {error && (
                <div className="form-actions-error">
                    {error}
                </div>
            )}

            {form.status === "PUBLISHED" && (
                <div className="form-public-link">
                    <div className="form-public-link-content">
                        <div className="form-public-link-heading">
                            <span>Public form</span>

                            <small>
                                Share this link with anyone you want to
                                receive responses.
                            </small>
                        </div>

                        <div className="form-public-link-url">
                            {publicUrl}
                        </div>
                    </div>

                    <div className="form-public-link-actions">
                        <button
                            type="button"
                            className={`form-public-link-copy ${
                                copied ? "copied" : ""
                            }`}
                            onClick={handleCopy}
                        >
                            {copied ? (
                                <>
                                    <CheckOutlinedIcon />
                                    <span>Copied</span>
                                </>
                            ) : (
                                <>
                                    <ContentCopyOutlinedIcon />
                                    <span>Copy</span>
                                </>
                            )}
                        </button>
                    </div>
                </div>
            )}
        </section>
    );
};

export default FormActions;