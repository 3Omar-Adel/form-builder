import {
    useEffect,
    useState,
} from "react";

import {
    formApi,
    type Form,
} from "../../api/form.api";

import "./Forms.css";

const Forms = () => {
    const [forms, setForms] = useState<Form[]>([]);
    const [isLoading, setIsLoading] =
        useState(true);

    const [error, setError] =
        useState("");

    useEffect(() => {
        const getForms = async () => {
            try {
                const response =
                    await formApi.getMyForms();

                setForms(
                    response.data.forms,
                );
            } catch (error) {
                console.error(
                    "Failed to load forms:",
                    error,
                );

                setError(
                    "Failed to load forms. Please try again.",
                );
            } finally {
                setIsLoading(false);
            }
        };

        getForms();
    }, []);

    if (isLoading) {
        return (
            <div className="forms-page">
                Loading forms...
            </div>
        );
    }

    if (error) {
        return (
            <div className="forms-page">
                {error}
            </div>
        );
    }

    return (
        <div className="forms-page">
            <div className="forms-page-header">
                <div>
                    <h2>Forms</h2>

                    <p>
                        Create and manage your forms.
                    </p>
                </div>
            </div>

            {forms.length === 0 ? (
                <div className="forms-empty">
                    <h3>No forms yet</h3>

                    <p>
                        Create your first form to get started.
                    </p>
                </div>
            ) : (
                <div className="forms-list">
                    {forms.map((form) => (
                        <div
                            className="form-card"
                            key={form.id}
                        >
                            <div>
                                <h3>
                                    {form.title}
                                </h3>

                                <p>
                                    {
                                        form.description
                                    }
                                </p>
                            </div>

                            <div>
                                <span>
                                    {form.status}
                                </span>

                                <span>
                                    {
                                        form._count
                                            ?.responses
                                    }{" "}
                                    responses
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Forms;