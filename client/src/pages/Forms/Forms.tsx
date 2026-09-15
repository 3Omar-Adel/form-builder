import { useEffect, useState } from "react";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { useNavigate } from "react-router-dom";
import { formApi, type Form } from "../../api/form.api";
import FormsSkeleton from "./Skeleton/FormsSkeleton";
import EmptyState from "../../components/EmptyState/EmptyState";

import "./Forms.css";

const Forms = () => {
    const navigate = useNavigate();

    const [forms, setForms] = useState<Form[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const getForms = async () => {
            try {
                const response = await formApi.getMyForms();
                setForms(response.data.forms);
            } catch (error) {
                console.error("Failed to load forms:", error);
                setError("Failed to load forms. Please try again.");
            } finally {
                setIsLoading(false);
            }
        };

        getForms();
    }, []);

    const handleDelete = async (id: string) => {
        try {
            await formApi.deleteForm(id);

            setForms((currentForms) =>
                currentForms.filter((form) => form.id !== id)
            );
        } catch (error) {
            console.error("Failed to delete form:", error);
            setError("Failed to delete form. Please try again.");
        }
    };

    if (isLoading) {
        return (
            <div className="forms-page">
                <div className="forms-page-header">
                    <div>
                        <h2>Forms</h2>
                        <p>Create and manage your forms.</p>
                    </div>
                </div>

                <FormsSkeleton />
            </div>
        );
    }

    if (error) {
        return <div className="forms-page">{error}</div>;
    }

    return (
        <div className="forms-page">
            <div className="forms-page-header">
                <div>
                    <h2>Forms</h2>
                    <p>Create and manage your forms.</p>
                </div>
            </div>

            {forms.length === 0 ? (
                <EmptyState
                    title="No forms yet"
                    description="Create your first form and start collecting responses."
                    buttonText="Create your first form"
                    onButtonClick={() => navigate("/forms/new")}
                />
            ) : (
                <div className="forms-list">
                    {forms.map((form) => (
                        <div
                            className="form-card"
                            key={form.id}
                            onClick={() => navigate(`/forms/${form.id}`)}
                        >
                            <div>
                                <h3>{form.title}</h3>
                                <p>{form.description}</p>
                            </div>

                            <div>
                                <span>{form.status}</span>

                                <span>
                                    {form._count?.responses} responses
                                </span>

                                <span
                                    onClick={(event) => {
                                        event.stopPropagation();
                                        handleDelete(form.id);
                                    }}
                                >
                                    <DeleteOutlineOutlinedIcon className="delete-form" />
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