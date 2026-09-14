import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";

import { responseApi } from "../../api/response.api";
import { formApi, type Form } from "../../api/form.api";

import type { FormResponse } from "../../api/response.api";

import "./Responses.css";

const Responses = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [form, setForm] = useState<Form | null>(null);
    const [responses, setResponses] = useState<FormResponse[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!id) {
            return;
        }

        const loadResponses = async () => {
            try {
                setIsLoading(true);
                setError("");

                const [formResponse, responsesResponse] =
                    await Promise.all([
                        formApi.getById(id),
                        responseApi.getByFormId(id),
                    ]);

                setForm(formResponse.data.form);
                setResponses(
                    responsesResponse.data.responses,
                );
            } catch (error) {
                console.error(
                    "Failed to load responses:",
                    error,
                );

                setError(
                    "Failed to load responses.",
                );
            } finally {
                setIsLoading(false);
            }
        };

        loadResponses();
    }, [id]);

    const handleDelete = async (
        responseId: string,
    ) => {
        if (!id) {
            return;
        }

        const confirmed = window.confirm(
            "Are you sure you want to delete this response?",
        );

        if (!confirmed) {
            return;
        }

        try {
            await responseApi.delete(
                id,
                responseId,
            );

            setResponses((currentResponses) =>
                currentResponses.filter(
                    (response) =>
                        response.id !== responseId,
                ),
            );
        } catch (error) {
            console.error(
                "Failed to delete response:",
                error,
            );
        }
    };

    const formatDate = (date: string) => {
        return new Date(date).toLocaleString(
            "en-US",
            {
                dateStyle: "medium",
                timeStyle: "short",
            },
        );
    };

    const getAnswerValue = (value: string) => {
        try {
            const parsed = JSON.parse(value);

            if (Array.isArray(parsed)) {
                return parsed.join(", ");
            }
        } catch {
            return value;
        }

        return value;
    };

    if (isLoading) {
        return (
            <div className="responses-page">
                <div className="responses-loading">
                    Loading responses...
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
                    onClick={() =>
                        navigate(`/forms/${id}`)
                    }
                >
                    <ArrowBackOutlinedIcon />

                    <span>Back to form</span>
                </button>

                <div className="responses-header-content">
                    <h1>
                        {form?.title ?? "Responses"}
                    </h1>

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

            {!error && responses.length === 0 && (
                <div className="responses-empty">
                    <h2>No responses yet</h2>

                    <p>
                        Responses submitted to this
                        form will appear here.
                    </p>
                </div>
            )}

            <div className="responses-list">
                {responses.map(
                    (response, index) => (
                        <article
                            key={response.id}
                            className="response-card"
                        >
                            <div className="response-card-header">
                                <div>
                                    <h2>
                                        Response{" "}
                                        {responses.length -
                                            index}
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
                                        handleDelete(
                                            response.id,
                                        )
                                    }
                                    aria-label="Delete response"
                                >
                                    <DeleteOutlineOutlinedIcon />
                                </button>
                            </div>

                            <div className="response-answers">
                                {response.answers.map(
                                    (answer) => (
                                        <div
                                            key={
                                                answer.id
                                            }
                                            className="response-answer"
                                        >
                                            <span className="response-answer-label">
                                                {
                                                    answer
                                                        .field
                                                        .label
                                                }
                                            </span>

                                            <p>
                                                {getAnswerValue(
                                                    answer.value,
                                                ) || "—"}
                                            </p>
                                        </div>
                                    ),
                                )}
                            </div>
                        </article>
                    ),
                )}
            </div>
        </div>
    );
};

export default Responses;