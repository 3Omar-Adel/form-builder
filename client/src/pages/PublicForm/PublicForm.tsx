import {
    useEffect,
    useState,
} from "react";
import axios from "axios";
import {
    useParams,
} from "react-router-dom";

import {
    publicFormApi,
    type SubmitAnswer,
} from "../../api/public-form.api";

import type {
    Form,
} from "../../api/form.api";

import FormPreview from "../Forms/FormDetails/components/FormPreview/FormPreview";

import "./PublicForm.css";

const PublicForm = () => {
    const {
        slug,
    } = useParams<{
        slug: string;
    }>();

    const [
        form,
        setForm,
    ] = useState<Form | null>(
        null,
    );

    const [
        answers,
        setAnswers,
    ] = useState<SubmitAnswer[]>(
        [],
    );

    const [
        isLoading,
        setIsLoading,
    ] = useState(true);

    const [
        isSubmitting,
        setIsSubmitting,
    ] = useState(false);

    const [
        submitted,
        setSubmitted,
    ] = useState(false);

    const [
        error,
        setError,
    ] = useState("");

    useEffect(() => {
        if (!slug) {
            setError(
                "Form link is invalid.",
            );

            setIsLoading(false);

            return;
        }

        const getForm = async () => {
            try {
                const response =
                    await publicFormApi.getBySlug(
                        slug,
                    );

                setForm(
                    response.data.form,
                );
            } catch (error) {
                console.error(
                    "Failed to load public form:",
                    error,
                );

                setError(
                    "This form is not available.",
                );
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
        setAnswers(
            (currentAnswers) => {
                const existingAnswer =
                    currentAnswers.find(
                        (answer) =>
                            answer.fieldId ===
                            fieldId,
                    );

                if (existingAnswer) {
                    return currentAnswers.map(
                        (answer) =>
                            answer.fieldId ===
                            fieldId
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
            },
        );
    };

    const handleSubmit = async (
        event: React.FormEvent<HTMLFormElement>,
    ) => {
        event.preventDefault();

        if (!slug) {
            return;
        }

        try {
            setIsSubmitting(true);
            setError("");

            await publicFormApi.submit(
                slug,
                {
                    answers,
                },
            );

            setSubmitted(true);
        }  catch (error) {
    console.error(
        "SUBMIT ERROR:",
        error,
    );

    if (axios.isAxiosError(error)) {
        console.error(
            "STATUS:",
            error.response?.status,
        );

        console.error(
            "BACKEND RESPONSE:",
            error.response?.data,
        );

        setError(
            error.response?.data?.message ||
            "Failed to submit form.",
        );
    } else {
        setError(
            "Failed to submit form.",
        );
    }
} finally {
            setIsSubmitting(false);
        }
    };

    if (isLoading) {
        return (
            <div className="public-form-page">
                <p>
                    Loading form...
                </p>
            </div>
        );
    }

    if (error && !form) {
        return (
            <div className="public-form-page">
                <div className="public-form-error">
                    <h2>
                        Form unavailable
                    </h2>

                    <p>
                        {error}
                    </p>
                </div>
            </div>
        );
    }

    if (!form) {
        return null;
    }

    if (submitted) {
        return (
            <div className="public-form-page">
                <div className="public-form-success">
                    <h2>
                        Thank you!
                    </h2>

                    <p>
                        Your response has been submitted successfully.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="public-form-page">

            <form
                onSubmit={handleSubmit}
            >
                <FormPreview
                    form={form}
                    mode="public"
                    onAnswerChange={
                        handleAnswerChange
                    }
                />

                {error && (
                    <div className="public-form-submit-error">
                        {error}
                    </div>
                )}

                {isSubmitting && (
                    <p>
                        Submitting...
                    </p>
                )}
            </form>

        </div>
    );
};

export default PublicForm;
