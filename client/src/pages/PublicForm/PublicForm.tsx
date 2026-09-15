import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import {
    publicFormApi,
    type SubmitAnswer,
} from "../../api/public-form.api";

import type { Form } from "../../api/form.api";

import FormPreview from "../Forms/FormDetails/components/FormPreview/FormPreview";

import PublicFormSkeleton from "./skeleton/PublicFormSkeleton";
import PublicFormSuccess from "./success/PublicFormSuccess";

import "./PublicForm.css";

const PublicForm = () => {
    const { slug } = useParams<{ slug: string }>();

    const [form, setForm] = useState<Form | null>(null);
    const [answers, setAnswers] = useState<SubmitAnswer[]>([]);
    const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!slug) {
            return;
        }

        const getForm = async () => {
            try {
                setError("");

                const response = await publicFormApi.getBySlug(slug);

                setForm(response.data.form);
            } catch (error) {
                console.error("Failed to load public form:", error);

                setError("This form is not available.");
            } finally {
                setIsLoading(false);
            }
        };

        getForm();
    }, [slug]);

    const handleAnswerChange = (
        fieldId: string,
        value: string | string[],
    ) => {
        setAnswers((currentAnswers) => {
            const existingAnswer = currentAnswers.find(
                (answer) => answer.fieldId === fieldId,
            );

            if (existingAnswer) {
                return currentAnswers.map((answer) =>
                    answer.fieldId === fieldId
                        ? {
                              ...answer,
                              value,
                          }
                        : answer,
                );
            }

            return [
                ...currentAnswers,
                {
                    fieldId,
                    value,
                },
            ];
        });

        setFieldErrors((currentErrors) => {
            if (!currentErrors[fieldId]) {
                return currentErrors;
            }

            const nextErrors = { ...currentErrors };
            delete nextErrors[fieldId];

            return nextErrors;
        });
    };

    const validateForm = () => {
        if (!form?.fields) {
            return true;
        }

        const errors: Record<string, string> = {};

        form.fields.forEach((field) => {
            if (!field.required) {
                return;
            }

            const answer = answers.find(
                (answer) => answer.fieldId === field.id,
            );

            const value = answer?.value;

            const isEmpty =
                value === undefined ||
                value === null ||
                (typeof value === "string" && !value.trim()) ||
                (Array.isArray(value) && value.length === 0);

            if (isEmpty) {
                errors[field.id] = "This field is required.";
            }
        });

        setFieldErrors(errors);

        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (
        event: React.FormEvent<HTMLFormElement>,
    ) => {
        event.preventDefault();

        if (!slug || isSubmitting) {
            return;
        }

        setError("");

        const isValid = validateForm();

        if (!isValid) {
            return;
        }

        try {
            setIsSubmitting(true);

            await publicFormApi.submit(slug, {
                answers,
            });

            setSubmitted(true);
        } catch (error) {
            console.error("Failed to submit form:", error);

            if (axios.isAxiosError(error)) {
                setError(
                    error.response?.data?.message ||
                        "Failed to submit form. Please try again.",
                );
            } else {
                setError(
                    "Failed to submit form. Please try again.",
                );
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!slug) {
        return (
            <div className="public-form-page">
                <div className="public-form-state">
                    <h1>Invalid form link</h1>

                    <p>
                        The form link you are trying to access is
                        invalid.
                    </p>
                </div>
            </div>
        );
    }

    if (isLoading) {
        return <PublicFormSkeleton />;
    }

    if (error && !form) {
        return (
            <div className="public-form-page">
                <div className="public-form-state">
                    <div className="public-form-state-icon">
                        !
                    </div>

                    <h1>Form unavailable</h1>

                    <p>{error}</p>
                </div>
            </div>
        );
    }

    if (!form) {
        return null;
    }

    if (submitted) {
        return <PublicFormSuccess />;
    }

    return (
        <div className="public-form-page">
            <form
                className="public-form"
                onSubmit={handleSubmit}
                noValidate
            >
                <FormPreview
                    form={form}
                    mode="public"
                    onAnswerChange={handleAnswerChange}
                    fieldErrors={fieldErrors}
                    isSubmitting={isSubmitting}
                />

                {error && (
                    <div className="public-form-submit-error">
                        {error}
                    </div>
                )}
            </form>
        </div>
    );
};

export default PublicForm;