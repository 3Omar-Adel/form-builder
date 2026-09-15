import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";

import { responseApi, type FormResponse } from "../../api/response.api";
import { formApi, type Form } from "../../api/form.api";

import EmptyState from "../../components/EmptyState/EmptyState";
import ResponsesSkeleton from "./Skeleton/ResponsesSkeleton";

import "./Responses.css";

const Responses = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [form, setForm] = useState<Form | null>(null);
    const [responses, setResponses] = useState<FormResponse[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [deletingResponseId, setDeletingResponseId] = useState<string | null>(null);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!id) {
            return;
        }

        const loadResponses = async () => {
            try {
                setIsLoading(true);
                setError("");

                const [formResponse, responsesResponse] = await Promise.all([
                    formApi.getById(id),
                    responseApi.getByFormId(id),
                ]);

                setForm(formResponse.data.form);
                setResponses(responsesResponse.data.responses);
            } catch (error) {
                console.error("Failed to load responses:", error);
                setError("Failed to load responses. Please try again.");
            } finally {
                setIsLoading(false);
            }
        };

        loadResponses();
    }, [id]);

    if (!id) {
        return (
            <div className="responses-page">
                <div className="responses-error">
                    Form ID is missing.
                </div>
            </div>
        );
    }

    if (isLoading) {
        return <ResponsesSkeleton />;
    }

    const handleDelete = async (responseId: string) => {
        if (!id || deletingResponseId) {
            return;
        }

        const confirmed = window.confirm(
            "Are you sure you want to delete this response?",
        );

        if (!confirmed) {
            return;
        }

        try {
            setDeletingResponseId(responseId);

            await responseApi.delete(id, responseId);

            setResponses((currentResponses) =>
                currentResponses.filter(
                    (response) => response.id !== responseId,
                ),
            );
        } catch (error) {
            console.error("Failed to delete response:", error);
            setError("Failed to delete response. Please try again.");
        } finally {
            setDeletingResponseId(null);
        }
    };

    const formatDate = (date: string) => {
        return new Date(date).toLocaleString("en-US", {
            dateStyle: "medium",
            timeStyle: "short",
        });
    };

    const getAnswerValue = (value: string) => {
        try {
            const parsed = JSON.parse(value);

            if (Array.isArray(parsed)) {
                return parsed.join(", ");
            }

            if (
                parsed !== null &&
                typeof parsed === "object"
            ) {
                return JSON.stringify(parsed);
            }

            return String(parsed);
        } catch {
            return value;
        }
    };

    if (isLoading) {
        return <ResponsesSkeleton />;
    }

    if (error && !form) {
        return (
            <div className="responses-page">
                <div className="responses-error">
                    {error}
                </div>
            </div>
        );
    }

    return (
        <div className="responses-page">
            <div className="responses-header">
                <button
                    type="button"
                    className="responses-back"
                    onClick={() => navigate(`/forms/${id}`)}
                >
                    <ArrowBackOutlinedIcon />
                    <span>Back to form</span>
                </button>

                <div className="responses-header-content">
                    <h1>{form?.title ?? "Responses"}</h1>

                    <p>
                        {responses.length}{" "}
                        {responses.length === 1
                            ? "response"
                            : "responses"}
                    </p>
                </div>
            </div>

            {error && (
                <div className="responses-error">
                    {error}
                </div>
            )}

            {responses.length === 0 ? (
                <EmptyState
                    title="No responses yet"
                    description="Responses submitted to this form will appear here."
                    buttonText="Back to form"
                    onButtonClick={() => navigate(`/forms/${id}`)}
                />
            ) : (
                <div className="responses-list">
                    {responses.map((response, index) => {
                        const isDeleting =
                            deletingResponseId === response.id;

                        return (
                            <article
                                key={response.id}
                                className={`response-card ${isDeleting
                                        ? "response-card-deleting"
                                        : ""
                                    }`}
                            >
                                <div className="response-card-header">
                                    <div>
                                        <h2>
                                            Response{" "}
                                            {responses.length - index}
                                        </h2>

                                        <span>
                                            {formatDate(
                                                response.createdAt,
                                            )}
                                        </span>
                                    </div>

                                    <button
                                        type="button"
                                        className="response-delete"
                                        onClick={() =>
                                            handleDelete(response.id)
                                        }
                                        disabled={
                                            deletingResponseId !== null
                                        }
                                        aria-label="Delete response"
                                    >
                                        {isDeleting ? (
                                            <span className="response-delete-spinner" />
                                        ) : (
                                            <DeleteOutlineOutlinedIcon />
                                        )}
                                    </button>
                                </div>

                                <div className="response-answers">
                                    {response.answers.map((answer) => (
                                        <div
                                            key={answer.id}
                                            className="response-answer"
                                        >
                                            <span className="response-answer-label">
                                                {answer.field.label}
                                            </span>

                                            <p>
                                                {getAnswerValue(
                                                    answer.value,
                                                ) || "—"}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </article>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default Responses;